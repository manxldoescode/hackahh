const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// make canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const socket = io("http://localhost:3000");

let x, y;
let mouseDown = false;

// Mouse events 
canvas.addEventListener("mousedown", (e) => {
  x = e.clientX;
  y = e.clientY;
  ctx.moveTo(x, y);
  mouseDown = true;
});

canvas.addEventListener("mouseup", () => {
  mouseDown = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!mouseDown) return;

  x = e.clientX;
  y = e.clientY;

  // draw locally
  ctx.lineTo(x, y);
  ctx.stroke();

  // send to server
  socket.emit("draw", { x, y });
});

// Socket.IO events 
socket.on("ondraw", (data) => {
  ctx.lineTo(data.x, data.y);
  ctx.stroke();
});
