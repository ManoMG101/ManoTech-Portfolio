// Navigation active state handling
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    initThemeToggle();
    
    // Language selector functionality
    initLanguageSelector();
    
    // Initialize stats counter if on the homepage
    if (window.location.pathname.split('/').pop() === 'index.html' || window.location.pathname.endsWith('/')) {
        initStatsCounter();
    }
    
    // Initialize about page animations if on the about page
    if (window.location.pathname.split('/').pop() === 'about.html') {
        initAboutPageAnimations();
    }
    
    // Get current page path
    const currentPage = window.location.pathname.split('/').pop();
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (linkPage === 'index.html' && (currentPage === '' || currentPage === '/'))) {
            link.classList.add('active');
        }
    });

    // Simple form validation for contact page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                isValid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                isValid = false;
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }
            
            if (!message.value.trim()) {
                isValid = false;
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }
            
            if (isValid) {
                // In a real site, this would submit the form to a backend
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill out all fields correctly.');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Simple animation for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If user has a saved preference, use that; otherwise, use system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
        document.body.classList.add('dark-mode');
        updateThemeToggle(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeToggle(false);
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        // Update localStorage with new preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Update toggle appearance
        updateThemeToggle(isDarkMode);
    });
    
    // Function to update toggle appearance
    function updateThemeToggle(isDarkMode) {
        if (isDarkMode) {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
    }
}

// Statistics counter functionality
function initStatsCounter() {
    // Set the target values for each statistic
    const stats = {
        'experience-count': 5,  // 5 years of experience
        'project-count': 25,     // 25 projects completed
        'client-count': 12,      // 12 happy clients
        'award-count': 3         // 3 awards won
    };
    
    // Use Intersection Observer to start the animation when the stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start counting for each stat item
                for (const [id, targetValue] of Object.entries(stats)) {
                    animateCounter(id, targetValue);
                }
                // Disconnect the observer after triggering the animation
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Function to animate a counter from 0 to target value
    function animateCounter(id, targetValue) {
        const element = document.getElementById(id);
        if (!element) return;
        
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 50; // update every 50ms
        const totalSteps = duration / stepTime;
        const increment = targetValue / totalSteps;
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            // When we've reached the target value, clear the interval and set the final value
            if (currentValue >= targetValue) {
                clearInterval(counter);
                element.textContent = targetValue;
            } else {
                // Otherwise, round and update the display
                element.textContent = Math.floor(currentValue);
            }
        }, stepTime);
    }
}

// Language selector functionality
function initLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('language') || 'en';
    
    // Set initial language
    setLanguage(savedLang);
    
    // Set active button
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            
            // Save preference
            localStorage.setItem('language', lang);
        });
    });
}

// Set the language
function setLanguage(lang) {
    // Set HTML dir attribute for RTL languages
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholder texts
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });
}

// Translations
const translations = {
    en: {
        // Navigation
        'nav_home': 'Home',
        'nav_about': 'About',
        'nav_projects': 'Projects',
        'nav_contact': 'Contact',
        
        // Theme toggle
        'dark_mode': 'Dark Mode',
        'light_mode': 'Light Mode',
        
        // Home page
        'welcome_title': 'Welcome to My Personal Website',
        'welcome_text': 'Hello! I\'m a [Your Profession/Title]. This is my personal website where I showcase my work and share information about myself.',
        'get_in_touch': 'Get in Touch',
        
        // Stats
        'key_stats': 'Key Statistics',
        'years_experience': 'Years of Experience',
        'projects_completed': 'Projects Completed',
        'happy_clients': 'Happy Clients',
        'awards_won': 'Awards Won',
        
        // Featured projects
        'featured_projects': 'Featured Projects',
        'learn_more': 'Learn More',
        
        // About page
        'about_me': 'About Me',
        'about_intro': 'Hello! I\'m Mohamed Osama, an Egyptian Programmer based in Cairo.',
        'my_story': 'My Story',
        'my_skills': 'My Skills',
        'experience': 'Experience',
        'education': 'Education',
        
        // Contact page
        'get_in_touch_title': 'Get in Touch',
        'contact_text': 'Feel free to contact me for work opportunities, collaborations, or just to say hello!',
        'send_message': 'Send Me a Message',
        'form_name': 'Name',
        'form_email': 'Email',
        'form_subject': 'Subject',
        'form_message': 'Message',
        'send_button': 'Send Message',
        'contact_info': 'Contact Information',
        'email': 'Email',
        'phone': 'Phone',
        'location': 'Location',
        'connect_with_me': 'Connect With Me',
        'social_text': 'Find me on these platforms:'
    },

    de: {
        // Navigation
        'nav_home': 'Startseite',
        'nav_about': 'Über mich',
        'nav_projects': 'Projekte',
        'nav_contact': 'Kontakt',
        
        // Theme toggle
        'dark_mode': 'Dunkelmodus',
        'light_mode': 'Hellmodus',
        
        // Home page
        'welcome_title': 'Willkommen auf meiner persönlichen Website',
        'welcome_text': 'Hallo! Ich bin [Dein Beruf/Titel]. Dies ist meine persönliche Website, auf der ich meine Arbeit präsentiere und Informationen über mich teile.',
        'get_in_touch': 'Kontakt aufnehmen',
        
        // Stats
        'key_stats': 'Wichtige Statistiken',
        'years_experience': 'Jahre Erfahrung',
        'projects_completed': 'Abgeschlossene Projekte',
        'happy_clients': 'Zufriedene Kunden',
        'awards_won': 'Gewonnene Auszeichnungen',
        
        // Featured projects
        'featured_projects': 'Ausgewählte Projekte',
        'learn_more': 'Mehr erfahren',
        
        // About page
        'about_me': 'Über mich',
        'about_intro': 'Hallo! Ich bin Mohamed Osama, ein ägyptischer Programmierer aus Kairo.',
        'my_story': 'Meine Geschichte',
        'my_skills': 'Meine Fähigkeiten',
        'experience': 'Erfahrung',
        'education': 'Ausbildung',
        
        // Contact page
        'get_in_touch_title': 'Kontakt aufnehmen',
        'contact_text': 'Kontaktieren Sie mich gerne für Arbeitsmöglichkeiten, Kollaborationen oder einfach, um Hallo zu sagen!',
        'send_message': 'Senden Sie mir eine Nachricht',
        'form_name': 'Name',
        'form_email': 'E-Mail',
        'form_subject': 'Betreff',
        'form_message': 'Nachricht',
        'send_button': 'Nachricht senden',
        'contact_info': 'Kontaktinformationen',
        'email': 'E-Mail',
        'phone': 'Telefon',
        'location': 'Standort',
        'connect_with_me': 'Verbinden Sie sich mit mir',
        'social_text': 'Finden Sie mich auf diesen Plattformen:'
    },
    ar: {
        // Navigation
        'nav_home': 'الرئيسية',
        'nav_about': 'نبذة عني',
        'nav_projects': 'المشاريع',
        'nav_contact': 'اتصل بي',
        
        // Theme toggle
        'dark_mode': 'الوضع الداكن',
        'light_mode': 'الوضع الفاتح',
        
        // Home page
        'welcome_title': 'مرحبًا بك في موقعي الشخصي',
        'welcome_text': 'مرحبًا! أنا [مهنتك/لقبك]. هذا هو موقعي الشخصي حيث أعرض عملي وأشارك معلومات عن نفسي.',
        'get_in_touch': 'تواصل معي',
        
        // Stats
        'key_stats': 'إحصائيات رئيسية',
        'years_experience': 'سنوات الخبرة',
        'projects_completed': 'المشاريع المنجزة',
        'happy_clients': 'العملاء السعداء',
        'awards_won': 'الجوائز المكتسبة',
        
        // Featured projects
        'featured_projects': 'مشاريع مميزة',
        'learn_more': 'معرفة المزيد',
        
        // About page
        'about_me': 'نبذة عني',
        'about_intro': 'مرحبًا! أنا محمد أسامة، مبرمج مصري مقيم في القاهرة.',
        'my_story': 'قصتي',
        'my_skills': 'مهاراتي',
        'experience': 'الخبرة',
        'education': 'التعليم',
        
        // Contact page
        'get_in_touch_title': 'تواصل معي',
        'contact_text': 'لا تتردد في التواصل معي لفرص العمل أو التعاون أو حتى لمجرد إلقاء التحية!',
        'send_message': 'أرسل لي رسالة',
        'form_name': 'الاسم',
        'form_email': 'البريد الإلكتروني',
        'form_subject': 'الموضوع',
        'form_message': 'الرسالة',
        'send_button': 'إرسال الرسالة',
        'contact_info': 'معلومات الاتصال',
        'email': 'البريد الإلكتروني',
        'phone': 'الهاتف',
        'location': 'الموقع',
        'connect_with_me': 'تواصل معي',
        'social_text': 'جدني على هذه المنصات:'
    }
};


// About page animations
function initAboutPageAnimations() {
    // Profile image hover effect
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.1)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1)';
        });
    }
    
    // Initialize reveal animations
    initRevealAnimations();
    
    // Initialize skill bar animations
    initSkillBars();
    
    // Function to animate elements when they come into view
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-card, .reveal-text');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: if you want the animation to play again when scrolling back
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // Function to animate skill bars when they come into view
    function initSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target;
                    const level = skillLevel.getAttribute('data-level');
                    
                    // Delay the animation slightly for a nicer effect
                    setTimeout(() => {
                        skillLevel.style.width = `${level}%`;
                    }, 300);
                    
                    // No need to observe it again
                    skillObserver.unobserve(skillLevel);
                }
            });
        }, { threshold: 0.2 });
        
        skillLevels.forEach(skillLevel => {
            skillObserver.observe(skillLevel);
        });
    }
}
