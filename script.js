// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize animation observer
    initAnimationObserver();
    
    // Add interactive hover effects
    addInteractiveEffects();
    
    // Initialize typing effect for tagline (subtle)
    initTypingEffect();
    
    // Add scroll-triggered animations
    initScrollAnimations();
});

// Intersection Observer for fade-in animations
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Add interactive effects to various elements
function addInteractiveEffects() {
    // Enhanced hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Interactive skill tags
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(44, 51, 51, 0.15)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(44, 51, 51, 0.08)';
        });
    });
    
    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Quick facts animation on hover
    const facts = document.querySelectorAll('.fact');
    facts.forEach(fact => {
        fact.addEventListener('mouseenter', function() {
            const number = this.querySelector('.fact-number');
            number.style.transform = 'scale(1.1)';
            number.style.color = '#ffffff';
        });
        
        fact.addEventListener('mouseleave', function() {
            const number = this.querySelector('.fact-number');
            number.style.transform = 'scale(1)';
            number.style.color = '#ffffff';
        });
    });
}

// Subtle typing effect for the tagline
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const originalText = tagline.textContent;
    tagline.textContent = '';
    
    let index = 0;
    const speed = 50; // milliseconds per character
    
    setTimeout(() => {
        const typeWriter = setInterval(() => {
            if (index < originalText.length) {
                tagline.textContent += originalText.charAt(index);
                index++;
            } else {
                clearInterval(typeWriter);
                // Add a subtle cursor blink effect
                tagline.insertAdjacentHTML('beforeend', '<span class="cursor">|</span>');
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    const cursor = tagline.querySelector('.cursor');
                    if (cursor) cursor.remove();
                }, 3000);
            }
        }, speed);
    }, 1500); // Start typing after 1.5 seconds
}

// Add CSS for cursor animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        animation: blink 1s infinite;
        font-weight: 300;
        color: var(--sage-primary);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// Scroll-triggered animations
function initScrollAnimations() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Parallax effect for hero sidebar
        const heroSidebar = document.querySelector('.hero-sidebar');
        if (heroSidebar) {
            const scrolled = scrollTop * 0.3;
            heroSidebar.style.transform = `translateY(${scrolled}px)`;
        }
        
        // Subtle header shrink effect (if we had a fixed header)
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroHeight = hero.offsetHeight;
            if (scrollTop > heroHeight * 0.8) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Add progressive loading for images (if any are added later)
function initProgressiveImageLoading() {
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
}

// Utility function to add staggered animation delays
function staggerAnimations(selector, baseDelay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.style.animationDelay = `${baseDelay * index}ms`;
    });
}

// Initialize staggered animations for various elements
document.addEventListener('DOMContentLoaded', function() {
    staggerAnimations('.project-card', 200);
    staggerAnimations('.skill', 50);
    staggerAnimations('.cert-item', 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Enable keyboard navigation for interactive elements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add CSS for keyboard navigation
const keyboardNavStyle = document.createElement('style');
keyboardNavStyle.textContent = `
    .keyboard-nav .btn-primary:focus,
    .keyboard-nav .btn-secondary:focus,
    .keyboard-nav .contact-item:focus,
    .keyboard-nav .skill:focus {
        outline: 3px solid var(--sage-primary);
        outline-offset: 2px;
    }
    
    .keyboard-nav *:focus {
        outline-color: var(--sage-primary);
    }
`;
document.head.appendChild(keyboardNavStyle);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add rainbow animation to the name
    const name = document.querySelector('.name');
    if (name) {
        name.style.animation = 'rainbow 2s ease-in-out infinite';
        
        // Add rainbow animation CSS
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { color: #ff0000; }
                16% { color: #ff8000; }
                33% { color: #ffff00; }
                50% { color: #00ff00; }
                66% { color: #0080ff; }
                83% { color: #8000ff; }
                100% { color: #ff0000; }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        // Remove animation after 6 seconds
        setTimeout(() => {
            name.style.animation = '';
            rainbowStyle.remove();
        }, 6000);
    }
}