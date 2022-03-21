// Giá trị mặc định.
const $ = document.querySelector.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

const ball = $(".canvas");
ball.width = $width;
ball.height = $height;
const ctx = ball.getContext("2d");

// Resize windowns
window.addEventListener("resize", (e) => {
  ball.width = window.innerWidth;
  ball.height = window.innerHeight;
});

// Class Ball
class Ball {
  constructor(x, y, radius, sdx, sdy, color) {
    this.x = x;                     // Tọa độ ban đầu theo trục x của ball.
    this.y = y;                     // Tọa độ ban đầu theo trục y của ball.
    this.radius = radius;           // Bán kính của ball.
    this.sdx = sdx;                 // Tốc độ ban đầu theo trục x của ball.
    this.sdy = sdy;                 // Tốc độ ban đầu theo trục y của ball.
    this.color = color;             // Màu của bóng.
  }

  // Vẽ ball
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    this.move();
  }

  // Di chuyển ball
  move() {
    this.x += this.sdx;
    this.y += this.sdy;
  }

  // Check va chạm của ball với 4 hướng
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

  // Tăng tốc ball
  speedUp() {
    this.sdx *= 1.1;
    this.sdy *= 1.1;
  }

  // Giảm tốc ball
  speedDown() {
    this.sdx /= 1.1;
    this.sdy /= 1.1;
  }
}
   
// Mảng chứa ball
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

// Chuyển động ball
const ballAnimation = () => {
  ctx.clearRect(0, 0, ball.width, ball.height);
  ballArray.forEach((ball) => {
    ball.draw();
    ball.check();
  });

  requestAnimationFrame(ballAnimation);   // Bóng di chuyển mượt hơn so với setInterval.
};

// Bắt đầu
const start = () => {
  makeBall();
  ballAnimation();
};

// Click tạo bóng.
$("#btn").addEventListener("click", start);

// Speed with keybroad
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
