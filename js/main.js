// Reveal on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const idx = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target);
                    setTimeout(() => entry.target.classList.add('visible'), idx * 55);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Mobile menu
        function toggleMenu() {
            const links = document.querySelector('.nav-links');
            if (links.style.display === 'flex') {
                links.style.display = '';
            } else {
                links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(255,255,255,0.98);padding:2rem;gap:1.5rem;border-bottom:1px solid #e5e9f2;box-shadow:0 8px 32px rgba(0,0,0,0.08);z-index:99;backdrop-filter:blur(20px)';
            }
        }
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => { document.querySelector('.nav-links').style.display = ''; });
        });

        // Language switcher
        const translations = {
            uz: {
                title: 'TECHNICLAB | IT Solutions',
                nav: ['Kompaniya haqida', 'Sertifikatlar', "Avto qo'ng'iroq", 'Xizmatlar', 'Mijozlar', 'Aloqa'],
                heroBadge: 'IT Park rezidenti | Toshkent 2026',
                heroTitleHtml: 'Biznesingizni <span>raqamlashtiring</span>',
                heroText: "Zamonaviy CRM, AI yechimlar va veb-saytlar orqali biznesingizni yangi bosqichga olib chiqamiz.",
                heroButtons: ['Xizmatlar', "Bog'lanish"],
                stats: ['Mijozlar', 'Sertifikatlar', 'Yillik tajriba', "Natijaga yo'nalish"],
                aboutLabel: 'Kompaniya haqida',
                aboutTitle: 'Ishonchli IT hamkoringiz',
                aboutSubtitle: "Technic Lab O'zbekistondagi yetakchi IT kompaniyalaridan biri. CRM, AI, veb va IP telephoniya bo'yicha sertifikatlangan mutaxassislar jamoasi.",
                aboutFeatures: [
                    ['AI Yechimlar', "Sun'iy intellekt asosida jarayonlarni avtomatlashtirish"],
                    ['CRM Tizimlar', "amoCRM va Bitrix24 joriy etish hamda sozlash"],
                    ['Veb Ishlanmalar', 'Zamonaviy saytlar va veb-ilovalar yaratish'],
                    ['IP Telephoniya', 'onlinePBX yordamida aloqa tizimlarini qurish']
                ],
                aboutCardTitle: 'Sertifikatlangan mutaxassislar jamoasi',
                aboutCardText: "Technic Lab jamoasi xalqaro va mahalliy sertifikatlar bilan tasdiqlangan. Biz har bir loyihaga individual yondashamiz va natijaga yo'naltirilgan yechimlar taklif qilamiz.",
                aboutMini: ['Biznes hamkor', 'amoSTART hamkor', 'Rezident #5806', 'Sertifikatlangan'],
                certLabel: 'Sertifikatlar',
                certTitle: 'Rasmiy hamkorliklar',
                certHiddenTypes: ['Biznes hamkor', 'amoSTART rasmiy hamkori', 'Texnopark rezidenti', 'Hamkor sertifikati'],
                certHiddenBodies: [
                    'Technic Lab 1C-Bitrix kompaniyasining rasmiy biznes hamkori sifatida tasdiqlangan.',
                    "Technic Lab amoCRM'ning amoSTART dasturining rasmiy hamkori. ID: 28597310.",
                    '"TECHNIC LAB" MCHJ Dasturiy mahsulotlar texnologik parkining rezidenti. Guvohnoma No. 5806.',
                    "Technic Lab onlinePBX xizmatini joriy etish va qo'llab-quvvatlash bo'yicha sertifikatlangan hamkor."
                ],
                certHiddenDates: ['30 mart 2026 yildan', '4 fevral 2025 yildan', '15 aprel 2026 yil', '27 aprel 2026 yildan'],
                certThumbTitles: ['Bitrix24', 'amoCRM', 'IT Park', 'onlinePBX'],
                certThumbSpans: ['Biznes hamkor sertifikati', 'amoSTART rasmiy hamkori', 'Rezident guvohnomasi', 'Hamkorlik sertifikati'],
                certModalHint: 'Yopish uchun rasm ustiga yoki fon ustiga bosing',
                certModalAlt: ['Bitrix24 sertifikati', 'amoCRM sertifikati', 'IT Park guvohnomasi', 'onlinePBX sertifikati'],
                autocallLabel: "Avto qo'ng'iroq",
                autocallTitle: "Aqlli avto qo'ng'iroq tizimi",
                autocallSubtitle: "Mijozlar bilan tezkor, samarali va avtomatlashtirilgan ovozli aloqa xizmati.",
                autocallCards: [
                    ['Ommaviy xabarnomalar', "Minglab mijozlarga bir vaqtning o'zida muhim xabarlar, aksiyalar va eslatmalarni ovozli tarzda tezkor yetkazish imkoniyati.", 'Ommaviy aloqa'],
                    ['20 kun bepul avto qo\'ng\'iroq', "IP Telefoniya o'rnatib 20 kun bepul avto qo'ng'iroqqa ega bo'ling!", '20 kun bepul'],
                    ['CRM va Tizim integratsiyasi', "Qo'ng'iroqlar tarixi, tahlillari va audio yozuvlarini CRM tizimingiz (Bitrix24, amoCRM) bilan to'liq integratsiya qilish.", 'Integratsiya']
                ],
                autocallBannerBadge: "Maxsus taklif",
                autocallBannerTitle: "1 000 ta bepul qo'ng'iroqqa ega bo'ling",
                autocallBannerText: "Avto qo'ng'iroq tizimining imkoniyatlarini bepul sinab ko'ring va natijani darhol his qiling.",
                autocallBannerBtn: "SINAB KO'RISH UCHUN",
                servicesLabel: 'Xizmatlar',
                servicesTitle: 'Nima qila olamiz?',
                servicesSubtitle: 'Biznesingiz ehtiyojlariga moslashtirilgan keng qamrovli IT xizmatlari.',
                services: [
                    ['AI Yechimlar', "Chatbot, avtomatlashtirish va ma'lumot tahlili orqali sun'iy intellekt texnologiyalari yordamida biznesingizni optimallashtiramiz.", 'AI | ML'],
                    ['CRM Joriy Etish', "amoCRM va Bitrix24 tizimlarini to'liq sozlash, integratsiya qilish va xodimlarni o'qitish.", 'CRM | ERP'],
                    ['Veb Saytlar', "Korporativ saytlar, landing page'lar va onlayn do'konlar. Zamonaviy dizayn va yuqori tezlik.", 'Web | Design'],
                    ['IP Telephoniya', "onlinePBX asosida virtual ATS tizimini qurish. IP Telefoniya o'rnatib 20 kun bepul avto qo'ng'iroqqa ega bo'ling!", 'PBX | VoIP'],
                    ['Biznes Avtomatlashtirish', 'Biznes jarayonlarini raqamlashtirish, workflow yaratish va takrorlanuvchi ishlarni avtomatlashtirish.', 'Automation'],
                    ['Integratsiyalar', "Turli tizimlar o'rtasida API integratsiyalari, ma'lumotlar sinxronizatsiyasi va ulanishlarni yo'lga qo'yish.", 'API | Integration']
                ],
                clientsLabel: 'Mijozlar',
                clientsTitle: 'Mijozlar',
                clientsSubtitle: "O'zbekistonning yetakchi kompaniyalari biz bilan hamkorlik qilmoqda",
                contactLabel: 'Aloqa',
                contactTitle: 'Birgalikda ishlaylik',
                contactSubtitle: 'Loyihangiz haqida gaplashishga tayyormiz. Murojaat qiling, tez orada javob beramiz.',
                contactSmalls: ['Telefon', 'Email', 'Telegram', 'Manzil'],
                formTitle: "Murojaat jo'natish",
                formLabels: ['Ismingiz *', 'Telefon *', 'Kompaniya', 'Xizmat turi', 'Xabar'],
                formPlaceholders: ['Ism Familiya', '+998 __ ___ __ __', 'Kompaniyangiz nomi', 'Loyihangiz haqida qisqacha yozing...'],
                formOptions: ['CRM joriy etish', 'AI yechimlar', 'Veb sayt yaratish', 'IP telephoniya', 'Biznes avtomatlashtirish', 'Integratsiyalar', 'Boshqa'],
                formButton: "Murojaatni yuborish",
                submitLoading: 'Yuborilmoqda...',
                footerText: '(c) 2026 Technic Lab MCHJ | IT Park rezidenti',
                footerLinks: ['Haqida', 'Sertifikatlar', "Avto qo'ng'iroq", 'Xizmatlar', 'Mijozlar'],
                validationError: 'Iltimos, ism va telefon raqamingizni kiriting.',
                phoneInvalid: "Telefon raqami aynan 9 ta raqamdan iborat bo'lishi kerak.",
                successMessage: "Murojaatingiz qabul qilindi, tez orada menejerlarimiz siz bilan bog'lanadi.",
                requestError: "Xatolik yuz berdi. Qayta urinib ko'ring.",
                gmailOpened: 'Gmail ochildi. Xatni yuborishni unutmang.',
                mailSubjectPrefix: 'Techniclab.uz | Yangi murojaat:',
                mailBodyTitle: 'Yangi murojaat Techniclab.uz saytidan',
                mailName: 'Ism',
                mailPhone: 'Telefon',
                mailCompany: 'Kompaniya',
                mailService: 'Xizmat',
                mailMessage: 'Xabar',
                mailUnspecified: "Ko'rsatilmagan",
                mailNoMessage: 'Xabar yozilmagan',
                mailSentAt: 'Yuborildi',
                locale: 'uz-UZ'
            },
            ru: {
                title: 'TECHNICLAB | IT Solutions',
                nav: ['О компании', 'Сертификаты', 'Автообзвон', 'Услуги', 'Клиенты', 'Контакты'],
                heroBadge: 'Резидент IT Park | Ташкент 2026',
                heroTitleHtml: 'Цифровизируйте <span>свой бизнес</span>',
                heroText: "Мы выводим ваш бизнес на новый уровень с помощью современных CRM, AI-решений и веб-сайтов.",
                heroButtons: ['Услуги', "Связаться"],
                stats: ['Клиенты', 'Сертификаты', 'Лет опыта', "Ориентация на результат"],
                aboutLabel: 'О компании',
                aboutTitle: 'Ваш надежный IT-партнер',
                aboutSubtitle: "Technic Lab — одна из ведущих IT-компаний Узбекистана. Команда сертифицированных специалистов в области CRM, AI, веб-разработки и IP-телефонии.",
                aboutFeatures: [
                    ['AI-решения', "Автоматизация процессов на основе искусственного интеллекта"],
                    ['CRM-системы', "Внедрение и настройка amoCRM и Bitrix24"],
                    ['Веб-разработка', 'Создание современных сайтов и веб-приложений'],
                    ['IP-телефония', 'Создание систем связи с помощью onlinePBX']
                ],
                aboutCardTitle: 'Команда сертифицированных специалистов',
                aboutCardText: "Команда Technic Lab подтверждена международными и местными сертификатами. Мы индивидуально подходим к каждому проекту и предлагаем решения, ориентированные на результат.",
                aboutMini: ['Бизнес-партнер', 'Партнер amoSTART', 'Резидент #5806', 'Сертифицировано'],
                certLabel: 'Сертификаты',
                certTitle: 'Официальные партнерства',
                certHiddenTypes: ['Бизнес-партнер', 'Официальный партнер amoSTART', 'Резидент технопарка', 'Партнерский сертификат'],
                certHiddenBodies: [
                    'Technic Lab подтверждена как официальный бизнес-партнер компании 1C-Bitrix.',
                    "Technic Lab является официальным партнером программы amoSTART от amoCRM. ID: 28597310.",
                    '"TECHNIC LAB" MCHJ является резидентом технологического парка программных продуктов. Свидетельство № 5806.',
                    "Technic Lab является сертифицированным партнером по внедрению и поддержке сервиса onlinePBX."
                ],
                certHiddenDates: ['С 30 марта 2026 года', 'С 4 февраля 2025 года', '15 апреля 2026 года', 'С 27 апреля 2026 года'],
                certThumbTitles: ['Bitrix24', 'amoCRM', 'IT Park', 'onlinePBX'],
                certThumbSpans: ['Сертификат бизнес-партнера', 'Официальный партнер amoSTART', 'Свидетельство резидента', 'Партнерский сертификат'],
                certModalHint: 'Для закрытия нажмите на изображение или на фон',
                certModalAlt: ['Сертификат Bitrix24', 'Сертификат amoCRM', 'Свидетельство IT Park', 'Сертификат onlinePBX'],
                autocallLabel: 'Автообзвон',
                autocallTitle: 'Умная система автообзвона',
                autocallSubtitle: 'Быстрая, эффективная и автоматизированная голосовая связь с клиентами.',
                autocallCards: [
                    ['Массовые уведомления', 'Оперативная голосовая доставка важных сообщений, акций и напоминаний тысячам клиентов одновременно.', 'Массовая связь'],
                    ['20 дней бесплатного автообзвона', 'Установите IP-телефонию и получите 20 дней бесплатного автообзвона!', '20 дней бесплатно'],
                    ['Интеграция с CRM и сервисами', 'Полная синхронизация истории звонков, аналитики и аудиозаписей с вашей CRM-системой (Bitrix24, amoCRM).', 'Интеграция']
                ],
                autocallBannerBadge: 'Специальное предложение',
                autocallBannerTitle: 'Получите 1 000 бесплатных звонков',
                autocallBannerText: 'Попробуйте возможности системы автообзвона бесплатно и оцените результат сразу.',
                autocallBannerBtn: 'ПОПРОБОВАТЬ',
                servicesLabel: 'Услуги',
                servicesTitle: 'Что мы можем сделать?',
                servicesSubtitle: 'Комплексные IT-услуги, адаптированные под потребности вашего бизнеса.',
                services: [
                    ['AI-решения', "Оптимизируем ваш бизнес с помощью технологий искусственного интеллекта: чат-ботов, автоматизации и анализа данных.", 'AI | ML'],
                    ['Внедрение CRM', "Полная настройка, интеграция систем amoCRM и Bitrix24, а также обучение сотрудников.", 'CRM | ERP'],
                    ['Веб-сайты', "Корпоративные сайты, landing page и интернет-магазины. Современный дизайн и высокая скорость.", 'Web | Design'],
                    ['IP-телефония', "Создание виртуальной АТС на основе onlinePBX. Установите IP-телефонию и получите 20 дней бесплатного автообзвона!", 'PBX | VoIP'],
                    ['Автоматизация бизнеса', 'Цифровизация бизнес-процессов, создание workflow и автоматизация повторяющихся задач.', 'Automation'],
                    ['Интеграции', "API-интеграции между различными системами, синхронизация данных и настройка подключений.", 'API | Integration']
                ],
                clientsLabel: 'Клиенты',
                clientsTitle: 'Клиенты',
                clientsSubtitle: "Ведущие компании Узбекистана сотрудничают с нами",
                contactLabel: 'Контакты',
                contactTitle: 'Давайте работать вместе',
                contactSubtitle: 'Мы готовы обсудить ваш проект. Свяжитесь с нами, и мы скоро ответим.',
                contactSmalls: ['Телефон', 'Email', 'Telegram', 'Адрес'],
                formTitle: "Отправить заявку",
                formLabels: ['Ваше имя *', 'Телефон *', 'Компания', 'Тип услуги', 'Сообщение'],
                formPlaceholders: ['Имя Фамилия', '+998 __ ___ __ __', 'Название вашей компании', 'Кратко опишите ваш проект...'],
                formOptions: ['Внедрение CRM', 'AI-решения', 'Создание веб-сайта', 'IP-телефония', 'Автоматизация бизнеса', 'Интеграции', 'Другое'],
                formButton: "Отправить заявку",
                submitLoading: 'Отправляется...',
                footerText: '(c) 2026 Technic Lab MCHJ | Резидент IT Park',
                footerLinks: ['О компании', 'Сертификаты', 'Автообзвон', 'Услуги', 'Клиенты'],
                validationError: 'Пожалуйста, введите ваше имя и номер телефона.',
                phoneInvalid: "Номер телефона должен состоять ровно из 9 цифр.",
                successMessage: "Ваша заявка принята, наши менеджеры скоро свяжутся с вами.",
                requestError: "Произошла ошибка. Попробуйте еще раз.",
                gmailOpened: 'Gmail открыт. Не забудьте отправить письмо.',
                mailSubjectPrefix: 'Techniclab.uz | Новая заявка:',
                mailBodyTitle: 'Новая заявка с сайта Techniclab.uz',
                mailName: 'Имя',
                mailPhone: 'Телефон',
                mailCompany: 'Компания',
                mailService: 'Услуга',
                mailMessage: 'Сообщение',
                mailUnspecified: "Не указано",
                mailNoMessage: 'Сообщение не написано',
                mailSentAt: 'Отправлено',
                locale: 'ru-RU'
            },
            en: {
                title: 'TECHNICLAB | IT Solutions',
                nav: ['About', 'Certificates', 'Auto Call', 'Services', 'Clients', 'Contact'],
                heroBadge: 'IT Park resident | Tashkent 2026',
                heroTitleHtml: 'Take your business <span>digital</span>',
                heroText: 'Move your business to the next level with modern CRM, AI solutions, and high-performing websites.',
                heroButtons: ['Services', 'Contact us'],
                stats: ['Clients', 'Certificates', 'Years of experience', 'Result-driven'],
                aboutLabel: 'About',
                aboutTitle: 'Your reliable IT partner',
                aboutSubtitle: "Technic Lab is one of Uzbekistan's leading IT companies. Our team is certified in CRM, AI, web development, and IP telephony.",
                aboutFeatures: [
                    ['AI Solutions', 'Process automation powered by artificial intelligence'],
                    ['CRM Systems', 'Implementation and setup of amoCRM and Bitrix24'],
                    ['Web Development', 'Creation of modern websites and web applications'],
                    ['IP Telephony', 'Building communication systems with onlinePBX']
                ],
                aboutCardTitle: 'Certified expert team',
                aboutCardText: 'The Technic Lab team is backed by international and local certificates. We approach every project individually and deliver results-oriented solutions.',
                aboutMini: ['Business partner', 'amoSTART partner', 'Resident #5806', 'Certified'],
                certLabel: 'Certificates',
                certTitle: 'Official partnerships',
                certHiddenTypes: ['Business partner', 'Official amoSTART partner', 'Technology park resident', 'Partner certificate'],
                certHiddenBodies: [
                    'Technic Lab is confirmed as an official business partner of 1C-Bitrix.',
                    "Technic Lab is an official partner of amoCRM's amoSTART program. ID: 28597310.",
                    '"TECHNIC LAB" LLC is a resident of the software technology park. Certificate No. 5806.',
                    'Technic Lab is a certified partner for implementing and supporting onlinePBX.'
                ],
                certHiddenDates: ['since 30 March 2026', 'since 4 February 2025', '15 April 2026', 'since 27 April 2026'],
                certThumbTitles: ['Bitrix24', 'amoCRM', 'IT Park', 'onlinePBX'],
                certThumbSpans: ['Business partner certificate', 'Official amoSTART partner', 'Resident certificate', 'Partnership certificate'],
                certModalHint: 'Click the image or background to close',
                certModalAlt: ['Bitrix24 certificate', 'amoCRM certificate', 'IT Park certificate', 'onlinePBX certificate'],
                autocallLabel: 'Auto Call',
                autocallTitle: 'Smart Auto Calling System',
                autocallSubtitle: 'Fast, efficient, and automated voice communication solutions for your clients.',
                autocallCards: [
                    ['Mass Notifications', 'Instant voice broadcast of essential notices, promo campaigns, and reminders to thousands of clients at once.', 'Mass Broadcast'],
                    ['20 Days Free Auto Calling', 'Install IP Telephony and get 20 days of free auto calling!', '20 Days Free'],
                    ['CRM & Systems Integration', 'Full synchronization of call history, recordings, and analytics directly into your CRM (Bitrix24, amoCRM).', 'Integration']
                ],
                autocallBannerBadge: 'Special Offer',
                autocallBannerTitle: 'Get 1,000 Free Calls',
                autocallBannerText: 'Try the automated calling system for free and experience the results immediately.',
                autocallBannerBtn: 'TRY FOR FREE',
                servicesLabel: 'Services',
                servicesTitle: 'What can we do?',
                servicesSubtitle: 'Comprehensive IT services tailored to your business needs.',
                services: [
                    ['AI Solutions', 'Chatbots, automation, and data analysis help us optimize your business with artificial intelligence technologies.', 'AI | ML'],
                    ['CRM Implementation', 'Full setup of amoCRM and Bitrix24, integrations, and staff training.', 'CRM | ERP'],
                    ['Websites', 'Corporate websites, landing pages, and online stores with modern design and high speed.', 'Web | Design'],
                    ['IP Telephony', 'Build a virtual PBX system with onlinePBX. Install IP Telephony and get 20 days of free auto calling!', 'PBX | VoIP'],
                    ['Business Automation', 'Digitize business processes, create workflows, and automate repetitive tasks.', 'Automation'],
                    ['Integrations', 'API integrations between various systems, data synchronization, and service connections.', 'API | Integration']
                ],
                clientsLabel: 'Clients',
                clientsTitle: 'Clients',
                clientsSubtitle: 'Leading companies in Uzbekistan work with us',
                contactLabel: 'Contact',
                contactTitle: "Let's work together",
                contactSubtitle: 'We are ready to discuss your project. Reach out and we will reply soon.',
                contactSmalls: ['Phone', 'Email', 'Telegram', 'Address'],
                formTitle: 'Send a request',
                formLabels: ['Your name *', 'Phone *', 'Company', 'Service type', 'Message'],
                formPlaceholders: ['Full name', '+998 __ ___ __ __', 'Your company name', 'Briefly describe your project...'],
                formOptions: ['CRM implementation', 'AI solutions', 'Website development', 'IP telephony', 'Business automation', 'Integrations', 'Other'],
                formButton: 'Send request',
                submitLoading: 'Sending...',
                footerText: '(c) 2026 Technic Lab MCHJ | IT Park resident',
                footerLinks: ['About', 'Certificates', 'Auto Call', 'Services', 'Clients'],
                validationError: 'Please enter your name and phone number.',
                phoneInvalid: 'Phone number must contain exactly 9 digits.',
                successMessage: 'Your request has been received. Our managers will contact you soon.',
                requestError: 'An error occurred. Please try again.',
                gmailOpened: 'Gmail opened. Do not forget to send the email.',
                mailSubjectPrefix: 'Techniclab.uz | New request:',
                mailBodyTitle: 'New request from Techniclab.uz',
                mailName: 'Name',
                mailPhone: 'Phone',
                mailCompany: 'Company',
                mailService: 'Service',
                mailMessage: 'Message',
                mailUnspecified: 'Not specified',
                mailNoMessage: 'No message provided',
                mailSentAt: 'Sent at',
                locale: 'en-US'
            }
        };
        let currentLang = localStorage.getItem('site-language') || 'uz';

        function setInlineIconText(selector, text) {
            const el = document.querySelector(selector);
            if (!el) return;
            const textNode = Array.from(el.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
            if (textNode) textNode.textContent = ` ${text}`;
        }

        function applyLanguage(lang) {
            const t = translations[lang] || translations.uz;
            currentLang = lang;
            localStorage.setItem('site-language', lang);
            document.documentElement.lang = lang;
            document.title = t.title;

            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach((link, index) => { if (t.nav[index]) link.textContent = t.nav[index]; });
            document.querySelectorAll('.lang-btn').forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));

            setInlineIconText('.banner-badge', t.heroBadge);
            document.querySelector('.banner-text-box h1').innerHTML = t.heroTitleHtml;
            document.querySelector('.banner-text-box p').textContent = t.heroText;
            document.querySelectorAll('.banner-btns a')[0].textContent = t.heroButtons[0];
            document.querySelectorAll('.banner-btns a')[1].textContent = t.heroButtons[1];
            document.querySelector('#hero-banner img').alt = t.heroTitleHtml.replace(/<[^>]+>/g, ' ');

            document.querySelectorAll('.stats-bar .stat-item p').forEach((el, index) => { if (t.stats[index]) el.textContent = t.stats[index]; });

            setInlineIconText('#about .section-label', t.aboutLabel);
            document.querySelector('#about .section-title').textContent = t.aboutTitle;
            document.querySelector('#about .section-subtitle').textContent = t.aboutSubtitle;
            document.querySelectorAll('#about .feature-card').forEach((card, index) => {
                const item = t.aboutFeatures[index];
                if (!item) return;
                card.querySelector('h4').textContent = item[0];
                card.querySelector('p').textContent = item[1];
            });
            document.querySelector('.about-card-main h3').textContent = t.aboutCardTitle;
            document.querySelector('.about-card-main p').textContent = t.aboutCardText;
            document.querySelectorAll('.cert-mini').forEach((mini, index) => {
                const strong = mini.querySelector('strong');
                if (strong) {
                    const label = t.aboutMini[index] || '';
                    mini.innerHTML = `${strong.outerHTML}${label}`;
                }
            });

            setInlineIconText('#certificates .section-label', t.certLabel);
            document.querySelector('#certificates .section-title').textContent = t.certTitle;
            document.querySelectorAll('.cert-logo-text').forEach((el, index) => {
                const brands = ['Bitrix24', 'amoCRM', 'IT Park Uzbekistan', 'onlinePBX'];
                if (brands[index]) el.textContent = brands[index];
            });
            document.querySelectorAll('#certificates .cert-type').forEach((el, index) => { if (t.certHiddenTypes[index]) el.textContent = t.certHiddenTypes[index]; });
            document.querySelectorAll('#certificates .cert-body p').forEach((el, index) => { if (t.certHiddenBodies[index]) el.textContent = t.certHiddenBodies[index]; });
            document.querySelectorAll('#certificates .cert-date').forEach((el, index) => { if (t.certHiddenDates[index]) el.textContent = t.certHiddenDates[index]; });
            document.querySelectorAll('.cert-thumb').forEach((thumb, index) => {
                const strong = thumb.querySelector('strong');
                const span = thumb.querySelector('.cert-thumb-info span');
                if (strong && t.certThumbTitles[index]) strong.textContent = t.certThumbTitles[index];
                if (span && t.certThumbSpans[index]) span.textContent = t.certThumbSpans[index];
                if (t.certModalAlt[index]) {
                    thumb.dataset.certTitle = t.certModalAlt[index];
                    const img = thumb.querySelector('img');
                    if (img) img.alt = t.certModalAlt[index];
                }
            });
            document.querySelector('.cert-modal-hint').textContent = t.certModalHint;

            // Autocall translations
            setInlineIconText('#autocall .section-label', t.autocallLabel);
            const autocallTitle = document.querySelector('#autocall .section-title');
            if (autocallTitle) autocallTitle.textContent = t.autocallTitle;
            const autocallSubtitle = document.querySelector('#autocall .section-subtitle');
            if (autocallSubtitle) autocallSubtitle.textContent = t.autocallSubtitle;
            document.querySelectorAll('#autocall .autocall-card').forEach((card, index) => {
                const item = t.autocallCards?.[index];
                if (!item) return;
                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                const tag = card.querySelector('.autocall-tag');
                if (h3) h3.textContent = item[0];
                if (p) p.textContent = item[1];
                if (tag) tag.textContent = item[2];
            });
            setInlineIconText('#autocall .autocall-banner-badge', t.autocallBannerBadge);
            const autocallBannerTitle = document.querySelector('#autocall .autocall-banner-content h3');
            if (autocallBannerTitle) autocallBannerTitle.textContent = t.autocallBannerTitle;
            const autocallBannerText = document.querySelector('#autocall .autocall-banner-content p');
            if (autocallBannerText) autocallBannerText.textContent = t.autocallBannerText;
            const autocallBannerBtn = document.querySelector('#autocall .autocall-banner-btn');
            if (autocallBannerBtn) {
                autocallBannerBtn.textContent = t.autocallBannerBtn;
                autocallBannerBtn.href = 'https://dev.autocall.uz/';
                autocallBannerBtn.target = '_blank';
                autocallBannerBtn.rel = 'noopener noreferrer';
            }

            setInlineIconText('#services .section-label', t.servicesLabel);
            document.querySelector('#services .section-title').textContent = t.servicesTitle;
            document.querySelector('#services .section-subtitle').textContent = t.servicesSubtitle;
            document.querySelectorAll('#services .service-card').forEach((card, index) => {
                const item = t.services[index];
                if (!item) return;
                card.querySelector('h3').textContent = item[0];
                card.querySelector('p').textContent = item[1];
                card.querySelector('.service-tag').textContent = item[2];
            });

            setInlineIconText('#clients .section-label', t.clientsLabel);
            document.querySelector('#clients .section-title').textContent = t.clientsTitle;
            document.querySelector('#clients .clients-intro > p').textContent = t.clientsSubtitle;

            setInlineIconText('#contact .section-label', t.contactLabel);
            document.querySelector('#contact .section-title').textContent = t.contactTitle;
            document.querySelector('#contact .section-subtitle').textContent = t.contactSubtitle;
            document.querySelectorAll('#contact .method-info small').forEach((el, index) => { if (t.contactSmalls[index]) el.textContent = t.contactSmalls[index]; });
            document.querySelector('.contact-form-card h3').textContent = t.formTitle;
            document.querySelectorAll('#contact .form-group label').forEach((el, index) => { if (t.formLabels[index]) el.textContent = t.formLabels[index]; });
            document.getElementById('f-name').placeholder = t.formPlaceholders[0];
            document.getElementById('f-phone').placeholder = t.formPlaceholders[1];
            document.getElementById('f-company').placeholder = t.formPlaceholders[2];
            document.getElementById('f-message').placeholder = t.formPlaceholders[3];
            document.querySelectorAll('#f-service option').forEach((el, index) => { if (t.formOptions[index]) el.textContent = t.formOptions[index]; });
            const formButtonTextNode = Array.from(document.querySelector('#contact .btn-primary').childNodes).find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
            if (formButtonTextNode) formButtonTextNode.textContent = ` ${t.formButton}`;

            document.querySelector('footer p').textContent = t.footerText;
            document.querySelectorAll('.footer-links a').forEach((el, index) => { if (t.footerLinks[index]) el.textContent = t.footerLinks[index]; });
        }

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
        });

        applyLanguage(currentLang);

        // Copy protection
        function isEditableTarget(target) {
            return target instanceof Element && Boolean(target.closest('input, textarea, select'));
        }

        document.addEventListener('contextmenu', (event) => {
            if (!isEditableTarget(event.target)) event.preventDefault();
        });
        document.addEventListener('copy', (event) => {
            if (!isEditableTarget(event.target)) event.preventDefault();
        });
        document.addEventListener('cut', (event) => {
            if (!isEditableTarget(event.target)) event.preventDefault();
        });
        document.addEventListener('selectstart', (event) => {
            if (!isEditableTarget(event.target)) event.preventDefault();
        });
        document.addEventListener('dragstart', (event) => {
            if (!isEditableTarget(event.target)) event.preventDefault();
        });

        // Active nav
        const navSections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            navSections.forEach(s => {
                const top = s.offsetTop - 100;
                const id = s.getAttribute('id');
                const link = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (link) link.style.color = (scrollY >= top && scrollY < top + s.offsetHeight) ? 'var(--accent)' : '';
            });
        });

        // Certificate preview
        const certModal = document.getElementById('cert-modal');
        const certModalImage = document.getElementById('cert-modal-image');
        const certSlider = document.getElementById('cert-slider');
        const certSliderViewport = certSlider?.querySelector('.cert-slider-viewport');
        const certSliderTrack = document.getElementById('cert-slider-track');
        const certSlides = Array.from(document.querySelectorAll('.cert-slider .cert-thumb'));
        let certSlideIndex = 0;
        let certSliderTimer = null;
        let certPointerStartX = 0;
        let certPointerDeltaX = 0;
        let certIsDragging = false;
        let certSuppressClick = false;

        function renderCertSlider() {
            if (!certSliderTrack) return;
            certSlides.forEach((slide, index) => {
                slide.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden-left', 'is-hidden-right');
                if (index === certSlideIndex) {
                    slide.classList.add('is-active');
                    return;
                }
                if (index === (certSlideIndex - 1 + certSlides.length) % certSlides.length) {
                    slide.classList.add('is-prev');
                    return;
                }
                if (index === (certSlideIndex + 1) % certSlides.length) {
                    slide.classList.add('is-next');
                    return;
                }
                if (index < certSlideIndex) {
                    slide.classList.add('is-hidden-left');
                } else {
                    slide.classList.add('is-hidden-right');
                }
            });
        }

        function goToCertSlide(index) {
            if (!certSlides.length) return;
            certSlideIndex = (index + certSlides.length) % certSlides.length;
            renderCertSlider();
        }

        function startCertSlider() {
            if (!certSlides.length) return;
            stopCertSlider();
            certSliderTimer = setInterval(() => {
                goToCertSlide(certSlideIndex + 1);
            }, 3200);
        }

        function stopCertSlider() {
            if (certSliderTimer) {
                clearInterval(certSliderTimer);
                certSliderTimer = null;
            }
        }

        if (certSlides.length) {
            renderCertSlider();
            startCertSlider();
        }

        document.querySelectorAll('.cert-thumb').forEach((button) => {
            button.addEventListener('click', () => {
                if (certSuppressClick) {
                    certSuppressClick = false;
                    return;
                }
                certModalImage.src = button.dataset.certSrc;
                certModalImage.alt = button.dataset.certTitle || 'Sertifikat preview';
                certModal.classList.add('open');
                certModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeCertModal() {
            certModal.classList.remove('open');
            certModal.setAttribute('aria-hidden', 'true');
            certModalImage.src = '';
            document.body.style.overflow = '';
        }

        certModal.addEventListener('click', closeCertModal);
        certSlider?.addEventListener('mouseenter', stopCertSlider);
        certSlider?.addEventListener('mouseleave', startCertSlider);
        certSliderViewport?.addEventListener('pointerdown', (event) => {
            certPointerStartX = event.clientX;
            certPointerDeltaX = 0;
            certIsDragging = true;
            certSuppressClick = false;
            stopCertSlider();
            certSliderViewport.style.cursor = 'grabbing';
        });
        certSliderViewport?.addEventListener('pointermove', (event) => {
            if (!certIsDragging) return;
            certPointerDeltaX = event.clientX - certPointerStartX;
            if (Math.abs(certPointerDeltaX) > 12) {
                certSuppressClick = true;
            }
        });
        certSliderViewport?.addEventListener('pointerup', () => {
            if (!certIsDragging) return;
            certIsDragging = false;
            certSliderViewport.style.cursor = 'grab';
            if (certPointerDeltaX <= -50) {
                goToCertSlide(certSlideIndex + 1);
            } else if (certPointerDeltaX >= 50) {
                goToCertSlide(certSlideIndex - 1);
            }
            setTimeout(() => { certSuppressClick = false; }, 0);
            startCertSlider();
        });
        certSliderViewport?.addEventListener('pointerleave', () => {
            if (!certIsDragging) return;
            certIsDragging = false;
            certSliderViewport.style.cursor = 'grab';
            certPointerDeltaX = 0;
            setTimeout(() => { certSuppressClick = false; }, 0);
            startCertSlider();
        });
        certSliderViewport?.addEventListener('pointercancel', () => {
            certIsDragging = false;
            certSliderViewport.style.cursor = 'grab';
            certPointerDeltaX = 0;
            setTimeout(() => { certSuppressClick = false; }, 0);
            startCertSlider();
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && certModal.classList.contains('open')) {
                closeCertModal();
            }
        });

        function sendViaGmail() {
            const t = translations[currentLang] || translations.uz;
            const name = document.getElementById('f-name').value.trim();
            const phone = document.getElementById('f-phone').value.trim();
            const company = document.getElementById('f-company').value.trim();
            const service = document.getElementById('f-service').value;
            const message = document.getElementById('f-message').value.trim();
            const status = document.getElementById('send-status');

            if (!name || !phone) {
                status.className = 'error';
                status.style.display = 'block';
                status.textContent = t.validationError;
                return;
            }

            const to = 'admin@aloqapro.uz';
            const subject = encodeURIComponent(`${t.mailSubjectPrefix} ${service}`);
            const body = encodeURIComponent(
                `${t.mailBodyTitle}
${'-'.repeat(40)}

${t.mailName}: ${name}
${t.mailPhone}: ${phone}
${t.mailCompany}: ${company || t.mailUnspecified}
${t.mailService}: ${service}

${t.mailMessage}:
${message || t.mailNoMessage}

${'-'.repeat(40)}
${t.mailSentAt}: ${new Date().toLocaleString(t.locale)}`
            );

            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`, '_blank');

            status.className = 'success';
            status.style.display = 'block';
            status.textContent = t.gmailOpened;
            setTimeout(() => { status.style.display = 'none'; }, 6000);
        }

        const API_URL = '/api/leads';
        const PHONE_PREFIX = '+998';

        function normalizeFieldValue(value) {
            return typeof value === 'string' ? value.trim() : '';
        }

        function getPhoneDigits(value) {
            const digitsOnly = String(value || '').replace(/\D/g, '');
            return digitsOnly.replace(/^998/, '').slice(0, 9);
        }

        function formatPhoneValue(digits) {
            return `${PHONE_PREFIX}${digits}`;
        }

        function syncPhoneInputValue(input) {
            if (!input) return;
            input.value = formatPhoneValue(getPhoneDigits(input.value));
        }

        function moveCaretToEnd(input) {
            if (!input || typeof input.setSelectionRange !== 'function') return;
            requestAnimationFrame(() => {
                const end = input.value.length;
                input.setSelectionRange(end, end);
            });
        }

        function initPhoneInputs() {
            document.querySelectorAll('input[type="tel"], input[name="phone"], input[name="telefon"], #f-phone').forEach((input) => {
                if (input.dataset.phoneBound === 'true') return;

                input.dataset.phoneBound = 'true';
                syncPhoneInputValue(input);

                input.addEventListener('focus', () => {
                    syncPhoneInputValue(input);
                    moveCaretToEnd(input);
                });

                input.addEventListener('click', () => {
                    syncPhoneInputValue(input);
                    moveCaretToEnd(input);
                });

                input.addEventListener('input', () => {
                    syncPhoneInputValue(input);
                    moveCaretToEnd(input);
                });
            });
        }

        function queryFirstField(form, selectors) {
            for (const selector of selectors) {
                const field = form.querySelector(selector);
                if (field) return field;
            }
            return null;
        }

        function getMappedField(form, fieldType) {
            const selectorMap = {
                name: [
                    '[name="name"]',
                    '[name="ism"]',
                    '#f-name',
                    'input[id*="name" i]',
                    'input[id*="ism" i]',
                    'input[name*="name" i]',
                    'input[name*="ism" i]'
                ],
                phone: [
                    '[name="phone"]',
                    '[name="telefon"]',
                    '#f-phone',
                    'input[type="tel"]',
                    'input[id*="phone" i]',
                    'input[id*="telefon" i]',
                    'input[name*="phone" i]',
                    'input[name*="telefon" i]'
                ],
                message: [
                    '[name="message"]',
                    '[name="xabar"]',
                    '#f-message',
                    'textarea[id*="message" i]',
                    'textarea[id*="xabar" i]',
                    'textarea[name*="message" i]',
                    'textarea[name*="xabar" i]',
                    'textarea'
                ]
            };

            return queryFirstField(form, selectorMap[fieldType] || []);
        }

        function getStatusElement(form) {
            let status = form.querySelector('#send-status, .send-status, [data-send-status]');
            if (!status) {
                status = document.createElement('div');
                status.id = 'send-status';
                form.appendChild(status);
            }
            return status;
        }

        function showFormStatus(form, type, message) {
            const status = getStatusElement(form);
            status.className = type;
            status.style.display = 'block';
            status.textContent = message;
        }

        async function submitToEdgeFunction(event) {
            event.preventDefault();

            const form = event.currentTarget;
            const t = translations[currentLang] || translations.uz;
            const nameField = getMappedField(form, 'name');
            const phoneField = getMappedField(form, 'phone');
            const messageField = getMappedField(form, 'message');
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');

            const name = normalizeFieldValue(nameField ? nameField.value : '');
            const phoneDigits = getPhoneDigits(phoneField ? phoneField.value : '');
            const phone = formatPhoneValue(phoneDigits);
            const message = normalizeFieldValue(messageField ? messageField.value : '');

            if (!name || !phoneDigits) {
                showFormStatus(form, 'error', t.validationError);
                return;
            }

            if (phoneDigits.length !== 9) {
                showFormStatus(form, 'error', t.phoneInvalid);
                return;
            }

            if (submitButton) {
                if (!submitButton.dataset.originalHtml) {
                    submitButton.dataset.originalHtml = submitButton.innerHTML;
                }
                submitButton.disabled = true;
                submitButton.innerHTML = t.submitLoading;
            }

            const companyField = form.querySelector('#f-company, [name="company"]');
            const serviceField = form.querySelector('#f-service, [name="service"]');
            const company = normalizeFieldValue(companyField ? companyField.value : '');
            const service = normalizeFieldValue(serviceField ? serviceField.value : '');

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        company,
                        service,
                        message,
                        page_url: window.location.href
                    })
                });

                const result = await response.json().catch(() => null);

                if (!response.ok || !result || result.ok !== true) {
                    throw new Error(`Unexpected response: ${response.status}`);
                }

                form.reset();
                form.querySelectorAll('input[type="tel"], input[name="phone"], input[name="telefon"], #f-phone').forEach((input) => {
                    syncPhoneInputValue(input);
                });
                showFormStatus(form, 'success', t.successMessage);
                setTimeout(() => {
                    const status = getStatusElement(form);
                    if (status) status.style.display = 'none';
                }, 6000);
            } catch (error) {
                console.error('Contact form submission failed:', error);
                showFormStatus(form, 'error', t.requestError);
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = submitButton.dataset.originalHtml || submitButton.innerHTML;
                }
            }
        }

        function initEdgeContactForms() {
            initPhoneInputs();
            document.querySelectorAll('form').forEach((form) => {
                const nameField = getMappedField(form, 'name');
                const phoneField = getMappedField(form, 'phone');

                if (!form.dataset.edgeFunctionBound && nameField && phoneField) {
                    form.dataset.edgeFunctionBound = 'true';
                    form.addEventListener('submit', submitToEdgeFunction);
                }
            });
        }

        initEdgeContactForms();