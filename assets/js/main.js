var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
     
var x = Math.floor(Math.random() * ((canvas.width - 100) - 50)) + 50;
var y = Math.floor(Math.random() * ((canvas.height - 100) - 50)) + 50;

var dx = (Math.random() * (1 - (-1))) + (-1);
var dy = (Math.random() * (1 - (-1))) + (-1);

var ballRadius = 10;
        
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

window.addEventListener('resize', function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false; 
    }
}

function drawBall() {
    ctx.beginPath();
    // ctx.fillRect(x, y, 100, 100);
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    if(upPressed) {
        dx *= 1.02;
        dy *= 1.02;
    }
    else if(downPressed) {
        dx /= 1.02;
        dy /= 1.02;
    }

    x += dx;
    y += dy;
}
    setInterval(draw, 10);
