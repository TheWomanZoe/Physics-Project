const { Engine, Render, Runner, Bodies, World } = Matter

const engine = Engine.create()
const { world } = engine

const showcase1 = document.getElementById("showcase-1")
const stats = document.getElementById("stats")

const render = Render.create({
    element: showcase1,
    engine: engine,
    options: {
        width: showcase1.clientWidth,
        height: showcase1.clientHeight,
        wireframes: false,
        background: '#ffffff'
    }
})

Render.run(render)

const runner = Runner.create()
Runner.run(runner, engine)

const canvasWidth = showcase1.clientWidth;
const canvasHeight = showcase1.clientHeight;

const walls = [
    Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 20, { // Top wall
        isStatic: true,
        render: { fillStyle: '#0a0a45' }
    }),
    Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 20, { // Bottom wall
        isStatic: true,
        render: { fillStyle: '#0a0a45' }
    }),
    Bodies.rectangle(0, canvasHeight / 2, 20, canvasHeight, { // Left wall
        isStatic: true,
        render: { fillStyle: '#0a0a45' }
    }),
    Bodies.rectangle(canvasWidth, canvasHeight / 2, 20, canvasHeight, { // Right wall
        isStatic: true,
        render: { fillStyle: '#0a0a45' }
    })
];

World.add(world, walls);

const ground = Bodies.rectangle(400, 440, 800, 40, {
    isStatic: true,
    render: {
        fillStyle: '#0a0a45'
    }
})

World.add(world, ground)

const ballA = Bodies.circle(100, 400, 40, {
    restitution: 0.8,
    friction: 0,
    frictionAir: 0,
    render: {
        fillStyle: '#87CEEB'
    }
});

const ballB = Bodies.circle(700, 400, 40, {
    restitution: 0.8,
    friction: 0,
    frictionAir: 0,
    render: {
        fillStyle: '#FF6347'
    }
});

World.add(world, [ballA, ballB]);

const increaseForceA = document.getElementById("increase-a");
const decreaseForceA = document.getElementById("decrease-a");
const increaseForceB = document.getElementById("increase-b");
const decreaseForceB = document.getElementById("decrease-b");

let forceA = 0.001;
let forceB = 0.001;

increaseForceA.addEventListener("click", () => {
    forceA = forceA < 0.01 ? forceA += 0.001 : forceA;
});

decreaseForceA.addEventListener("click", () => {
    forceA = forceA > 0 ? forceA -= 0.001 : forceA;
});

increaseForceB.addEventListener("click", () => {
    forceB = forceB < 0.01 ? forceB += 0.001 : forceB;
});

decreaseForceB.addEventListener("click", () => {
    forceB = forceB > 0 ? forceB -= 0.001 : forceB;
});

Matter.Events.on(engine, 'beforeUpdate', () => {
    Matter.Body.applyForce(ballA, { x: ballA.position.x, y: ballA.position.y }, { x: forceA, y: 0 });
    Matter.Body.applyForce(ballB, { x: ballB.position.x, y: ballB.position.y }, { x: -forceB, y: 0 });

    const speedA = Math.sqrt(ballA.velocity.x ** 2 + ballA.velocity.y ** 2).toFixed(2);
    const speedB = Math.sqrt(ballB.velocity.x ** 2 + ballB.velocity.y ** 2).toFixed(2);
    stats.textContent = `Скорост A: ${speedA} m/s, Сила А: ${forceA.toFixed(3)} N; Скорост B: ${speedB} m/s, Сила B: ${forceB.toFixed(3)} N`;
});