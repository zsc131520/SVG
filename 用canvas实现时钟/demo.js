var vas = document.getElementById("vas");
var ctx = vas.getContext("2d");
var width = vas.width;
var height = vas.height;
var radius = 150;

ctx.translate(width / 2, height / 2);

function getRidian(angle) {
    return angle * Math.PI / 180;
}

function drawCircle() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, getRidian(360));
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 5;;
    ctx.stroke();
    ctx.restore();

}

function drawMarks() {
    ctx.save();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#aaa";
    for (var i = 0; i < 60; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.rotate(getRidian(6 * i));
        ctx.moveTo(0, -radius + 10);
        if (i % 5 === 0) {
            ctx.lineTo(0, -radius + 30);
        } else {
            ctx.lineTo(0, -radius + 20);
        }
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}

function drawTime(lineWidth, color, length, angle) {
    ctx.save();
    ctx.beginPath()
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.rotate(getRidian(angle))
    ctx.moveTo(0, 0.1 * length);
    ctx.lineTo(0, -0.9 * length);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,0,0,.5)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
    ctx.restore();
}

function drawLine() {
    var now = new Date();
    var zero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var disTime = now.getTime() - zero.getTime();
    var seconds = Math.floor(disTime / 1000);
    var hAngle = seconds / 60 / 60 / 12 * 360;
    drawTime(6, "#333", 70, hAngle)

    var mAngle = seconds / 60 / 60 * 360;
    drawTime(5, "#888", 90, mAngle)

    var sAngle = seconds / 60 * 360;
    drawTime(3, "#f40", 100, sAngle)
}

function draw() {
    ctx.clearRect(-width / 2, -height / 2, width, height);
    drawCircle()
    drawMarks()
    drawLine()
}

draw();

setInterval(draw, 1000);