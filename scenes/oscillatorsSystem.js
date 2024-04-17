backgroundColor = '#000000';
unit = 420;
camera = {
    x: 150, y: 1000
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;



const particlesRadius = .1
const dL = 2;
const k = 100;
const p1 = new Particle({
    pos: {x: dL, y: 0},
    color: 'red',
    radius: particlesRadius,
    onMouseMoveAddition: ( () => {
        p1.pos.y = 0;
    })
})

const p2 = new Particle({
    pos: {x: 2*dL, y: 0},
    color: 'red',
    radius: particlesRadius, 
    onMouseMoveAddition: ( () => {
        p2.pos.y = 0;
    }),
    simulation: (() => {
        const x1 = p1.pos.x - dL;
        const x2 = p2.pos.x - 2*dL;
        
        p1.acc.x = -k*(2*x1 - x2)/p1.mass;
        p1.vel.x += timeStep*p1.acc.x;
        p1.pos.x += timeStep*p1.vel.x;
        
        p2.acc.x = -k*(-1*x1 + 2*x2)/p2.mass;
        p2.vel.x += timeStep*p2.acc.x;
        p2.pos.x += timeStep*p2.vel.x;
    })
})
interactiveObjects.push(p1, p2);
simulationObjects.push(p2);


const springsThickness = .025;
const spring1 = new Spring({
    ending: {x: 1*dL, y: 0},
    thickness: springsThickness,
    animation: (() => {
        
    })
})

const spring2 = new Spring({
    origin: {x: 1*dL, y: 0},
    ending: {x: 2*dL, y: 0},
    thickness: springsThickness,
    animation: (() => {

    })
})

const spring3 = new Spring({
    origin: {x: 2*dL, y: 0},
    ending: {x: 3*dL, y: 0},
    thickness: springsThickness,
    animation: (() => {
        spring1.ending.x = p1.pos.x;

        spring2.origin.x = p1.pos.x;
        spring2.ending.x = p2.pos.x;

        spring3.origin.x = p2.pos.x;
    })
})
animatedObjects.push(
    spring1, spring2, spring3
)

drawObjects.push(
    p1,
    p2, 
    spring1, 
    spring2, 
    spring3
)
