document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const waitlistForm = document.getElementById('waitlistForm');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            let hasError = false;
            
            // Basic input validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const company = document.getElementById('company');
            const role = document.getElementById('role');
            
            // Validate name
            if (!name.value.trim()) {
                markInvalid(name, 'Please enter your name');
                hasError = true;
            } else {
                markValid(name);
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                markInvalid(email, 'Please enter a valid email address');
                hasError = true;
            } else {
                markValid(email);
            }
            
            // Validate company
            if (!company.value.trim()) {
                markInvalid(company, 'Please enter your company name');
                hasError = true;
            } else {
                markValid(company);
            }
            
            // Validate role
            if (!role.value.trim()) {
                markInvalid(role, 'Please enter your job role');
                hasError = true;
            } else {
                markValid(role);
            }
            
            if (hasError) {
                e.preventDefault();
            }
        });
    }
    
    // Utility functions for form validation
    function markInvalid(element, message) {
        element.classList.add('is-invalid');
        
        // Create or update feedback element
        let feedback = element.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            element.parentNode.insertBefore(feedback, element.nextSibling);
        }
        feedback.textContent = message;
    }
    
    function markValid(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        
        // Remove any existing feedback
        const feedback = element.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.remove();
        }
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
});
