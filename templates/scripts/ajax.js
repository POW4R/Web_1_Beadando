code="AAAAAAabc123";
url="http://gamf.nhely.hu/ajax1/";

async function read() {
    let response = await fetch(url, {
        method: 'post',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: "code=" + code + "&op=read"
    });
    let data = await response.text();
    data = JSON.parse(data);
    let list = data.list;
    let str = "<h1>Read</h1>";
    str += "<p>Number of records: " + data.rowCount + "</p>";
    str += "<p>Last max " + data.maxNum + " records:</p>";
    str += "<table><tr><th>ID</th><th>Value</th><th>Height</th><th>Actions</th></tr>";
    for (let i = 0; i < list.length; i++) {
        str += `<tr>
                    <td>${list[i].id}</td>
                    <td contenteditable="true">${list[i].value}</td>
                    <td contenteditable="true">${list[i].height}</td>
                    <td><button onclick="updateData(${list[i].id})">Update</button>
                        <button onclick="deleteData(${list[i].id})">Delete</button></td>
                </tr>`;
    }
    str += "</table>";
    document.getElementById("readDiv").innerHTML = str;
}

async function create() {
    value = document.getElementById("new-value").value;
    height = document.getElementById("new-height").value;
    if (value.length > 0 && value.length <= 30 && height.length > 0) {
        let response = await fetch(url, {
            method: 'post',
            cache: 'no-cache',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: "&op=create&value="+value+"&height="+height
        });
        let data = await response.text();
        if (data>0) {
            str="Create successfull."
        }
        else {
            str="Create was NOT successfull."
        }
        document.getElementById("createResult").innerHTML=str;
        document.getElementById("new-value").value="";
        document.getElementById("new-height").value="";
        read();
    } else {
        document.getElementById("createResult").innerHTML = "Validation error!!";
    }
}
async function getDataForId() {
    let response = await fetch(url, {
        method: 'post',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "code="+code+"&op=read"
    });
    let data = await response.text();
    data = JSON.parse(data);
    let list = data.list;
    for(let i=0; i<list.length; i++)
      if(list[i].id==document.getElementById("idUpd").value){
        document.getElementById("name2").value=list[i].name;
        document.getElementById("city2").value=list[i].city;
        document.getElementById("phone2").value=list[i].phone;
      }
  }

async function updateData(id) {
    let row = event.target.parentElement.parentElement;
    let value = row.children[1].innerText;
    let height = row.children[2].innerText;
    if (value.length > 0 && value.length <= 30 && height.length > 0) {
        let response = await fetch(url, {
            method: 'post',
            cache: 'no-cache',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: "code="+code+"&op=update&id="+id+"&value="+value+"height="+height
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
        method: 'post',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `code=${code}&op=delete&id=${id}`
    });
    let data = await response.text();
    document.getElementById("deleteResult").innerHTML = data > 0 ? "Delete successful!" : "Delete NOT successful!";
    read();
}

window.onload = function () {
    read();
};

const createButton = document.getElementById("createEntry");
createButton.addEventListener("click", create);
