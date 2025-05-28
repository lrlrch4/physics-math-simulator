backgroundColor = '#000000';
showSceneData = true;
unit = 400;
camera = {
    x: .5*canvas.width, y: .5*canvas.height
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = false;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const planesNumber = 1;
const planesDistance = .2;
const planeHeight = 20;

const w = 2;
var w0 = 2*w;
const ganma = .5;

const x0 = 1/Math.sqrt(
    (w0**2 - w**2)**2 + ganma**2 * w**2
);

const alpha =  Math.atan(
    ganma*w / (w0**2 - w)
)


const waveFunctions = [
    (x) => Math.sin(w * (t - x))
];

for (let i = 1; i < planesNumber; i++) {
    const x0 = 1 / Math.sqrt(
        (w0 ** 2 - w ** 2) ** 2 + ganma ** 2 * w ** 2
    );
    waveFunctions[i] = (x) =>
        waveFunctions[i - 1](x) + x0 * Math.sin(w * (t - Math.abs(x)) - alpha);
}




const sourceWave = new Curve({
    mathFunction: (x) => {
        if(x<0){
            return waveFunctions[0](x);
        }
    }
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
    })    
    waves.push(newWave);
}

const planes = [

];

for(let i = 0; i < planesNumber; i++){
    const newPlane = new Line({
        origin: {x: i*planesDistance, y: planeHeight/2},
        ending: {x: i*planesDistance, y: -planeHeight/2},
        opacity: .5,
        color: '#ff00bb'
    })
    planes.push(newPlane);
}






const secondaryWave = new Curve({
    mathFunction: ( 
        (x)=> x0 * Math.sin( w*(t-Math.abs(x)) - alpha)
    ),
    color: '#0fa'
})


const totalWave = new Curve({
    mathFunction: ( 
        (x)=> {
            if(x>=0){
                return Math.sin( w*(t-x)) + x0 * Math.sin( w*(t-Math.abs(x)) - alpha);
            }
        }
    ),
    color: '#ffc900'
})

const electron = new Particle({
    pos: {x: 0, y: 0},
    animation: (() => {
        electron.pos = {x: 0, y: x0 * Math.sin( w*t - alpha) }
    }),
    radius: .05, 
    color: '#0fa'
})

const springTop = new Spring({
    origin: {x: 0, y: 1},
    ending: electron.pos,
    animation: (() => {
        springTop.ending = electron.pos;
    }),
    thickness: .025,
    color: '#fe0000' 
})

const springDown = new Spring({
    origin: {x: 0, y: -1},
    ending: electron.pos,
    animation: (() => {
        springDown.ending = electron.pos;
    }),
    thickness: .025,
    color: '#fe0000' 
})

const variablesText = new Text ({
    text: [
        `     source frecuency: w`, 
        `fundamental frecuency: w0 = ${w0}w`
    ],
    pos: {x:100, y: 150},
    absolutePosition: true,
    color: '#ffffff'
})


drawObjects.push(
    // sourceWave,
    secondaryWave, 
    totalWave, 
    springTop, 
    springDown,
    electron,
    variablesText,
    ...waves, 
    ...planes
);

interactiveObjects.push();
animatedObjects.push(
    sourceWave,
    secondaryWave, 
    totalWave, 
    electron, 
    springTop,
    springDown
);
simulationObjects.push();