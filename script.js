// Lazy loading optimization
document.addEventListener('DOMContentLoaded', function() {
    // Handle lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }
});

// Global state for booking
let bookingData = {
    service: null,
    date: null,
    time: null,
    customer: {}
};

// Portfolio Modal functionality
function openPortfolioModal(category) {
    const modal = document.getElementById('portfolioModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCount = document.getElementById('modalCount');
    const modalGallery = document.getElementById('modalGallery');
    
    // Set title and count based on category
    if (category === 'blondes') {
        modalTitle.textContent = 'Blondes Portfolio';
        modalCount.textContent = '20 Photos';
        
        // Load all blonde photos
        const blondePhotos = [
            '02BDE382-EB8E-4E1B-8205-F4F7877D4B63.jpg',
            '0F894C86-49BE-4F2B-A204-4B15F70A22A0.jpg',
            'Enlight1648.jpg',
            'IMG_0072.JPG',
            'IMG_0532.JPG',
            'IMG_1196.JPG',
            'IMG_1833.JPG',
            'IMG_4375.JPG',
            'IMG_4385.JPG',
            'IMG_4389.JPG',
            'IMG_4390.JPG',
            'IMG_4393.JPG',
            'IMG_4931.JPG',
            'IMG_5585.JPG',
            'IMG_7208.JPG',
            'IMG_7364.JPG',
            'IMG_7538.JPG',
            'IMG_7591.JPG',
            'IMG_8222.JPG',
            'IMG_9745.JPG'
        ];
        
        modalGallery.innerHTML = '';
        blondePhotos.forEach(photo => {
            const img = document.createElement('img');
            img.src = `images/portfolios/blondes/${photo}`;
            img.alt = 'Blonde Hair Work';
            img.onclick = () => window.open(img.src, '_blank');
            img.style.opacity = '1'; // Override lazy loading for modal images
            modalGallery.appendChild(img);
        });
    } else if (category === 'brunettes') {
        modalTitle.textContent = 'Brunettes Portfolio';
        modalCount.textContent = '20 Photos';
        
        // Load all brunette photos
        const brunettePhotos = [
            '20230307-IMG_8807.JPG',
            '2A4CDEAA-070D-4765-95BF-8BB670D97BB2.jpg',
            '732EC870-E42E-4AF1-8B08-B045123126A0.jpg',
            '9371986B-AA78-4E87-B4DC-A77CBAB83DA3.jpg',
            'Enlight1320.jpg',
            'Enlight1366.jpg',
            'Enlight1567.jpg',
            'IMG_0484.JPG',
            'IMG_1255.jpeg',
            'IMG_1895.jpeg',
            'IMG_2473.jpeg',
            'IMG_2805.JPG',
            'IMG_2857.JPG',
            'IMG_4062.JPG',
            'IMG_4158.JPG',
            'IMG_4767.jpeg',
            'IMG_5682.JPG',
            'IMG_6804.JPG',
            'IMG_7544.JPG',
            'PopPic00001.jpg'
        ];
        
        modalGallery.innerHTML = '';
        brunettePhotos.forEach(photo => {
            const img = document.createElement('img');
            img.src = `images/portfolios/brunettes/${photo}`;
            img.alt = 'Brunette Hair Work';
            img.onclick = () => window.open(img.src, '_blank');
            img.style.opacity = '1'; // Override lazy loading for modal images
            modalGallery.appendChild(img);
        });
    } else if (category === 'reds') {
        modalTitle.textContent = 'Reds Portfolio';
        modalCount.textContent = '5 Photos';
        
        // Load all red photos
        const redPhotos = [
            '4F2E1F91-4B26-40A5-B8C6-CD0F9C0E674B.jpg',
            'A4E2A51A-0BB4-4725-BABD-06596903B52D.jpg',
            'IMG_3641.JPG',
            'IMG_4376.jpeg',
            'IMG_7578.JPG'
        ];
        
        modalGallery.innerHTML = '';
        redPhotos.forEach(photo => {
            const img = document.createElement('img');
            img.src = `images/portfolios/reds/${photo}`;
            img.alt = 'Red Hair Work';
            img.onclick = () => window.open(img.src, '_blank');
            img.style.opacity = '1'; // Override lazy loading for modal images
            modalGallery.appendChild(img);
        });
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupPortfolioModal();
    setupChatWidget();
});

function initializeApp() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const appointmentDateElement = document.getElementById('appointmentDate');
    if (appointmentDateElement) {
        appointmentDateElement.min = today;
    }
    
    // Generate time slots
    generateTimeSlots();
    
    // Set up service selection
    setupServiceSelection();
}

function setupEventListeners() {
    // Date change handler
    const appointmentDate = document.getElementById('appointmentDate');
    if (appointmentDate) {
        appointmentDate.addEventListener('change', function() {
            bookingData.date = this.value;
            generateTimeSlots();
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only prevent default for internal links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // For external links (like photography.html), allow default behavior
        });
    });
}

function setupChatWidget() {
    const toggle = document.getElementById('chatToggle');
    const closeBtn = document.getElementById('chatClose');
    const windowEl = document.getElementById('chatWindow');
    const bodyEl = document.getElementById('chatBody');
    const quickBtns = document.querySelectorAll('.chat-qq');

    if (!toggle || !closeBtn || !windowEl || !bodyEl) return;

    const faqAnswers = {
        pricing: 'Prices vary by service: Haircut from $75, Coloring from $200, Treatments from $100. Tap Book Now to see full menu.',
        hours: 'Hours: Tue–Sat, 9:00 AM – 6:00 PM. Sun–Mon closed.',
        booking: 'You can book online via our Square page. Click any Book Now button or the floating one.',
        cancellation: 'Please cancel or reschedule at least 24 hours in advance to avoid a fee.',
        parking: 'There is free street parking nearby and a public lot one block away.',
        payment: 'We accept major credit cards, Apple Pay, and cash. No checks.',
        newclient: 'New clients are welcome! Please arrive 10 minutes early for a brief consultation.',
        late: 'If you’re more than 10 minutes late, we may need to shorten or reschedule your service.'
    };

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.textContent = text;
        bodyEl.appendChild(div);
        bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    toggle.addEventListener('click', () => {
        const isOpen = windowEl.style.display === 'block';
        windowEl.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) {
            // ensure latest content visible
            bodyEl.scrollTop = bodyEl.scrollHeight;
        }
    });

    closeBtn.addEventListener('click', () => {
        windowEl.style.display = 'none';
    });

    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-faq');
            appendMessage(btn.textContent, 'user');
            const answer = faqAnswers[key] || "I'm not sure, but you can contact us or tap Book Now.";
            setTimeout(() => appendMessage(answer, 'bot'), 200);
        });
    });

    // Open by default on mobile viewports
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    if (isMobile) {
        windowEl.style.display = 'block';
        bodyEl.scrollTop = bodyEl.scrollHeight;
    }
}

function setupPortfolioModal() {
    // Add click event to all portfolio galleries
    const portfolioGalleries = document.querySelectorAll('.portfolio-gallery');
    
    portfolioGalleries.forEach(gallery => {
        const category = gallery.getAttribute('data-category');
        
        gallery.addEventListener('click', function() {
            openPortfolioModal(category);
        });
    });
    
    // Add close event to modal
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePortfolioModal);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePortfolioModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePortfolioModal();
        }
    });
}

function setupServiceSelection() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            serviceCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Store service data
            bookingData.service = {
                name: this.querySelector('h5').textContent,
                price: this.dataset.price,
                type: this.dataset.service
            };
        });
    });
}

function generateTimeSlots() {
    const timeGrid = document.getElementById('timeGrid');
    const appointmentDateElement = document.getElementById('appointmentDate');
    
    if (!timeGrid || !appointmentDateElement) {
        return; // Exit if elements don't exist
    }
    
    const selectedDate = appointmentDateElement.value;
    
    if (!selectedDate) {
        timeGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Please select a date first</p>';
        return;
    }
    
    // Generate time slots (9 AM to 6 PM, every hour)
    const timeSlots = [];
    for (let hour = 9; hour <= 17; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        timeSlots.push(timeString);
    }
    
    // Simulate some unavailable slots (you can customize this logic)
    const unavailableSlots = getUnavailableSlots(selectedDate);
    
    timeGrid.innerHTML = timeSlots.map(time => {
        const isUnavailable = unavailableSlots.includes(time);
        const slotClass = isUnavailable ? 'time-slot unavailable' : 'time-slot';
        return `<div class="${slotClass}" data-time="${time}">${time}</div>`;
    }).join('');
    
    // Add click handlers to available time slots
    document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all slots
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Store time data
            bookingData.time = this.dataset.time;
        });
    });
}

function getUnavailableSlots(date) {
    // This is a simple simulation - in a real app, you'd check against actual bookings
    // For demo purposes, we'll make some random slots unavailable
    const unavailable = [];
    const dayOfWeek = new Date(date).getDay();
    
    // Make some slots unavailable based on day of week
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
        unavailable.push('12:00', '13:00', '14:00');
    } else {
        // Weekday - make lunch time unavailable
        unavailable.push('12:00', '13:00');
    }
    
    return unavailable;
}

function nextStep() {
    const currentStep = document.querySelector('.step.active');
    const currentStepId = currentStep.id;
    
    // Validate current step
    if (!validateCurrentStep(currentStepId)) {
        return;
    }
    
    // Hide current step
    currentStep.classList.remove('active');
    
    // Show next step
    let nextStepId;
    switch (currentStepId) {
        case 'step1':
            nextStepId = 'step2';
            break;
        case 'step2':
            nextStepId = 'step3';
            break;
        case 'step3':
            nextStepId = 'step4';
            showConfirmation();
            break;
    }
    
    if (nextStepId) {
        document.getElementById(nextStepId).classList.add('active');
    }
}

function prevStep() {
    const currentStep = document.querySelector('.step.active');
    const currentStepId = currentStep.id;
    
    // Hide current step
    currentStep.classList.remove('active');
    
    // Show previous step
    let prevStepId;
    switch (currentStepId) {
        case 'step2':
            prevStepId = 'step1';
            break;
        case 'step3':
            prevStepId = 'step2';
            break;
    }
    
    if (prevStepId) {
        document.getElementById(prevStepId).classList.add('active');
    }
}

function validateCurrentStep(stepId) {
    switch (stepId) {
        case 'step1':
            if (!bookingData.service) {
                alert('Please select a service');
                return false;
            }
            break;
        case 'step2':
            if (!bookingData.date) {
                alert('Please select a date');
                return false;
            }
            if (!bookingData.time) {
                alert('Please select a time');
                return false;
            }
            break;
        case 'step3':
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!firstName || !lastName || !phone) {
                alert('Please fill in all required fields');
                return false;
            }
            
            // Store customer data
            bookingData.customer = {
                firstName,
                lastName,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                notes: document.getElementById('notes').value
            };
            break;
    }
    return true;
}

function showConfirmation() {
    const confirmationDetails = document.getElementById('confirmationDetails');
    
    const appointmentDate = new Date(bookingData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    confirmationDetails.innerHTML = `
        <div class="confirmation-item">
            <span>Service:</span>
            <span>${bookingData.service.name}</span>
        </div>
        <div class="confirmation-item">
            <span>Date:</span>
            <span>${appointmentDate}</span>
        </div>
        <div class="confirmation-item">
            <span>Time:</span>
            <span>${bookingData.time}</span>
        </div>
        <div class="confirmation-item">
            <span>Customer:</span>
            <span>${bookingData.customer.firstName} ${bookingData.customer.lastName}</span>
        </div>
        <div class="confirmation-item">
            <span>Phone:</span>
            <span>${bookingData.customer.phone}</span>
        </div>
        ${bookingData.customer.email ? `
        <div class="confirmation-item">
            <span>Email:</span>
            <span>${bookingData.customer.email}</span>
        </div>
        ` : ''}
        <div class="confirmation-item">
            <span>Total:</span>
            <span>$${bookingData.service.price}</span>
        </div>
    `;
    
    // In a real app, you would send this data to your server
    console.log('Booking confirmed:', bookingData);
    
    // You could also save to localStorage for demo purposes
    saveBookingToStorage();
}

function saveBookingToStorage() {
    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem('tajEffectBookings') || '[]');
    
    // Add new booking with unique ID
    const newBooking = {
        id: Date.now(),
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    existingBookings.push(newBooking);
    
    // Save back to localStorage
    localStorage.setItem('tajEffectBookings', JSON.stringify(existingBookings));
}

function confirmBooking() {
    // Show loading state
    const confirmBtn = document.querySelector('#step3 .btn-primary');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Confirming...';
    confirmBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        nextStep();
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
    }, 1500);
}

function resetBooking() {
    // Reset booking data
    bookingData = {
        service: null,
        date: null,
        time: null,
        customer: {}
    };
    
    // Reset form
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.getElementById('appointmentDate').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('notes').value = '';
    
    // Go back to step 1
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    
    // Scroll to top of booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Admin functions (for managing bookings)
function viewAllBookings() {
    const bookings = JSON.parse(localStorage.getItem('tajEffectBookings') || '[]');
    console.log('All bookings:', bookings);
    return bookings;
}

function deleteBooking(bookingId) {
    const bookings = JSON.parse(localStorage.getItem('tajEffectBookings') || '[]');
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem('tajEffectBookings', JSON.stringify(updatedBookings));
}

// Utility function to format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Utility function to format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Chat Widget functionality
document.addEventListener('DOMContentLoaded', function() {
    // Chat Widget functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const chatQuickQuestions = document.querySelector('.chat-quick-questions');

    if (chatToggle && chatWindow && chatClose && chatBody && chatQuickQuestions) {
        chatToggle.addEventListener('click', function() {
            chatWindow.classList.toggle('open');
            this.setAttribute('aria-expanded', chatWindow.classList.contains('open'));
        });

        chatClose.addEventListener('click', function() {
            chatWindow.classList.remove('open');
            chatToggle.setAttribute('aria-expanded', 'false');
        });

        // Open chat by default on mobile
        if (window.innerWidth <= 600) {
            chatWindow.classList.add('open');
            chatToggle.setAttribute('aria-expanded', 'true');
        }

        chatQuickQuestions.addEventListener('click', function(e) {
            if (e.target.classList.contains('chat-qq')) {
                const question = e.target.textContent;
                const faqKey = e.target.dataset.faq;
                addMessageToChat(question, 'user');
                setTimeout(() => {
                    sendFAQResponse(faqKey);
                }, 500);
            }
        });
    }
});

function addMessageToChat(text, sender) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom
}

function sendFAQResponse(faqKey) {
    const faqs = {
        pricing: "Haircuts start at $75, coloring at $200, and treatments at $100. Special styling starts at $50. Check out our booking page for the full menu!",
        hours: "We're open Tuesday - Saturday: 9:00 AM - 6:00 PM. Closed Sundays and Mondays.",
        booking: "Super easy! Just click the 'Book Now' button anywhere on the page and you'll go straight to our booking site.",
        cancellation: "We need at least 24 hours notice for cancellations or rescheduling. Late cancellations might have a fee.",
        parking: "Yep! There's plenty of street parking, plus a public garage just one block away.",
        payment: "We take all major credit cards, Apple Pay, and cash. No checks though.",
        newclient: "Absolutely! For new clients doing color, I recommend booking a consultation first so we can make sure we get your look just right.",
        late: "Please try to be on time! If you're more than 15 minutes late, we might need to reschedule and there could be a late fee."
    };
    const response = faqs[faqKey] || "I'm sorry, I don't have an answer for that specific question. Please contact us directly for more assistance!";
    addMessageToChat(response, 'bot');
}
