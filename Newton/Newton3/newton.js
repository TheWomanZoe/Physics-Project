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

const ballA = Bodies.circle(100, 400, 40, {
    restitution: 0.8,
    render: {
        fillStyle: '#87CEEB'
    }
});

const ballB = Bodies.circle(700, 400, 40, {
    restitution: 0.8,
    render: {
        fillStyle: '#FF6347'
    }
});

World.add(world, [ballA, ballB]);

Matter.Events.on(engine, 'beforeUpdate', () => {
    const forceMagnitude = 0.001;
    const force = { x: forceMagnitude, y: 0 };

    Matter.Body.applyForce(ballA, { x: ballA.position.x, y: ballA.position.y }, force);
    Matter.Body.applyForce(ballB, { x: ballB.position.x, y: ballB.position.y }, { x: -force.x, y: -force.y });

    const speedA = Math.sqrt(ballA.velocity.x ** 2 + ballA.velocity.y ** 2).toFixed(2);
    const speedB = Math.sqrt(ballB.velocity.x ** 2 + ballB.velocity.y ** 2).toFixed(2);
    stats.textContent = `Speed A: ${speedA}, Speed B: ${speedB}`;
});