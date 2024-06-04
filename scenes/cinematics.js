backgroundColor = '#000000';
showSceneData = false;
unit = 350;
camera = {
    x: .70*canvas.width, y: .5*canvas.height
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const circularMotion = new MathParametricFunction({
    f: ((s) => ({x: Math.cos(s), y: Math.sin(s)}))
});

const epicycles = new MathParametricFunction({
    f: ((s) => ({
        x: Math.cos(s) + Math.cos(2*s), 
        y: Math.sin(s) + Math.sin(2*s)
    }))
});

const epicycles2 = new MathParametricFunction({
    f: ((s) => ({
        x: Math.cos(s) + .02*Math.cos(10*s), 
        y: Math.sin(s) + .02*Math.sin(10*s)
    }))
});

const positionFunction = epicycles;

const particle = new Particle({ 
    pos: {x: 1, y: 0},
    radius: .05,
    drawPosVec: true, 
    drawVelVec: true, 
    velVecScale: .25,
    drawAccVec: true,
    accVecScale: .05,
    animation: (() => { 
        particle.showTrace({
            maxLength: 50,
            saveFrameRate: 5
        });
        const w = .5;
        particle.pos = positionFunction.f(w*t);
        particle.vel = positionFunction.derivative().f(w*t);
        particle.acc = positionFunction.derivative().derivative().f(w*t);
    })
})

const delta = 11;
const pixelNumber = 0.03*canvas.height;

const posXTimeAxis = new NewAxis({
    axis1Label: 't', 
    axis2Label: 'x(t)',
    axis1Step: 2,
    animation: (()=>{
        const pUnit = xy.pixelCoordinateUnit(pixelNumber);
        posXTimeAxis.axis2Range = {start: -0.25*delta, end: .25*delta};
        posXTimeAxis.newBasis1 = {x: pUnit, y: 0};
        posXTimeAxis.newBasis2 = {x: 0, y: 2*pUnit};

        const n = Math.floor(t/delta);
        posXTimeAxis.axis1Range = {start: delta*n, end: delta*(n+1)};
        posXTimeAxis.newOrigin = {
            x: xy.pixelsToCoordinates({x: 100, y: 0}).x - pUnit*n*delta, 
            y: xy.pixelsToCoordinates({x: 0, y: 8*pixelNumber}).y
        }
    })
})

const posYTimeAxis = new NewAxis({
    axis1Label: 't', 
    axis2Label: 'y(t)',
    axis1Step: 2,
    animation: (()=>{
        const pUnit = xy.pixelCoordinateUnit(pixelNumber);
        posYTimeAxis.axis2Range = {start: -0.25*delta, end: .25*delta};
        posYTimeAxis.newBasis1 = {x: pUnit, y: 0};
        posYTimeAxis.newBasis2 = {x: 0, y: 2*pUnit};

        const n = Math.floor(t/delta);
        posYTimeAxis.axis1Range = {start: delta*n, end: delta*(n+1)};
        posYTimeAxis.newOrigin = {
            x: xy.pixelsToCoordinates({x: 100, y: 0}).x - pUnit*n*delta, 
            y: xy.pixelsToCoordinates({x: 0, y: 22*pixelNumber}).y
        }
    })
})

const xtPoint = new CoordinatePoint({
    color: 'red',
    animation: (() => {  
        xtPoint.pos = posXTimeAxis.getOriginalCoordinates({
            x: t, 
            y: particle.pos.x
        })
        if(isSimulating){
            xtPoint.showTrace({
                maxLength: 50,
                saveFrameRate: 15,
                opacity: 1,
                radiusFunction: ((index) => .5)
            });  
        }    
    })
})

const ytPoint = new CoordinatePoint({
    color: 'red',
    animation: (() => {  
        ytPoint.pos = posYTimeAxis.getOriginalCoordinates({
            x: t, 
            y: particle.pos.y
        })
        if(isSimulating){
            ytPoint.showTrace({
                maxLength: 50,
                saveFrameRate: 15,
                radiusFunction: ((index) => .5), 
                opacity: 1
            });      
        }
    })
})

const cinematicsDescription = new Text({
    size: 35,
    color: 'white',
    animation: (()=>{
        cinematicsDescription.pos = xy.pixelsToCoordinates({
            x: 40, 
            y: .94*canvas.height 
        })
        const r = {
            x: particle.pos.x.toFixed(2), 
            y: particle.pos.y.toFixed(2)
        }
        const v = {
            x: particle.vel.x.toFixed(2), 
            y: particle.vel.y.toFixed(2)
        }
        const a = {
            x: particle.acc.x.toFixed(2), 
            y: particle.acc.y.toFixed(2)
        }
        cinematicsDescription.text = [
            `t = ${t.toFixed(2)} ` +
            `r = (${r.x}, ${r.y}) `,
            `v = (${v.x}, ${v.y}) ` +
            `a = (${a.x}, ${a.y}) `
        ]
    })
})

const box = new Box({ 
    pixelPos: {x: 0, y: 0}, 
    width: 20*pixelNumber, 
    height: canvas.height, 
    borderRadius: 0, 
    showStroke: false
})


drawObjects.push(
    box,
    particle, 
    posXTimeAxis, 
    xtPoint, 
    posYTimeAxis,
    ytPoint, 
    cinematicsDescription
);
interactiveObjects.push();
animatedObjects.push(
    particle,
    posXTimeAxis, 
    xtPoint, 
    posYTimeAxis,
    ytPoint, 
    cinematicsDescription
);
simulationObjects.push();