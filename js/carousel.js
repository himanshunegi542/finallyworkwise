
class Carousel {
    constructor(container) {
        this.container = container;
        if (!this.container) return;

        this.track = this.container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nav = this.container.querySelector('.carousel-nav');
        this.prevButton = this.container.querySelector('.carousel-button.prev');
        this.nextButton = this.container.querySelector('.carousel-button.next');
        this.currentIndex = 0;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.createNavigation();
        this.setupSlides();
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlidePosition();
    }

    createNavigation() {
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

    setupSlides() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * index}%)`;
        });
    }

    bindEvents() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.prevSlide();
                this.stopAutoPlay();
                this.startAutoPlay();
            });
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextSlide();
                this.stopAutoPlay();
                this.startAutoPlay();
            });
        }

        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                this.prevSlide();
            }
            this.startAutoPlay();
        });

        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    updateSlidePosition() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
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

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => new Carousel(container));
});
