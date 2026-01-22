let currentStep = 1;
const totalSteps = 4;
const userData = {}; 

const titles = [
    "Account Setup",
    "Personal Information",
    "Professional Background",
    "Final Review"
];

function validate() {
    document.querySelectorAll('[id^="err-"]').forEach(el => el.textContent = "");
    
    if (currentStep === 1) {
        const user = document.getElementById('username').value.trim();
        const mail = document.getElementById('email').value.trim();
        if (user.length < 4) {
            document.getElementById('err-username').textContent = "Username too short.";
            return false;
        }
        if (!mail.includes("@")) {
            document.getElementById('err-email').textContent = "Invalid email format.";
            return false;
        }
    } 
    else if (currentStep === 2) {
        const name = document.getElementById('fullname').value.trim();
        if (name === "") {
            document.getElementById('err-fullname').textContent = "Name is required.";
            return false;
        }
    } 
    else if (currentStep === 3) {
        const exp = document.getElementById('experience').value;
        if (exp === "" || exp < 0) {
            document.getElementById('err-experience').textContent = "Valid experience required.";
            return false;
        }
    }
    return true;
}

function move(step) {
    if (step === 1 && !validate()) return;

    const inputs = document.querySelectorAll(`#stage${currentStep} input`);
    inputs.forEach(input => userData[input.id] = input.value);

    currentStep += step;

    if (currentStep > totalSteps) {
        alert("Form Submitted Successfully!\n" + JSON.stringify(userData));
        return;
    }

    updateDisplay();
}

function updateDisplay() {
    for (let i = 1; i <= totalSteps; i++) {
        const stage = document.getElementById(`stage${i}`);
        if (i === currentStep) {
            stage.style.display = "block";
        } else {
            stage.style.display = "none";
        }
    }

    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + "%";
    
    document.getElementById('stageTitle').textContent = `Step ${currentStep}: ${titles[currentStep-1]}`;
    document.getElementById('prevBtn').disabled = (currentStep === 1);
    document.getElementById('nextBtn').textContent = (currentStep === totalSteps) ? "Submit" : "Next";

    if (currentStep === 4) {
        const review = document.getElementById('reviewArea');
        review.innerHTML = "";
        for (const [key, value] of Object.entries(userData)) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${value}`;
            review.appendChild(p);
        }
    }
}