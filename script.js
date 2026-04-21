document.addEventListener('DOMContentLoaded', () => {

    // --- Splash Screen ---
    const splashScreen = document.getElementById('splash-screen');
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;

    // Rotate quotes every 900ms to fit in 3 seconds total
    const quoteInterval = setInterval(() => {
        quotes[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].classList.add('active');
    }, 900);

    // Hide splash screen after 3 seconds
    setTimeout(() => {
        clearInterval(quoteInterval);
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            // Trigger home reveal after splash is gone
            triggerReveal();
        }, 500);
    }, 3000);


    // --- Typing Animation ---
    const typingText = document.querySelector('.typing-text');
    const words = ["Web Developer", "Frontend Developer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect slightly after page loads
    setTimeout(type, 3500);


    // --- Scroll Progress Bar ---
    window.addEventListener('scroll', () => {
        const scrollBar = document.getElementById('scroll-bar');
        if (!scrollBar) return;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + '%';
    });


    // --- Sticky Navbar & Active Link Highlight ---
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        // Back to top button
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }

        // Active Link Highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // --- Mobile Hamburger Menu ---
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('fa-times');
            navbar.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('fa-times');
                navbar.classList.remove('active');
            });
        });
    }


    // --- Scroll Reveal Animation ---
    function triggerReveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', triggerReveal);
    // Initial call in case elements are already in view (after splash screen)


    // --- Counter Animation for About Section ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    function countUp() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 50; // Speed of counting

            if (c < target) {
                counter.innerText = Math.ceil(c + increment);
                setTimeout(countUp, 40);
            } else {
                counter.innerText = target + "+";
            }
        });
    }

    // Trigger counter when about section is in view
    window.addEventListener('scroll', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const position = aboutSection.getBoundingClientRect();
            if (position.top < window.innerHeight && !hasCounted) {
                hasCounted = true;
                countUp();
            }
        }
    });


    // --- Skills Progress Bar Animation ---
    const progressLines = document.querySelectorAll('.progress-line span');
    let hasProgressed = false;

    function animateProgress() {
        progressLines.forEach(line => {
            const percent = line.parentElement.getAttribute('data-percent');
            line.style.width = percent;
        });
    }

    window.addEventListener('scroll', () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const position = skillsSection.getBoundingClientRect();
            if (position.top < window.innerHeight && !hasProgressed) {
                hasProgressed = true;
                setTimeout(animateProgress, 500); // slight delay for better effect
            }
        }
    });

});
