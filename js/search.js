document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const servicesContainer = document.getElementById('services-container');
    const serviceCards = document.querySelectorAll('.service-card');

    if (!searchInput || !servicesContainer) return;

    let searchTimeout;
    let isSearchActive = false;

    // Toggle search on icon click
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            isSearchActive = !isSearchActive;
            searchContainer.classList.toggle('active');
            if (isSearchActive) {
                searchInput.focus();
            }
        });
    }

    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();

            serviceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const content = `${title} ${description}`;

                if (searchTerm === '' || content.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Add fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });

            // Show "no results" message if needed
            const visibleCards = [...serviceCards].filter(card => card.style.display !== 'none');
            const noResultsMessage = document.getElementById('no-results-message');

            if (visibleCards.length === 0) {
                if (!noResultsMessage) {
                    const message = document.createElement('div');
                    message.id = 'no-results-message';
                    message.className = 'text-center py-8 text-gray-600 animate-fade-in';
                    message.textContent = 'No services found matching your search.';
                    servicesContainer.appendChild(message);
                }
            } else if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }, 300); // Debounce search for better performance
    });

    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isSearchActive) {
            isSearchActive = false;
            searchContainer.classList.remove('active');
            searchInput.value = '';
            // Show all cards
            serviceCards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    });

    // Add transition styles
    serviceCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});