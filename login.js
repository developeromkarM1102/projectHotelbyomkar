// script.js (Updated to communicate with the backend)

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authContainer = document.getElementById('auth-container');
    const welcomeContainer = document.getElementById('welcome-container');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    const API_URL = 'http://localhost:3000'; // The URL of your backend

    // --- EVENT LISTENERS ---

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Handle registration form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, phone, password })
            });

            const result = await response.json();
            alert(result.message);

            if (response.ok) {
                registerForm.reset();
                showLoginLink.click();
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Could not connect to the server.');
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            
            if (response.ok) {
                sessionStorage.setItem('loggedInUser', result.username); // Use sessionStorage
                showWelcomeScreen(result.username);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Could not connect to the server.');
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser'); // End session
        authContainer.classList.remove('hidden');
        welcomeContainer.classList.add('hidden');
        loginForm.reset();
        registerForm.reset();
    });

    // --- HELPER FUNCTIONS ---

    function showWelcomeScreen(username) {
        usernameDisplay.textContent = username;
        authContainer.classList.add('hidden');
        welcomeContainer.classList.remove('hidden');
    }

    function checkLoginStatus() {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            showWelcomeScreen(loggedInUser);
        }
    }

    checkLoginStatus();
});

document.addEventListener('DOMContentLoaded', () => {

    // Get all the elements we need to work with
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    
    const showRegisterLink = document.getElementById('show-register-link');
    const showLoginLink = document.getElementById('show-login-link');

    // Add a click event to the "Register here" link
    showRegisterLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevents the link from navigating
        
        // Hide the login form and show the registration form
        loginView.classList.add('hidden');
        registerView.classList.remove('hidden');
    });

    // Add a click event to the "Login here" link
    showLoginLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevents the link from navigating

        // Hide the registration form and show the login form
        registerView.classList.add('hidden');
        loginView.classList.remove('hidden');
    });

});