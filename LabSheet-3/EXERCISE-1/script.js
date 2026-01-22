const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const skillsSection = document.getElementById('skillsSection');

const rules = {
    Student: { minAge: 16, pwRegex: /.{6,}/, pwMsg: "Min 6 characters" },
    Teacher: { minAge: 22, pwRegex: /.{8,}/, pwMsg: "Min 8 characters" },
    Admin:   { minAge: 25, pwRegex: /^(?=.*[A-Z])(?=.*\d).{10,}$/, pwMsg: "Min 10 chars, 1 Uppercase, 1 Number" }
};

roleSelect.addEventListener('change', () => {
    const role = roleSelect.value;
    skillsSection.style.display = (role === 'Admin') ? 'none' : 'block';
    validateForm(); 
});

function isValidEmail(email) {
    const allowedDomains = ['gmail.com', 'outlook.com', 'edu.in'];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

function setFeedback(inputEl, errorEl, message) {
    if (message) {
        inputEl.classList.add('invalid');
        errorEl.textContent = message;
        return false;
    } else {
        inputEl.classList.remove('invalid');
        errorEl.textContent = "";
        return true;
    }
}

function validateForm() {
    const role = roleSelect.value;
    const currentRules = rules[role];
    let isValid = true;

    const pw = document.getElementById('password').value;
    const cpw = document.getElementById('confirmPassword').value;
    
    if (!currentRules.pwRegex.test(pw)) {
        isValid &= setFeedback(document.getElementById('password'), document.getElementById('passwordError'), currentRules.pwMsg);
    } else {
        setFeedback(document.getElementById('password'), document.getElementById('passwordError'), "");
    }

    if (pw !== cpw) {
        isValid &= setFeedback(document.getElementById('confirmPassword'), document.getElementById('confirmError'), "Passwords do not match");
    } else {
        setFeedback(document.getElementById('confirmPassword'), document.getElementById('confirmError'), "");
    }

    const email = document.getElementById('email').value;
    if (email && !isValidEmail(email)) {
        isValid &= setFeedback(document.getElementById('email'), document.getElementById('emailError'), "Use a valid domain (e.g., gmail.com)");
    }

    const age = document.getElementById('age').value;
    if (age < currentRules.minAge) {
        isValid &= setFeedback(document.getElementById('age'), document.getElementById('ageError'), `Min age for ${role} is ${currentRules.minAge}`);
    }

    return isValid;
}

form.addEventListener('input', validateForm);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Registration Successful!");
    } else {
        alert("Please fix errors before submitting.");
    }
});