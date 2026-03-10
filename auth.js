// Authentication Manager
class AuthManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentSession = this.loadSession();
        this.init();
    }

    init() {
        // Check if already logged in
        if (this.currentSession) {
            window.location.href = 'index.html';
        }
    }

    loadUsers() {
        const stored = localStorage.getItem('event_planner_users');
        return stored ? JSON.parse(stored) : [];
    }

    saveUsers() {
        localStorage.setItem('event_planner_users', JSON.stringify(this.users));
    }

    loadSession() {
        const stored = localStorage.getItem('event_planner_session');
        return stored ? JSON.parse(stored) : null;
    }

    saveSession(user) {
        localStorage.setItem('event_planner_session', JSON.stringify(user));
    }

    clearSession() {
        localStorage.removeItem('event_planner_session');
    }

    // Simple password hashing (for demo - in production use bcrypt)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[@$!%*?&#]/.test(password)) strength++;

        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    }

    register(name, email, password, confirmPassword) {
        // Validation
        if (!name || name.trim().length < 2) {
            return { success: false, message: 'Name must be at least 2 characters' };
        }

        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }

        if (!this.validatePassword(password)) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        if (password !== confirmPassword) {
            return { success: false, message: 'Passwords do not match' };
        }

        // Check if user already exists
        const existingUser = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return { success: false, message: 'An account with this email already exists' };
        }

        // Create new user
        const newUser = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name: name.trim(),
            email: email.toLowerCase(),
            password: this.hashPassword(password),
            avatar: this.getDefaultAvatar(name),
            bio: '',
            createdAt: new Date().toISOString(),
            eventsCreated: 0,
            eventsAttended: 0
        };

        this.users.push(newUser);
        this.saveUsers();

        return { success: true, message: 'Account created successfully!', user: newUser };
    }

    login(email, password, remember = false) {
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address' };
        }

        if (!password) {
            return { success: false, message: 'Please enter your password' };
        }

        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return { success: false, message: 'No account found with this email' };
        }

        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Incorrect password' };
        }

        // Create session
        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            remember: remember
        };

        this.saveSession(sessionUser);

        return { success: true, message: 'Login successful!', user: sessionUser };
    }

    getDefaultAvatar(name) {
        const colors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6', '#10b981'];
        const initial = name.charAt(0).toUpperCase();
        const colorIndex = name.charCodeAt(0) % colors.length;
        return {
            type: 'initial',
            initial: initial,
            color: colors[colorIndex]
        };
    }
}

// Initialize Auth Manager
const authManager = new AuthManager();

// UI Functions
function switchToSignup(e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function switchToLogin(e) {
    e.preventDefault();
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function checkPasswordStrength(password) {
    const strength = authManager.checkPasswordStrength(password);
    const strengthBar = document.getElementById('strengthBarFill');
    const strengthText = document.getElementById('strengthText');

    // Remove all strength classes
    strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

    switch (strength) {
        case 'weak':
            strengthBar.style.width = '33%';
            strengthBar.classList.add('strength-weak');
            strengthText.textContent = 'Weak password';
            break;
        case 'medium':
            strengthBar.style.width = '66%';
            strengthBar.classList.add('strength-medium');
            strengthText.textContent = 'Medium strength';
            break;
        case 'strong':
            strengthBar.style.width = '100%';
            strengthBar.classList.add('strength-strong');
            strengthText.textContent = 'Strong password';
            break;
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('rememberMe').checked;

    const result = authManager.login(email, password, remember);

    if (result.success) {
        showToast(result.message, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showToast(result.message, 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    const result = authManager.register(name, email, password, confirmPassword);

    if (result.success) {
        showToast('Account created successfully! Please login.', 'success');

        // Clear signup form
        document.getElementById('signupFormElement').reset();

        // Switch to login form after 1.5 seconds
        setTimeout(() => {
            switchToLogin(new Event('click'));
        }, 1500);
    } else {
        showToast(result.message, 'error');
    }
}

// Check for URL parameters (e.g., ?signup=true)
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('signup') === 'true') {
        switchToSignup(new Event('click'));
    }
});
