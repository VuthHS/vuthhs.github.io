// script.js
document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const lines = content.split('\n');
            const data = lines.map(line => {
                const [category, value] = line.split(',');
                return { category: category, value: parseFloat(value) };
            });
            renderTable(data);
            renderChart(data);
        };
        reader.readAsText(file);
    }
});

function renderTable(data) {
    const tbody = document.getElementById('report-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement('tr');
        const tdCategory = document.createElement('td');
        const tdValue = document.createElement('td');
        tdCategory.textContent = row.category;
        tdValue.textContent = row.value;
        tr.appendChild(tdCategory);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    });
}

function renderChart(data) {
    const ctx = document.getElementById('report-chart').getContext('2d');
    const labels = data.map(row => row.category);
    const values = data.map(row => row.value);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Values',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
