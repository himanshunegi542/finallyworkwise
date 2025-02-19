class Carousel {
    constructor() {
        this.carousel = document.querySelector('.portfolio-carousel');
        if (!this.carousel) return;

        this.carouselInner = this.carousel.querySelector('.carousel-inner');
        this.prevButton = this.carousel.querySelector('.carousel-prev');
        this.nextButton = this.carousel.querySelector('.carousel-next');
        this.slides = [
            // First Slider - Business Projects
            {
                title: "Digital Transformation",
                description: "Helped a retail chain modernize their operations",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Project 1</text></svg>"
            },
            {
                title: "Business Strategy",
                description: "Developed growth strategy for tech startup",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Project 2</text></svg>"
            },
            {
                title: "Market Expansion",
                description: "Guided international market entry",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Project 3</text></svg>"
            },
            // Second Slider - Technology Projects
            {
                title: "Cloud Migration",
                description: "Successfully migrated enterprise systems to cloud",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Tech Project 1</text></svg>"
            },
            {
                title: "AI Implementation",
                description: "Integrated AI solutions for customer service",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Tech Project 2</text></svg>"
            },
            {
                title: "Data Analytics",
                description: "Built comprehensive data analytics platform",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Tech Project 3</text></svg>"
            },
            // Third Slider - Innovation Projects
            {
                title: "Blockchain Solution",
                description: "Implemented supply chain tracking system",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Innovation 1</text></svg>"
            },
            {
                title: "IoT Platform",
                description: "Developed smart factory monitoring system",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Innovation 2</text></svg>"
            },
            {
                title: "Green Technology",
                description: "Sustainable energy management solution",
                image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f0f9ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%233b82f6'>Innovation 3</text></svg>"
            }
        ];

        this.currentSlide = 0;
        this.init();
    }

    init() {
        this.createSlides();
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateSlidePosition();
    }

    createSlides() {
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'flex-none w-full transition-transform duration-500';
            slideElement.innerHTML = `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden mx-4 hover-lift">
                    <img src="${slide.image}" alt="${slide.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">${slide.title}</h3>
                        <p class="text-gray-600">${slide.description}</p>
                    </div>
                </div>
            `;
            this.carouselInner.appendChild(slideElement);
        });
    }

    setupEventListeners() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            });
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });
        }

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            this.stopAutoPlay();
            touchStartX = e.changedTouches[0].screenX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                this.nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                this.prevSlide();
            }
            this.startAutoPlay();
        });

        // Mouse hover pause
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    updateSlidePosition() {
        const position = -this.currentSlide * 100;
        this.carouselInner.style.transform = `translateX(${position}%)`;
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
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

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});