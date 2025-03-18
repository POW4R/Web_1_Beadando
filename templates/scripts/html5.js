// Web Storage
function saveData() {
    localStorage.setItem('test', 'Tárolt adat');
}

function loadData() {
    alert(localStorage.getItem('test'));
}

// Web Workers
let worker;
function startWorker() {
    if (typeof Worker !== "undefined") {
        worker = new Worker("worker.js");
        worker.onmessage = function (event) {
            document.getElementById("workerOutput").innerText = event.data;
        };
        worker.postMessage("Start");
    }
}

// Server-Sent Events
if (typeof EventSource !== "undefined") {
    let source = new EventSource("sse.php");
    source.onmessage = function (event) {
        document.getElementById("sseOutput").innerText = event.data;
    };
}

// Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            document.getElementById("locationOutput").innerText =
                "Lat: " + position.coords.latitude + ", Lng: " + position.coords.longitude;
        });
    }
}

// Drag and Drop API
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// Canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 150, 80);
