backgroundColor = '#000000';
unit = 700;
camera = {
    x: 400, y: 1000
}

xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;



const particlesRadius = .05
const separation = 2;
const particle1 = new Particle({
    pos: {x: separation, y: 0},
    color: 'red',
    radius: particlesRadius
})


const particle2 = new Particle({
    pos: {x: 2*separation, y: 0},
    color: 'red',
    radius: particlesRadius
})







const springsThickness = .025;
const spring1 = new Spring({
    ending: {x: 1*separation, y: 0},
    thickness: springsThickness,
    animation: (() => {

    })
})

const spring2 = new Spring({
    origin: {x: 1*separation, y: 0},
    ending: {x: 2*separation, y: 0},
    thickness: springsThickness,
    animation: (() => {

    })
})

const spring3 = new Spring({
    origin: {x: 2*separation, y: 0},
    ending: {x: 3*separation, y: 0},
    thickness: springsThickness,
    animation: (() => {

    })
})

drawObjects.push(
    spring1, 
    spring2, 
    spring3,
    particle1,
    particle2 
)
