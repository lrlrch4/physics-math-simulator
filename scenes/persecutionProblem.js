backgroundColor = '#000000';
unit = 500;
camera = {
    x: .5*canvas.width, y: .5*canvas.height
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const D = 1;
const vA = .5;
const vB = 1; 
var minDistance = D;

const alpha = vA/vB;
const beta = Math.sqrt(1-alpha**2);
const rmin = (alpha ===1)? D/2 : D*(1/beta)*((1-alpha)/beta)**alpha;

const mobileB = new Particle({
    pos: {x: 0, y: 0}, 
    vel: {x: 0, y: vB}, 
    color: '#0fa', 
    radius: .1,  
    animation: (() => {
        xy.origin.y += vB*timeStep*unit;
    })
});

const mobileA = new Particle({
    pos: {x: -D, y: 0}, 
    vel: {x: vA, y: 0},  
    radius: .1,  
    drawVelVec: true,
    velVecScale: .25,
    simulation: (() => {
        const angle = Math.atan2(
            mobileB.pos.y - mobileA.pos.y,
            mobileB.pos.x - mobileA.pos.x
        );
        mobileA.vel = {
            x: vA*Math.cos(angle),
            y: vA*Math.sin(angle)
        }
        mobileA.pos.x += mobileA.vel.x*timeStep;
        mobileA.pos.y += mobileA.vel.y*timeStep;

        mobileB.pos.y += vB*timeStep;        
    })
});

const text = new Text({
    animation: (() => {
        text.pos = {
            x: mobileB.pos.x + .25, 
            y: mobileB.pos.y - .1 
        }
        const distanceAB = Math.sqrt(
            (mobileB.pos.y - mobileA.pos.y)**2 + (mobileB.pos.x - mobileA.pos.x)**2 
        );
        if(distanceAB < minDistance){
            minDistance = distanceAB;
        }
        
        text.text = [
            `d = ${distanceAB.toFixed(2)}`, 
            `dmin = ${minDistance.toFixed(2)} (simulated)`, 
            `dmin = ${rmin.toFixed(2)} (calculated)`
        ]
    }) 
})


drawObjects.push(
    mobileB,
    mobileA, 
    text
);
interactiveObjects.push(

);
animatedObjects.push(
    mobileB, 
    text
);
simulationObjects.push(
    mobileB,
    mobileA 
);