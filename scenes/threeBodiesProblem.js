backgroundColor = '#000000'
unit = 120;
xy.grid = true;

G = 1;
const dFactor = 1;
const vFactor = .25;
const pRadius = .5;
const pA = new Particle({
    pos: {x: Math.sqrt(3)*dFactor, y: -1*dFactor},
    vel: {x: 1*vFactor, y: Math.sqrt(3)*vFactor},
    radius: pRadius,
    mass: 1,
    drawPosVec: true, 
    drawVelVec: true,
    velVecScale: 2,
    drawAccVec: true, 
    accVecScale: 2,
    color: 'red', 
    label: 'A', 
    opacity: .5
})

const pB = new Particle({
    pos: {x: 0*dFactor, y: 2*dFactor},
    vel: {x: -2*vFactor, y: 0*vFactor},
    radius: pRadius, 
    mass: 1,
    color: 'green',
    label: 'B'
})

const pC = new Particle({
    pos: {x: -Math.sqrt(3)*dFactor, y: -1*dFactor},
    vel: {x: 1*vFactor, y:  -Math.sqrt(3)*vFactor},
    radius: pRadius,
    mass: 1,
    color: '#0af',
    label: 'C',
    animation: (() => {
        if(frame > 0){
            const props = {
                maxLength: 100, 
                opacity: .05
            }
            // pA.showTrace(props);  
            pB.showTrace(props);  
            pC.showTrace(props);  
        }
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
