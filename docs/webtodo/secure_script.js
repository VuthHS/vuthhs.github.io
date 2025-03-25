// script.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const userApp = document.getElementById("user-app");
    const userForm = document.getElementById("user-form");
    const userList = document.getElementById("user-list");
    const logoutBtn = document.getElementById("logout-btn");
    const title = document.getElementById("title");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

    // Render users
    function renderUsers() {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${user.username}
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            `;
            userList.appendChild(li);
        });
    }

    // Save users to local storage
    function saveUsers() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Save login state to local storage
    function saveLoginState(state) {
        localStorage.setItem("isLoggedIn", JSON.stringify(state));
    }

    // Login form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            loginForm.style.display = "none";
            userApp.style.display = "block";
            title.textContent = `Welcome, ${username}`;
            isLoggedIn = true;
            saveLoginState(isLoggedIn);
            renderUsers();
        } else {
            alert("Invalid username or password");
        }
    });

    // Logout button
    logoutBtn.addEventListener("click", () => {
        loginForm.style.display = "block";
        userApp.style.display = "none";
        title.textContent = "Login";
        isLoggedIn = false;
        saveLoginState(isLoggedIn);
    });

    // Add or update user
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;

        if (newUsername && newPassword) {
            const existingUserIndex = users.findIndex(u => u.username === newUsername);
            if (existingUserIndex !== -1) {
                users[existingUserIndex].password = newPassword;
            } else {
                users.push({ username: newUsername, password: newPassword });
            }
            saveUsers();
            renderUsers();
            userForm.reset();
        }
    });

    // Edit user
    window.editUser = (index) => {
        const newUsername = prompt("Edit username:", users[index].username);
        const newPassword = prompt("Edit password:");
        if (newUsername && newPassword) {
            users[index] = { username: newUsername, password: newPassword };
            saveUsers();
            renderUsers();
        }
    };

    // Delete user
    window.deleteUser = (index) => {
        users.splice(index, 1);
        saveUsers();
        renderUsers();
    };

    // Initial load
    if (isLoggedIn) {
        loginForm.style.display = "none";
        userApp.style.display = "block";
        title.textContent = "User Management";
        renderUsers();
    }
});
