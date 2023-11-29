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

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  let tempLength = length(x1, y1, x2, y2);
  if (tempLength > radius) {
    let angle = Math.atan2(y2 - y1, x2 - x1);
    x2 = x1 + radius * Math.cos(angle);
    y2 = y1 + radius * Math.sin(angle);
    tempLength = radius;
  }
  if (dragging) {
    ctx.strokeStyle = "gray";
    ctx.lineWidth = tempLength / 5;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  //
  x3new = x2;
  y3new = y2;
  x3 = x3 + (x3new - x3) / 10;
  y3 = y3 + (y3new - y3) / 10;
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
