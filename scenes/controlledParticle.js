backgroundColor = '#000000'
xy.horizontalAxis = true;
xy.verticalAxis = true;
xy.grid = true;

const particle = new Particle({
    pos: {x: 0, y: 0},
    vel: {x: .8, y: .6},
    drawVelVec: true,
    velVecScale: .5, 
    addVelController: true,
    drawVelController: true, 
    radius: .1,
    animation: (() => {
        particle.showTrace({})
    }),
    simulation: (() => {
        particle.pos.x += particle.vel.x*timeStep;
        particle.pos.y += particle.vel.y*timeStep;

        const s = particle.velVecScale;
        particle.controllerPos.x = particle.pos.x + s*particle.vel.x; 
        particle.controllerPos.y = particle.pos.y + s*particle.vel.y; 
    })
})
drawObjects.push(particle);
animatedObjects.push(particle);
interactiveObjects.push(particle);
simulationObjects.push(particle);