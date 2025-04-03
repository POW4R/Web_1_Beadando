let chartInstance = null;

function drawChart(row) {
    const labels = ["Adat 1", "Adat 2", "Adat 3", "Adat 4"];
    const values = Array.from(row.children).slice(1).map(td => Number(td.textContent));

    const ctx = document.getElementById('chartCanvas').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: row.children[0].textContent + " adatai",
                data: values,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: true
            }]
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const firstRow = document.querySelector("tbody tr");
    if (firstRow) {
        drawChart(firstRow);
    }
});
