backgroundColor = '#303030'
unit = 50;
xy.grid = true;

G = 1;

const pA = new Particle({
    pos: {x: 0, y: 0},
    vel: {x: 0, y: 0},
    radius: 10,
    mass: 100,
    color: 'red', 
    label: 'A'
})

const pB = new Particle({
    pos: {x: 30, y: 0},
    vel: {x: 0, y: 2},
    radius: 1, 
    mass: 10,
    color: 'green',
    label: 'B'
})

const pC = new Particle({
    pos: {x: 32, y: 0},
    vel: {x: 0, y:  1},
    radius: .1,
    mass: 1,
    color: '#0af',
    label: 'C',
    animation: (() => {
        pA.showTrace({maxLength: 100});  
        pB.showTrace({maxLength: 100});  
        pC.showTrace({maxLength: 100});  
    }),
    simulation: (() => {
        

        pA.acc = pA.gravityInteractionWith([pB, pC]);
        pA.vel.x += pA.acc.x*timeStep;
        pA.vel.y += pA.acc.y*timeStep;
        pA.pos.x += pA.vel.x*timeStep;
        pA.pos.y += pA.vel.y*timeStep;
        
        pB.acc = pB.gravityInteractionWith([pA, pC]);
        pB.vel.x += pB.acc.x*timeStep;
        pB.vel.y += pB.acc.y*timeStep;
        pB.pos.x += pB.vel.x*timeStep;
        pB.pos.y += pB.vel.y*timeStep;
        
        pC.acc = pC.gravityInteractionWith([pA, pB]);
        pC.vel.x += pC.acc.x*timeStep;
        pC.vel.y += pC.acc.y*timeStep;
        pC.pos.x += pC.vel.x*timeStep;
        pC.pos.y += pC.vel.y*timeStep;

        pA.detectCollisionWith(pB);
        pA.detectCollisionWith(pC);
        pC.detectCollisionWith(pB);
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
