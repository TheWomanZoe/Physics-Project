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

const ground = Bodies.rectangle(400, 440, 800, 40, {
    isStatic: true,
    render: {
        fillStyle: '#0a0a45'
    }
})

World.add(world, ground)

const ball = Bodies.circle(400, 400, 40, {
    restitution: 0.8,
    render: {
        fillStyle: '#87CEEB'
    }
});

const force = 0.01;
const mass = ball.mass;
const acceleration = force / mass; // Newton's 2nd law: F = m * a

World.add(world, ball);

Matter.Events.on(engine, 'beforeUpdate', () => {
    Matter.Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: acceleration, y: 0 });

    // Teleport the ball to the other side if it touches the wall
    if (ball.position.x > showcase1.clientWidth) {
        Matter.Body.setPosition(ball, { x: 0, y: ball.position.y });
    } else if (ball.position.x < 0) {
        Matter.Body.setPosition(ball, { x: showcase1.clientWidth, y: ball.position.y });
    }

    // When the ball reaches terminal velocity, it will stop accelerating, due to the force being applied being equal to the force of friction
});

Matter.Events.on(engine, 'beforeUpdate', () => {
    const speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2).toFixed(2);
    stats.textContent = `Сила: ${force} N; Посока на силата - дясно; Скорост: ${speed} m/s`;
});