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
        if (phone.trim() === "") {
            return ""; // Empty phone number is allowed
        }
        if (!patterns.phone.test(phone)) {
            return "Please enter a valid phone number";
        }
        return "";
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

    // Setup validation for each input
    function setupInputValidation(input, errorElement, validationFn) {
        input.addEventListener('input', function() {
            const error = validationFn(this.value.trim());
            errorElement.textContent = error;
            errorElement.classList.toggle('hidden', !error);

            // Add visual feedback
            input.classList.toggle('border-red-500', !!error);
            input.classList.toggle('border-green-500', !error);
        });

        input.addEventListener('blur', function() {
            const error = validationFn(this.value.trim());
            errorElement.textContent = error;
            errorElement.classList.toggle('hidden', !error);
        });
    }

    setupInputValidation(nameInput, nameError, validateName);
    setupInputValidation(emailInput, emailError, validateEmail);
    setupInputValidation(phoneInput, phoneError, validatePhone);
    setupInputValidation(messageInput, messageError, validateMessage);

    // Form submission handler (AJAX)
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

        nameError.classList.toggle('hidden', !nameVal);
        emailError.classList.toggle('hidden', !emailVal);
        phoneError.classList.toggle('hidden', !phoneVal);
        messageError.classList.toggle('hidden', !messageVal);

        if (nameVal || emailVal || phoneVal || messageVal) {
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> Sending...`;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch("https://formsubmit.co/workhive.biz@gmail.com", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) throw new Error("Failed to send message. Please try again.");

            // Confetti effect
            const colors = ['#10B981', '#34D399', '#059669', '#047857'];
            for (let i = 0; i < 200; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-0';
            successMessage.innerHTML = `<div class="flex items-center">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg> Message sent successfully!
                </div>`;
            document.body.appendChild(successMessage);

            contactForm.reset();
            setTimeout(() => {
                successMessage.classList.add('translate-y-[-100%]');
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);

            [nameInput, emailInput, phoneInput, messageInput].forEach(input => input.classList.remove('border-green-500', 'border-red-500'));

        } catch (error) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
            errorMessage.innerHTML = `<div class="flex items-center">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg> Failed to send message. Please try again.
                </div>`;
            document.body.appendChild(errorMessage);
            setTimeout(() => errorMessage.remove(), 3000);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
});
