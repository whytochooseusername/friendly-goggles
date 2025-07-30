// --- Floating, Blurred, Blue Balls with Mouse Repulsion in About Section ---
const BALL_COUNT = 10;
const BALL_COLORS = [
    '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#818cf8', '#6366f1', '#4f46e5', '#0ea5e9', '#38bdf8', '#7dd3fc'
];
const balls = [];
const ballRadius = 32;
let areaWidth = 0, areaHeight = 0;
let animationFrame;
const FRICTION = 0.992; // Slightly more friction for settling
const BOUNCE = 0.98;
const MAX_SPEED = 2.2;
let mouse = { x: null, y: null, active: false };
const MOUSE_RADIUS = 90;
const MOUSE_FORCE = 0.18;

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function getBallsArea() {
    const about = document.getElementById('about');
    const bg = document.getElementById('balls-bg');
    if (about && bg) {
        const rect = about.getBoundingClientRect();
        areaWidth = rect.width;
        areaHeight = rect.height;
        bg.style.width = areaWidth + 'px';
        bg.style.height = areaHeight + 'px';
    }
}

function createBalls() {
    const container = document.getElementById('balls-bg');
    if (!container) return;
    getBallsArea();
    container.innerHTML = '';
    balls.length = 0;
    for (let i = 0; i < BALL_COUNT; i++) {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.style.width = ball.style.height = ballRadius * 2 + 'px';
        ball.style.background = BALL_COLORS[i % BALL_COLORS.length];
        const x = randomBetween(ballRadius, areaWidth - ballRadius);
        const y = randomBetween(ballRadius, areaHeight - ballRadius);
        const angle = randomBetween(0, 2 * Math.PI);
        const speed = randomBetween(0.7, MAX_SPEED);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        ball.style.left = x + 'px';
        ball.style.top = y + 'px';
        balls.push({
            el: ball,
            x, y,
            vx, vy,
            color: BALL_COLORS[i % BALL_COLORS.length],
            radius: ballRadius
        });
        container.appendChild(ball);
    }
}

function animateBalls() {
    // Ball-to-ball collision
    for (let i = 0; i < balls.length; i++) {
        let b1 = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
            let b2 = balls[j];
            let dx = b2.x - b1.x;
            let dy = b2.y - b1.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let minDist = b1.radius + b2.radius;
            if (dist < minDist) {
                let overlap = minDist - dist;
                let nx = dx / (dist || 1);
                let ny = dy / (dist || 1);
                b1.x -= nx * overlap / 2;
                b1.y -= ny * overlap / 2;
                b2.x += nx * overlap / 2;
                b2.y += ny * overlap / 2;
                let kx = b1.vx - b2.vx;
                let ky = b1.vy - b2.vy;
                let p = 2 * (nx * kx + ny * ky) / 2;
                b1.vx -= p * nx * BOUNCE;
                b1.vy -= p * ny * BOUNCE;
                b2.vx += p * nx * BOUNCE;
                b2.vy += p * ny * BOUNCE;
            }
        }
    }
    // Mouse repulsion
    if (mouse.active && mouse.x !== null && mouse.y !== null) {
        for (const ball of balls) {
            let dx = ball.x - mouse.x;
            let dy = ball.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS + ball.radius) {
                let force = (MOUSE_RADIUS + ball.radius - dist) * MOUSE_FORCE;
                let nx = dx / (dist || 1);
                let ny = dy / (dist || 1);
                ball.vx += nx * force;
                ball.vy += ny * force;
            }
        }
    }
    // Ball movement and wall collision
    for (const ball of balls) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vx *= FRICTION;
        ball.vy *= FRICTION;
        if (ball.x < ball.radius) {
            ball.x = ball.radius;
            ball.vx = -ball.vx * BOUNCE;
        } else if (ball.x > areaWidth - ball.radius) {
            ball.x = areaWidth - ball.radius;
            ball.vx = -ball.vx * BOUNCE;
        }
        if (ball.y < ball.radius) {
            ball.y = ball.radius;
            ball.vy = -ball.vy * BOUNCE;
        } else if (ball.y > areaHeight - ball.radius) {
            ball.y = areaHeight - ball.radius;
            ball.vy = -ball.vy * BOUNCE;
        }
        ball.vx = Math.max(Math.min(ball.vx, MAX_SPEED), -MAX_SPEED);
        ball.vy = Math.max(Math.min(ball.vy, MAX_SPEED), -MAX_SPEED);
        ball.el.style.left = ball.x + 'px';
        ball.el.style.top = ball.y + 'px';
    }
    animationFrame = requestAnimationFrame(animateBalls);
}

function resizeBalls() {
    getBallsArea();
    for (const ball of balls) {
        ball.x = randomBetween(ballRadius, areaWidth - ballRadius);
        ball.y = randomBetween(ballRadius, areaHeight - ballRadius);
        ball.el.style.left = ball.x + 'px';
        ball.el.style.top = ball.y + 'px';
    }
}

// Mouse tracking relative to About section
function setupMouseTracking() {
    const about = document.getElementById('about');
    if (!about) return;
    about.addEventListener('mousemove', (e) => {
        const rect = about.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    about.addEventListener('mouseleave', () => {
        mouse.active = false;
    });
}

// --- 3D Tilt Effect for Portfolio Cards ---
function setupPortfolioTilt() {
    const tilts = document.querySelectorAll('.portfolio-tilt');
    tilts.forEach(wrapper => {
        const card = wrapper.querySelector('.portfolio-card');
        if (!card) return;
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;
            const maxTilt = 18;
            card.style.transform = `rotateY(${dx * maxTilt}deg) rotateX(${-dy * maxTilt}deg) scale(1.04)`;
            card.style.boxShadow = `${-dx * 18}px ${dy * 18}px 32px 0 rgba(60,60,120,0.13)`;
        });
        wrapper.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

window.addEventListener('resize', resizeBalls);
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        getBallsArea();
        createBalls();
        setupMouseTracking();
        animateBalls();
        setupPortfolioTilt();
    }, 200);
});
