document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const faqItems = document.querySelectorAll('.faq-item');

    // Service Cards Expansion
    serviceCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const details = card.querySelector('.service-details');
        const img = card.querySelector('img');

        if (!expandBtn || !details) return;

        expandBtn.addEventListener('click', function() {
            const isExpanded = details.classList.contains('active');

            // First, reset all cards
            serviceCards.forEach(otherCard => {
                const otherDetails = otherCard.querySelector('.service-details');
                const otherBtn = otherCard.querySelector('.expand-btn');

                if (otherCard !== card && otherDetails && otherBtn) {
                    otherDetails.classList.remove('active');
                    otherBtn.classList.remove('active');
                }
            });

            // Then, toggle the clicked card
            details.classList.toggle('active');
            expandBtn.classList.toggle('active');

            // Smooth scroll to expanded card
            if (!isExpanded) {
                setTimeout(() => {
                    card.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center'
                    });
                }, 300);
            }
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            card.classList.add('hover-lift');
            if (img) img.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            card.classList.remove('hover-lift');
            if (img) img.style.transform = 'scale(1)';
        });
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (!button || !answer || !icon) return;

        button.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (otherAnswer && otherIcon) {
                        otherAnswer.classList.remove('active');
                        otherIcon.classList.remove('active');
                    }
                }
            });

            // Toggle current FAQ item with animation
            answer.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            icon.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            answer.classList.toggle('active');
            icon.classList.toggle('active');
        });
    });
});