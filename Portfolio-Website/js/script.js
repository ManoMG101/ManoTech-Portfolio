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

    // Contact form validation and submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Name validation
        if (!name.value.trim()) {
            isValid = false;
            name.classList.add('error');
        } else {
            name.classList.remove('error');
        }

        // Email validation
        if (!email.value.trim() || !isValidEmail(email.value)) {
            isValid = false;
            email.classList.add('error');
        } else {
            email.classList.remove('error');
        }

        // Subject validation
        if (!subject.value.trim()) {
            isValid = false;
            subject.classList.add('error');
        } else {
            subject.classList.remove('error');
        }

        // Message validation
        if (!message.value.trim()) {
            isValid = false;
            message.classList.add('error');
        } else {
            message.classList.remove('error');
        }

        if (!isValid) {
            alert('Please fill out all fields correctly.');
            return;
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } catch (error) {
            alert('Unable to send your message. Please try again later.');
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
    const hackerToggle = document.getElementById('hacker-toggle');

    
    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    const hackerMode = localStorage.getItem('hackerMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If user has a saved preference, use that; otherwise, use system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
        document.body.classList.add('dark-mode');
        updateThemeToggle(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeToggle(false);
    }
    if (hackerMode === 'true') {
    document.body.classList.add('hacker-mode');
}
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        // Update localStorage with new preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Update toggle appearance
        updateThemeToggle(isDarkMode);
    });
const bootLines = [
    {
        cmd: "Initializing ManoTech Portfolio . . .",
        status: "START"
    },
    {
        cmd: "Preparing Visual Environment . . .",
        status: "READY"
    },
    {
        cmd: "Loading Projects & Experience . . .",
        status: "LOADED"
    },
    {
        cmd: "Starting Portfolio System . . .",
        status: "ONLINE"
    }
];

let bootRunning = false;

async function startBoot() {
    
    if (bootRunning) return;
    bootRunning = true;

    const screen = document.getElementById("boot-screen");
    const text = document.getElementById("boot-text");

    console.log(screen);
    console.log(text);

    screen.style.display = "flex";
    document.body.classList.add("hacker-mode");
    screen.classList.remove("hide");
    text.textContent = "";

for (const item of bootLines) {

    const line = document.createElement("div");

    text.appendChild(line);

    await typeText(
        line,
        "> " + item.cmd
    );

    await sleep(300);

    line.innerHTML += 
        ` <span class="success">[ ${item.status} ]</span>`;

    await sleep(400);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startHackerGlitch() {

    setInterval(() => {

        if (document.body.classList.contains("hacker-mode")) {

            document.body.classList.add("hacker-glitch");

            setTimeout(() => {
                document.body.classList.remove("hacker-glitch");
            }, 350);

        }

    }, Math.random() * 10000 + 10000);

}
function typeText(element, text){

    return new Promise(resolve => {

        let i = 0;

        let timer = setInterval(()=>{

            element.textContent += text[i];

            i++;

            if(i >= text.length){

                clearInterval(timer);
                resolve();

            }

        },20);

    });

}

const progress = document.createElement("div");
text.appendChild(progress);

await typeText(
    progress,
    "\nUploading security profile..."
);

await sleep(500);


for(let i = 0; i <= 100; i += 5){

    progress.textContent =
    "Loading: [" +
    "█".repeat(i/5) +
    "░".repeat(20-(i/5)) +
    `] ${i}%`;

    await sleep(80);
}


await sleep(500);

text.innerHTML += "\n\nSYSTEM READY\n";
text.innerHTML += "Welcome\n";
text.innerHTML += "Launching Portfolio...";

screen.classList.add("boot-glitch");

await sleep(500);

screen.classList.add("boot-flash");

await sleep(250);

screen.classList.remove("boot-glitch");
screen.classList.remove("boot-flash");


    await new Promise(resolve => setTimeout(resolve, 1000));

    screen.classList.add("hide");

    setTimeout(() => {
        screen.style.display = "none";
        document.body.classList.add("hacker-mode");
        startHackerGlitch();
        localStorage.setItem("hackerMode", true);
        bootRunning = false;
    }, 800);

const accessGranted =
document.getElementById("access-granted");
accessGranted.style.opacity = "1";

accessGranted.style.transform =
    "translate(-0%, 0%) scale(0.6)";
await sleep(2000);

accessGranted.style.opacity = "0";


}

    hackerToggle.addEventListener("click", () => {

        if (document.body.classList.contains("hacker-mode")) {

            document.body.classList.remove("hacker-mode");
            localStorage.setItem("hackerMode", false);

        } else {

            startBoot();

        }

    });
        
    // Function to update toggle appearance
          function updateThemeToggle(isDarkMode) {
      if (isDarkMode) {
        themeIcon.textContent = '☀️';
        themeText.setAttribute('data-i18n', 'light_mode');
    } else {
        themeIcon.textContent = '🌙';
        themeText.setAttribute('data-i18n', 'dark_mode');
    }

    const currentLang = localStorage.getItem('language') || 'en';
    setLanguage(currentLang);
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
        'hero_greeting':'Hello, i\'m',
        'welcome_title': 'Welcome to My Personal Website',
        'welcome_text': 'Hello! I\'m a [Your Profession/Title]. This is my personal website where I showcase my work and share information about myself.',
        'hero_description': 'I build and secure reliable IT infrastructures with modern technologies, focusing on system administration and cybersecurity.',
        'get_in_touch': 'Get in Touch',
        'view_projects':'View Projects',
        'all_projects': 'View All Projects',
        'view_details':'View Details',
        'lets_work_together':'Let\'s Work Together',
        'cta_description':'Have a project in mind? I\'m available for freelance work and collaborations',
        'contact_me':'Contact Me',
        'footer_tagline':'Building digital solutions with passion and precision',
        'project1_index':'Windows Server Environment',
        'project1_description':'Built and configured a Windows Server 2019 environment with Active Directory, DNS, and DHCP to improve security and centralize user management',
        'project2_index':'Mobile Portfolio Application',
        'project2_description':'Created a cross-platform mobile portfolio application using Flutter and Dart to present projects, skills, and contact information in a modern interface.',
        'project3_index':'Responsive Portfolio Website',
        'project3_description':'Developed a responsive portfolio website using HTML, CSS, and JavaScript to showcase my skills, projects, and experience across all devices.',
        
        
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
        'about_intro': 'Hello! I\'m Mohamed Osama, an Egyptian Programmer and Junior System Administrator based in Cairo.',
        'my_story': 'My Story',        
        'beyond_work_text': 'When I\'m not working, you can find me Playing Boxing, Fishing and iam Free Diver too !. I love Martial arts.',
        'story_text': 'My approach to work is based on discipline, focus, and continuous improvement.',
        'beyond_work': 'Beyond Work',
        'the_beginning':'The Beginning',
        'beginning_text':'I am passionate about programming and technology. My areas of specialization include Cyber Security and System Administration.',
        'my_skills': 'My Skills',
        'languages': 'languages',
        'Programming':'Programming',
        'System_administration':'System Administration',
        'tools':'Tools & Others',
        'experience': 'Experience',
        'education': 'Education',
        'microsoft_title':'Technical Support Advisor (German)',
        'microsoft_activity':'Providing technical support for Microsoft commercial customers,troubleshooting Microsoft 365 services, routing technical cases,and assisting with cloud-based solutions.',
        'soldier':'Soldier',
        'soldier_ort':'Egyptian Ministry of Defense',
        'soldier-activity':'Operating surveillance systems, monitoring security cameras, and handling fax communications',
        'uni':'Zagazig University',
        'student-activity':'Studied Financial and Administrative Sciences while learning German',
        'bachelor':'Bachelor of Financial and Administrative',
        'brief_education':'Studied Financial and Administrative Sciences with a focus on business, management, and administrative principles. Simultaneously developed German language proficiency and strengthened communication, analytical, and intercultural skills through continuous learning and self-development.',

        // Projects Page
        'my_projects': 'My Projects',
        'projects_intro':'Here are some of the projects I\'ve worked on. Each represents different skills and technologies I\'ve utilized in my career.',
       'f-project-description':'This project involved designing and implementing a complete Windows Server 2019 environment for a small business network. The main objective was to centralize user management, improve security, and simplify administration.',
        's-project-description':'This project involved developing a cross-platform mobile portfolio application using Flutter and Dart. The primary goal was to create a mobile application that showcases my projects, skills, certifications, and contact information in a modern and interactive format.',
        't-project-description':'This project focused on developing a responsive personal portfolio website to showcase my skills, projects, and professional background. The goal was to create a modern and user-friendly web presence that could be accessed from desktops, tablets, and smartphones.',
        'view_Documentation':'View Documentation',
        'view_live_code':'View Live Code',



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
        'egypt':'Cairo, Egypt',
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
        'hero_greeting':'Hallo, ich bin',
        'welcome_title': 'Willkommen auf meiner persönlichen Website',
        'welcome_text': 'Hallo! Ich bin Mohamed Osama, ein ägyptischer Programmierer und Junior-Systemadministrator mit Wohnsitz in Kairo..',
        'hero_description' : 'Ich plane, verwalte und sichere zuverlässige IT-Infrastrukturen mit modernen Technologien – mit Fokus auf Systemadministration und Cybersicherheit.',
        'get_in_touch': 'Kontakt aufnehmen',
        'view_projects':'Projekte anzeigen',
        'all_projects': 'Alle Projekte anzeigen',
        'view_details':'Details anzeigen',
        'lets_work_together':'Lass uns zusammenarbeiten',
        'cta_description':'Hast du ein Projekt im Kopf? Ich bin für Freelance-Projekte und Zusammenarbeiten verfügbar.',
        'contact_me':'Kontaktiere mich',
        'footer_tagline':'Innovative digitale Lösungen mit Leidenschaft und Präzision',
        'project1_index':'Windows-Server-Umgebung',
        'project1_description':'Aufbau und Konfiguration einer Windows Server 2019-Umgebung mit Active Directory, DNS und DHCP, um die Sicherheit zu verbessern und die Benutzerverwaltung zentral zu organisieren.',
        'project2_index':'Mobile Portfolio-Anwendung',
        'project2_description':'Entwicklung einer plattformübergreifenden mobilen Portfolio-Anwendung mit Flutter und Dart, um Projekte, Fähigkeiten und Kontaktinformationen in einer modernen und benutzerfreundlichen Oberfläche zu präsentieren.',
        'project3_index':'Responsive Portfolio-Website',
        'project3_description':'Entwicklung einer modernen und responsiven Portfolio-Website mit HTML, CSS und JavaScript, die meine technischen Fähigkeiten, Projekte und Erfahrungen in einem benutzerfreundlichen und geräteübergreifenden Design präsentiert.',
        
        // Stats
        'key_stats': 'Wichtige Statistiken',
        'years_experience': 'Jahre Erfahrung',
        'projects_completed': 'Abgeschlossene Projekte',
        'happy_clients': 'Zufriedene Kunden',
        'awards_won': 'Gewonnene Auszeichnungen',
        
        // Featured projects
        'featured_projects': 'Ausgewählte Projekte',
        'learn_more': 'Mehr erfahren',

        // Projects Page
        'projects_intro': 'Hier finden Sie einige Projekte, an denen ich gearbeitet habe. Jedes dieser Projekte zeigt unterschiedliche Fähigkeiten und Technologien, die ich im Laufe meiner beruflichen Entwicklung eingesetzt und weiterentwickelt habe.',
        'my_projects': 'Meine Projekte', 
        'f-project-description':'Dieses Projekt umfasste die Planung und Implementierung einer vollständigen Windows-Server-2019-Umgebung für ein kleines Unternehmensnetzwerk. Ziel war es, die Benutzerverwaltung zu zentralisieren, die Sicherheit zu erhöhen und die Administration zu vereinfachen.',
        's-project-description':'Dieses Projekt konzentrierte sich auf die Entwicklung einer plattformübergreifenden mobilen Portfolio-Anwendung mit Flutter und Dart. Ziel war es, eine moderne und interaktive mobile Anwendung zu entwickeln, die meine Projekte, Fähigkeiten, Zertifizierungen und Kontaktinformationen präsentiert.',
        't-project-description':'Dieses Projekt konzentrierte sich auf die Entwicklung einer responsiven persönlichen Portfolio-Website zur Präsentation meiner Fähigkeiten, Projekte und meines beruflichen Hintergrunds. Ziel war es, eine moderne und benutzerfreundliche Webpräsenz zu schaffen, die auf Desktops, Tablets und Smartphones zugänglich ist.',
        'view_Documentation':'Dokumentation Anzeigen',
        'view_live_code':'Live Code Anzeigen',
        
        // About page
        'about_me': 'Über mich',
        'about_intro': 'Hallo! Ich bin Mohamed Osama, ein ägyptischer Programmierer und Junior-Systemadministrator mit Wohnsitz in Kairo.',
        'beyond_work': 'Beyond Work',
        'beyond_work_text': 'In meiner Freizeit gehe ich gerne boxen, angeln und freitauchen. Außerdem begeistere ich mich für Kampfsport und lege großen Wert auf einen aktiven Lebensstil.',
        'my_story': 'Meine Geschichte',
        'story_text': 'Meine Arbeitsweise basiert auf Disziplin, Fokus und kontinuierlicher Weiterentwicklung.',
        'the_beginning':'Die Anfänge',
        'beginning_text':'Ich begeistere mich für Programmierung und Technologie. Meine Schwerpunkte liegen in den Bereichen Cybersicherheit und Systemadministration',
        'beyond_work': 'Abseits der Arbeit',
        'my_skills': 'Meine Fähigkeiten',
        'Programming':'Programmierung',
        'System_administration':'Systemadministration',
        'tools':'Tools & Weitere Kenntnisse',
        'languages': 'Sprachen',
        'german': 'Deutsch',
        'english': 'Englisch',
        'arabic': 'Arabisch',
        'experience': 'Erfahrung',
        'education': 'Ausbildung',
        'microsoft_title':'Technischer Supportberater (Deutsch) ',
        'microsoft_activity':'Bereitstellung von technischem Support für Microsoft-Geschäftskunden, Fehleranalyse und Problemlösung für Microsoft-365-Dienste, Bearbeitung und Weiterleitung technischer Supportfälle sowie Unterstützung bei cloudbasierten Lösungen und servicebezogenen Anfragen.',
        'soldier':'Soldat',
        'soldier_ort':'Ägyptisches Verteidigungsministerium',
        'soldier-activity':'Bedienung von Überwachungssystemen, Überwachung von Sicherheitskameras und Bearbeitung der Faxkommunikation.',
        'uni':'Universität Zagazig',
        'student-activity':'Studium der Finanz- und Verwaltungswissenschaften bei gleichzeitigem Erlernen der deutschen Sprache.',
        'bachelor':'Bachelor in Finanz- und Verwaltungswissenschaften',
        'brief_education':'Studium der Finanz- und Verwaltungswissenschaften mit Schwerpunkt auf betriebswirtschaftlichen und administrativen Grundlagen. Parallel dazu kontinuierliches Erlernen und Vertiefen der deutschen Sprache sowie Entwicklung interkultureller und kommunikativer Kompetenzen.',
        
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
        'egypt':'Kairo, Ägypten',
        'connect_with_me': 'Verbinden Sie sich mit mir',
        'social_text': 'Finden Sie mich auf diesen Plattformen:'
    },
    // ar: {
    //     // Navigation
    //     'nav_home': 'الرئيسية',
    //     'nav_about': 'نبذة عني',
    //     'nav_projects': 'المشاريع',
    //     'nav_contact': 'اتصل بي',
        
    //     // Theme toggle
    //     'dark_mode': 'الوضع الداكن',
    //     'light_mode': 'الوضع الفاتح',
        
    //     // Home page
    //     'welcome_title': 'مرحبًا بك في موقعي الشخصي',
    //     'welcome_text': 'مرحبًا! أنا [مهنتك/لقبك]. هذا هو موقعي الشخصي حيث أعرض عملي وأشارك معلومات عن نفسي.',
    //     'get_in_touch': 'تواصل معي',
        
    //     // Stats
    //     'key_stats': 'إحصائيات رئيسية',
    //     'years_experience': 'سنوات الخبرة',
    //     'projects_completed': 'المشاريع المنجزة',
    //     'happy_clients': 'العملاء السعداء',
    //     'awards_won': 'الجوائز المكتسبة',
        
    //     // Featured projects
    //     'featured_projects': 'مشاريع مميزة',
    //     'learn_more': 'معرفة المزيد',
        
    //     // About page
    //     'about_me': 'نبذة عني',
    //     'about_intro': 'مرحبًا! أنا محمد أسامة، مبرمج ومسؤول أنظمة مبتدئ  من مصر وأقيم في القاهرة.',
    //     'my_story': 'قصتي',
    //     'the_beginning': 'البدايه',
    //     'my_skills': 'مهاراتي',
    //     'experience': 'الخبرة',
    //     'education': 'التعليم',
        
    //     // Contact page
    //     'get_in_touch_title': 'تواصل معي',
    //     'contact_text': 'لا تتردد في التواصل معي لفرص العمل أو التعاون أو حتى لمجرد إلقاء التحية!',
    //     'send_message': 'أرسل لي رسالة',
    //     'form_name': 'الاسم',
    //     'form_email': 'البريد الإلكتروني',
    //     'form_subject': 'الموضوع',
    //     'form_message': 'الرسالة',
    //     'send_button': 'إرسال الرسالة',
    //     'contact_info': 'معلومات الاتصال',
    //     'email': 'البريد الإلكتروني',
    //     'phone': 'الهاتف',
    //     'location': 'الموقع',
    //     'connect_with_me': 'تواصل معي',
    //     'social_text': 'جدني على هذه المنصات:'
    // }
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

const canvas = document.getElementById("matrix");

if (canvas) {

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]#$%^&*";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {

     if (!document.body.classList.contains("hacker-mode")) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

        setTimeout(() => {
        requestAnimationFrame(drawMatrix);
    }, 30);
    return;
}

        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff41";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {

            const text =
                chars[Math.floor(Math.random() * chars.length)];

            ctx.fillText(
                text,
                i * fontSize,
                drops[i] * fontSize
            );

            if (
                drops[i] * fontSize > canvas.height &&
                Math.random() > 0.975
            ) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        setTimeout(() => {
            requestAnimationFrame(drawMatrix);
        }, 30);
    }

    drawMatrix();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

const roles = [
    "Software Developer",
    "System Administrator",
    "Cyber Security Specialist",
    "IT Support Engineer"
];

let roleIndex = 0;

const roleElement =
    document.getElementById("hero-role");

function typeRole(text) {

    roleElement.textContent = "";

    let i = 0;

    const typing = setInterval(() => {

        roleElement.textContent += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(typing);

            setTimeout(() => {

                roleIndex =
                    (roleIndex + 1) % roles.length;

                typeRole(roles[roleIndex]);

            }, 2000);
        }

    }, 80);
}

typeRole(roles[0]);