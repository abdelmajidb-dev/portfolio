// ============================================
// PORTFOLIO DATA
// ============================================

const portfolioData = {
    // Personal Info
    personal: {
        name: "BOUKHLIK HAJJI ABDELMAJID",
        title: "FULL-STACK DEVELOPER & CYBERSECURITY EXPERT",
        location: "Toulouse, France",
        education: "BTS SIO SLAM",
        status: "AVAILABLE",
        email: "pro.abdelboukhlik@gmail.com",
        phone: "+33769419470",
        github: "https://github.com/lebaado",
        linkedin: "https://www.linkedin.com/in/abdelmajid-boukhlik-hajji/"
    },
    
    // Skills categorized
    skills: {
        languages: [
            { name: "HTML/CSS", level: 95, icon: "fab fa-html5", category: "frontend" },
            { name: "JavaScript", level: 90, icon: "fab fa-js", category: "frontend" },
            { name: "PHP", level: 85, icon: "fab fa-php", category: "backend" },
            { name: "Python", level: 80, icon: "fab fa-python", category: "backend" },
            { name: "SQL", level: 90, icon: "fas fa-database", category: "database" },
            { name: "Dart", level: 85, icon: "fas fa-mobile", category: "mobile" },
            { name: "C#", level: 80, icon: "fas fa-hashtag", category: "backend" },
            { name: "Java", level: 75, icon: "fab fa-java", category: "backend" }
        ],
        frameworks: [
            { name: "Flutter", level: 90, icon: "fas fa-mobile-alt", category: "mobile", featured: true },
            { name: "React Native", level: 80, icon: "fab fa-react", category: "mobile" },
            { name: "React", level: 75, icon: "fab fa-react", category: "frontend" },
            { name: "Bootstrap", level: 85, icon: "fab fa-bootstrap", category: "frontend" },
            { name: "Node.js", level: 70, icon: "fab fa-node-js", category: "backend" }
        ],
        security: [
            { name: "Authentication", level: 90, icon: "fas fa-user-shield", featured: true },
            { name: "Penetration Testing", level: 85, icon: "fas fa-bug" },
            { name: "Network Scanning", level: 80, icon: "fas fa-network-wired" },
            { name: "SIEM & Log Analysis", level: 75, icon: "fas fa-file-alt" },
            { name: "CTF Challenges", level: 85, icon: "fas fa-flag-checkered" }
        ],
        tools: [
            { name: "Git/GitHub", level: 90, icon: "fab fa-git-alt" },
            { name: "Docker", level: 75, icon: "fab fa-docker" },
            { name: "MySQL", level: 90, icon: "fas fa-database" },
            { name: "Firebase/Supabase", level: 85, icon: "fas fa-fire" },
            { name: "VS Code", level: 95, icon: "fas fa-code" },
            { name: "Agile/Scrum", level: 80, icon: "fas fa-project-diagram" }
        ]
    },
    
    // Projects
    projects: [
        {
            id: 1,
            title: "Application Gestion Vêtements",
            category: "mobile",
            year: "2024-2025",
            description: "Application mobile multiplateforme de gestion de garde-robe avec synchronisation temps réel et authentification sécurisée. Optimisation majeure des performances.",
            image: "assets/project-wardrobe.jpg", // Placeholder
            technologies: ["Flutter", "Dart", "Supabase", "Auth"],
            highlights: [
                { icon: "fas fa-bolt", text: "-30% latence" },
                { icon: "fas fa-sync", text: "Sync temps réel" },
                { icon: "fas fa-shield-alt", text: "Auth sécurisée" }
            ],
            stats: {
                performance: 95,
                security: 90,
                ux: 88
            },
            links: {
                github: "#",
                demo: "#"
            }
        },
        {
            id: 2,
            title: "Site Bar à Thème",
            category: "web",
            year: "2023-2024",
            description: "Site web complet avec système de quiz interactif, gestion de sessions utilisateurs et optimisation SEO. Interface responsive avec design moderne.",
            image: "assets/project-bar.jpg", // Placeholder
            technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL", "Bootstrap"],
            highlights: [
                { icon: "fas fa-search", text: "SEO optimisé" },
                { icon: "fas fa-gamepad", text: "Quiz interactif" },
                { icon: "fas fa-mobile-alt", text: "Responsive" }
            ],
            stats: {
                performance: 90,
                security: 85,
                ux: 92
            },
            links: {
                github: "#",
                demo: "#"
            }
        },
        {
            id: 3,
            title: "Gestion Laboratoire C#",
            category: "desktop",
            year: "2025",
            description: "Application desktop de gestion de laboratoire développée avec méthodologie Agile. Interface utilisateur intuitive avec gestion complète des données et workflow optimisé.",
            image: "assets/project-lab.jpg", // Placeholder
            technologies: ["C#", "MySQL", "Agile", "UML"],
            highlights: [
                { icon: "fas fa-users", text: "UI intuitive" },
                { icon: "fas fa-tasks", text: "Méthode Agile" },
                { icon: "fas fa-chart-line", text: "Workflow optimisé" }
            ],
            stats: {
                performance: 88,
                security: 87,
                ux: 90
            },
            links: {
                github: "#"
            }
        }
    ],
    
    // Experience Timeline
    experience: [
        {
            id: 1,
            role: "Développeur Mobile",
            company: "ITrust",
            period: "Sept 2025 - Présent",
            type: "Alternance",
            location: "Labège",
            description: "Conception et développement d'une application mobile full-stack.",
            tasks: [
                "Développement application mobile",
                "liaison a base de données en ligne",
                "Intégration API next.js",
                "Sécurisation avec authentification Clerk "
            ],
            technologies: ["TypeScript", "PostgreSQL", "Next.js", "Clerk"],
            achievements: [
                { metric: "90%", label: "Couverture tests" },
                { metric: "4.7/5", label: "User rating" }
            ]
        },
        {
            id: 2,
            role: "Développeur Multiplateforme",
            company: "BARRE Melina",
            period: "Jan - Fév 2025",
            type: "Stage",
            location: "Toulouse",
            description: "Développement d'une application mobile Flutter avec optimisations majeures de performance et sécurité.",
            tasks: [
                "Développement application mobile Flutter/Dart",
                "Synchronisation temps réel avec Supabase (-30% latence)",
                "Implémentation authentification sécurisée",
                "Tests et optimisation des performances"
            ],
            technologies: ["Flutter", "Dart", "Supabase", "Git"],
            achievements: [
                { metric: "-30%", label: "Réduction latence" },
                { metric: "100%", label: "Tests passés" }
            ]
        },
        {
            id: 3,
            role: "Développeur Android",
            company: "BARRE Melina",
            period: "Mai - Juin 2024",
            type: "Stage",
            location: "Toulouse",
            description: "Conception et développement d'une application Android native avec architecture moderne.",
            tasks: [
                "Développement application Android native",
                "Architecture MVVM et gestion de base de données",
                "Intégration API REST et gestion asynchrone",
                "Tests unitaires et documentation technique"
            ],
            technologies: ["Android", "Java", "REST API", "SQLite"],
            achievements: [
                { metric: "85%", label: "Couverture tests" },
                { metric: "4.2/5", label: "User rating" }
            ]
        }
    ],
    
    // Education & Certifications
    education: [
        {
            degree: "Bachelor Spécialiste en Cybersécurité",
            school: "Academie Cyber Occitanie",
            period: "2025 - 2026",
            location: "Labège",
            description: "Services Informatiques aux Organisations - Solutions Logicielles et Applications Métiers",
            modules: [
                "Pentest : conduite des tests d’intrusions",
                "Architecture Sécurité Réseaux",
                "Sécurité des données et des identités",
                "Security Operations Center"
            ]
        },
        {
            degree: "BTS SIO option SLAM",
            school: "Lycée Henri Matisse",
            period: "2023 - 2025",
            location: "Toulouse",
            description: "Services Informatiques aux Organisations - Solutions Logicielles et Applications Métiers",
            modules: [
                "Développement d'applications web et mobile",
                "Conception et gestion de bases de données",
                "Gestion de projet Agile",
                "Cybersécurité et tests"
            ]
        }
    ],
    
    certifications: [
        {
            name: "Linux Unhatched",
            issuer: "Cisco Networking Academy",
            date: "2024",
            icon: "fab fa-linux",
            verified: true
        },
        {
            name: "Cloud Computing",
            issuer: "EC-Council",
            date: "2024",
            icon: "fas fa-cloud",
            verified: true
        }
    ],
    
    // Languages
    languages: [
        { name: "Français", level: "C1", proficiency: 95 },
        { name: "Anglais", level: "B1", proficiency: 70 },
        { name: "Espagnol", level: "C2", proficiency: 98 },
        { name: "Arabe", level: "C2", proficiency: 100 }
    ],
    
    // Stats
    stats: {
        projectsCompleted: 8,
        technologiesMastered: 8,
        certifications: 2,
        performanceBoost: 30,
        githubRepos: 15,
        codeLines: 50000,
        coffeeCups: 999,
        bugsFix: 427
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
