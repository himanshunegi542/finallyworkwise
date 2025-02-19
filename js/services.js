document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const details = card.querySelector('.service-details');
        
        if (!expandBtn || !details) return;

        expandBtn.addEventListener('click', function() {
            const isExpanded = !details.classList.contains('hidden');
            
            // First, reset all cards
            serviceCards.forEach(otherCard => {
                const otherDetails = otherCard.querySelector('.service-details');
                const otherBtn = otherCard.querySelector('.expand-btn');
                
                if (otherCard !== card) {
                    otherDetails.classList.add('hidden');
                    otherBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    `;
                }
            });

            // Then, toggle the clicked card
            details.classList.toggle('hidden');
            
            // Update button icon
            if (!isExpanded) {
                expandBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                `;
                
                // Smooth scroll to expanded card
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                expandBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                `;
            }
        });
    });

    // Add hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            card.classList.add('transform', 'scale-105', 'transition-transform', 'duration-300');
        });

        card.addEventListener('mouseleave', function() {
            card.classList.remove('transform', 'scale-105');
        });
    });
});
