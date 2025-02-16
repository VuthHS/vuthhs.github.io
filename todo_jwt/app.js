document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const itemForm = document.getElementById('itemForm');
    const itemsList = document.getElementById('itemsList');
    let accessToken = '';
    let refreshToken = '';

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            accessToken = data.access_token;
            refreshToken = data.refresh_token;
            itemForm.style.display = 'block';
            loginForm.style.display = 'none';
            fetchItems();
        });
    });

    itemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        fetch('/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ name: name, description: description })
        })
        .then(response => {
            if (response.status === 401) {
                refreshTokenAndRetry(() => addItem(name, description));
            } else {
                return response.json();
            }
        })
        .then(data => {
            fetchItems();
            itemForm.reset();
        });
    });

    function fetchItems() {
        fetch('/item', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (response.status === 401) {
                refreshTokenAndRetry(fetchItems);
            } else {
                return response.json();
            }
        })
        .then(data => {
            itemsList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.description}`;
                itemsList.appendChild(li);
            });
        });
    }

    function refreshTokenAndRetry(callback) {
        fetch('/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            accessToken = data.access_token;
            callback();
        });
    }
});
