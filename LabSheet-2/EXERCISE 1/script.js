const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#10a350ff";
ctx.fillRect(50, 40, 150, 80);

ctx.beginPath();
ctx.arc(400, 80, 40, 0, 2 * Math.PI);
ctx.fillStyle = "#cb1ebfff";
ctx.fill();

ctx.beginPath();
ctx.moveTo(50, 180);
ctx.lineTo(450, 180);
ctx.strokeStyle = "#c74c12ff";
ctx.lineWidth = 6;
ctx.stroke();

ctx.font = "bold 35px 'Segoe UI', sans-serif";
ctx.fillStyle = "#2c3e50";
ctx.textAlign = "center";
ctx.fillText("HTML5 Canvas", canvas.width / 2, 260);