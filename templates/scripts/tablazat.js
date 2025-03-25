let data = [
    { id: 1, name: "John", age: 25, city: "Budapest" },
    { id: 2, name: "Anna", age: 30, city: "Debrecen" },
    { id: 3, name: "Mark", age: 35, city: "Szeged" },
    { id: 4, name: "Sara", age: 28, city: "Pécs" }
];

function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.className = "border";
        tr.innerHTML = `
            <td class="border p-2">${row.name}</td>
            <td class="border p-2">${row.age}</td>
            <td class="border p-2">${row.city}</td>
            <td class="border p-2">
                <button class="bg-yellow-500 text-white p-2 mr-2" onclick="editRow(${row.id})">Szerkeszt</button>
                <button class="bg-red-500 text-white p-2" onclick="deleteRow(${row.id})">Törlés</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function addRow() {
    const name = document.getElementById("nameInput").value;
    const age = document.getElementById("ageInput").value;
    const city = document.getElementById("cityInput").value;
    if (name && age && city) {
        data.push({ id: Date.now(), name, age, city });
        renderTable();
    }
}

function deleteRow(id) {
    data = data.filter(row => row.id !== id);
    renderTable();
}

function editRow(id) {
    const row = data.find(row => row.id === id);
    if (row) {
        const newName = prompt("Új név:", row.name);
        const newAge = prompt("Új kor:", row.age);
        const newCity = prompt("Új város:", row.city);
        if (newName && newAge && newCity) {
            row.name = newName;
            row.age = newAge;
            row.city = newCity;
            renderTable();
        }
    }
}

document.addEventListener("DOMContentLoaded", renderTable);
