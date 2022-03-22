/** Default value */
const $ = document.querySelector.bind(document);
const $width = window.innerWidth;
const $height = window.innerHeight;

const ball = $(".canvas");
ball.width = $width;
ball.height = $height;
const ctx = ball.getContext("2d");

/** Resize window */
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

/** create ball class */
class Ball {

  /**
   * @param {*} x : initial coordinates of the ball in the x.
   * @param {*} y : initial coordinates of the ball in the y.
   * @param {*} radius : radius of the ball.
   * @param {*} dx : initial speed of the ball in the x-direction.
   * @param {*} dy : initial speed of the ball in the y-direction.
   * @param {*} color : color of the ball.
   */
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  /** Draw ball */
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
    this.move();
  }

  /** Move ball */
  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  /** Check the ball's collision with the screen edges */
  checkCollision() {

    /** Right collision */
    if (this.x + this.radius > ball.width) {
      this.dx = -this.dx;
    }

    /** Bottom collision */
    if (this.y + this.radius > ball.height) { 
      this.dy = -this.dy;
    }

    /** Left collision */
    if (this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    /** Top collision */
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
  }

  /** Speed up */
  speedUp() {
    this.dx *= 1.1;
    this.dy *= 1.1;
  }

  /** Speed down */
  speedDown() {
    this.dx /= 1.1;
    this.dy /= 1.1;
  }
}
       
/** Create value for the ball */
var oneBall = new Ball( Math.floor(Math.random() * ((ball.width - 100) - 50)) + 50,
                        Math.floor(Math.random() * ((ball.height - 100) - 50)) + 50,
                        15,
                        (Math.random() * (1 - (-1))) + (-1),
                        (Math.random() * (1 - (-1))) + (-1),
                        'white');

/** Motion for the ball */
const ballAnimation = () => {
  ctx.clearRect(0, 0, ball.width, ball.height);
  oneBall.draw();
  oneBall.checkCollision();
};
setInterval(ballAnimation, 20);

/* Speed with keyboard */
document.addEventListener(
  "keydown",
  (event) => {
    /** Accelerate with up arrow key */
    if (event.code === "ArrowUp") {
      oneBall.speedUp();
    }

    /** Decelerate with the down arrow key */
    if (event.code === "ArrowDown") {
      oneBall.speedDown();
    }
  },
  false
);
