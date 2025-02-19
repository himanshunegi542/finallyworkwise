document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

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
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // md breakpoint
            mobileMenu.classList.add('hidden');
        }
    });

    // Parallax effect for hero section
    const heroSection2 = document.querySelector('.hero-section');
    if (heroSection2) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroSection2.style.backgroundPositionY = (scrolled * 0.5) + 'px';
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

    // Initialize animation on scroll
    document.addEventListener('DOMContentLoaded', () => {
        const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            observer.observe(element);
        });
    });
});