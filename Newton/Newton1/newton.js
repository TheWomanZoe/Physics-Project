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

const ball = Bodies.circle(400, 100, 40, {
    restitution: 0.8,
    render: {
        fillStyle: '#87CEEB'
    }
})

World.add(world, ball)