
class Input {
  keyUpActive = false;
  keyDownActive = false;
  keyRightActive = false;
  keyLeftActive = false;
  keySpaceActive = false;
  keyPlusActive = false;
  keyMinusActive = false;

  constructor() {
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));
  }
  keyDown(e) {
    switch (e.code) {
      case "ArrowUp":
        this.keyUpActive = true;
        break;
      case "ArrowDown":
        this.keyDownActive = true;
        break;
      case "ArrowLeft":
        this.keyLeftActive = true;
        break;
      case "ArrowRight":
        this.keyRightActive = true;
        break;
      case "KeyW":
        this.keyUpActive = true;
        break;
      case "KeyS":
        this.keyDownActive = true;
        break;
      case "KeyA":
        this.keyLeftActive = true;
        break;
      case "KeyD":
        this.keyRightActive = true;
        break;
      case "Space":
        this.keySpaceActive = true;
        break;
    }
  }
  keyUp(e) {
    switch (e.code) {
      case "ArrowUp":
        this.keyUpActive = false;
        break;
      case "ArrowDown":
        this.keyDownActive = false;
        break;
      case "ArrowLeft":
        this.keyLeftActive = false;
        break;
      case "ArrowRight":
        this.keyRightActive = false;
        break;
      case "KeyW":
        this.keyUpActive = false;
        break;
      case "KeyS":
        this.keyDownActive = false;
        break;
      case "KeyA":
        this.keyLeftActive = false;
        break;
      case "KeyD":
        this.keyRightActive = false;
        break;
      case "Space":
        this.keySpaceActive = false;
        break;
    }
  }
}


const joystick = document.getElementById("joystick");
const canvas = document.createElement("canvas");
canvas.id = "joystickCanvas";
canvas.width = joystick.offsetWidth;
canvas.height = joystick.offsetHeight;
joystick.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", mouseUp, false);
canvas.addEventListener("mousemove", mouseMove, false);
//
let input = new Input();
//
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
//
let x3 = 0;
let y3 = 0;
let x3new = 0;
let y3new = 0;
//
let dragging = false;
let radius = 100;
//
let vehicle = { x: 0, y: 0, vx: 0, vy: 0, maxv: 10 };
//
let vehicleTail = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

function step() {

  let inputActive = false;

  if (input.keyUpActive) {
    y2 = y2 - 5;
    inputActive = true
  }
  if (input.keyDownActive) {
    y2 = y2 + 5;
    inputActive = true
  }
  if (input.keyLeftActive) {
    x2 = x2 - 5;
    inputActive = true
  }
  if (input.keyRightActive) {
    x2 = x2 + 5;
    inputActive = true
  }
  if (!inputActive && !dragging)
  {
    x2 = x1;
    y2 = y1;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  let tempLength = length(x1, y1, x2, y2);
  if (tempLength > radius) {
    let angle = Math.atan2(y2 - y1, x2 - x1);
    x2 = x1 + radius * Math.cos(angle);
    y2 = y1 + radius * Math.sin(angle);
    tempLength = radius;
  }
  if (dragging || inputActive) {
    ctx.strokeStyle = "gray";
    ctx.lineWidth = tempLength / 5;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  //
  x3new = x2;
  y3new = y2;
  x3 = x3 + (x3new - x3) / 15;
  y3 = y3 + (y3new - y3) / 15;
  //
  ctx.strokeStyle = "red";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(x3, y3, 5, 0, 2 * Math.PI);
  ctx.stroke();
  //
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.stroke();
  //
  ctx.strokeStyle = "green";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(vehicle.x, vehicle.y, 5, 0, 2 * Math.PI);
  ctx.stroke();
  //
  ctx.strokeStyle = "green";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(vehicle.x, vehicle.y);
  ctx.lineTo(vehicle.x - vehicle.vx * 20, vehicle.y - vehicle.vy * 20);
  ctx.stroke();

  //add vehicle tail
  vehicleTail[0][0] = vehicleTail[1][0];
  vehicleTail[0][1] = vehicleTail[1][1];
  vehicleTail[1][0] = vehicleTail[2][0];
  vehicleTail[1][1] = vehicleTail[2][1];
  vehicleTail[2][0] = vehicleTail[3][0];
  vehicleTail[2][1] = vehicleTail[3][1];
  vehicleTail[3][0] = vehicleTail[4][0];
  vehicleTail[3][1] = vehicleTail[4][1];
  vehicleTail[4][0] = vehicleTail[5][0];
  vehicleTail[4][1] = vehicleTail[5][1];
  vehicleTail[5][0] = vehicleTail[6][0];
  vehicleTail[5][1] = vehicleTail[6][1];
  vehicleTail[6][0] = vehicleTail[7][0];
  vehicleTail[6][1] = vehicleTail[7][1];
  vehicleTail[7][0] = vehicleTail[8][0];
  vehicleTail[7][1] = vehicleTail[8][1];
  vehicleTail[8][0] = vehicleTail[9][0];
  vehicleTail[8][1] = vehicleTail[9][1];
  vehicleTail[9][0] = vehicle.x - vehicle.vx * 10;
  vehicleTail[9][1] = vehicle.y - vehicle.vy * 10;
  //
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(vehicle.x, vehicle.y);
  ctx.lineTo(vehicleTail[9][0], vehicleTail[9][1]);
  ctx.lineTo(vehicleTail[8][0], vehicleTail[8][1]);
  ctx.lineTo(vehicleTail[7][0], vehicleTail[7][1]);
  ctx.lineTo(vehicleTail[6][0], vehicleTail[6][1]);
  ctx.lineTo(vehicleTail[5][0], vehicleTail[5][1]);
  ctx.lineTo(vehicleTail[4][0], vehicleTail[4][1]);
  ctx.lineTo(vehicleTail[3][0], vehicleTail[3][1]);
  ctx.lineTo(vehicleTail[2][0], vehicleTail[2][1]);
  ctx.lineTo(vehicleTail[1][0], vehicleTail[1][1]);
  ctx.lineTo(vehicleTail[0][0], vehicleTail[0][1]);
  ctx.stroke();
  //
  vehicle.x = vehicle.x + vehicle.vx;
  vehicle.y = vehicle.y + vehicle.vy;

  vehicle.vx = vehicle.vx + (x3 - x1) / 500;
  vehicle.vy = vehicle.vy + (y3 - y1) / 500;

  if (length(0, 0, vehicle.vx, vehicle.vy) > vehicle.maxv) {
    vehicle.vx =
      (vehicle.vx / length(0, 0, vehicle.vx, vehicle.vy)) * vehicle.maxv;
    vehicle.vy =
      (vehicle.vy / length(0, 0, vehicle.vx, vehicle.vy)) * vehicle.maxv;
  }

  vehicle.vx = vehicle.vx * 0.95;
  vehicle.vy = vehicle.vy * 0.95;

  if (vehicle.x < 0) {
    vehicle.x = 0;
    vehicle.vx = 0;
  }
  if (vehicle.x > canvas.width) {
    vehicle.x = canvas.width;
    vehicle.vx = 0;
  }
  if (vehicle.y < 0) {
    vehicle.y = 0;
    vehicle.vy = 0;
  }
  if (vehicle.y > canvas.height) {
    vehicle.y = canvas.height;
    vehicle.vy = 0;
  }

  requestAnimationFrame(step);
}

function length(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

step();

function mouseDown(e) {
  x1 = e.clientX;
  y1 = e.clientY;
  x2 = e.clientX;
  y2 = e.clientY;
  x3 = x2;
  y3 = y2;
  dragging = true;
}
function mouseUp(e) {
  //x1 = e.clientX;
  //y1 = e.clientY;
  //x2 = e.clientX;
  //y2 = e.clientY;
  x2 = x1;
  y2 = y1;
  dragging = false;
}
function mouseMove(e) {
  if (dragging) {
    x2 = e.clientX;
    y2 = e.clientY;
  }
}


