/**
 * ZEN DEV STUDIO - Coming Soon Landing Page
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletter();
    initializeSmoothScroll();
    initializeNavbarInteraction();
});

/**
 * Initialize Newsletter Form
 * Handles email subscription with basic validation
 */
function initializeNewsletter() {
    const form = document.getElementById('newsletterForm');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(function() {
            showFormMessage('Thank you! Check your email for confirmation.', 'success');
            emailInput.value = '';
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display form message (success or error)
 * @param {string} message - Message to display
 * @param {string} type - Message type: 'success' or 'error'
 */
function showFormMessage(message, type) {
    // Remove existing message if present
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 6px;
        text-align: center;
        font-size: 0.95rem;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
            ? 'background-color: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9;' 
            : 'background-color: #ffebee; color: #c62828; border: 1px solid #ffcdd2;'
        }
    `;
    
    // Insert message after form
    const form = document.getElementById('newsletterForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove success message after 4 seconds
    if (type === 'success') {
        setTimeout(function() {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                messageDiv.remove();
            }, 300);
        }, 4000);
    }
}

/**
 * Initialize smooth scroll behavior
 * Enhances navigation link clicks with smooth scrolling
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize navbar interaction
 * Adds visual feedback on scroll and mobile menu
 */
function initializeNavbarInteraction() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(44, 47, 51, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 12px rgba(44, 47, 51, 0.08)';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarToggler.click();
            }
        }
    });
}

/**
 * Add CSS animations to document
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add animation styles on page load
addAnimationStyles();

/**
 * Optional: Add intersection observer for fade-in animations on scroll
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations
initializeScrollAnimations();
