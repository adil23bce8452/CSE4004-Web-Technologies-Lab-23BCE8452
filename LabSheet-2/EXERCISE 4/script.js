const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

document.addEventListener('DOMContentLoaded', displayUsers);

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const password = document.getElementById('password').value;

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.some(user => user.email === email);
    if (exists) {
        alert("This email is already registered.");
        return;
    }

    const newUser = { name, email, mobile, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    userForm.reset();
    displayUsers();
});

function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
            </tr>
        `;
        userList.innerHTML += row;
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

function clearAll() {
    if (confirm("Are you sure you want to delete all users?")) {
        localStorage.clear();
        displayUsers();
    }
}