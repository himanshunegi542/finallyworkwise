class Carousel {
    constructor(container) {
        this.container = container;
        if (!this.container) return;

        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nav = this.container.querySelector('.carousel-nav');
        this.currentIndex = 0;
        this.slideHeight = this.container.offsetHeight;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.createNavigation();
        this.positionSlides();
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlidePosition();
    }

    createNavigation() {
        // Create navigation dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.stopAutoPlay();
                this.startAutoPlay();
            });
            this.nav.appendChild(dot);
        });
    }

    positionSlides() {
        // Position slides vertically
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateY(${100 * index}%)`;
        });
    }

    bindEvents() {
        // Touch events
        let touchStartY = 0;
        let touchEndY = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            this.stopAutoPlay();
        });

        this.container.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            if (touchStartY - touchEndY > 50) {
                this.nextSlide();
            } else if (touchEndY - touchStartY > 50) {
                this.prevSlide();
            }
            this.startAutoPlay();
        });

        // Mouse hover pause
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    updateSlidePosition() {
        // Move slides vertically
        this.track.style.transform = `translateY(-${this.currentIndex * 100}%)`;

        // Update navigation dots
        const dots = this.nav.children;
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize all carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => new Carousel(container));
});