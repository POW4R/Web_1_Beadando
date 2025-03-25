const code = "BBBBBBefg456";
const url = "http://gamf.nhely.hu/ajax2/";

document.addEventListener("DOMContentLoaded", () => {
    read();
    document.getElementById("createEntry").addEventListener("click", create);
    document.getElementById("updateEntry").addEventListener("click", update);
    document.getElementById("deleteEntry").addEventListener("click", deleteData);
    document.getElementById("getDataForId").addEventListener("click", getDataForId);
});

async function read() {
    let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&op=read`
    });
    let data = await response.json();
    let list = data.list;
    let str = `<h2>Rekordok</h2><table><tr><th>ID</th><th>Név</th><th>Magasság</th><th>Súly</th><th>Műveletek</th></tr>`;
    let sumHeight = 0, maxHeight = 0;
    list.forEach(item => {
        let height = parseFloat(item.height) || 0;
        sumHeight += height;
        if (height > maxHeight) maxHeight = height;
        str += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.height}</td>
                    <td>${item.weight}</td>
                    <td><button onclick="deleteData(${item.id})">Törlés</button></td>
                </tr>`;
    });
    let avgHeight = list.length ? (sumHeight / list.length).toFixed(2) : 0;
    str += `</table>`;
    document.getElementById("readDiv").innerHTML = str;
    document.getElementById("heightStats").innerText = `Összeg: ${sumHeight}, Átlag: ${avgHeight}, Legnagyobb: ${maxHeight}`;
}

async function create() {
    let name = document.getElementById("new-name").value.trim();
    let height = document.getElementById("new-height").value.trim();
    let weight = document.getElementById("new-weight").value.trim();
    if (name.length > 0 && name.length <= 30 && height && weight) {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `code=${code}&op=create&name=${name}&height=${height}&weight=${weight}`
        });
        let result = await response.text();
        document.getElementById("createResult").innerText = result > 0 ? "Sikeres létrehozás" : "Sikertelen!";
        read();
    } else {
        document.getElementById("createResult").innerText = "Hibás adatok!";
    }
}

async function update() {
    let id = document.getElementById("idUpd").value.trim();
    let name = document.getElementById("upd-name").value.trim();
    let height = document.getElementById("upd-height").value.trim();
    let weight = document.getElementById("upd-weight").value.trim();
    if (id && name.length > 0 && name.length <= 30 && height && weight) {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `code=${code}&op=update&id=${id}&name=${name}&height=${height}&weight=${weight}`
        });
        let result = await response.text();
        document.getElementById("updateResult").innerText = result > 0 ? "Sikeres módosítás!" : "Sikertelen!";
        read();
    } else {
        document.getElementById("updateResult").innerText = "Hibás adatok!";
    }
}

async function deleteData(id) {
    let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&op=delete&id=${id}`
    });
    let result = await response.text();
    document.getElementById("deleteResult").innerText = result > 0 ? "Sikeres törlés!" : "Sikertelen!";
    read();
}

async function getDataForId() {
    let id = document.getElementById("idUpd").value.trim();
    let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&op=read`
    });
    let data = await response.json();
    let item = data.list.find(entry => entry.id == id);
    if (item) {
        document.getElementById("upd-name").value = item.name;
        document.getElementById("upd-height").value = item.height;
        document.getElementById("upd-weight").value = item.weight;
    }
}
