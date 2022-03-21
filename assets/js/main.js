const $ = document.querySelector.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

const ball = $(".canvas");
ball.width = $width;
ball.height = $height;
const ctx = ball.getContext("2d");

window.addEventListener("resize", (e) => {
  ball.width = window.innerWidth;
  ball.height = window.innerHeight;
});

class Ball {
  constructor(x, y, radius, sdx, sdy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sdx = sdx;
    this.sdy = sdy;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    this.move();
  }

  move() {
    this.x += this.sdx;
    this.y += this.sdy;
  }

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

  speedUp() {
    this.sdx *= 1.1;
    this.sdy *= 1.1;
  }

  speedDown() {
    this.sdx /= 1.1;
    this.sdy /= 1.1;
  }
}
                
const ballArray = [];
const makeBall = (balls) => {
    const radius = 30;
    const x = Math.floor(Math.random() * ((ball.width - 100) - 50)) + 50;
    const y = Math.floor(Math.random() * ((ball.height - 100) - 50)) + 50;
    const sdx = (Math.random() * (1 - (-1))) + (-1);
    const sdy = (Math.random() * (1 - (-1))) + (-1);
    const color = `white`;
    ballArray.push(new Ball(x, y, radius, sdx, sdy, color));
};

const ballAnimation = () => {
  ctx.clearRect(0, 0, ball.width, ball.height);
  ballArray.forEach((ball) => {
    ball.draw();
    ball.check();
  });

  requestAnimationFrame(ballAnimation);
};

// Start Game
const start = () => {
  makeBall();
  ballAnimation();
};

$("#btn").addEventListener("click", start);

document.addEventListener(
  "keydown",
  (event) => {
    if (event.code === "ArrowUp") {
      ballArray.forEach((ball) => {
        ball.speedUp();
      });
    }
    if (event.code === "ArrowDown") {
      ballArray.forEach((ball) => {
        ball.speedDown();
      });
    }
  },
  false
);
