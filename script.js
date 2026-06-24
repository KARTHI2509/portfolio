document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });

    // 2. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }

    // 3. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    const navIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        if (navList.classList.contains('active')) {
            navIcon.className = 'fa-solid fa-xmark';
        } else {
            navIcon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            navIcon.className = 'fa-solid fa-bars';
        });
    });

    // 4. Sticky Navbar & Scroll Progress & Active Link
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY;

        // Sticky Navbar
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (currentScroll / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + "%";

        // Scroll to Top Button
        if (currentScroll > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }

        // Active Link Highlighting
        sections.forEach(sec => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                });
                const activeLink = document.querySelector('.nav-list a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Scroll To Top Click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Typewriter Effect
    const typingText = document.querySelector('.typing-text');
    const roles = ['AI/ML Enthusiast', 'Web Developer', 'Cybersecurity Student'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1500);

    // 6. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 7. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const allProgressBars = document.querySelectorAll('.progress');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Handle staggered delays
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('appear');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('appear');
                }
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // Animate Progress bars when visible is handled below in section 17

    // 8. Contact Form Prevent Default
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Mock submission
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent Successfully!';
            btn.style.backgroundColor = '#10b981'; // Green color
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }

    // 9. Particles.js Initialization (Premium Upgrade)
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#3b82f6" }, // Corporate Blue
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": false, "anim": { "enable": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#3b82f6", "opacity": 0.3, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 10. Interactive 3D Parallax Tilt for Hero Card
    const heroCard = document.getElementById('heroProfileCard');
    const heroImg = heroCard ? heroCard.querySelector('.hero-profile-img') : null;
    if (heroCard) {
        const glow = heroCard.querySelector('.profile-card-glow');

        heroCard.addEventListener('mousemove', (e) => {
            const rect = heroCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((centerY - y) / centerY) * 15; // Max 15 deg
            const rotateY = ((x - centerX) / centerX) * 15;

            heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
            
            if (glow) {
                glow.style.opacity = '1';
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`;
            }
            if (heroImg) {
                // Parallax shift for the image
                const moveX = ((x - centerX) / centerX) * 8; // Max 8px shift
                const moveY = ((y - centerY) / centerY) * 8;
                heroImg.style.transform = `translate3d(${moveX}px, ${moveY}px, 20px) scale(1.05)`;
            }
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            if (glow) {
                glow.style.opacity = '0';
            }
            if (heroImg) {
                heroImg.style.transform = 'translateZ(20px) scale(1.02)';
            }
        });
    }

    // 12. Interactive Canvas Neural Network Animation
    const aboutCanvas = document.getElementById('neural-canvas');
    const aboutCard = document.getElementById('aboutCanvasCard');
    if (aboutCanvas && aboutCard) {
        const ctx = aboutCanvas.getContext('2d');
        let width = aboutCanvas.width = aboutCanvas.offsetWidth;
        let height = aboutCanvas.height = aboutCanvas.offsetHeight;

        // Resize handler
        window.addEventListener('resize', () => {
            if (aboutCanvas.offsetWidth && aboutCanvas.offsetHeight) {
                width = aboutCanvas.width = aboutCanvas.offsetWidth;
                height = aboutCanvas.height = aboutCanvas.offsetHeight;
            }
        });

        // Neural Net Config
        const numNodes = 40;
        const connectionDist = 85;
        const nodes = [];
        let canvasMouseX = null;
        let canvasMouseY = null;
        let isCanvasHovered = false;

        // Create initial nodes
        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 2 + 1.5,
                pulseSpeed: 0.03 + Math.random() * 0.04,
                pulseVal: Math.random() * Math.PI
            });
        }

        // Mouse hover inside card coordinates
        aboutCard.addEventListener('mousemove', (e) => {
            const rect = aboutCanvas.getBoundingClientRect();
            canvasMouseX = e.clientX - rect.left;
            canvasMouseY = e.clientY - rect.top;
            isCanvasHovered = true;
        });

        aboutCard.addEventListener('mouseleave', () => {
            canvasMouseX = null;
            canvasMouseY = null;
            isCanvasHovered = false;
        });

        // Animation Loop
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Fetch theme colors dynamically
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            const nodeColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(29, 78, 216, 0.7)';
            const lineColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(29, 78, 216, 0.12)';
            const pulseColor = theme === 'dark' ? 'rgba(138, 43, 226, 0.8)' : 'rgba(138, 43, 226, 0.7)';

            // 1. Update and draw nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Gentle mouse attraction
                if (isCanvasHovered && canvasMouseX !== null && canvasMouseY !== null) {
                    const dx = canvasMouseX - node.x;
                    const dy = canvasMouseY - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        node.x += dx * 0.02;
                        node.y += dy * 0.02;
                    }
                }

                // Node pulsing effect
                node.pulseVal += node.pulseSpeed;
                const sizeMult = 1 + Math.sin(node.pulseVal) * 0.3;

                // Draw node glow
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r * sizeMult + 2, 0, Math.PI * 2);
                ctx.fillStyle = theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(29, 78, 216, 0.1)';
                ctx.fill();

                // Draw core node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r * sizeMult, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();
            });

            // 2. Draw connections & pulses
            for (let i = 0; i < nodes.length; i++) {
                const nodeA = nodes[i];

                // Mouse connections
                if (isCanvasHovered && canvasMouseX !== null && canvasMouseY !== null) {
                    const dx = canvasMouseX - nodeA.x;
                    const dy = canvasMouseY - nodeA.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(canvasMouseX, canvasMouseY);
                        const alpha = (1 - dist / 120) * 0.4;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }

                // Inter-node connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j];
                    const dx = nodeB.x - nodeA.x;
                    const dy = nodeB.y - nodeA.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        const alpha = (1 - dist / connectionDist) * 0.35;
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();

                        // Flowing data pulses
                        const time = (Date.now() * 0.001 * (1 + nodeA.r * 0.1)) % 1;
                        const px = nodeA.x + dx * time;
                        const py = nodeA.y + dy * time;

                        ctx.beginPath();
                        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                        ctx.fillStyle = pulseColor;
                        ctx.fill();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        setTimeout(animate, 100);
    }

    // 11. Custom Interactive Cursor with Smooth Trail
    const cursorDot = document.querySelector('.custom-cursor');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        let isMoving = false;

        // Update target positions on mousemove
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMoving = true;

            // Show cursors when moving
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });

        // Hide cursors if mouse leaves the screen
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        // Loop to smoothly animate the outline
        function updateCursor() {
            if (isMoving) {
                // Move dot instantly
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;

                // Smoothly slide outline toward mouse
                outlineX += (mouseX - outlineX) * 0.15;
                outlineY += (mouseY - outlineY) * 0.15;
                cursorOutline.style.left = `${outlineX}px`;
                cursorOutline.style.top = `${outlineY}px`;
            }
            requestAnimationFrame(updateCursor);
        }
        requestAnimationFrame(updateCursor);

        // Hover effect listener helper
        const addHoverEffects = () => {
            const interactives = document.querySelectorAll('a, button, select, input, textarea, .project-card, .filter-btn');
            interactives.forEach(el => {
                // Avoid adding duplicate listeners
                if (el.dataset.hasCursorListener) return;
                el.dataset.hasCursorListener = 'true';

                el.addEventListener('mouseenter', () => {
                    cursorDot.classList.add('hovered');
                    cursorOutline.classList.add('hovered');
                });
                el.addEventListener('mouseleave', () => {
                    cursorDot.classList.remove('hovered');
                    cursorOutline.classList.remove('hovered');
                });
            });
        };

        // Initialize hover effects
        addHoverEffects();

        // Re-apply hover effects when project filters modify the active cards
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(addHoverEffects, 350); // wait for card visibility transitions
            });
        });
    }

    // =========================================
    // PREMIUM MODERN UPGRADES & ANIMATIONS
    // =========================================

    // A. Hero Section Letter-by-Letter Text Reveal
    const splitText = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return;
        const text = el.textContent.trim();
        el.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.classList.add('char');
            span.style.transitionDelay = `${index * 25}ms`;
            el.appendChild(span);
        });
        
        setTimeout(() => {
            el.querySelectorAll('.char').forEach(span => span.classList.add('reveal'));
        }, 150);
    };

    // Stagger character animations
    splitText('.greeting');
    setTimeout(() => {
        splitText('.name');
    }, 350);

    // B. Hero Background Spotlight Follow
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.setProperty('--spotlight-x', '50%');
        heroSection.style.setProperty('--spotlight-y', '50%');
        
        heroSection.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroSection.style.setProperty('--spotlight-x', `${x}px`);
            heroSection.style.setProperty('--spotlight-y', `${y}px`);
        });
    }

    // C. Scroll-linked Parallax blobs and Hero Text
    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) return;
        const scrolled = window.scrollY;
        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        const heroText = document.querySelector('.hero-text');
        
        if (scrolled < window.innerHeight) {
            if (blob1) blob1.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0004})`;
            if (blob2) blob2.style.transform = `translateY(${scrolled * -0.2}px) scale(${1 - scrolled * 0.0002})`;
            if (heroText) heroText.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    // D. Timeline Line Growth & Reveals
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timeline) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.15 });

        timelineItems.forEach(item => timelineObserver.observe(item));

        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            const centerOffset = viewHeight / 2;
            const scrolledHeight = Math.max(0, centerOffset - rect.top);
            const totalHeight = rect.height;
            const percent = Math.min(100, (scrolledHeight / totalHeight) * 100);
            
            timeline.style.setProperty('--scroll-percent', `${percent}%`);
        });
    }

    // E. Staggered Skill Cards and Progress Count-Up
    const skillCategories = document.querySelectorAll('.skill-category');
    if (skillCategories.length) {
        const categoryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        skillCategories.forEach(el => categoryObserver.observe(el));
    }

    allProgressBars.forEach(bar => {
        const info = bar.closest('.skill-item').querySelector('.skill-info');
        const percentageText = info.querySelector('span:last-child');
        
        if (percentageText) {
            const targetVal = parseInt(percentageText.textContent);
            percentageText.textContent = '0%';
            
            const progressObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let current = 0;
                        const step = () => {
                            current += Math.ceil((targetVal - current) * 0.08);
                            if (current >= targetVal) {
                                percentageText.textContent = targetVal + '%';
                            } else {
                                percentageText.textContent = current + '%';
                                requestAnimationFrame(step);
                            }
                        };
                        step();
                        
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            progressObserver.observe(bar);
        }
    });

    // F. Card Mouse-based 3D Tilt (Projects & Achievements)
    const cardsToTilt = document.querySelectorAll('.project-card, .achievement-card');
    cardsToTilt.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = ((centerY - y) / centerY) * 8;
            const tiltY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // G. Magnetic Button Attraction (btn, social links, theme toggle)
    const magneticElements = document.querySelectorAll('.btn, .social-links a, #theme-toggle');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    // H. Back-to-Top Rocket Animation and Forms Ripple click
    const scrollTop = document.getElementById('scrollToTop');
    if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
            e.preventDefault();
            scrollTop.classList.add('launching');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            setTimeout(() => {
                scrollTop.classList.remove('launching');
            }, 1000);
        });
    }

    // Ripple click effect on all buttons
    const rippleButtons = document.querySelectorAll('.btn, #scrollToTop');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 650);
        });
    });

    // Forms success checkmark override mock
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Wait slightly after standard mock transitions to insert visual checkmark
            setTimeout(() => {
                const btn = contactForm.querySelector('button');
                
                // Create checkmark icon
                const checkmark = document.createElement('div');
                checkmark.className = 'success-checkmark';
                checkmark.innerHTML = '<i class="fa-solid fa-circle-check" style="font-size: 2.8rem; color: #10b981; filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));"></i>';
                
                // Insert checkmark above button
                contactForm.insertBefore(checkmark, btn);
                
                setTimeout(() => {
                    checkmark.remove();
                }, 2900);
            }, 50);
        });
    }

});
