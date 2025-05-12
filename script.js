// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Typing effect
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    const words = ['Developer', 'Programmer', 'Coder', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove a character
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            isEnd = true;
            isDeleting = true;
            setTimeout(function() {
                type();
            }, 1500);
        } else if (isDeleting && charIndex === 0) {
            // Move to next word when deleted
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(function() {
                type();
            }, 500);
        } else {
            // Set typing speed
            let typingSpeed = isDeleting ? 80 : 120;
            
            // Slower at the end of the word
            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 1000;
            }
            
            setTimeout(function() {
                type();
            }, typingSpeed);
        }
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// Custom cursor
function initCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add a slight delay to the outline for a trailing effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 80);
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.opacity = '0.5';
            cursorDot.style.opacity = '0.5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Change header style on scroll
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Initialize AOS (Animate On Scroll) library if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}
