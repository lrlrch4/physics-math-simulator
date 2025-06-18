backgroundColor = '#000000'; //Background color of the simulation
showSceneData = true; //Show scene frames, time, resolution, etc. 
unit = 15; // pixels of a unit in coordinate system
camera = {
    x: 980, y: 980
} //Position of the window camera in window coordinates
xy.origin = {
    x: camera.x, 
    y: camera.y
}; //Origin of coordinates position in the window coordinates
xy.grid = false; //show coordinates grid
xy.horizontalAxis = false; //Show horizontal axis in scene
xy.verticalAxis = false; //Show vertical axis in scene

const fieldStepSize = 20; //simulation setup

var lambda = 50;
var slitWidth = 1;
var screenDistance = 100;
var scale = 10;
var c = 50;
var screenWidth = 1000;


const setFresnelScene = () => {
    lambda = 0.05;
    slitWidth = 100*lambda;
    screenDistance = (10**4)*lambda;
    setCameraGeneral('Fresnel');
    scale = 300;
    c = .1;
}

const setFraunhoferScene = () => {
    lambda = 0.05;
    slitWidth = 100*lambda;
    screenDistance = (10**5)*lambda;
    setCameraGeneral('Fraunhofer');
    scale = 300;
    c = .1;
}

const setCameraGeneral = (scene) => {
    if(scene == 'Fresnel'){
        unit = 3;
        xy.origin = {x: 680, y: 900};   
        drawFrame();
    }
    if(scene == 'Fraunhofer'){
        unit = .5;
        xy.origin = {x: 178, y: 924};   
        drawFrame();
    }
}

const setCameraSlit = (scene) => {
    if(scene == 'Frenel'){
        unit = 202;
        xy.origin = {x: 652, y: 924};   
        drawFrame();
    }   
    if(scene == 'Fraunhofer'){
        unit = 202;
        xy.origin = {x: 652, y: 924};   
        drawFrame();
    }    
}

const setCameraScreen = (scene) => {
    if(scene == 'Fresnel'){
        unit = 3.2;
        xy.origin = {x: -14140, y: 902};   
        drawFrame();
    }
    if(scene == 'Fraunhofer'){
        unit = 3.2;
        xy.origin = {x: -14140, y: 902};   
        drawFrame();
    }
}

// setFresnelScene();
// setFraunhoferScene();

const k = 2*Math.PI/lambda;
const w = 2*Math.PI*c/lambda;
const n = 10; //number of secondary spherical waves

const wallSup = new Line({
    origin: {x: 0, y: slitWidth/2}, 
    ending: {
        x: 0,
        y: xy.pixelsToCoordinates({x: 0, y: 0}).y
    },
    lineWidth: 10,
    color: '#ff0000',
    animation: (()=> {
        wallSup.ending.y = xy.pixelsToCoordinates({x: 0, y: 0}).y;
    })
});

const wallInf = new Line({
    origin: {x: 0, y: -slitWidth/2}, 
    ending: {
        x: 0,
        y: xy.pixelsToCoordinates({x: 0, y: canvas.height/2}).y
    },
    lineWidth: 10,
    color: '#ff0000',
    animation: (()=> {
        wallInf.ending.y = xy.pixelsToCoordinates({x: 0, y: canvas.height}).y;
    })
});


const incidentWave = new ScalarField({
    mathFunction: ((coor) => Math.cos(k*coor.x-w*t)**2), // se actualizará dinámicamente
    domainRelation: ((coor) => (coor.x < 0)),
    stepSize: fieldStepSize,
    opacity: 1,
});

const d = slitWidth/(n-1)
const diffractedWave = new ScalarField({
    mathFunction: ((coor) => {}),
    domainRelation: ((coor) => (
        0 < coor.x & coor.x < screenDistance 
    )),
    stepSize: fieldStepSize,
    opacity: 1,
    simulation: (() => {     
        diffractedWave.mathFunction = (coor) => {
            let amplitude = 0;
            for(let i = 0; i < n; i++){
                const posY = -slitWidth/2 + i*d;
                const r = Math.sqrt(coor.x**2 + (coor.y - posY)**2);
                amplitude += (1/Math.sqrt(r))*Math.cos(k*r-w*t);
            }
            return amplitude**2;
        }
    })
})


const intensityCurve = new ParametricCurve({
    mathFunction: ((s) => ({x: screenDistance, y: s})), 
    range: {
        start: -screenWidth/2, 
        end: screenWidth/2
    },
    simulation: (()=> {
        intensityCurve.mathFunction = (s) => {
            coor = {
                x: 100, 
                y: s
            }
            return {
                x: scale*diffractedWave.mathFunction(coor)**2 + screenDistance,
                y: s                
            }
        }
    }),
    color: '#ff0000'
})



const period = lambda/c;
const f =  (coor, time) => {
    let amplitude = 0;
    for(let i = 0; i < n; i++){
        const posY = -slitWidth/2 + i*d;
        const r = Math.sqrt(coor.x**2 + (coor.y - posY)**2);
        amplitude += (1/Math.sqrt(r))*Math.cos(k*r-w*time);
    }
    return amplitude**2;
}
const intSteps = 20;
const dt = period/intSteps;
const avgIntensity = (s) => {
    let sum = 0;
    for(let i = 0; i < intSteps; i++){
        sum += f({x: 100, y: s}, i*dt)*dt
    }
    return scale*(sum/period) + screenDistance;
}

const h = screenWidth/2;
const samples = 200;
const sData = Array.from(
    {length: samples}, 
    (_, i) => -h + i * (2*h) / (samples - 1)
);
const intensityData = sData.map(avgIntensity);  

const intCurveAvg = new DataCurve({
    input: intensityData,
    output: sData
})  




drawObjects.push(
    incidentWave,
    diffractedWave, 
    wallSup, 
    wallInf,
    intensityCurve, 
    intCurveAvg,
);
simulationObjects.push(
    diffractedWave, 
    intensityCurve, 
);

animatedObjects.push(
    wallSup,
    wallInf, 
);

interactiveObjects.push(
);


