document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const messageError = document.getElementById('message-error');

    // Validation patterns
    const patterns = {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^[\d\s-+()]{10,}$/,
    };

    // Input validation functions
    function validateName(name) {
        if (name.length < 2) {
            return 'Name must be at least 2 characters long';
        }
        if (name.length > 50) {
            return 'Name must not exceed 50 characters';
        }
        if (!/^[a-zA-Z\s-']+$/.test(name)) {
            return 'Name contains invalid characters';
        }
        return '';
    }

    function validateEmail(email) {
        if (!patterns.email.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePhone(phone) {
        if (!patterns.phone.test(phone)) {
            return 'Please enter a valid phone number';
        }
        return '';
    }

    function validateMessage(message) {
        if (message.length < 10) {
            return 'Message must be at least 10 characters long';
        }
        if (message.length > 1000) {
            return 'Message must not exceed 1000 characters';
        }
        return '';
    }

    // Real-time validation
    function setupInputValidation(input, errorElement, validationFn) {
        input.addEventListener('input', function() {
            const error = validationFn(this.value.trim());
            errorElement.textContent = error;
            errorElement.classList.toggle('hidden', !error);
            
            // Add visual feedback
            if (error) {
                input.classList.add('border-red-500');
                input.classList.remove('border-green-500');
            } else {
                input.classList.remove('border-red-500');
                input.classList.add('border-green-500');
            }
        });

        // Validate on blur
        input.addEventListener('blur', function() {
            const error = validationFn(this.value.trim());
            errorElement.textContent = error;
            errorElement.classList.toggle('hidden', !error);
        });
    }

    // Setup validation for each input
    setupInputValidation(nameInput, nameError, validateName);
    setupInputValidation(emailInput, emailError, validateEmail);
    setupInputValidation(phoneInput, phoneError, validatePhone);
    setupInputValidation(messageInput, messageError, validateMessage);

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        const nameVal = validateName(nameInput.value.trim());
        const emailVal = validateEmail(emailInput.value.trim());
        const phoneVal = validatePhone(phoneInput.value.trim());
        const messageVal = validateMessage(messageInput.value.trim());

        // Show validation errors if any
        nameError.textContent = nameVal;
        emailError.textContent = emailVal;
        phoneError.textContent = phoneVal;
        messageError.textContent = messageVal;

        // Toggle error visibility
        nameError.classList.toggle('hidden', !nameVal);
        emailError.classList.toggle('hidden', !emailVal);
        phoneError.classList.toggle('hidden', !phoneVal);
        messageError.classList.toggle('hidden', !messageVal);

        // If there are any validation errors, stop submission
        if (nameVal || emailVal || phoneVal || messageVal) {
            return;
        }

        // Create loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;

        // Simulate form submission (replace with actual API call in production)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            // Celebration effect
            document.body.classList.add('celebrate');
            setTimeout(() => document.body.classList.remove('celebrate'), 1000);
            
            // Add celebration effect
            // Create and trigger confetti effect
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }, 250);

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-0 celebrate';
            successMessage.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Message sent successfully!
                </div>
            `;
            document.body.appendChild(successMessage);

            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('translate-y-[-100%]');
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);

            // Reset input styles
            [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
                input.classList.remove('border-green-500', 'border-red-500');
            });

        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
            errorMessage.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Failed to send message. Please try again.
                </div>
            `;
            document.body.appendChild(errorMessage);

            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.classList.add('translate-y-[-100%]');
                setTimeout(() => errorMessage.remove(), 500);
            }, 3000);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // Character counter for message
    messageInput.addEventListener('input', function() {
        const maxLength = 1000;
        const remaining = maxLength - this.value.length;
        
        let counter = this.parentElement.querySelector('.char-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'char-counter text-sm text-gray-500 mt-1';
            this.parentElement.appendChild(counter);
        }
        
        counter.textContent = `${remaining} characters remaining`;
        counter.classList.toggle('text-red-500', remaining < 50);
    });
});
