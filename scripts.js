const game_canvas = document.getElementById("game-canvas");
const context = game_canvas.getContext("2d");

context.beginPath();
context.rect(20, 40, 70, 50);
context.fillStyle = "red";
context.fill();
// context.strokeStyle = "red";
// context.stroke();
context.closePath();

context.beginPath();
context.arc(150, 75, 20, 0, Math.PI * 2, false);
context.fillStyle = "green";
context.fill();
context.closePath();

context.beginPath();
context.rect(200, 40, 50, 50);
context.strokeStyle = "violet";
context.stroke();
context.closePath();