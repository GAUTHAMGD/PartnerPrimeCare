// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeCounters();
    initializeServiceCards();
    initializeTestimonialSlider();
    initializeContactForm();
    initializeFAQ();
    initializeFormSteps();
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Set current year in footer
    document.querySelector('.copyright').innerHTML = 
        document.querySelector('.copyright').innerHTML.replace('2025', new Date().getFullYear());
});

// Navigation
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.trust-count, .stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Service Cards with Modal
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const pricingModal = document.getElementById('pricingModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    
    // Service data
    const serviceDetails = {
        'elder-care': {
            title: 'Elder Care',
            description: '24/7 compassionate support for your loved ones',
            pricing: [
                {
                    title: '24 Hours Live-in Care',
                    price: '₹1000',
                    period: 'per 24 hours',
                    features: [
                        'Friendly companionship to keep seniors engaged',
                        'Assistance with Toileting & Diaper Change',
                        'Bathing & Hygiene Support',
                        'Walking / Cycling Partner',
                        'Feeding Support',
                        'Mobility & Bedside Assistance',
                        'Lifting & Positioning',
                        'Dedicated Overnight Care',
                        '24 hours Assistance',
                        'Companionship & Engagement'
                    ]
                },
                {
                    title: '24 Hours Live-in Care (Premium)',
                    price: '₹1250',
                    period: 'per 24 hours',
                    features: [
                        'Enhanced companionship with additional support',
                        'All basic services included',
                        'Medication Management',
                        'Therapy Session Assistance',
                        'Family Update Reports',
                        'Emergency Response Training',
                        'Nutrition Planning Support',
                        'Memory Care Activities'
                    ]
                }
            ],
            note: 'Additional: Meals for caregiver ₹150/day (if not provided)'
        },
        'special-child': {
            title: 'Special Child Care',
            description: 'Specialized care for children with unique needs',
            pricing: [
                {
                    title: 'Hourly Care',
                    price: '₹300',
                    period: 'per hour'
                },
                {
                    title: 'Shift-Based Care',
                    price: '₹1000',
                    period: 'per 12 hours'
                }
            ],
            features: [
                'Therapy Appointments Support',
                'School/Tuition Drop & Pick',
                'Behavioral Activity Support',
                'Walks & Sensory Time',
                'Family Outing Companion',
                'Outdoor Play Assistance',
                'Mobility and Lifting Help',
                'Educational Tech Support',
                'Temple/Park Visits',
                'Storytelling/Play Partner',
                'Overnight Child Companion'
            ]
        },
        'physically-challenged': {
            title: 'Physically Challenged Care',
            description: 'Mobility and daily living assistance with dignity',
            pricing: [
                {
                    title: 'Hourly Support',
                    price: '₹250',
                    period: 'per hour'
                },
                {
                    title: 'Shift Care',
                    price: '₹1000',
                    period: 'per 12 hours'
                }
            ],
            features: [
                'Mobility Assistance (Wheelchair, Walker, etc.)',
                'Personal Hygiene Support',
                'Assistive Device Handling',
                'Hospital/Clinic Visits',
                'Tech Help for Accessibility',
                'Daily Routine Support',
                'Friendly Conversations & Emotional Support'
            ]
        },
        'blind-care': {
            title: 'Blind Care Services',
            description: 'Guided support for independent living',
            pricing: [
                {
                    title: 'Companion Services',
                    price: '₹200',
                    period: 'per hour'
                },
                {
                    title: 'Caretaker Services',
                    price: '₹900',
                    period: 'per 12 hours'
                }
            ],
            features: [
                'Guided Local Travel Companion',
                'Mobility & Navigation Assistance',
                'Errand Assistance',
                'Hospital/Clinic Visits',
                'Tech Help (Smartphones, Voice Assistants)',
                'Medication Reminders',
                'Audio Book Reading & Descriptions',
                'Emotional Support & Companionship'
            ]
        },
        'caregiving': {
            title: 'Caregiving',
            description: 'Day or night support tailored to your needs',
            pricing: [
                {
                    title: 'Reliable Day or Night Support',
                    price: '₹1000',
                    period: 'per 12 hours shift'
                }
            ],
            features: [
                'Toileting & Diaper Changing Support',
                'Bathing & Personal Hygiene Assistance',
                'Personal Grooming Support',
                'Mobility Assistance',
                'Meal Feeding & Nutrition',
                'Medication Reminders',
                'Daily Living Assistance',
                'Elder\'s Room Housekeeping',
                'Companionship & Emotional Support'
            ]
        },
        'travel-support': {
            title: 'Travel Support Executive',
            description: 'Complete travel assistance and coordination',
            pricing: [
                {
                    title: 'Complete Travel Assistance',
                    price: '₹1500',
                    period: 'per 24 hours'
                }
            ],
            features: [
                'Flight/Train/Bus Ticket Booking',
                'Hotel Arrangements',
                'Cab Services Coordination',
                'Trip Planning & Itinerary',
                'Emergency Support During Travel',
                'Document Assistance',
                'Making travel easy, safe, and tension-free'
            ]
        },
        'people-support': {
            title: 'People Support Executive',
            description: 'Your All-in-One Support Partner',
            pricing: [
                {
                    title: 'Comprehensive Support',
                    price: '₹200',
                    period: 'per hour'
                }
            ],
            features: [
                'Errands and Appointments',
                'Shopping Assistance',
                'Documentation Support',
                'Daily Life Coordination',
                'Family Support Services',
                'Event Planning Assistance'
            ]
        }
    };
    
    // Open modal with service details
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            const service = serviceDetails[serviceType];
            
            if (service) {
                // Build modal content
                let modalContent = `
                    <h2 class="modal-service-title">${service.title}</h2>
                    <p class="modal-service-description">${service.description}</p>
                    
                    <div class="modal-pricing-section">
                `;
                
                // Add pricing cards
                service.pricing.forEach((price, index) => {
                    modalContent += `
                        <div class="pricing-card ${index === 0 ? 'basic' : 'premium'}">
                            <h3 class="pricing-card-title">${price.title}</h3>
                            <div class="pricing-card-price">
                                <span class="price-amount">${price.price}</span>
                                <span class="price-period">${price.period}</span>
                            </div>
                            ${price.features ? `
                                <ul class="pricing-features">
                                    ${price.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            ` : ''}
                            <button class="btn btn-primary enquire-btn" data-service="${serviceType}">
                                Enquire Now
                            </button>
                        </div>
                    `;
                });
                
                modalContent += `</div>`;
                
                // Add features if available
                if (service.features) {
                    modalContent += `
                        <div class="service-features">
                            <h3>Services Included:</h3>
                            <div class="features-grid">
                                ${service.features.map(feature => `
                                    <div class="feature-item">
                                        <i class="fas fa-check"></i>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
                
                // Add note if available
                if (service.note) {
                    modalContent += `
                        <div class="service-note">
                            <i class="fas fa-info-circle"></i>
                            <span>${service.note}</span>
                        </div>
                    `;
                }
                
                modalBody.innerHTML = modalContent;
                pricingModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add event listeners to enquiry buttons
                document.querySelectorAll('.enquire-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const serviceType = this.getAttribute('data-service');
                        pricingModal.classList.remove('active');
                        document.body.style.overflow = '';
                        
                        // Scroll to contact form and pre-fill service
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                        
                        // Check the corresponding service checkbox
                        const serviceCheckbox = document.querySelector(`input[value="${serviceType}"]`);
                        if (serviceCheckbox) {
                            serviceCheckbox.checked = true;
                        }
                    });
                });
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        pricingModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    pricingModal.addEventListener('click', (e) => {
        if (e.target === pricingModal) {
            pricingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pricingModal.classList.contains('active')) {
            pricingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    
    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialCards.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = testimonialCards.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Auto-slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startInterval();
    });
    
    // Initialize
    startInterval();
}

// Contact Form with Multi-step
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const submitText = submitBtn.querySelector('.submit-text');
        const spinner = submitBtn.querySelector('.loading-spinner');
        
        submitText.style.display = 'none';
        spinner.style.display = 'block';
        
        // Simulate API call (replace with actual API integration)
        setTimeout(() => {
            // Show success message
            alert('Thank you! Your enquiry has been submitted successfully. We\'ll contact you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            showStep(0);
            
            // Reset button
            submitText.style.display = 'block';
            spinner.style.display = 'none';
        }, 2000);
    });
    
    // Form validation
    function validateStep(stepId) {
        const step = document.getElementById(stepId);
        const inputs = step.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                highlightError(input);
            } else {
                removeError(input);
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    highlightError(input, 'Please enter a valid email address');
                }
            }
            
            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
                    isValid = false;
                    highlightError(input, 'Please enter a valid 10-digit phone number');
                }
            }
        });
        
        return isValid;
    }
    
    function highlightError(input, message = 'This field is required') {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        // Remove existing error message
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
    
    // Real-time input validation
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                highlightError(input);
            } else {
                removeError(input);
            }
        });
        
        input.addEventListener('input', () => {
            removeError(input);
        });
    });
}

// Form Step Navigation
function initializeFormSteps() {
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    let currentStep = 0;
    
    function showStep(stepIndex) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        document.querySelectorAll('.form-step')[stepIndex].classList.add('active');
        
        // Update progress bar
        const progressPercentage = ((stepIndex + 1) / 4) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update review details on step 4
        if (stepIndex === 3) {
            updateReviewDetails();
        }
        
        currentStep = stepIndex;
    }
    
    function updateReviewDetails() {
        const reviewDetails = document.getElementById('reviewDetails');
        const formData = new FormData(document.getElementById('contactForm'));
        
        let reviewHTML = `
            <div class="review-section">
                <h4>Personal Details</h4>
                <p><strong>Name:</strong> ${formData.get('name') || 'Not provided'}</p>
                <p><strong>Phone:</strong> ${formData.get('phone') || 'Not provided'}</p>
                <p><strong>Email:</strong> ${formData.get('email') || 'Not provided'}</p>
                <p><strong>City:</strong> ${formData.get('city') || 'Not provided'}</p>
            </div>
            
            <div class="review-section">
                <h4>Service Selection</h4>
        `;
        
        const services = [];
        formData.getAll('service').forEach(service => {
            const serviceNames = {
                'elder-care': 'Elder Care',
                'special-child': 'Special Child Care',
                'physically-challenged': 'Physically Challenged Care',
                'blind-care': 'Blind Care Services',
                'caregiving': 'Caregiving',
                'travel-support': 'Travel Support Executive',
                'people-support': 'People Support Executive'
            };
            services.push(serviceNames[service] || service);
        });
        
        reviewHTML += `<p>${services.join(', ') || 'No services selected'}</p>`;
        reviewHTML += `<p><strong>Start Date:</strong> ${formData.get('start-date') || 'Not specified'}</p>`;
        
        reviewHTML += `
            </div>
            
            <div class="review-section">
                <h4>Additional Information</h4>
                <p><strong>Message:</strong> ${formData.get('message') || 'No message'}</p>
                <p><strong>Contact Method:</strong> ${formData.get('contact-method') || 'Phone Call'}</p>
                <p><strong>Best Time to Call:</strong> ${formData.get('best-time') || 'Anytime'}</p>
            </div>
        `;
        
        reviewDetails.innerHTML = reviewHTML;
    }
    
    // Next button event listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStepId = this.closest('.form-step').id;
            const nextStepId = this.getAttribute('data-next');
            
            // Validate current step
            if (validateStep(currentStepId)) {
                const nextStepIndex = Array.from(document.querySelectorAll('.form-step')).findIndex(
                    step => step.id === nextStepId
                );
                showStep(nextStepIndex);
            }
        });
    });
    
    // Previous button event listeners
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStepId = this.getAttribute('data-prev');
            const prevStepIndex = Array.from(document.querySelectorAll('.form-step')).findIndex(
                step => step.id === prevStepId
            );
            showStep(prevStepIndex);
        });
    });
    
    // Form validation helper
    function validateStep(stepId) {
        const step = document.getElementById(stepId);
        const requiredInputs = step.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--coral)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        return isValid;
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-card, .area-card, .step-card').forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for modal and animations
const style = document.createElement('style');
style.textContent = `
    .service-card.animated {
        animation: fadeInUp 0.6s ease;
    }
    
    .feature-card.animated {
        animation: fadeInUp 0.6s ease;
    }
    
    .area-card.animated {
        animation: fadeInUp 0.6s ease;
    }
    
    .step-card.animated {
        animation: fadeInUp 0.6s ease;
    }
    
    .modal-service-title {
        font-size: 2.5rem;
        color: var(--primary-blue);
        margin-bottom: var(--space-sm);
    }
    
    .modal-service-description {
        font-size: 1.2rem;
        color: var(--charcoal);
        margin-bottom: var(--space-lg);
        opacity: 0.8;
    }
    
    .modal-pricing-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-lg);
        margin-bottom: var(--space-xl);
    }
    
    .pricing-card {
        background: var(--cream);
        border-radius: var(--radius-md);
        padding: var(--space-lg);
        text-align: center;
        transition: all var(--transition-normal);
    }
    
    .pricing-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .pricing-card.basic {
        border: 2px solid var(--primary-blue);
    }
    
    .pricing-card.premium {
        border: 2px solid var(--gold);
    }
    
    .pricing-card-title {
        font-size: 1.3rem;
        color: var(--primary-blue);
        margin-bottom: var(--space-md);
    }
    
    .pricing-card-price {
        margin-bottom: var(--space-lg);
    }
    
    .price-amount {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--coral);
        display: block;
    }
    
    .price-period {
        color: var(--charcoal);
        opacity: 0.8;
    }
    
    .pricing-features {
        list-style: none;
        text-align: left;
        margin-bottom: var(--space-lg);
    }
    
    .pricing-features li {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    
    .pricing-features li:last-child {
        border-bottom: none;
    }
    
    .service-features {
        margin-bottom: var(--space-lg);
    }
    
    .service-features h3 {
        font-size: 1.5rem;
        color: var(--primary-blue);
        margin-bottom: var(--space-md);
    }
    
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-sm);
    }
    
    .feature-item {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: 0.5rem;
        background: var(--cream);
        border-radius: var(--radius-sm);
    }
    
    .feature-item i {
        color: var(--sage-green);
    }
    
    .service-note {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        padding: var(--space-md);
        background: #FFF9E6;
        border-left: 4px solid var(--gold);
        border-radius: var(--radius-sm);
    }
    
    .service-note i {
        color: var(--gold);
    }
    
    .review-section {
        margin-bottom: var(--space-lg);
        padding: var(--space-md);
        background: var(--cream);
        border-radius: var(--radius-md);
    }
    
    .review-section h4 {
        color: var(--primary-blue);
        margin-bottom: var(--space-sm);
    }
    
    .review-section p {
        margin-bottom: 0.5rem;
    }
    
    .loading-spinner {
        display: none;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--radius-full);
        border-top-color: var(--pure-white);
        animation: spin 1s ease infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: var(--coral) !important;
    }
    
    .error-message {
        color: var(--coral);
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(style);