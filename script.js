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
    const progressBars = document.querySelectorAll('.progress');

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

    // Animate Progress bars when visible
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

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
    if (heroCard) {
        const glow = heroCard.querySelector('.profile-card-glow');
        const img = heroCard.querySelector('.hero-profile-img');

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
            if (img) {
                // Parallax shift for the image
                const moveX = ((x - centerX) / centerX) * 8; // Max 8px shift
                const moveY = ((y - centerY) / centerY) * 8;
                img.style.transform = `translate3d(${moveX}px, ${moveY}px, 20px) scale(1.05)`;
            }
        });

        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            if (glow) {
                glow.style.opacity = '0';
            }
            if (img) {
                img.style.transform = 'translateZ(20px) scale(1.02)';
            }
        });
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

});
