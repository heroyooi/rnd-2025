const $starWrapper = $('#starWrapper');
const $canvas = $('#warpCanvas');
const canvas = $canvas[0];
const ctx = canvas.getContext('2d');
const $header = $('#header');
const $footer = $('#footer');

let width = $(window).width();
let height = $(window).height();

const headerHeight = $header.outerHeight();
const footerHeight = $footer.outerHeight();

canvas.width = width;
canvas.height = height - footerHeight - 2;
$starWrapper.css('min-height', height - footerHeight - 2);

const numStars = 150;
/*
100 : 매우 적음 (허전함)
200~300 : 적당함 (부드럽고 가볍게)
400~500	: 꽉 차 보임 (기본)
1000+ : 고사양, 리소스 사용 많음
*/
const stars = [];

for (let i = 0; i < numStars; i++) {
stars.push({
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * width,
    pz: 0,
});
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    for (let star of stars) {
        star.pz = star.z;
        star.z -= 10;

        if (star.z < 1) {
        star.z = width;
        star.x = Math.random() * width - width / 2;
        star.y = Math.random() * height - height / 2;
        star.pz = star.z;
        }

        const sx = (star.x / star.z) * width / 2 + width / 2;
        const sy = (star.y / star.z) * height / 2 + height / 2;
        const px = (star.x / star.pz) * width / 2 + width / 2;
        const py = (star.y / star.pz) * height / 2 + height / 2;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
    }

    requestAnimationFrame(animate);
}

animate();

$(window).on('resize', function () {
    width = $(window).width();
    height = $(window).height();
    canvas.width = width;
    canvas.height = height - $footer.outerHeight() - 2;
    $starWrapper.css('min-height', height - footerHeight - 2);
});