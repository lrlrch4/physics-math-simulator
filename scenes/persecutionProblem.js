backgroundColor = '#000000';
unit = 250;
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
const vA = 1;
const vB = 1; 
const mobileB = new Particle({
    pos: {x: 0, y: 0}, 
    vel: {x: 0, y: vB}, 
    color: 'red', 
    radius: .1,  
    simulation: (() => {
        mobileB.pos.y += vB*timeStep;
    })
})


const mobileA = new Particle({
    pos: {x: -D, y: 0}, 
    vel: {x: vA, y: 0},  
    radius: .1,  
    drawVelVec: true,
    velVecScale: .5,
    simulation: (() => {
        const angle = Math.atan(
            (mobileB.pos.y - mobileA.pos.y)/(mobileB.pos.x - mobileA.pos.x)
        )
        mobileA.vel = {
            x: vA*Math.cos(angle),
            y: vA*Math.sin(angle)
        }

        mobileA.pos.x += mobileA.vel.x*timeStep;
        mobileA.pos.y += mobileA.vel.y*timeStep;
        
        const distanceAB = Math.sqrt(
            (mobileB.pos.y - mobileA.pos.y)**2 + (mobileB.pos.x - mobileA.pos.x)**2 
        )
        console.log(distanceAB);
    })
})
drawObjects.push(
    mobileB,
    mobileA 
);
interactiveObjects.push(

);
animatedObjects.push(

);
simulationObjects.push(
    mobileB,
    mobileA 
);