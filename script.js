// 0. Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.checked = true;
}

// Update icon
function updateToggleIcon() {
    const toggleIcon = document.querySelector('.toggle-icon');
    if (document.body.classList.contains('light-mode')) {
        toggleIcon.textContent = '☀️';
    } else {
        toggleIcon.textContent = '🌙';
    }
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
    updateToggleIcon();
});

updateToggleIcon();

// 1. Scroll Reveal Animations
const revealElements = document.querySelectorAll('.section-reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// 2. Mobile Nav Toggle (Simple Implementation)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        // Toggle display (in a real app, you'd animate a mobile menu)
        if(navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.right = '20px';
            navLinks.style.background = 'var(--bg-surface)';
            navLinks.style.padding = '20px';
            navLinks.style.borderRadius = '12px';
            navLinks.style.border = '1px solid var(--border-color)';
        }
    });
}

// 3. Form Validation with Sleek UI Feedback
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
        feedback.textContent = 'Please fill out all fields.';
        feedback.style.color = '#ef4444'; // Red error
        return;
    }
    
    // Success simulation
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        feedback.textContent = 'Payload delivered successfully.';
        feedback.style.color = '#10b981'; // Green success
        btn.textContent = originalText;
        btn.style.opacity = '1';
        form.reset();
        
        // Remove message after 4 seconds
        setTimeout(() => {
            feedback.textContent = '';
        }, 4000);
    }, 1500);
});