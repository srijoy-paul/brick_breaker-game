const game_canvas = document.getElementById("game-canvas");
const context = game_canvas.getContext("2d");

let x = game_canvas.width / 2;
let y = game_canvas.height - 30;
let dx = -2, dy = -2;
console.log(x, y);

function drawBall() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, game_canvas.width, game_canvas.height);
    drawBall();
    x += dx;
    y += dy;
}

setInterval(draw, 15);