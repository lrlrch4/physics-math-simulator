backgroundColor = '#303030'
unit = 300;
xy.grid = true;

G = 1;

const pA = new Particle({
    pos: {x: -1, y: 0},
    vel: {x: 0, y: 0},
    color: 'red', 
    label: 'A'
})

const pB = new Particle({
    pos: {x: 1, y: 0},
    vel: {x: 0, y: 0},
    color: 'green',
    label: 'B'
})

const pC = new Particle({
    pos: {x: 0, y: 1},
    vel: {x: 0, y: 0},
    color: '#0af',
    label: 'C',
    animation: (() => {
        pA.showTrace({});  
        pB.showTrace({});  
        pC.showTrace({});  
    }),
    simulation: (() => {
        

        pA.acc = pA.gravityInteractionWith([pB]);
        pA.vel.x += pA.acc.x*timeStep;
        pA.vel.y += pA.acc.y*timeStep;
        pA.pos.x += pA.vel.x*timeStep;
        pA.pos.y += pA.vel.y*timeStep;
        
        pB.acc = pB.gravityInteractionWith([pA]);
        pB.vel.x += pB.acc.x*timeStep;
        pB.vel.y += pB.acc.y*timeStep;
        pB.pos.x += pB.vel.x*timeStep;
        pB.pos.y += pB.vel.y*timeStep;
        
        pC.vel.x += pC.acc.x*timeStep;
        pC.vel.y += pC.acc.y*timeStep;
        pC.pos.x += pC.vel.x*timeStep;
        pC.pos.y += pC.vel.y*timeStep;

        pA.detectCollisionWith(pB);
        pA.detectCollisionWith(pC);
        pC.detectCollisionWith(pA);
    })
})

pA.detectCollisionWith(pB);

simulationObjects.push(
   pC
);
animatedObjects.push(pC);
drawObjects.push(
    pA, pB, pC
);
