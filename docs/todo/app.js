document.addEventListener('DOMContentLoaded', function() {
    const itemForm = document.getElementById('itemForm');
    const itemsList = document.getElementById('itemsList');

    itemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        fetch('https://xvna6g2uuk6t.share.zrok.io/item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description })
        })
        .then(response => response.json())
        .then(data => {
            fetchItems();
            itemForm.reset();
        });
    });

    function fetchItems() {
        fetch('https://xvna6g2uuk6t.share.zrok.io/item')
        .then(response => response.json())
        .then(data => {
            itemsList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.description}`;
                itemsList.appendChild(li);
            });
        });
    }

    fetchItems();
});
