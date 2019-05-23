const colors = [ '#ffc000', '#ff3b3b', '#ff8400' ];
const bubbles = 50;

const explode = (x, y, shipId) => {
    let particles = [];
    let ratio = window.devicePixelRatio;
    var c = document.getElementById('fx');
    var ctx = c.getContext("2d");
    c.width = 1200;
    c.height = 700;

    c.style.left = screenWidth + "px";

    for(var i = 0; i < bubbles; i++) {
        particles.push({
            x: x,
            y: y,
            radius: r(10, 15),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: r(0, 360, true),
            speed: r(8, 12),
            friction: 0.95,
            yVel: 0,
            gravity: 0
        });
    }

    render(particles, ctx, c.width, c.height, x, y, shipId);
}

const render = (particles, ctx, width, height, x, y, shipId) => {
    requestAnimationFrame(() => render(particles, ctx, width, height, x, y, shipId));
    ctx.clearRect(0, 0, width, height);

    var xDis = players[shipId].x - offsetX - x;
    var yDis = players[shipId].y - offsetY - y;

    particles.forEach((p, i) => {
        p.x += p.speed * Math.cos(p.rotation * Math.PI / 180);
        p.y += p.speed * Math.sin(p.rotation * Math.PI / 180);

        p.opacity -= 0.01;
        p.speed *= p.friction;
        p.radius *= p.friction;
        p.yVel += p.gravity;
        p.y += p.yVel;

        if(p.opacity < 0 || p.radius < 0) return;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        //ctx.arc(p.x + xDis, p.y + yDis, p.radius, 0, 2 * Math.PI, false);
        ctx.fillRect(p.x + xDis, p.y + yDis, p.radius * 2, p.radius * 2);
        ctx.fill();
    });

    return ctx;
}

const r = (a, b, c) => parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));
