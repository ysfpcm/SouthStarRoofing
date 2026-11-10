document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Header
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    const closeMobileMenu = (restoreFocus = false) => {
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        if (restoreFocus) {
            menuToggle.focus();
        }
    };

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        closeMenu.focus();
    });

    closeMenu.addEventListener('click', () => {
        closeMobileMenu(true);
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu(true);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .fade-in-left, .fade-in-right');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
        document.documentElement.classList.add('animations-enabled');
    } else {
        animatedElements.forEach(el => el.classList.add('visible'));
    }

});
