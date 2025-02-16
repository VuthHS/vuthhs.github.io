document.addEventListener('DOMContentLoaded', function() {
    const itemForm = document.getElementById('itemForm');
    const itemsList = document.getElementById('itemsList');

    itemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        fetch('https://linqvccc9gr7.share.zrok.io/item', {
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
        fetch('https://linqvccc9gr7.share.zrok.io/item')
        .then(response => {         
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
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

    fetchItems();
});
