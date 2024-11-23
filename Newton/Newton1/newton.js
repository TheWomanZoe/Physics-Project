const { Engine, Render, Runner, Bodies, World } = Matter

const engine = Engine.create()
const { world } = engine

const showcase1 = document.getElementById("showcase-1")

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

const ball = Bodies.circle(400, 300, 40, {
    restitution: 0.8,
    render: {
        fillStyle: '#87CEEB'
    }
})

World.add(world, ball)

Matter.Events.on(engine, 'beforeUpdate', () => {
    const speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2).toFixed(2);
    stats.textContent = `Скорост: ${speed} m/s`;
});