require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Gzip compression for maximum speed
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  level: 6
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets with caching
const staticOptions = {
  maxAge: '1d',
  etag: true,
  lastModified: true
};

app.use(express.static(path.join(__dirname, 'public'), staticOptions));
app.use('/images', express.static(path.join(__dirname, 'images'), { maxAge: '7d' }));

// Helper: Clean and format Uzbekistan phone number
function formatPhone(phoneInput) {
  const digits = String(phoneInput || '').replace(/\D/g, '');
  const rawNine = digits.replace(/^998/, '').slice(0, 9);
  if (rawNine.length !== 9) return null;
  return `+998${rawNine}`;
}

// amoCRM API helper
async function createAmoCRMLead({ name, phone, company, service, message, pageUrl }) {
  const subdomain = process.env.AMOCRM_SUBDOMAIN || 'aloqaprocall';
  const token = process.env.AMOCRM_LONG_LIVED_TOKEN;
  const pipelineId = parseInt(process.env.AMOCRM_PIPELINE_ID || '10606078', 10);
  const statusId = parseInt(process.env.AMOCRM_STATUS_ID || '83732102', 10);
  const responsibleUserId = parseInt(process.env.AMOCRM_RESPONSIBLE_USER_ID || '13516894', 10);
  const taskTypeId = parseInt(process.env.AMOCRM_TASK_TYPE_ID || '1', 10);

  if (!token) {
    throw new Error('AMOCRM_LONG_LIVED_TOKEN is missing in environment variables');
  }

  const baseUrl = `https://${subdomain}.amocrm.ru`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'TechnicLab/1.0'
  };

  // 1. Create Lead and Contact via /api/v4/leads/complex
  const leadTitle = service ? `Saytdan ariza: ${name} (${service})` : `Saytdan ariza: ${name}`;
  const complexPayload = [
    {
      name: leadTitle,
      pipeline_id: pipelineId,
      status_id: statusId,
      responsible_user_id: responsibleUserId,
      price: 0,
      _embedded: {
        contacts: [
          {
            name: name,
            responsible_user_id: responsibleUserId,
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [
                  {
                    value: phone,
                    enum_code: 'WORK'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ];

  const leadRes = await fetch(`${baseUrl}/api/v4/leads/complex`, {
    method: 'POST',
    headers,
    body: JSON.stringify(complexPayload)
  });

  if (!leadRes.ok) {
    const errText = await leadRes.text();
    throw new Error(`AmoCRM leads/complex failed (${leadRes.status}): ${errText}`);
  }

  const leadData = await leadRes.json();
  const createdLead = Array.isArray(leadData) ? leadData[0] : null;
  const leadId = createdLead ? createdLead.id : null;

  if (!leadId) {
    throw new Error('Lead ID not found in AmoCRM response');
  }

  // 2. Add detailed note to lead
  try {
    const nowStr = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
    const noteText = [
      `🌐 techniclab.uz saytidan yangi murojaat`,
      `----------------------------------------`,
      `👤 Ism: ${name}`,
      `📞 Telefon: ${phone}`,
      `🏢 Kompaniya: ${company || 'Ko‘rsatilmagan'}`,
      `🛠 Xizmat turi: ${service || 'Ko‘rsatilmagan'}`,
      `💬 Xabar: ${message || 'Xabar qoldirilmagan'}`,
      `🔗 Sahifa: ${pageUrl || 'https://techniclab.uz'}`,
      `⏰ Vaqt: ${nowStr}`
    ].join('\n');

    await fetch(`${baseUrl}/api/v4/leads/${leadId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify([
        {
          note_type: 'common',
          params: { text: noteText }
        }
      ])
    });
  } catch (noteErr) {
    console.error('Warning: Failed to add note to AmoCRM lead:', noteErr.message);
  }

  // 3. Create task (zadacha) for responsible manager
  try {
    const completeTill = Math.floor(Date.now() / 1000) + 7200; // 2 hours from now
    const taskText = `Mijoz bilan boğlaniş: ${name} (${phone}) - ${service || 'Yangi ariza'}`;

    const taskPayload = [
      {
        task_type_id: taskTypeId,
        text: taskText,
        complete_till: completeTill,
        entity_id: leadId,
        entity_type: 'leads',
        responsible_user_id: responsibleUserId
      }
    ];

    const taskRes = await fetch(`${baseUrl}/api/v4/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(taskPayload)
    });

    if (!taskRes.ok) {
      const errText = await taskRes.text();
      console.error('Warning: Failed to create task in AmoCRM:', errText);
    }
  } catch (taskErr) {
    console.error('Warning: Exception while creating task in AmoCRM:', taskErr.message);
  }

  return { leadId };
}

// Handler for contact form submissions
async function handleContactSubmission(req, res) {
  try {
    const { name, phone, company, service, message, page_url } = req.body;

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const formattedPhone = formatPhone(phone);

    if (!trimmedName) {
      return res.status(400).json({
        ok: false,
        error: 'Ismingizni kiritishingiz shart.'
      });
    }

    if (!formattedPhone) {
      return res.status(400).json({
        ok: false,
        error: "Telefon raqami 9 ta raqamdan iborat bölişi kerak (+998...)."
      });
    }

    const { leadId } = await createAmoCRMLead({
      name: trimmedName,
      phone: formattedPhone,
      company: typeof company === 'string' ? company.trim() : '',
      service: typeof service === 'string' ? service.trim() : '',
      message: typeof message === 'string' ? message.trim() : '',
      pageUrl: typeof page_url === 'string' ? page_url.trim() : ''
    });

    return res.status(200).json({
      ok: true,
      success: true,
      lead_id: leadId,
      message: 'Murojaatingiz qabul qilindi. Tez orada menejerimiz boğlanadi.'
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(500).json({
      ok: false,
      error: 'Serverda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko‘ring.'
    });
  }
}

// API Routes (multiple paths for backwards compatibility)
app.post('/api/leads', handleContactSubmission);
app.post('/api/contact', handleContactSubmission);
app.post('/functions/v1/send-to-amocrm', handleContactSubmission);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Technic Lab API',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for root or SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🚀 TechnicLab server running on port ${PORT}`);
  console.log(`🌐 Local:   http://localhost:${PORT}`);
  console.log(`📈 amoCRM:  subdomain: ${process.env.AMOCRM_SUBDOMAIN || 'aloqaprocall'}`);
  console.log(`=========================================`);
});
