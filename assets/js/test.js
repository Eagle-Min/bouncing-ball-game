class Ball {
    constructor(canvas, ctx, x, y, dx, dy, ballRadius, upPress, downPress) {
        this.canvas     = canvas;
        this.ctx        = ctx;
        this.x          = x;
        this.y          = y;
        this.dx         = dx;
        this.dy         = dy;
        this.ballRadius = ballRadius;
        this.upPress    = upPress;
        this.downPress  = downPress;
    }

    keyDownHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") {
            this.upPressed = true;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            this.downPressed = true;
        }
    }
    
    keyUpHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") {
            this.upPressed = false;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            this.downPressed = false; 
        }
    }
    
    drawBall() {
        this.ctx.beginPath();
        this.ctx.fillRect(x, y, 100, 100);
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
        this.ctx.closePath();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawBall();
    
        if(this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
    
        if(this.y + this.dy > this.canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
    
        if(this.upPressed) {
            this.dx *= 1.02;
            this.dy *= 1.02;
        }
        else if(this.downPressed) {
            this.dx /= 1.02;
            this.dy /= 1.02;
        }
    
        this.x += this.dx;
        this.y += this.dy;
    }
    
}


let ball = new Ball(document.getElementById("myCanvas"), 
                    canvas.getContext("2d"), 
                    Math.floor(Math.random() * ((canvas.width - 100) - 50)) + 50, 
                    Math.floor(Math.random() * ((canvas.height - 100) - 50)) + 50, 
                    (Math.random() * (1 - (-1))) + (-1), 
                    (Math.random() * (1 - (-1))) + (-1), 
                    Math.floor(Math.random() * (50 - 10)) + 10, 
                    false, 
                    false);


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

window.addEventListener('resize', function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

setInterval(draw, 100);

ball.draw();
