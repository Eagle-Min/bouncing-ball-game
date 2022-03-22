// Default value
const $ = document.querySelector.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

const ball = $(".canvas");
ball.width = $width;
ball.height = $height;
const ctx = ball.getContext("2d");

// Resize window
window.addEventListener("resize", () => {
  ball.width = window.innerWidth;
  ball.height = window.innerHeight;
  oneBall = new Ball(Math.floor(Math.random() * ((ball.width - 100) - 50)) + 50, 
                      Math.floor(Math.random() * ((ball.height - 100) - 50)) + 50,
                      15, 
                      (Math.random() * (1 - (-1))) + (-1),
                      (Math.random() * (1 - (-1))) + (-1),
                      'white');
});

// Class Ball
class Ball {
  constructor(x, y, radius, sdx, sdy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sdx = sdx;
    this.sdy = sdy;
    this.color = color;
  }

  // Draw ball
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    this.move();
  }

  // Move ball
  move() {
    this.x += this.sdx;
    this.y += this.sdy;
  }

  // Check
  check() {
    if (this.x + this.radius > ball.width) {
      this.sdx = -this.sdx;
    }
    if (this.y + this.radius > ball.height) { 
      this.sdy = -this.sdy;
    }
    if (this.x - this.radius < 0) {
      this.sdx = -this.sdx;
    }
    if (this.y - this.radius < 0) {
      this.sdy = -this.sdy;
    }
  }

  // Speed up
  speedUp() {
    this.sdx *= 1.1;
    this.sdy *= 1.1;
  }

  // Speed down
  speedDown() {
    this.sdx /= 1.1;
    this.sdy /= 1.1;
  }
}
       
// The value of ball
var oneBall = new Ball( Math.floor(Math.random() * ((ball.width - 100) - 50)) + 50,
                        Math.floor(Math.random() * ((ball.height - 100) - 50)) + 50,
                        15,
                        (Math.random() * (1 - (-1))) + (-1),
                        (Math.random() * (1 - (-1))) + (-1),
                        'white');

// Ball motion
const ballAnimation = () => {
  ctx.clearRect(0, 0, ball.width, ball.height);
  oneBall.draw();
  oneBall.check();

};
setInterval(ballAnimation, 20);

// Speed with keyboard
document.addEventListener(
  "keydown",
  (event) => {
    if (event.code === "ArrowUp") {
      oneBall.speedUp();
    }
    if (event.code === "ArrowDown") {
      oneBall.speedDown();
    }
  },
  false
);
