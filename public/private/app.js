let socket = io("/privateSpace"); //establishes connection with the socket server

//adding rooms
let roomName = window.prompt("Enter a room name - animals only");
console.log("ROOM : ", roomName);
//add checks to make sure that the user adds a prompt


//client acknowledging after server confirmation - connect is a keyword
socket.on("connect", () => {
    console.log("Connection established to server via sockets");
    let roomData = {
        name: roomName
    }
    socket.emit("roomJoin", roomData);
})

function setup() {
    createCanvas(4000, 4000);
    background("#FFF5EE");
    // fill();
    // noStroke();
    stroke("#191970");
    strokeWeight(15);
}

function mouseDragged() {
    // ellipse(mouseX, mouseY, 10);
    // line(mouseX, mouseY, pMouseX, pMouseY, 10);
    let mouseObj = {
        x1: mouseX,
        y1: mouseY,
        x2: pmouseX,
        y2: pmouseY

    };
    socket.emit("mouseData", mouseObj); //sends mouseData to the server - mouseData is the label

}

//on getting info from the server - data labels need to match again
socket.on("serverData", (data) => {
    // console.log(data);
    drawPainting(data);
})

function drawPainting(data) {
    // ellipse(data.x, data.y, 10);
    line(data.x1, data.y1, data.x2, data.y2)
}

// window.addEventListener("load", () => {
//     document.querySelector("#room-name")
// })