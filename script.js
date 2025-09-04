// Simple counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number span:first-child');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Intersection Observer for counter animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

// Only observe if the counter section exists (mainly on home page)
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    observer.observe(counterSection);
}

// Load footer from separate file
function loadFooter() {
    console.log('Loading footer...');
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) {
        console.error('Footer placeholder not found!');
        return;
    }
    
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log('Footer content loaded:', data.substring(0, 100) + '...');
                placeholder.innerHTML = data;
                console.log('Footer loaded successfully!');
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback: create a simple footer
                placeholder.innerHTML = '<div style="background: #333; color: white; padding: 20px; text-align: center; margin-top: 2rem;">Footer loaded with fallback</div>';
            });
    }, 100);
}

// Load footer when page loads
document.addEventListener('DOMContentLoaded', loadFooter);

// Also try to load footer if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    // DOM is already loaded
    loadFooter();
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Campaign Slideshow Functionality
function initCampaignSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let totalSlides = 2; // Default for desktop (3-image slides)
    
    // Check if we're on mobile and adjust total slides
    function updateSlideCount() {
        if (window.innerWidth <= 768) {
            totalSlides = 6; // 6 mobile slides (one for each image)
            // On mobile, start with the first mobile slide (index 2)
            if (currentSlide < 2) {
                currentSlide = 2;
                showSlide(currentSlide);
            }
            // Update dot labels for mobile view
            updateDotLabels();
        } else {
            totalSlides = 2; // 2 desktop slides (3 images each)
            // On desktop, start with the first desktop slide (index 0)
            if (currentSlide >= 2) {
                currentSlide = 0;
                showSlide(currentSlide);
            }
            // Update dot labels for desktop view
            updateDotLabels();
        }
    }
    
    // Function to update dot labels based on screen size
    function updateDotLabels() {
        if (window.innerWidth <= 768) {
            // Mobile view: each dot represents one image
            dots.forEach((dot, index) => {
                const campaignNumber = index + 1;
                dot.setAttribute('title', `Campaign ${campaignNumber}`);
            });
        } else {
            // Desktop view: first two dots represent groups of images
            dots.forEach((dot, index) => {
                if (index === 0) {
                    dot.setAttribute('title', 'Campaigns 1, 2, 3');
                } else if (index === 1) {
                    dot.setAttribute('title', 'Campaigns 4, 5, 6');
                }
            });
        }
    }
    
    // Function to show a specific slide
    function showSlide(index) {
        console.log('Showing slide:', index, 'Screen width:', window.innerWidth);
        
        // Hide all slides and remove active class from dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and activate corresponding dot
        if (slides[index]) {
            slides[index].classList.add('active');
            console.log('Activated slide at index:', index);
        }
        if (dots[index]) {
            dots[index].classList.add('active');
            console.log('Activated dot at index:', index);
        }
        
        currentSlide = index;
        
        // Update slide visibility based on screen size
        if (window.innerWidth <= 768) {
            console.log('Mobile view: Managing slide visibility');
            // On mobile, ensure only mobile slides are visible
            slides.forEach((slide, i) => {
                if (i < 2) {
                    slide.style.display = 'none'; // Hide desktop slides
                    console.log('Hiding desktop slide at index:', i);
                } else {
                    slide.style.display = i === index ? 'block' : 'none'; // Show only active mobile slide
                    console.log('Mobile slide at index:', i, 'display:', i === index ? 'block' : 'none');
                }
            });
        } else {
            console.log('Desktop view: Managing slide visibility');
            // On desktop, ensure only desktop slides are visible
            slides.forEach((slide, i) => {
                if (i < 2) {
                    slide.style.display = i === index ? 'block' : 'none'; // Show only active desktop slide
                    console.log('Desktop slide at index:', i, 'display:', i === index ? 'block' : 'none');
                } else {
                    slide.style.display = 'none'; // Hide mobile slides
                    console.log('Hiding mobile slide at index:', i);
                }
            });
        }
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Add click functionality to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Add click functionality to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            let slideIndex = index;
            console.log('Dot clicked:', index, 'Screen width:', window.innerWidth);
            
            // On mobile, map the first two dots to mobile slides
            if (window.innerWidth <= 768) {
                if (index === 0) {
                    slideIndex = 2; // First dot shows first mobile slide
                    console.log('Mobile: First dot mapped to slide index:', slideIndex);
                } else if (index === 1) {
                    slideIndex = 3; // Second dot shows second mobile slide
                    console.log('Mobile: Second dot mapped to slide index:', slideIndex);
                } else {
                    console.log('Mobile: Dot', index, 'maps to slide index:', slideIndex);
                }
                // Other dots (2-5) already point to correct mobile slides
            } else {
                console.log('Desktop: Dot', index, 'maps to slide index:', slideIndex);
            }
            
            showSlide(slideIndex);
        });
    });
    
    // Auto-advance slides with different timing for mobile/desktop
    function startAutoAdvance() {
        const interval = window.innerWidth <= 768 ? 5000 : 7000; // 5s for mobile, 7s for desktop
        return setInterval(nextSlide, interval);
    }
    
    let autoAdvance = startAutoAdvance();
    
    // Pause auto-advance on hover
    const slideshow = document.querySelector('.campaign-slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });
        
        slideshow.addEventListener('mouseleave', () => {
            autoAdvance = startAutoAdvance();
        });
    }
    
    // Update slide count on window resize
    window.addEventListener('resize', () => {
        updateSlideCount();
        clearInterval(autoAdvance);
        autoAdvance = startAutoAdvance();
    });
    
    // Initialize
    updateSlideCount();
    // Start with appropriate slide based on screen size
    if (window.innerWidth <= 768) {
        showSlide(2); // Start with first mobile slide
    } else {
        showSlide(0); // Start with first desktop slide
    }
}

// Initialize campaign slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCampaignSlideshow();
    initContactForm();
});

// Also try to initialize if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCampaignSlideshow);
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    // DOM is already loaded
    initCampaignSlideshow();
    initContactForm();
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.querySelector('#contact-form form');
    if (!contactForm) return;

    // Load EmailJS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        // Initialize EmailJS
        emailjs.init('YOUR_PUBLIC_KEY'); // You'll need to replace this with your actual EmailJS public key
        
        // Add form submission handler
        contactForm.addEventListener('submit', handleFormSubmission);
    };
    document.head.appendChild(script);
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitButton = e.target.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Prepare email template parameters
    const templateParams = {
        to_email: 'fulrani.advt@gmail.com',
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        from_phone: formData.get('phone'),
        from_city: formData.get('city'),
        company_name: formData.get('company') || 'Not provided',
        message: formData.get('message'),
        subject: `New Inquiry from ${formData.get('name')} - Fulrani Website`
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage(e.target);
            e.target.reset();
        }, function(error) {
            console.log('FAILED...', error);
            showErrorMessage(e.target);
        })
        .finally(function() {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

function showSuccessMessage(form) {
    // Remove any existing messages
    const existingMessage = form.parentNode.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message success';
    messageDiv.innerHTML = `
        <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 15px; border: 1px solid #c3e6cb;">
            <strong>Thank you!</strong> Your inquiry has been sent successfully. We'll get back to you within 24 hours.
        </div>
    `;
    form.parentNode.appendChild(messageDiv);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage(form) {
    // Remove any existing messages
    const existingMessage = form.parentNode.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message error';
    messageDiv.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-top: 15px; border: 1px solid #f5c6cb;">
            <strong>Oops!</strong> There was an error sending your inquiry. Please try again or contact us directly at fulrani.advt@gmail.com
        </div>
    `;
    form.parentNode.appendChild(messageDiv);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


