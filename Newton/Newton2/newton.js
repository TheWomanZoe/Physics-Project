const { Engine, Render, Runner, Bodies, World } = Matter;

const engine = Engine.create();
const { world } = engine;

const showcase1 = document.getElementById("showcase-1");
const stats = document.getElementById("stats");

const render = Render.create({
    element: showcase1,
    engine: engine,
    options: {
        width: showcase1.clientWidth,
        height: showcase1.clientHeight,
        wireframes: false,
        background: '#ffffff'
    }
});

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

// Ground setup
const ground = Bodies.rectangle(400, 440, 800, 40, {
    isStatic: true,
    friction: 0,
    render: {
        fillStyle: '#0a0a45'
    }
});

World.add(world, ground);

// Ball setup
const ball = Bodies.circle(400, 400, 40, {
    restitution: 0.8, // Bounciness
    friction: 0, // No surface friction
    frictionAir: 0, // No air resistance
    mass: 5,
    render: {
        fillStyle: '#87CEEB'
    }
});

World.add(world, ball);

let force = 0; // Initial force magnitude
let direction = 'дясно';
const maxForce = 0.005;

// Buttons
const changeDirectionBtn = document.getElementById("change-direction");
const stopForceBtn = document.getElementById("stop-force");
const increaseMassBtn = document.getElementById("increase-mass");
const decreaseMassBtn = document.getElementById("decrease-mass");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

function updateBallMass(increment){
    if ((ball.mass < 10 && increment > 0) || (ball.mass > 1 && increment < 0)) {
        ball.mass = ball.mass + increment;
    }
}

changeDirectionBtn.addEventListener('click', () => {
    force = -force;
    direction = direction === 'дясно' ? 'ляво' : 'дясно';
});

stopForceBtn.addEventListener('click', () => {
    Matter.Body.setVelocity(ball, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(ball, 0);
    force = 0;
});

increaseMassBtn.addEventListener('click', () => {
   updateBallMass(1)
});

decreaseMassBtn.addEventListener('click', () => {
   updateBallMass(-1)
});

increaseBtn.addEventListener('click', () => {
    if (force > 0 || (force === 0 && direction === 'дясно')) {
        force = Math.min(force + 0.001, maxForce);
    }
    else {
        force = Math.max(force - 0.001, -maxForce);
    }
});

decreaseBtn.addEventListener('click', () => {
    if (force > 0 && direction === 'дясно') {
        force = Math.max(force - 0.001, 0);
    } else {
        force = Math.min(force + 0.001, 0);
    }
});

// Combine the beforeUpdate event
Matter.Events.on(engine, 'beforeUpdate', () => {
    if (force !== 0) {
        Matter.Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: force / ball.mass, y: 0 });
    }

    // Teleport the ball to the other side if it touches the wall
    if (ball.position.x > showcase1.clientWidth) {
        Matter.Body.setPosition(ball, { x: 0, y: ball.position.y });
    } else if (ball.position.x < 0) {
        Matter.Body.setPosition(ball, { x: showcase1.clientWidth, y: ball.position.y });
    }

    const speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2).toFixed(2);
    stats.textContent = `Сила: ${force.toFixed(3)} N; Посока на силата: ${direction}; Маса: ${ball.mass} g; Скорост: ${speed} m/s`;
});

