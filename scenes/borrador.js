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

const w = 2;
var w0 = 2*w;
const ganma = .5;

const x0 = 1/Math.sqrt(
    (w0**2 - w**2)**2 + ganma**2 * w**2
)
const alpha =  Math.atan(
    ganma*w / (w0**2 - w)
)


const sourceWave = new Curve({
    mathFunction: ( 
        (x)=> Math.sin( w*(t-x))
    )
})

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
    sourceWave,
    secondaryWave, 
    totalWave, 
    springTop, 
    springDown,
    electron,
    variablesText
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