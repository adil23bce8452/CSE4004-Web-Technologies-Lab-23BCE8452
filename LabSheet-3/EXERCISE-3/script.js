    const surveyData = [
        {
            id: "q1",
            type: "text",
            label: "What is your full name?",
            required: true,
            minLength: 3
        },
        {
            id: "q2",
            type: "radio",
            label: "How would you rate the course difficulty?",
            options: ["Easy", "Moderate", "Challenging"],
            required: true
        },
        {
            id: "q3",
            type: "checkbox",
            label: "Which topics did you enjoy? (Select at least 2)",
            options: ["JavaScript", "DOM Manipulation", "CSS Grid", "API Integration"],
            required: true,
            minSelection: 2
        }
    ];

    const container = document.getElementById('questionsContainer');
    const form = document.getElementById('dynamicSurvey');

    function buildSurvey() {
        surveyData.forEach(q => {
            const block = document.createElement('div');
            block.className = 'question-block';
            block.id = `block-${q.id}`;

            const label = document.createElement('label');
            label.className = 'label';
            label.innerHTML = `${q.label} ${q.required ? '<span style="color:red">*</span>' : ''}`;
            block.appendChild(label);

            if (q.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = q.id;
                input.placeholder = "Your answer...";
                block.appendChild(input);
            } 
            else if (q.type === 'radio' || q.type === 'checkbox') {
                const group = document.createElement('div');
                group.className = 'options-group';
                q.options.forEach(opt => {
                    const optLabel = document.createElement('label');
                    optLabel.innerHTML = `
                        <input type="${q.type}" name="${q.id}" value="${opt}">
                        ${opt}
                    `;
                    group.appendChild(optLabel);
                });
                block.appendChild(group);
            }

            const error = document.createElement('div');
            error.className = 'error-msg';
            error.id = `error-${q.id}`;
            block.appendChild(error);

            container.appendChild(block);
        });
    }

    function validateSurvey() {
        let isFormValid = true;

        surveyData.forEach(q => {
            const block = document.getElementById(`block-${q.id}`);
            const errorEl = document.getElementById(`error-${q.id}`);
            let isValid = true;
            let message = "";

            if (q.type === 'text') {
                const val = document.getElementById(q.id).value.trim();
                if (q.required && !val) {
                    isValid = false;
                    message = "This field is required.";
                } else if (val && val.length < q.minLength) {
                    isValid = false;
                    message = `Minimum ${q.minLength} characters required.`;
                }
            } 
            else if (q.type === 'radio') {
                const checked = document.querySelector(`input[name="${q.id}"]:checked`);
                if (q.required && !checked) {
                    isValid = false;
                    message = "Please select one option.";
                }
            } 
            else if (q.type === 'checkbox') {
                const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
                if (q.required && checkedCount < q.minSelection) {
                    isValid = false;
                    message = `Please select at least ${q.minSelection} options.`;
                }
            }

            if (!isValid) {
                block.classList.add('error-border');
                errorEl.textContent = message;
                errorEl.classList.add('show');
                isFormValid = false;
            } else {
                block.classList.remove('error-border');
                errorEl.classList.remove('show');
            }
        });

        return isFormValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateSurvey()) {
            alert("Survey submitted successfully! Thank you.");
            form.reset();
        }
    });

    buildSurvey();