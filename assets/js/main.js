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
   
// Truyền giá trị cho ball
const oneBall = new Ball(Math.floor(Math.random() * ((ball.width - 100) - 50)) + 50,
                         Math.floor(Math.random() * ((ball.height - 100) - 50)) + 50,
                         15,
                         (Math.random() * (1 - (-1))) + (-1),
                         (Math.random() * (1 - (-1))) + (-1),
                         'white');

// Chuyển động ball
const ballAnimation = () => {
  ctx.clearRect(0, 0, ball.width, ball.height);
  oneBall.draw();
  oneBall.check();
};
setInterval(ballAnimation, 30);

// Speed with keybroad
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
