const code = "AAAAAAabc123";
const url = "http://gamf.nhely.hu/ajax1/";

document.addEventListener("DOMContentLoaded", () => {
    read();
    document.getElementById("createEntry").addEventListener("click", create);
});

async function read() {
    let response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&op=read`
    });
    let data = await response.json();
    let list = data.list;
    let str = `<h1>Read</h1><p>Number of records: ${data.rowCount}</p>`;
    str += `<p>Last max ${data.maxNum} records:</p>`;
    str += `<table><tr><th>ID</th><th>Value</th><th>Height</th><th>Actions</th></tr>`;
    list.forEach(item => {
        str += `<tr>
                    <td>${item.id}</td>
                    <td contenteditable="true">${item.value}</td>
                    <td contenteditable="true">${item.height}</td>
                    <td>
                        <button onclick="updateData(${item.id}, this)">Update</button>
                        <button onclick="deleteData(${item.id})">Delete</button>
                    </td>
                </tr>`;
    });
    str += `</table>`;
    document.getElementById("readDiv").innerHTML = str;
}

async function create() {
    let value = document.getElementById("new-value").value.trim();
    let height = document.getElementById("new-height").value.trim();
    if (value.length > 0 && value.length <= 30 && height.length > 0) {
        let response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `code=${code}&op=create&value=${value}&height=${height}`
        });
        let data = await response.text();
        document.getElementById("createResult").innerHTML = data > 0 ? "Create successful." : "Create was NOT successful.";
        document.getElementById("new-value").value = "";
        document.getElementById("new-height").value = "";
        read();
    } else {
        document.getElementById("createResult").innerHTML = "Validation error!!";
    }
}

async function updateData(id, button) {
    let row = button.closest("tr");
    let value = row.children[1].innerText.trim();
    let height = row.children[2].innerText.trim();
    if (value.length > 0 && value.length <= 30 && height.length > 0) {
        let response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `code=${code}&op=update&id=${id}&value=${value}&height=${height}`
        });
        let data = await response.text();
        document.getElementById("updateResult").innerHTML = data > 0 ? "Update successful!" : "Update NOT successful!";
        read();
    } else {
        document.getElementById("updateResult").innerHTML = "Validation error!!";
    }
}

async function deleteData(id) {
    let response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&op=delete&id=${id}`
    });
    let data = await response.text();
    document.getElementById("deleteResult").innerHTML = data > 0 ? "Delete successful!" : "Delete NOT successful!";
    read();
}

async function getDataForId() {
    let id = document.getElementById("idUpd").value.trim();
    let response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&op=read`
    });
    let data = await response.json();
    let item = data.list.find(entry => entry.id == id);
    if (item) {
        document.getElementById("new-value").value = item.value;
        document.getElementById("new-height").value = item.height;
    }
}
