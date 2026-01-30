// ============================================
// ADVANCED ANIMATIONS MODULE
// Using Anime.js, GSAP, and vanilla JS
// ============================================

const AnimationController = {
    
    // Boot Sequence Animation
    bootSequence: {
        init() {
            const bootEl = document.getElementById('bootSequence');
            const progressBar = bootEl.querySelector('.progress-bar::after');
            const progressText = bootEl.querySelector('.progress-percent');
            const terminalLines = bootEl.querySelectorAll('.terminal-line');
            const skipBtn = document.getElementById('skipBoot');
            
            let currentProgress = 0;
            
            // Animate terminal lines
            terminalLines.forEach((line, index) => {
                const delay = parseInt(line.getAttribute('data-delay')) || 0;
                setTimeout(() => {
                    line.classList.add('visible');
                }, delay);
            });
            
            // Animate progress bar
            const progressInterval = setInterval(() => {
                currentProgress += Math.random() * 15;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        this.complete();
                    }, 500);
                }
                
                if (progressText) {
                    anime({
                        targets: progressText,
                        innerHTML: [parseInt(progressText.textContent), Math.floor(currentProgress)],
                        duration: 300,
                        easing: 'linear',
                        round: 1
                    });
                }
                
                // Animate progress bar width
                const bar = document.querySelector('.progress-bar::after');
                if (bar) {
                    anime({
                        targets: '.progress-bar::after',
                        width: currentProgress + '%',
                        duration: 300,
                        easing: 'linear'
                    });
                }
                
            }, 200);
            
            // Skip button
            if (skipBtn) {
                skipBtn.addEventListener('click', () => {
                    clearInterval(progressInterval);
                    this.complete();
                });
            }
        },
        
        complete() {
            const bootEl = document.getElementById('bootSequence');
            const accessEl = document.getElementById('accessControl');
            
            anime({
                targets: bootEl,
                opacity: [1, 0],
                duration: 500,
                easing: 'easeOutQuad',
                complete: () => {
                    bootEl.classList.remove('active');
                    accessEl.classList.add('active');
                    AnimationController.accessControl.init();
                }
            });
        }
    },
    
    // Access Control Animation
    accessControl: {
        init() {
            const glitchEl = document.querySelector('.glitch');
            const fingerprintEl = document.querySelector('.fingerprint-svg');
            const identityBtns = document.querySelectorAll('.identity-btn');
            
            // Glitch effect animation
            if (glitchEl) {
                setInterval(() => {
                    glitchEl.style.animation = 'none';
                    setTimeout(() => {
                        glitchEl.style.animation = '';
                    }, 10);
                }, 3000);
            }
            
            // Animate fingerprint lines
            if (fingerprintEl) {
                const paths = fingerprintEl.querySelectorAll('.print-line');
                anime({
                    targets: paths,
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeInOutSine',
                    duration: 2000,
                    delay: anime.stagger(200),
                    loop: true,
                    direction: 'alternate'
                });
            }
            
            // Identity button click handlers
            identityBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const role = btn.getAttribute('data-role');
                    this.authenticate(role);
                });
            });
            
            // Particles.js for access screen
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-access', {
                    particles: {
                        number: { value: 80 },
                        color: { value: '#00f0ff' },
                        shape: { type: 'circle' },
                        opacity: {
                            value: 0.5,
                            random: true
                        },
                        size: {
                            value: 3,
                            random: true
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#00f0ff',
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2
                        }
                    }
                });
            }
        },
        
        authenticate(role) {
            const accessEl = document.getElementById('accessControl');
            const mainEl = document.getElementById('mainInterface');
            
            // Scan animation
            anime({
                targets: '.scan-effect',
                opacity: [0, 1, 0],
                scale: [0.8, 1.2],
                duration: 1000,
                easing: 'easeInOutQuad',
                complete: () => {
                    // Fade out access control
                    anime({
                        targets: accessEl,
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeOutQuad',
                        complete: () => {
                            accessEl.classList.remove('active');
                            mainEl.classList.add('active');
                            AnimationController.mainInterface.init();
                            document.body.classList.remove('loading');
                        }
                    });
                }
            });
        }
    },
    
    // Main Interface Animations
    mainInterface: {
        init() {
            this.init3DBackground();
            this.initHUD();
            this.initNavigation();
            this.initCards();
            this.initStats();
            this.initScrollAnimations();
            this.startSystemTime();
        },
        
        init3DBackground() {
            const canvas = document.getElementById('bg-canvas');
            if (!canvas || typeof THREE === 'undefined') return;
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            
            // Create geometric grid
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00f0ff,
                wireframe: true,
                transparent: true,
                opacity: 0.2
            });
            
            const cubes = [];
            for (let i = 0; i < 50; i++) {
                const cube = new THREE.Mesh(geometry, material);
                cube.position.x = (Math.random() - 0.5) * 20;
                cube.position.y = (Math.random() - 0.5) * 20;
                cube.position.z = (Math.random() - 0.5) * 20;
                scene.add(cube);
                cubes.push(cube);
            }
            
            camera.position.z = 10;
            
            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                
                cubes.forEach(cube => {
                    cube.rotation.x += 0.001;
                    cube.rotation.y += 0.001;
                });
                
                renderer.render(scene, camera);
            };
            
            animate();
            
            // Handle resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        },
        
        initHUD() {
            const corners = document.querySelectorAll('.hud-corner');
            
            anime({
                targets: corners,
                opacity: [0, 1],
                scale: [0, 1],
                duration: 1000,
                delay: anime.stagger(100),
                easing: 'easeOutElastic(1, .8)'
            });
        },
        
        initNavigation() {
            const navTabs = document.querySelectorAll('.nav-tab');
            const sections = document.querySelectorAll('.content-section');
            
            navTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetSection = tab.getAttribute('data-section');
                    
                    // Update active tab
                    navTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Update active section
                    sections.forEach(s => {
                        if (s.id === `section-${targetSection}`) {
                            s.classList.add('active');
                            this.animateSection(s);
                        } else {
                            s.classList.remove('active');
                        }
                    });
                });
            });
        },
        
        animateSection(section) {
            const cards = section.querySelectorAll('.card, .project-card, .timeline-item');
            
            anime({
                targets: cards,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                delay: anime.stagger(100),
                easing: 'easeOutQuad'
            });
        },
        
        initCards() {
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    anime({
                        targets: card,
                        scale: 1.02,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    anime({
                        targets: card,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                });
            });
        },
        
        initStats() {
            const statValues = document.querySelectorAll('.stat-value');
            
            statValues.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                
                anime({
                    targets: stat,
                    innerHTML: [0, target],
                    duration: 2000,
                    delay: 500,
                    easing: 'easeOutExpo',
                    round: 1
                });
            });
            
            // Animate progress fills
            const progressFills = document.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                anime({
                    targets: fill,
                    width: ['0%', fill.style.getPropertyValue('--progress')],
                    duration: 2000,
                    delay: 500,
                    easing: 'easeOutExpo'
                });
            });
        },
        
        initScrollAnimations() {
            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
            
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate section headers
            gsap.utils.toArray('.section-header').forEach(header => {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1
                });
            });
        },
        
        startSystemTime() {
            const timeEl = document.getElementById('systemTime');
            if (!timeEl) return;
            
            const updateTime = () => {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                timeEl.textContent = `${hours}:${minutes}:${seconds}`;
            };
            
            updateTime();
            setInterval(updateTime, 1000);
        }
    },
    
    // Typing effect for text
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    },
    
    // Glitch effect
    glitchEffect(element) {
        const text = element.getAttribute('data-text');
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        
        let iteration = 0;
        const interval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= text.length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Start boot sequence
    setTimeout(() => {
        document.getElementById('bootSequence').classList.add('active');
        AnimationController.bootSequence.init();
    }, 100);
    
    // Mode toggle
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = modeToggle.querySelector('i');
            
            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            
            anime({
                targets: modeToggle,
                rotate: '+=360',
                duration: 500,
                easing: 'easeInOutQuad'
            });
        });
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
