// ========================================
// DOM Elements
// ========================================

const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const typingText = document.getElementById('typingText');
const contactForm = document.getElementById('contactForm');

// ========================================
// Theme Management
// ========================================

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

updateThemeIcon(currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ========================================
// Navbar Scroll Effect
// ========================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for shadow
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Mobile Menu
// ========================================

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ========================================
// Typing Effect
// ========================================

const roles = [
    'Développeur Full-Stack',
    'Expert Cybersécurité',
    'Développeur Mobile',
    'Passionné de Code'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect
if (typingText) {
    setTimeout(type, 1000);
}

// ========================================
// Stats Counter Animation
// ========================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe stat numbers for animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ========================================
// Skills Filter
// ========================================

const categoryBtns = document.querySelectorAll('.category-btn');
const skillCards = document.querySelectorAll('.skill-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        // Filter skills
        skillCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                // Trigger animation
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease-out';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ========================================
// Projects Filter
// ========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                // Trigger animation
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease-out';
                }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ========================================
// Scroll Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeElements = document.querySelectorAll(
    '.section-header, .about-text, .about-stats, .skill-card, ' +
    '.project-card, .timeline-item, .education-card, .certifications, ' +
    '.contact-info, .contact-form'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => scrollObserver.observe(el));

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Nav Link on Scroll
// ========================================

const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ========================================
// Contact Form Handling
// ========================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        
        // Reset form
        contactForm.reset();
        
        // In production, you would integrate with a backend service like:
        // - EmailJS
        // - Formspree
        // - Your own backend API
        
        /*
        Example with EmailJS:
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data)
            .then(() => {
                alert('Message envoyé avec succès !');
                contactForm.reset();
            })
            .catch((error) => {
                alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                console.error('Error:', error);
            });
        */
    });
}

// ========================================
// Skill Level Bars Animation
// ========================================

const skillLevelBars = document.querySelectorAll('.level-bar');

const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.style.getPropertyValue('--level');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = level;
            }, 100);
            
            skillBarObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillLevelBars.forEach(bar => skillBarObserver.observe(bar));

// ========================================
// Project Card 3D Effect
// ========================================

const projects = document.querySelectorAll('.project-card');

projects.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// Performance Optimization
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced version for heavy scroll operations
window.addEventListener('scroll', debounce(() => {
    // Heavy scroll operations here if needed
}, 10));

// ========================================
// Accessibility Enhancements
// ========================================

// Keyboard navigation for filter buttons
document.querySelectorAll('.filter-btn, .category-btn').forEach(btn => {
    btn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Focus trap for mobile menu
const focusableElements = navLinks.querySelectorAll(
    'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);

if (focusableElements.length > 0) {
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navLinks.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        
        if (e.key === 'Escape') {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuToggle.focus();
        }
    });
}

// ========================================
// Page Load Animation
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// ========================================
// Console Easter Egg
// ========================================

console.log('%c🚀 Développé par AbdelMajid Boukhlik', 'color: #00f0ff; font-size: 16px; font-weight: bold;');
console.log('%cPortfolio Full-Stack & Cybersécurité', 'color: #00ff88; font-size: 12px;');
console.log('%cSi vous voyez ceci, contactez-moi ! 😉', 'color: #fff; font-size: 12px;');
console.log('%cpro.abdelboukhlik@gmail.com', 'color: #00f0ff; font-size: 12px;');
