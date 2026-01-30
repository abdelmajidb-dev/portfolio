// ============================================
// MAIN APPLICATION LOGIC
// Dynamic content generation and interactions
// ============================================

class PortfolioApp {
    constructor() {
        this.data = portfolioData;
        this.currentSection = 'profile';
        this.init();
    }
    
    init() {
        // Wait for access authentication
        document.addEventListener('interfaceReady', () => {
            this.generateSkillsSection();
            this.generateProjectsSection();
            this.generateExperienceSection();
            this.generateContactSection();
            this.initInteractions();
        });
    }
    
    // Generate Skills Section
    generateSkillsSection() {
        const container = document.querySelector('.skills-container');
        if (!container) return;
        
        const categories = [
            { id: 'all', name: 'All Skills', icon: 'fas fa-th' },
            { id: 'languages', name: 'Languages', icon: 'fas fa-code' },
            { id: 'frameworks', name: 'Frameworks', icon: 'fas fa-layer-group' },
            { id: 'security', name: 'Security', icon: 'fas fa-shield-alt' },
            { id: 'tools', name: 'Tools', icon: 'fas fa-tools' }
        ];
        
        // Create filter buttons
        const filterBar = document.createElement('div');
        filterBar.className = 'skills-filter-bar';
        filterBar.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        `;
        
        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `skill-filter-btn ${index === 0 ? 'active' : ''}`;
            btn.setAttribute('data-category', cat.id);
            btn.innerHTML = `
                <i class="${cat.icon}"></i>
                <span>${cat.name}</span>
            `;
            btn.style.cssText = `
                background: var(--glass-bg);
                border: 2px solid var(--glass-border);
                border-radius: 8px;
                padding: 0.75rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-family: var(--font-display);
                font-weight: 600;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all var(--transition-base);
            `;
            
            btn.addEventListener('click', () => this.filterSkills(cat.id));
            filterBar.appendChild(btn);
        });
        
        container.appendChild(filterBar);
        
        // Create skills grid
        const grid = document.createElement('div');
        grid.className = 'skills-grid';
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
            max-width: 1400px;
            margin: 0 auto;
        `;
        
        // Combine all skills
        const allSkills = [
            ...this.data.skills.languages.map(s => ({...s, type: 'languages'})),
            ...this.data.skills.frameworks.map(s => ({...s, type: 'frameworks'})),
            ...this.data.skills.security.map(s => ({...s, type: 'security'})),
            ...this.data.skills.tools.map(s => ({...s, type: 'tools'}))
        ];
        
        allSkills.forEach(skill => {
            const card = this.createSkillCard(skill);
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
    }
    
    createSkillCard(skill) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.setAttribute('data-category', skill.type);
        
        if (skill.featured) {
            card.classList.add('featured');
        }
        
        card.innerHTML = `
            <div class="skill-card-header">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                ${skill.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            <div class="skill-card-body">
                <h3 class="skill-name">${skill.name}</h3>
                <div class="skill-level-container">
                    <div class="skill-level-bar">
                        <div class="skill-level-fill" style="--skill-level: ${skill.level}%"></div>
                    </div>
                    <span class="skill-level-text">${skill.level}%</span>
                </div>
            </div>
        `;
        
        card.style.cssText = `
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 2px solid var(--glass-border);
            border-radius: 12px;
            padding: 1.5rem;
            transition: all var(--transition-base);
            cursor: pointer;
        `;
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: card,
                    scale: 1.05,
                    borderColor: 'var(--cyan-neon)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: card,
                    scale: 1,
                    borderColor: 'var(--glass-border)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        return card;
    }
    
    filterSkills(category) {
        const buttons = document.querySelectorAll('.skill-filter-btn');
        const cards = document.querySelectorAll('.skill-card');
        
        // Update button states
        buttons.forEach(btn => {
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
                btn.style.borderColor = 'var(--cyan-neon)';
                btn.style.color = 'var(--cyan-neon)';
                btn.style.boxShadow = 'var(--glow-cyan)';
            } else {
                btn.classList.remove('active');
                btn.style.borderColor = 'var(--glass-border)';
                btn.style.color = 'var(--text-secondary)';
                btn.style.boxShadow = 'none';
            }
        });
        
        // Filter cards
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 500,
                        easing: 'easeOutQuad'
                    });
                }
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Generate Projects Section
    generateProjectsSection() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;
        
        container.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        `;
        
        this.data.projects.forEach((project, index) => {
            const card = this.createProjectCard(project);
            container.appendChild(card);
            
            // Stagger animation
            setTimeout(() => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
            }, index * 200);
        });
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-category', project.category);
        
        card.innerHTML = `
            <div class="project-header">
                <div class="project-image" style="background: linear-gradient(135deg, var(--cyan-neon), var(--magenta-neon)); height: 250px; border-radius: 12px 12px 0 0; position: relative; display: flex; align-items: center; justify-content: center; font-size: 4rem; color: white; opacity: 0.3;">
                    <i class="fas ${project.category === 'mobile' ? 'fa-mobile-alt' : project.category === 'web' ? 'fa-globe' : 'fa-desktop'}"></i>
                </div>
                <div class="project-category-badge" style="position: absolute; top: 1rem; right: 1rem; background: var(--bg-primary); padding: 0.5rem 1rem; border-radius: 20px; font-family: var(--font-display); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--cyan-neon); border: 1px solid var(--cyan-neon);">
                    ${project.category}
                </div>
            </div>
            <div class="project-body" style="padding: 2rem;">
                <div class="project-title-row" style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <h3 class="project-title" style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">
                        ${project.title}
                    </h3>
                    <span class="project-year" style="font-family: var(--font-code); font-size: 0.85rem; color: var(--text-tertiary);">
                        ${project.year}
                    </span>
                </div>
                
                <p class="project-description" style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
                    ${project.description}
                </p>
                
                <div class="project-highlights" style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    ${project.highlights.map(h => `
                        <div class="highlight-item" style="display: flex; align-items: center; gap: 0.5rem; color: var(--cyan-neon); font-size: 0.9rem;">
                            <i class="${h.icon}"></i>
                            <span>${h.text}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="project-tech-stack" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                    ${project.technologies.map(tech => `
                        <span class="tech-badge" style="padding: 0.375rem 0.75rem; background: rgba(0, 240, 255, 0.1); border: 1px solid var(--cyan-neon); border-radius: 4px; font-family: var(--font-code); font-size: 0.75rem; color: var(--cyan-neon);">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
                
                <div class="project-stats" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                    <div class="stat-mini" style="text-align: center;">
                        <div class="stat-circle" style="width: 60px; height: 60px; border: 3px solid var(--cyan-neon); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-weight: 700; color: var(--cyan-neon);">
                            ${project.stats.performance}%
                        </div>
                        <span style="font-size: 0.75rem; color: var(--text-tertiary);">Performance</span>
                    </div>
                    <div class="stat-mini" style="text-align: center;">
                        <div class="stat-circle" style="width: 60px; height: 60px; border: 3px solid var(--green-neon); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-weight: 700; color: var(--green-neon);">
                            ${project.stats.security}%
                        </div>
                        <span style="font-size: 0.75rem; color: var(--text-tertiary);">Security</span>
                    </div>
                    <div class="stat-mini" style="text-align: center;">
                        <div class="stat-circle" style="width: 60px; height: 60px; border: 3px solid var(--magenta-neon); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-weight: 700; color: var(--magenta-neon);">
                            ${project.stats.ux}%
                        </div>
                        <span style="font-size: 0.75rem; color: var(--text-tertiary);">UX</span>
                    </div>
                </div>
                
                <div class="project-links" style="display: flex; gap: 1rem;">
                    ${project.links.github ? `
                        <a href="${project.links.github}" class="project-link-btn" style="flex: 1; padding: 0.75rem; background: transparent; border: 2px solid var(--cyan-neon); border-radius: 8px; color: var(--cyan-neon); text-align: center; text-decoration: none; font-family: var(--font-display); font-weight: 600; transition: all var(--transition-base);">
                            <i class="fab fa-github"></i> View Code
                        </a>
                    ` : ''}
                    ${project.links.demo ? `
                        <a href="${project.links.demo}" class="project-link-btn" style="flex: 1; padding: 0.75rem; background: var(--cyan-neon); border: 2px solid var(--cyan-neon); border-radius: 8px; color: var(--bg-primary); text-align: center; text-decoration: none; font-family: var(--font-display); font-weight: 600; transition: all var(--transition-base);">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        card.style.cssText = `
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 2px solid var(--glass-border);
            border-radius: 12px;
            overflow: hidden;
            transition: all var(--transition-base);
            position: relative;
            opacity: 0;
        `;
        
        // Hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.borderColor = 'var(--cyan-neon)';
            card.style.boxShadow = 'var(--glow-cyan)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.borderColor = 'var(--glass-border)';
            card.style.boxShadow = 'none';
        });
        
        return card;
    }
    
    // Generate Experience Timeline
    generateExperienceSection() {
        const container = document.querySelector('.timeline-container');
        if (!container) return;
        
        container.style.cssText = `
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
        `;
        
        // Create timeline line
        const timeline = document.createElement('div');
        timeline.className = 'timeline-line';
        timeline.style.cssText = `
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(180deg, transparent, var(--cyan-neon), transparent);
            transform: translateX(-50%);
        `;
        container.appendChild(timeline);
        
        this.data.experience.forEach((exp, index) => {
            const item = this.createTimelineItem(exp, index % 2 === 0);
            container.appendChild(item);
        });
    }
    
    createTimelineItem(exp, isLeft) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.style.cssText = `
            display: flex;
            justify-content: ${isLeft ? 'flex-end' : 'flex-start'};
            width: 100%;
            margin-bottom: 3rem;
            position: relative;
        `;
        
        item.innerHTML = `
            <div class="timeline-marker" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 20px; height: 20px; background: var(--cyan-neon); border: 4px solid var(--bg-primary); border-radius: 50%; box-shadow: var(--glow-cyan); z-index: 2;"></div>
            
            <div class="timeline-content" style="width: 45%; background: var(--glass-bg); backdrop-filter: blur(10px); border: 2px solid var(--glass-border); border-radius: 12px; padding: 2rem; transition: all var(--transition-base);">
                <div class="exp-header" style="margin-bottom: 1rem;">
                    <span class="exp-period" style="display: inline-block; padding: 0.25rem 0.75rem; background: rgba(0, 240, 255, 0.1); border: 1px solid var(--cyan-neon); border-radius: 4px; font-family: var(--font-code); font-size: 0.75rem; color: var(--cyan-neon); margin-bottom: 0.5rem;">
                        ${exp.period}
                    </span>
                    <h3 class="exp-role" style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
                        ${exp.role}
                    </h3>
                    <div class="exp-company" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                        <i class="fas fa-building"></i>
                        <span>${exp.company}</span>
                    </div>
                    <div class="exp-location" style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-tertiary); font-size: 0.9rem;">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${exp.location}</span>
                    </div>
                </div>
                
                <p class="exp-description" style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
                    ${exp.description}
                </p>
                
                <ul class="exp-tasks" style="list-style: none; margin-bottom: 1.5rem;">
                    ${exp.tasks.map(task => `
                        <li style="position: relative; padding-left: 1.5rem; margin-bottom: 0.5rem; color: var(--text-secondary);">
                            <i class="fas fa-chevron-right" style="position: absolute; left: 0; top: 0.25rem; color: var(--cyan-neon);"></i>
                            ${task}
                        </li>
                    `).join('')}
                </ul>
                
                <div class="exp-tech" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                    ${exp.technologies.map(tech => `
                        <span class="tech-badge" style="padding: 0.25rem 0.5rem; background: rgba(0, 240, 255, 0.1); border: 1px solid var(--cyan-neon); border-radius: 4px; font-size: 0.7rem; color: var(--cyan-neon);">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
                
                ${exp.achievements ? `
                    <div class="exp-achievements" style="display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--glass-border);">
                        ${exp.achievements.map(ach => `
                            <div class="achievement" style="flex: 1; text-align: center;">
                                <div class="ach-metric" style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--green-neon);">
                                    ${ach.metric}
                                </div>
                                <div class="ach-label" style="font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase;">
                                    ${ach.label}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        return item;
    }
    
    // Generate Contact Terminal
    generateContactSection() {
        const container = document.querySelector('.contact-terminal');
        if (!container) return;
        
        container.innerHTML = `
            <div class="terminal-window" style="max-width: 800px; margin: 0 auto; background: var(--bg-card); border: 2px solid var(--cyan-neon); border-radius: 12px; overflow: hidden; box-shadow: var(--glow-cyan);">
                <div class="terminal-header" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: rgba(0, 0, 0, 0.3); border-bottom: 1px solid var(--glass-border);">
                    <div class="terminal-buttons" style="display: flex; gap: 0.5rem;">
                        <div class="btn-circle" style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></div>
                        <div class="btn-circle" style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
                        <div class="btn-circle" style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></div>
                    </div>
                    <span style="font-family: var(--font-code); font-size: 0.85rem; color: var(--text-secondary);">contact@abdelmajid.dev</span>
                    <div style="width: 60px;"></div>
                </div>
                
                <div class="terminal-body" style="padding: 2rem; font-family: var(--font-code);">
                    <div class="terminal-output" style="margin-bottom: 2rem; color: var(--green-neon);">
                        <div class="output-line">> Initializing secure connection...</div>
                        <div class="output-line">> Ready to receive message.</div>
                        <div class="output-line">> Please fill in the required fields:</div>
                    </div>
                    
                    <form id="contactForm" class="terminal-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: 0.5rem; color: var(--cyan-neon); margin-bottom: 0.5rem;">
                                <span class="prompt">$</span>
                                <span>name:</span>
                            </label>
                            <input type="text" name="name" required style="width: 100%; background: transparent; border: none; border-bottom: 2px solid var(--cyan-neon); padding: 0.5rem; color: var(--text-primary); font-family: var(--font-code); font-size: 1rem; outline: none;" placeholder="Your name">
                        </div>
                        
                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: 0.5rem; color: var(--cyan-neon); margin-bottom: 0.5rem;">
                                <span class="prompt">$</span>
                                <span>email:</span>
                            </label>
                            <input type="email" name="email" required style="width: 100%; background: transparent; border: none; border-bottom: 2px solid var(--cyan-neon); padding: 0.5rem; color: var(--text-primary); font-family: var(--font-code); font-size: 1rem; outline: none;" placeholder="your.email@example.com">
                        </div>
                        
                        <div class="form-group">
                            <label style="display: flex; align-items: center; gap: 0.5rem; color: var(--cyan-neon); margin-bottom: 0.5rem;">
                                <span class="prompt">$</span>
                                <span>message:</span>
                            </label>
                            <textarea name="message" required rows="5" style="width: 100%; background: rgba(0, 240, 255, 0.05); border: 2px solid var(--cyan-neon); border-radius: 8px; padding: 1rem; color: var(--text-primary); font-family: var(--font-code); font-size: 0.95rem; outline: none; resize: vertical;" placeholder="Your message here..."></textarea>
                        </div>
                        
                        <button type="submit" style="align-self: flex-start; padding: 0.75rem 2rem; background: var(--cyan-neon); border: none; border-radius: 8px; color: var(--bg-primary); font-family: var(--font-display); font-weight: 700; font-size: 1rem; cursor: pointer; transition: all var(--transition-base); box-shadow: var(--glow-cyan);">
                            <i class="fas fa-paper-plane"></i> SEND MESSAGE
                        </button>
                    </form>
                    
                    <div id="formResponse" class="terminal-response" style="margin-top: 2rem; padding: 1rem; background: rgba(0, 255, 136, 0.1); border: 1px solid var(--green-neon); border-radius: 8px; color: var(--green-neon); display: none;">
                        <i class="fas fa-check-circle"></i> Message sent successfully!
                    </div>
                </div>
            </div>
        `;
        
        // Form submission handler
        const form = document.getElementById('contactForm');
        const response = document.getElementById('formResponse');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulate sending
                response.style.display = 'flex';
                response.style.alignItems = 'center';
                response.style.gap = '0.5rem';
                
                setTimeout(() => {
                    form.reset();
                    setTimeout(() => {
                        response.style.display = 'none';
                    }, 3000);
                }, 500);
            });
        }
    }
    
    // Initialize interaction handlers
    initInteractions() {
        // Smooth scrolling for sections
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const sectionId = tab.getAttribute('data-section');
                const section = document.getElementById(`section-${sectionId}`);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Trigger interface ready after animations complete
    setTimeout(() => {
        document.dispatchEvent(new Event('interfaceReady'));
    }, 4000); // Adjust based on boot sequence timing
});
