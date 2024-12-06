const { Engine, Render, Runner, Bodies, World } = Matter

const engine = Engine.create()
const { world } = engine

const showcase1 = document.getElementById("showcase-1")
const changeDirectionBtn = document.getElementById("change-direction")
const applyForceBtn = document.getElementById("apply-force")
const stopForceBtn = document.getElementById("stop-force")
const increaseBtn = document.getElementById("increase")
const decreaseBtn = document.getElementById("decrease")

const addBodyBtn = document.getElementById("add-body")
const removeBodyBtn = document.getElementById("remove-body")

let body;

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
    friction: 0,
    render: {
        fillStyle: '#0a0a45'
    }
})

World.add(world, ground)

const ball = Bodies.circle(400, 300, 40, {
    restitution: 0.8,
    friction: 0,
    frictionAir: 0,
    render: {
        fillStyle: '#87CEEB'
    }
})

World.add(world, ball)

let force = 0;
let direction = 'дясно';
const maxForce = 0.5;

changeDirectionBtn.addEventListener('click', () => {
    force = -force;

    direction = direction === 'дясно' ? 'ляво' : 'дясно';

});

applyForceBtn.addEventListener('click', () => {
    Matter.Body.applyForce(ball, {x: ball.position.x, y: ball.position.y}, {x: force, y: 0});
});


stopForceBtn.addEventListener('click', () => {
    Matter.Body.setVelocity(ball, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(ball, 0);

    force = 0;
});

increaseBtn.addEventListener('click', () => {
    if (force > 0 || (force === 0 && direction === 'дясно')) {
        force = Math.min(force + 0.1, maxForce);
    }
    else {
        force = Math.max(force - 0.1, -maxForce);
    }
});

decreaseBtn.addEventListener('click', () => {
    if (force > 0 && direction === 'дясно') {
        force = Math.max(force - 0.1, 0);
    } else {
        force = Math.min(force + 0.1, 0);
    }
});

addBodyBtn.addEventListener('click', () => {
    if (!body) {
        body = Bodies.rectangle(400, 300, 80, 80, {
            restitution: 0.8,
            render: {
                fillStyle: '#87CEEB'
            }
        });

        World.add(world, body);
    }
});

removeBodyBtn.addEventListener('click', () => {
    if (body) {
        World.remove(world, body);
        body = null;
    }
});

Matter.Events.on(engine, 'beforeUpdate', () => {
    if (ball.position.x > showcase1.clientWidth) {
        Matter.Body.setPosition(ball, { x: 0, y: ball.position.y });
    } else if (ball.position.x < 0) {
        Matter.Body.setPosition(ball, { x: showcase1.clientWidth, y: ball.position.y });
    }

    const speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2).toFixed(2);
    stats.textContent = `Сила: ${force.toFixed(1)} N; Посока на силата: ${direction}; Скорост: ${speed} m/s`;
});