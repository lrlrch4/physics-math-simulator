backgroundColor = '#000000';
showSceneData = true;
unit = 225;
camera = {
    x: .5*canvas.width, y: .9*canvas.height
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = false;
interactiveObjects.pop(0);

const Xmax = 5;
const Xmin = -5;
const k = 1;

const particle = new Particle({
    pos: {x: 0, y: 0},
    vel: {x: 0, y: 0},
    drawVelVec: true,
    velVecScale: .5, 
    drawAccVec: true,
    addVelController: true,
    drawVelController: true, 
    radius: .1,
    animation: (() => { 
        particle.pos.y = 0;  
    }),
    simulation: (() => {
        particle.pos.x += particle.vel.x*timeStep;
        particle.pos.y = 0;

        if(particle.pos.x >= Xmax){
            particle.vel.x *= -1;
        }
        if(particle.pos.x <= Xmin){
            particle.vel.x *= -1;
        }

        const s = particle.velVecScale;
        particle.controllerPos.x = particle.pos.x + s*particle.vel.x; 
        particle.controllerPos.y = particle.pos.y + s*particle.vel.y; 

        const maxLength = 20;
        const saveFrameRate = 5;

        if(particle.trackList.length >= maxLength){ 
            particle.trackList.shift();
        }
        if(frame % saveFrameRate === 0){ 
            particle.trackList.push(
                {
                    pos: particle.pos.x, 
                    vel: particle.vel.x
                } 
            );
            const cf = particle.trackList[particle.trackList.length - 1]; 
            const c0 = particle.trackList[particle.trackList.length - 2] ?? cf;
            const dt = saveFrameRate/fps;
            particle.acc.x = (cf.vel - c0.vel)/ dt;                        
        }              
    })    
})

const cinematicsData = new Text({
    color: 'white',
    size: 50,
    animation: (() => {
        const a = particle.acc.x.toFixed(2);
        const v = particle.vel.x.toFixed(2);
        const x = particle.pos.x.toFixed(2);
        cinematicsData.text = [
            `t = ${t.toFixed(2)} s, x = ${x} m, v = ${v} m/s, a = ${a} m/s^2`
        ], 
        cinematicsData.pos = xy.pixelsToCoordinates({
            x: 100, y: .975*canvas.height
        })
    })
})

const wUnits = 100;
const hUnits = 50;

const w = canvas.width/wUnits;
const h = canvas.height/hUnits;

const posTimeAxis = new NewAxis({
    axis1Label: 't', 
    axis2Label: 'x',
    axis1Step: 5,
    axis2Step: 2,
    animation: (() => {       

        posTimeAxis.newOrigin = xy.pixelsToCoordinates({x: 2*w, y: 8*h});
        posTimeAxis.newBasis1 = {x: xy.pixelCoordinateUnit(w), y: 0};
        posTimeAxis.newBasis2 = {x: 0, y: xy.pixelCoordinateUnit(h)};

        posTimeAxis.axis1Range = {start: 0, end: .95*wUnits}
        posTimeAxis.axis2Range = {start: -5, end: 5}
    })
})

const velTimeAxis = new NewAxis({
    axis1Label: 't', 
    axis2Label: 'v',
    axis1Step: 5,
    axis2Step: 2,
    animation: (() => {
        velTimeAxis.newOrigin = xy.pixelsToCoordinates({x: 2*w, y: 20*h});
        velTimeAxis.newBasis1 = {x: xy.pixelCoordinateUnit(w), y: 0};
        velTimeAxis.newBasis2 = {x: 0, y: xy.pixelCoordinateUnit(h)};

        velTimeAxis.axis1Range = {start: 0, end: .95*wUnits}
        velTimeAxis.axis2Range = {start: -5, end: 5}
    })
})

const accTimeAxis = new NewAxis({
    axis1Label: 't', 
    axis2Label: 'a',
    axis1Step: 5,
    axis2Step: 2,
    animation: (() => {
        accTimeAxis.newOrigin = xy.pixelsToCoordinates({x: 2*w, y: 32*h});
        accTimeAxis.newBasis1 = {x: xy.pixelCoordinateUnit(w), y: 0};
        accTimeAxis.newBasis2 = {x: 0, y: xy.pixelCoordinateUnit(.5*h)};

        accTimeAxis.axis1Range = {start: 0, end: .95*wUnits}
        accTimeAxis.axis2Range = {start: -10, end: 10}
    })
})

const posTimeData = new DataCurve({
    color: '#ff7300',
    simulation: (()=>{ 
        const dataCoordinates = posTimeAxis.getOriginalCoordinates({
            x: t,
            y: particle.pos.x
        })
        
        posTimeData.input.push(
            dataCoordinates.x
        );        
        posTimeData.output.push(
            dataCoordinates.y
        );
    })
})

const velTimeData = new DataCurve({
    color: '#3bff00',
    simulation: (()=>{ 
        const dataCoordinates = velTimeAxis.getOriginalCoordinates({
            x: t,
            y: particle.vel.x
        })
        
        velTimeData.input.push(
            dataCoordinates.x
        );        
        velTimeData.output.push(
            dataCoordinates.y
        );
    })
})

const accTimeData = new DataCurve({
    color: '#f6ff00',
    simulation: (()=>{ 
        const dataCoordinates = accTimeAxis.getOriginalCoordinates({
            x: t,
            y: particle.acc.x
        })
        
        accTimeData.input.push(
            dataCoordinates.x
        );        
        accTimeData.output.push(
            dataCoordinates.y
        );
    })
})


drawObjects.push(
    particle, 
    cinematicsData, 
    posTimeAxis, 
    velTimeAxis, 
    accTimeAxis, 
    posTimeData, 
    velTimeData, 
    accTimeData
);

interactiveObjects.push(
    particle
);
animatedObjects.push(
    particle, 
    cinematicsData, 
    posTimeAxis,
    velTimeAxis,
    accTimeAxis,     
);
simulationObjects.push(
    particle, 
    posTimeData,
    velTimeData, 
    accTimeData
);