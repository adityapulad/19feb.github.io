// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.checked = true;
}

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

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate inputs
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login (in a real app, this would send to a backend)
    console.log('Login attempt:', {
        email: email,
        password: '***',
        remember: remember
    });
    
    // Show success message
    alert('Login successful! Welcome back to Valyrian Variables.');
    
    // Redirect to home page
    window.location.href = 'index.html';
});

// Add smooth focus effects
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});
