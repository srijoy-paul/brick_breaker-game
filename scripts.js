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

const brickRowCount = 3, brickColumnCount = 5;
const brickWidth = 45, brickHeight = 10;
const brickPadding = 10;
const brickOffsetTop = 15, brickOffsetLeft = 15;
let score = 0;
let colorChange = false;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
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
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    colorChange = true;
                }
            }
        }
    }
}
function drawScore() {
    context.font = "9px Segoe UI";
    context.fillStyle = "#40128B";
    context.fillText(`Score: ${score}`, game_canvas.width - 50, 10);
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    if (colorChange) context.fillStyle = "#DD58D6";
    else context.fillStyle = "blue";
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

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#DD58D6";
                context.fill();
                context.closePath();
            }
        }
    }
}

function draw() {
    context.clearRect(0, 0, game_canvas.width, game_canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
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
    if (score === (brickColumnCount * brickRowCount)) {
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
        clearInterval(interval);
    }
}

const interval = setInterval(draw, 18);