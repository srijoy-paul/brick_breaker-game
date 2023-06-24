const game_canvas = document.getElementById("game-canvas");
const context = game_canvas.getContext("2d");

let x = game_canvas.width / 2;
let y = game_canvas.height - 30;
let dx = 2, dy = -2;

const ballRadius = 4;

var paddleHeight = 7;
var paddleWidth = 65;
let paddleX = (game_canvas.width - paddleWidth) / 2;
// console.log(paddleX, game_canvas.height, game_canvas.height - paddleHeight);

let leftPressed = false;
let rightPressed = false;

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}
function drawPaddle() {
    // console.log(paddleX, game_canvas.height - paddleHeight);
    context.beginPath();
    context.rect(paddleX, game_canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, game_canvas.width, game_canvas.height);
    drawBall();
    drawPaddle();
    if (x + dx > game_canvas.width - ballRadius || x + dx < ballRadius)
        dx = -dx;
    if (y + dy < ballRadius)
        dy = -dy;
    else if (y + dy > game_canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = - dy;
        }
        else {
            alert("Game Over");
            document.location.reload();
            clearInterval(interval);
        }
    }
    x += dx;
    y += dy;
    if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0)
            paddleX = 0;
    }
    else if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > game_canvas.width)
            paddleX = game_canvas.width - paddleWidth;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight")
        rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft")
        leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight")
        rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft")
        leftPressed = false;
}
const interval = setInterval(draw, 18);