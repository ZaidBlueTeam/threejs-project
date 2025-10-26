import * as THREE from 'three';
import Renderer from './components/renderer';
import { createMainScene } from './scenes/mainScene';
import { portfolioContent } from './utils/content';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Renderer();
let laptop = null;
let screen = null;
let mouseX = 0;
let mouseY = 0;
let isLaptopMode = false;

// Set up scene background
scene.background = new THREE.Color(0x1a1a2e);

function init() {
    const canvas = document.getElementById('three-canvas');
    renderer.initialize(canvas);
    const mainScene = createMainScene(scene);
    
    // Get reference to laptop
    laptop = scene.userData.laptop;
    screen = scene.userData.screen;
    
    // Better camera position for readability - more face-on view
    camera.position.set(0, 1.5, 10);
    camera.lookAt(0, 1.5, 0);

    // Mouse movement listener
    document.addEventListener('mousemove', onMouseMove);
    
    // Click listener for laptop interaction
    canvas.addEventListener('click', onCanvasClick);
    
    // Hover effect for cursor
    canvas.addEventListener('mousemove', onCanvasHover);
    
    animate();
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onCanvasHover(event) {
    if (isLaptopMode) return;
    
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    if (screen) {
        const intersects = raycaster.intersectObject(screen);
        if (intersects.length > 0) {
            document.body.style.cursor = 'pointer';
            // Make screen slightly brighter on hover
            screen.material.color.setHex(0x002288);
        } else {
            document.body.style.cursor = 'default';
            screen.material.color.setHex(0x001155);
        }
    }
}

function onCanvasClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    if (screen) {
        const intersects = raycaster.intersectObject(screen);
        if (intersects.length > 0) {
            toggleLaptopMode();
        }
    }
}

function toggleLaptopMode() {
    isLaptopMode = !isLaptopMode;
    
    if (isLaptopMode) {
        // Keep the hero section visible but show laptop interface on top
        showLaptopInterface();
        
        // Add some visual feedback to the screen
        if (screen) {
            screen.material.color.setHex(0x002255);
            screen.material.opacity = 1;
        }
    } else {
        // Hide laptop interface and restore screen
        hideLaptopInterface();
        
        if (screen) {
            screen.material.color.setHex(0x001155);
            screen.material.opacity = 0.9;
        }
    }
}

function showLaptopInterface() {
    // Create laptop OS interface with dynamic content
    const laptopUI = document.createElement('div');
    laptopUI.id = 'laptop-ui';
    
    // Generate projects HTML
    const projectsHTML = portfolioContent.projects.map(project => `
        <div class="project-item">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="project-status"><strong>Status:</strong> ${project.status}</p>
            <p class="project-details">${project.details}</p>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // Generate skills HTML
    const skillsHTML = Object.values(portfolioContent.skills).map(category => `
        <div class="skills-category">
            <h3>${category.title}</h3>
            <div class="skill-items">
                ${category.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // Generate contact methods HTML
    const contactHTML = portfolioContent.contact.methods.map(method => `
        <div class="contact-method">
            <h3>${method.icon} ${method.title}</h3>
            <p><a href="${method.link}" target="_blank" rel="noopener noreferrer">${method.value}</a></p>
        </div>
    `).join('');
    
    laptopUI.innerHTML = `
        <div class="desktop">
            <!-- Desktop Icons -->
            <div class="desktop-icons">
                <div class="desktop-icon" data-window="about">
                    <div class="icon">👨‍💻</div>
                    <div class="icon-label">About Me</div>
                </div>
                <div class="desktop-icon" data-window="projects">
                    <div class="icon">🚀</div>
                    <div class="icon-label">Projects</div>
                </div>
                <div class="desktop-icon" data-window="skills">
                    <div class="icon">⚡</div>
                    <div class="icon-label">Skills</div>
                </div>
                <div class="desktop-icon" data-window="cv">
                    <div class="icon">📄</div>
                    <div class="icon-label">CV/Resume</div>
                </div>
                <div class="desktop-icon" data-window="contact">
                    <div class="icon">📬</div>
                    <div class="icon-label">Contact</div>
                </div>
            </div>
            
            <div class="taskbar">
                <div class="start-menu">💻 ZaidOS</div>
                <div class="window-tabs">
                    <!-- Tabs will be dynamically added when windows are opened -->
                </div>
                <div class="close-btn" onclick="toggleLaptopMode()">×</div>
            </div>
            
            <div class="window" id="about-window">
                <div class="window-header">
                    <span>About Me - ${portfolioContent.personal.name}</span>
                    <div class="window-controls">
                        <span class="minimize">−</span>
                        <span class="maximize">□</span>
                        <span class="close" data-window="about">×</span>
                    </div>
                </div>
                <div class="window-content">
                    <h2>${portfolioContent.about.greeting}</h2>
                    <p>${portfolioContent.about.description}</p>
                    <p><strong>What drives me:</strong> ${portfolioContent.about.motivation}</p>
                    <p>${portfolioContent.about.additionalInfo}</p>
                    <div class="personal-info">
                        <h3>�‍💻 Professional Focus</h3>
                        <p><strong>Title:</strong> ${portfolioContent.personal.title}</p>
                        <p><strong>Tagline:</strong> ${portfolioContent.personal.tagline}</p>
                    </div>
                </div>
            </div>
            
            <div class="window" id="projects-window">
                <div class="window-header">
                    <span>My Projects Portfolio</span>
                    <div class="window-controls">
                        <span class="minimize">−</span>
                        <span class="maximize">□</span>
                        <span class="close" data-window="projects">×</span>
                    </div>
                </div>
                <div class="window-content">
                    <h2>🚀 Featured Projects</h2>
                    <p>Here are some of the projects I've worked on that showcase my skills and passion for development:</p>
                    ${projectsHTML}
                </div>
            </div>
            
            <div class="window" id="skills-window">
                <div class="window-header">
                    <span>Technical Skills & Expertise</span>
                    <div class="window-controls">
                        <span class="minimize">−</span>
                        <span class="maximize">□</span>
                        <span class="close" data-window="skills">×</span>
                    </div>
                </div>
                <div class="window-content">
                    <h2>💻 Technical Expertise</h2>
                    <p>My technical skills span across the full development stack, with special focus on modern web technologies and 3D graphics:</p>
                    ${skillsHTML}
                </div>
            </div>
            
            <div class="window" id="contact-window">
                <div class="window-header">
                    <span>Contact & Connect</span>
                    <div class="window-controls">
                        <span class="minimize">−</span>
                        <span class="maximize">□</span>
                        <span class="close" data-window="contact">×</span>
                    </div>
                </div>
                <div class="window-content">
                    <h2>📬 Let's Connect!</h2>
                    <p>${portfolioContent.contact.intro}</p>
                    <div class="contact-methods">
                        ${contactHTML}
                    </div>
                    <div class="availability-info">
                        <h3>� Availability</h3>
                        <p>${portfolioContent.contact.availability}</p>
                    </div>
                </div>
            </div>
            
            <div class="window" id="cv-window">
                <div class="window-header">
                    <span>CV/Resume - ${portfolioContent.personal.name}</span>
                    <div class="window-controls">
                        <span class="minimize">−</span>
                        <span class="maximize">□</span>
                        <span class="close" data-window="cv">×</span>
                    </div>
                </div>
                <div class="window-content">
                    <div class="cv-header">
                        <div class="language-switcher">
                            <button class="lang-btn active" data-lang="en">🇺🇸 English</button>
                            <button class="lang-btn" data-lang="de">🇩🇪 Deutsch</button>
                        </div>
                    </div>
                    <div id="cv-content">
                        <!-- CV content will be dynamically loaded here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(laptopUI);
    
    // Add event listeners for tabs and window controls
    setupLaptopInteractions();
    
    // Setup CV language switching
    setupCVLanguageSwitching();
    
    // Load initial CV content
    loadCVContent('en');
}

function hideLaptopInterface() {
    const laptopUI = document.getElementById('laptop-ui');
    if (laptopUI) {
        laptopUI.remove();
    }
}

function setupLaptopInteractions() {
    // Desktop icon double-click to open windows
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        let clickCount = 0;
        let clickTimer = null;
        
        icon.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 1) {
                // Single click - select icon
                document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                icon.classList.add('selected');
                
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                // Double click - open window
                clearTimeout(clickTimer);
                clickCount = 0;
                
                const windowName = icon.dataset.window;
                openWindow(windowName);
            }
        });
    });
    
    // Tab switching
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab')) {
            const windowName = e.target.dataset.window;
            const windowId = windowName + '-window';
            const targetWindow = document.getElementById(windowId);
            
            if (targetWindow.classList.contains('minimized')) {
                // Restore minimized window
                targetWindow.classList.remove('minimized');
                targetWindow.style.display = 'flex';
                targetWindow.style.transform = 'scale(1) translateY(0)';
                targetWindow.style.opacity = '1';
                
                // Make it active
                document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                
                targetWindow.classList.add('active');
                e.target.classList.add('active');
            } else {
                // Regular tab switching
                document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                
                targetWindow.classList.add('active');
                e.target.classList.add('active');
            }
        }
    });
    
    // Window minimize buttons
    document.querySelectorAll('.minimize').forEach(minimizeBtn => {
        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const window = minimizeBtn.closest('.window');
            const windowName = window.id.replace('-window', '');
            const tab = document.querySelector(`[data-window="${windowName}"]`);
            
            // Minimize animation
            window.style.transform = 'scale(0.1) translateY(50px)';
            window.style.opacity = '0';
            
            setTimeout(() => {
                window.classList.remove('active');
                window.classList.add('minimized');
                window.style.display = 'none';
                
                // Reset styles for next open
                window.style.transform = 'scale(1) translateY(0)';
                window.style.opacity = '1';
            }, 300);
            
            // Dim the tab
            if (tab) {
                tab.classList.remove('active');
                tab.style.opacity = '0.5';
            }
        });
    });
    
    // Window maximize buttons
    document.querySelectorAll('.maximize').forEach(maximizeBtn => {
        maximizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const window = maximizeBtn.closest('.window');
            
            if (window.classList.contains('maximized')) {
                // Restore window to small windowed size
                window.classList.remove('maximized');
                window.style.top = '50px';
                window.style.left = '50px';
                window.style.right = 'auto';
                window.style.bottom = 'auto';
                window.style.width = '450px';
                window.style.height = '350px';
                window.style.zIndex = '204';
                maximizeBtn.textContent = '□';
            } else {
                // Maximize window - remove all positioning constraints
                window.classList.add('maximized');
                window.style.top = '';
                window.style.left = '';
                window.style.right = '';
                window.style.bottom = '';
                window.style.width = '';
                window.style.height = '';
                window.style.zIndex = '208';
                maximizeBtn.textContent = '❐';
            }
        });
    });
    
    // Window close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const windowId = closeBtn.dataset.window + '-window';
            const window = document.getElementById(windowId);
            const tab = document.querySelector(`[data-window="${closeBtn.dataset.window}"]`);
            
            // Close animation
            window.style.transform = 'scale(0.8) translateY(-15px)';
            window.style.opacity = '0';
            
            setTimeout(() => {
                window.classList.remove('active');
                window.classList.add('minimized');
                window.style.display = 'none';
                
                // Reset styles for next open
                window.style.transform = 'scale(1) translateY(0)';
                window.style.opacity = '1';
                
                // Remove tab only, never touch desktop icons
                if (tab && tab.classList.contains('tab')) {
                    tab.remove();
                }
                
                // Ensure desktop icons remain visible
                const desktopIcons = document.querySelector('.desktop-icons');
                if (desktopIcons) {
                    desktopIcons.style.display = 'grid';
                    desktopIcons.style.zIndex = '203';
                }
            }, 300);
        });
    });
    
    // Start menu click effect
    const startMenu = document.querySelector('.start-menu');
    if (startMenu) {
        startMenu.addEventListener('click', () => {
            // Restore all windows
            document.querySelectorAll('.window').forEach(window => {
                if (window.classList.contains('minimized')) {
                    window.classList.remove('minimized');
                    window.style.display = 'flex';
                    window.style.transform = 'scale(1) translateY(0)';
                    window.style.opacity = '1';
                }
            });
            
            // Restore all tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.style.opacity = '1';
            });
            
            // Visual feedback
            startMenu.style.transform = 'scale(0.95)';
            setTimeout(() => {
                startMenu.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Desktop click to deselect icons
    document.querySelector('.desktop').addEventListener('click', (e) => {
        if (e.target.classList.contains('desktop') || e.target.closest('.desktop-icons')) {
            if (!e.target.closest('.desktop-icon')) {
                document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            }
        }
    });
    
    // Add window drag functionality (basic)
    document.querySelectorAll('.window-header').forEach(header => {
        let isDragging = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;
        
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-controls')) return;
            
            isDragging = true;
            const window = header.closest('.window');
            const rect = window.getBoundingClientRect();
            
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            
            window.style.zIndex = '206';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            const window = header.closest('.window');
            const laptopUI = document.getElementById('laptop-ui');
            const laptopRect = laptopUI.getBoundingClientRect();
            
            currentX = e.clientX - laptopRect.left - initialX;
            currentY = e.clientY - laptopRect.top - initialY;
            
            // Constrain to laptop screen bounds
            const maxX = laptopRect.width - window.offsetWidth;
            const maxY = laptopRect.height - window.offsetHeight - 50; // Account for taskbar
            
            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));
            
            window.style.left = currentX + 'px';
            window.style.right = 'auto';
            window.style.top = currentY + 'px';
            window.style.bottom = 'auto';
            window.style.width = '400px';
            window.style.height = '300px';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                const window = header.closest('.window');
                window.style.zIndex = '205';
            }
        });
    });
}

function setupCVLanguageSwitching() {
    // Language switcher buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-btn')) {
            const lang = e.target.dataset.lang;
            
            // Update active language button
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Load CV content in selected language
            loadCVContent(lang);
        }
    });
}

function loadCVContent(language) {
    const cvContent = document.getElementById('cv-content');
    if (!cvContent) return;
    
    const cv = portfolioContent.cv[language];
    if (!cv) return;
    
    const experienceHTML = cv.experience.map(exp => `
        <div class="cv-section-item">
            <div class="cv-item-header">
                <h4>${exp.position}</h4>
                <span class="cv-period">${exp.period}</span>
            </div>
            <div class="cv-item-subheader">
                <strong>${exp.company}</strong> - ${exp.location}
            </div>
            <ul class="cv-responsibilities">
                ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
        </div>
    `).join('');
    
    const educationHTML = cv.education.map(edu => `
        <div class="cv-section-item">
            <div class="cv-item-header">
                <h4>${edu.degree}</h4>
                <span class="cv-period">${edu.period}</span>
            </div>
            <div class="cv-item-subheader">
                <strong>${edu.institution}</strong> - ${edu.location}
            </div>
            <p class="cv-details">${edu.details}</p>
        </div>
    `).join('');
    
    const skillsHTML = cv.skills.map(skillCategory => `
        <div class="cv-skills-category">
            <h4>${skillCategory.category}</h4>
            <div class="cv-skill-tags">
                ${skillCategory.items.map(skill => `<span class="cv-skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    const languagesHTML = cv.languages.map(lang => `
        <div class="cv-language-item">
            <strong>${lang.language}</strong>: ${lang.level}
        </div>
    `).join('');
    
    const certificationsHTML = cv.certifications ? cv.certifications.map(cert => `
        <div class="cv-certification-item">
            <strong>${cert.name}</strong><br>
            <small>${cert.issuer} (${cert.date})</small>
        </div>
    `).join('') : '';
    
    cvContent.innerHTML = `
        <div class="cv-personal-info">
            <h2>${cv.personal.name}</h2>
            <h3>${cv.personal.title}</h3>
            <div class="cv-contact-info">
                <p>📧 ${cv.personal.email}</p>
                <p>📱 ${cv.personal.phone}</p>
                <p>📍 ${cv.personal.location}</p>
                <p>� ${cv.personal.dateOfBirth}</p>
                <p>�🏛️ ${cv.personal.nationality}</p>
            </div>
        </div>
        
        <div class="cv-section">
            <h3>📝 ${language === 'en' ? 'Professional Summary' : 'Berufliche Zusammenfassung'}</h3>
            <p class="cv-summary">${cv.summary}</p>
        </div>
        
        <div class="cv-section">
            <h3>💼 ${language === 'en' ? 'Work Experience' : 'Berufserfahrung'}</h3>
            ${experienceHTML}
        </div>
        
        <div class="cv-section">
            <h3>🎓 ${language === 'en' ? 'Education & Training' : 'Bildung & Ausbildung'}</h3>
            ${educationHTML}
        </div>
        
        <div class="cv-section">
            <h3>🛠️ ${language === 'en' ? 'Technical Skills' : 'Technische Fähigkeiten'}</h3>
            ${skillsHTML}
        </div>
        
        <div class="cv-section">
            <h3>🌐 ${language === 'en' ? 'Languages' : 'Sprachen'}</h3>
            <div class="cv-languages">
                ${languagesHTML}
            </div>
        </div>
        
        ${cv.mobility ? `
        <div class="cv-section">
            <h3>🚗 ${language === 'en' ? 'Mobility' : 'Mobilität'}</h3>
            <p class="cv-summary">${cv.mobility}</p>
        </div>
        ` : ''}
        
        ${certificationsHTML ? `
        <div class="cv-section">
            <h3>🏆 ${language === 'en' ? 'Certifications' : 'Zertifikate'}</h3>
            <div class="cv-certifications">
                ${certificationsHTML}
            </div>
        </div>
        ` : ''}
        
        ${cv.additionalInfo ? `
        <div class="cv-section">
            <h3>💡 ${language === 'en' ? 'Additional Information' : 'Zusätzliche Informationen'}</h3>
            <p class="cv-summary">${cv.additionalInfo}</p>
        </div>
        ` : ''}
    `;
}

function openWindow(windowName) {
    const windowId = windowName + '-window';
    const window = document.getElementById(windowId);
    const windowTabs = document.querySelector('.window-tabs');
    
    // Check if tab already exists
    let tab = document.querySelector(`[data-window="${windowName}"]`);
    
    if (!tab) {
        // Create new tab
        tab = document.createElement('div');
        tab.className = 'tab';
        tab.dataset.window = windowName;
        
        const tabNames = {
            'about': 'About Me',
            'projects': 'Projects', 
            'skills': 'Skills',
            'cv': 'CV/Resume',
            'contact': 'Contact'
        };
        
        tab.textContent = tabNames[windowName] || windowName;
        windowTabs.appendChild(tab);
    }
    
    // Show window
    window.classList.remove('minimized');
    window.style.display = 'flex';
    
    // Make active
    document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    window.classList.add('active');
    tab.classList.add('active');
    tab.style.opacity = '1';
    
    // Open window in maximized mode by default
    window.classList.add('maximized');
    window.style.top = '';
    window.style.left = '';
    window.style.right = '';
    window.style.bottom = '';
    window.style.width = '';
    window.style.height = '';
    window.style.zIndex = '208';
    
    // Update maximize button to show restore state
    const maximizeBtn = window.querySelector('.maximize');
    if (maximizeBtn) {
        maximizeBtn.textContent = '❐';
    }
    
    // Load CV content if it's the CV window
    if (windowName === 'cv') {
        loadCVContent('en');
    }
}

// Make toggleLaptopMode globally accessible
window.toggleLaptopMode = toggleLaptopMode;

function animate() {
    requestAnimationFrame(animate);
    
    if (!isLaptopMode) {
        // Subtle camera movement when not in laptop mode - more stable
        const targetX = mouseX * 1.5;
        const targetY = mouseY * 0.8 + 1.5;
        
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (targetY - camera.position.y) * 0.02;
        camera.lookAt(0, 1.5, 0); // Look at screen center
        
        // Add subtle glow pulse to screen when hovering
        if (screen) {
            const glowIntensity = 0.9 + Math.sin(Date.now() * 0.001) * 0.1;
            screen.material.opacity = glowIntensity;
        }
    }
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.renderer.setSize(window.innerWidth, window.innerHeight);
});

init();