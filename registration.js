// Registration Page JavaScript

// Theme Toggle Support
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

// Get club from URL parameter
function getClubFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('club') || 'our';
}

// Club names mapping
const clubNames = {
    'coding': 'Coding Club',
    'ai': 'AI Club',
    'webdev': 'WebDev Club',
    'literary': 'Literary Club',
    'research': 'Research Club',
    'our': 'Our Club'
};

// Set club title on page load
window.addEventListener('load', () => {
    const club = getClubFromURL();
    const clubTitle = document.getElementById('clubTitle');
    clubTitle.textContent = clubNames[club] || 'Our Club';
});

// Photo Upload Preview
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photoPreview');

photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showFeedback('Photo size must be less than 5MB', 'error');
            photoInput.value = '';
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showFeedback('Please select a valid image file', 'error');
            photoInput.value = '';
            return;
        }

        // Read and display the file
        const reader = new FileReader();
        reader.onload = (event) => {
            photoPreview.src = event.target.result;
            photoPreview.style.opacity = '1';
        };
        reader.readAsDataURL(file);
    }
});

// Form Submission
const registrationForm = document.getElementById('registrationForm');
const feedback = document.getElementById('form-feedback');

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate form
    if (!registrationForm.checkValidity()) {
        showFeedback('Please fill in all required fields', 'error');
        return;
    }

    // Check if photo is uploaded
    if (!photoInput.files.length) {
        showFeedback('Please upload a photo', 'error');
        return;
    }

    // Check if terms are agreed
    if (!document.getElementById('termsAgree').checked) {
        showFeedback('Please agree to the terms and conditions', 'error');
        return;
    }

    // Collect form data
    const formData = new FormData(registrationForm);
    const club = getClubFromURL();
    
    const registrationData = {
        club: club,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        rollNumber: formData.get('rollNumber'),
        semester: formData.get('semester'),
        department: formData.get('department'),
        skills: formData.get('skills'),
        motivation: formData.get('motivation'),
        photo: photoInput.files[0].name,
        registeredAt: new Date().toISOString()
    };

    // Log data (in real app, would send to backend)
    console.log('Registration Data:', registrationData);
    
    // Store in localStorage as demo
    const registrations = JSON.parse(localStorage.getItem('clubRegistrations') || '[]');
    registrations.push(registrationData);
    localStorage.setItem('clubRegistrations', JSON.stringify(registrations));

    // Show success message
    showFeedback('Registration successful! Welcome to ' + clubNames[club], 'success');
    
    // Reset form
    setTimeout(() => {
        registrationForm.reset();
        photoPreview.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="40" fill="%23666"%3E📷%3C/text%3E%3C/svg%3E';
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'clubs.html';
        }, 2000);
    }, 1000);
});

// Feedback function
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            feedback.className = 'feedback';
        }, 5000);
    }
}

// Real-time validation for email
document.getElementById('email').addEventListener('blur', (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '';
    }
});

// Real-time validation for phone
document.getElementById('phone').addEventListener('blur', (e) => {
    const phone = e.target.value;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    
    if (phone && !phoneRegex.test(phone)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '';
    }
});
