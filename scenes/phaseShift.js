backgroundColor = '#000000';
showSceneData = true;
unit = 193;
camera = {
    x: 800, y: 1000
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = false;
xy.horizontalAxis = false;
xy.verticalAxis = false;

const planesPerMeter = .2;
//Incident wave and fundamental frecuency
const w = 1;
const a = 1;
const w0 = a*w;
//Amortiguation coeficient
const gamma = 10;

//Planes drawing
const glassThickness = 10;
const planeHeight = 20;
const planesNumber = Math.ceil(planesPerMeter*glassThickness);
const planesDistance = glassThickness/planesNumber;
const planes = [];
for(let i = 0; i < planesNumber; i++){
    const newPlane = new Line({
        origin: {x: i*planesDistance, y: planeHeight/2},
        ending: {x: i*planesDistance, y: -planeHeight/2},
        opacity: .25,
        color: '#03d5ff'
    })
    planes.push(newPlane);
}

//Waves config
const x0 = 1/Math.sqrt(
    (w0**2 - w**2)**2 + gamma**2 * w**2
);
const alpha =  Math.atan(
    gamma*w / (w0**2 - w)
)
const waveFunctions = [
    (x) => Math.sin(w * (t - x))
];
for (let i = 1; i < planesNumber; i++) {
    const x0 = 1 / Math.sqrt(
        (w0 ** 2 - w ** 2) ** 2 + gamma ** 2 * w ** 2
    );
    waveFunctions[i] = (x) =>
        waveFunctions[i - 1](x) + x0 * Math.sin(w * (t - Math.abs(x)) - alpha);
}

const sourceWave = new Curve({
    mathFunction: (x) => (waveFunctions[0](x)), 
    color: '#3dff03'
})
const waves = [
    sourceWave
];
for(let i = 1; i < planesNumber; i++){
    const newWave = new Curve({
        mathFunction: (x) => {
            if(x < (i)*planesDistance  & x > (i-1)*planesDistance){
                return waveFunctions[i](x);
            }
            else{
                return;
            }
        },
        color: '#ff7803'
    })    
    waves.push(newWave);
}

const secondaryWave = new Curve({
    mathFunction: ( 
        (x)=> x0 * Math.sin( w*(t-Math.abs(x)) - alpha)
    ),
    opacity: .25,
    color: '#ffd103'
});

const totalWave = new Curve({
    mathFunction: ( 
        (x)=> {
            if(x>=0){
                return Math.sin( w*(t-x)) + x0 * Math.sin( w*(t-Math.abs(x)) - alpha);
            }
        }
    ),
    color: '#ffc900'
});

const electron = new Particle({
    pos: {x: 0, y: 0},
    animation: (() => {
        electron.pos = {x: 0, y: x0 * Math.sin( w*t - alpha) }
    }),
    radius: .1, 
    color: '#ffd103'
})

const springTop = new Spring({
    origin: {x: 0, y: 3},
    ending: electron.pos,
    animation: (() => {
        springTop.ending = electron.pos;
    }),
    thickness: .025,
    color: '#03d5ff' 
})

const springDown = new Spring({
    origin: {x: 0, y: -3},
    ending: electron.pos,
    animation: (() => {
        springDown.ending = electron.pos;
    }),
    thickness: .025,
    color: '#03d5ff' 
})

const variablesText = new Text ({
    text: [
        `     source frecuency: w`, 
        `fundamental frecuency: w0 = ${w0/w}w`
    ],
    pos: {x:100, y: 150},
    absolutePosition: true,
    size: 40,
    color: '#ffffff'
})


drawObjects.push(
    springTop, 
    springDown,
    electron,
    variablesText,
    secondaryWave,
    ...waves, 
    ...planes
);

interactiveObjects.push();
animatedObjects.push(
    electron, 
    springTop,
    springDown
);
simulationObjects.push();