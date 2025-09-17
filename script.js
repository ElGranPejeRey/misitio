// =========================================
// INITIALIZE APPLICATION
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize Google Maps
    window.initMap = initMap;
});

// =========================================
// TYPING EFFECT
// =========================================
function initTypingEffect() {
    const nameElement = document.getElementById('typing-name');
    const titleElement = document.getElementById('typing-title');
    
    const nameText = 'Erick Barrios Arias';
    const titleText = 'Diseñador web FrontEnd Junior';
    
    let nameIndex = 0;
    let titleIndex = 0;
    let isDeleting = false;
    let isNameComplete = false;
    
    function typeWriter() {
        // Type name first
        if (!isNameComplete) {
            if (!isDeleting && nameIndex < nameText.length) {
                nameElement.textContent += nameText.charAt(nameIndex);
                nameIndex++;
                setTimeout(typeWriter, 100);
            } else if (!isDeleting && nameIndex === nameText.length) {
                isNameComplete = true;
                setTimeout(typeWriter, 1000); // Pause before starting title
            }
        } 
        // Then type title
        else {
            if (!isDeleting && titleIndex < titleText.length) {
                titleElement.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeWriter, 100);
            } else if (!isDeleting && titleIndex === titleText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 2000); // Pause before deleting
            } else if (isDeleting && titleIndex > 0) {
                titleElement.textContent = titleText.substring(0, titleIndex - 1);
                titleIndex--;
                setTimeout(typeWriter, 50);
            } else if (isDeleting && titleIndex === 0) {
                isDeleting = false;
                setTimeout(typeWriter, 500); // Pause before retyping
            }
        }
    }
    
    typeWriter();
}

// =========================================
// EMAIL JS FUNCTIONALITY
// =========================================
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_1by4h6n';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
      this.reset();
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});

// =========================================
// NAVIGATION FUNCTIONALITY
// =========================================
function initNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// =========================================
// SCROLL ANIMATIONS
// =========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-form, .contact-map');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}


// =========================================
// UTILITY FUNCTIONS
// =========================================
function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    alert.style.top = '100px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';
    
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert && alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced scroll listener
window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// =========================================
// FORM VALIDATION
// =========================================
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// =========================================
// PERFORMANCE OPTIMIZATIONS
// =========================================
// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

