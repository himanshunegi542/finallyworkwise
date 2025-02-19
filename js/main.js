document.addEventListener('DOMContentLoaded', function() {
    // Enhanced header animation
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Enhanced parallax effect
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            const speed = 0.5;
            heroSection.style.transform = `translateY(${scroll * speed}px)`;
        });
    }
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenuButton && mobileMenu && !mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // md breakpoint
            mobileMenu.classList.add('hidden');
        }
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        });
    }

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active state to current navigation item
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('text-indigo-600');
                link.classList.remove('text-gray-600');
            } else {
                link.classList.remove('text-indigo-600');
                link.classList.add('text-gray-600');
            }
        });
    }

    // Initialize active nav item
    setActiveNavItem();

    // Page load animations
    function initPageAnimations() {
        const fadeElements = document.querySelectorAll('.animate-fade-in');
        const slideElements = document.querySelectorAll('.animate-slide-up');

        // Fade in animations
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
            }, index * 100);
        });

        // Slide up animations
        slideElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, index * 100);
        });
    }

    // Initialize animations
    initPageAnimations();
});