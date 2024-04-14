backgroundColor = '#303030'
unit = 300;

const G = 10;
function gravityForce({
    by = pB,
    over = pA
}){
    const r = { 
        x: by.pos.x - over.pos.x, 
        y: by.pos.y - over.pos.y
    }
    const d = Math.sqrt(r.x**2 + r.y**2);
    const f = {
        x: G*by.mass*r.x/d**3,
        y: G*by.mass*r.y/d**3,
    }
    return f;
}
function gravityResultant({
    by = [pB, pC],
    over = pA
}){
    const fBA = gravityForce({by: by[0], over: over});
    const fCA = gravityForce({by: by[1], over: over});

    return fr = {
        x: fBA.x + fCA.x, 
        y: fBA.y + fCA.y
    }
}

const pA = new Particle({
    pos: {x: -1, y: 0},
    vel: {x: 1, y: 0},
    color: 'red', 
    label: 'A'
})

const pB = new Particle({
    pos: {x: 1, y: 0},
    vel: {x: -1, y: 0},
    color: 'green',
    label: 'B'
})

const pC = new Particle({
    pos: {x: -100, y: -100},
    vel: {x: 1, y: -Math.sqrt(3)},
    color: '#0af',
    label: 'C',
    animation: (() => {
        pA.showTrace({
            maxLength: 30,
            saveFrameRate: 3, 
            opacity: .5
        })  
        pB.showTrace({
            maxLength: 30,
            saveFrameRate: 3, 
            opacity: .5
        })  
        pC.showTrace({
            maxLength: 30,
            saveFrameRate: 3, 
            opacity: .5
        })  
    }),
    simulation: (() => {
        const fA = gravityResultant({over: pA, by: [pB, pC]});
        const fB = gravityResultant({over: pB, by: [pC, pA]});
        const fC = gravityResultant({over: pC, by: [pA, pB]});

        pA.acc = fA;
        pA.vel.x += pA.acc.x*timeStep;
        pA.vel.y += pA.acc.y*timeStep;
        pA.pos.x += pA.vel.x*timeStep;
        pA.pos.y += pA.vel.y*timeStep;

        const distanceVector = new Vector({
            x: pB.pos.x - pA.pos.x, 
            y: pB.pos.y - pA.pos.y
        })
        const distance = distanceVector.module(); 
        const unit = distanceVector.unitary();
        const unitOrt = unit.orthogonal();

        const vcm = {
            x: (pA.mass*pA.vel.x + pB.mass*pB.vel.x)/(pA.mass + pB.mass),
            y: (pA.mass*pA.vel.y + pB.mass*pB.vel.y)/(pA.mass + pB.mass)
        }
        const vA = {
            x: pA.vel.x - vcm.x,
            y: pA.vel.y - vcm.y
        }
        const vB = {
            x: pB.vel.x - vcm.x,
            y: pB.vel.y - vcm.y
        }

        const a1 = dotProduct(vA, unit);
        const a2 = dotProduct(vA, unitOrt);

        const b1 = dotProduct(vB, unit);
        const b2 = dotProduct(vB, unitOrt);
        if(distance < pA.radius + pB.radius){
            console.log(pA.pos)
            console.log(pA.vel)

            pA.vel = { 
                x: -a1*unit.x + a2*unitOrt.x + vcm.x,
                y: -a1*unit.y + a2*unitOrt.y + vcm.y
            }
            pB.vel = { 
                x: -b1*unit.x + b2*unitOrt.x + vcm.x,
                y: -b1*unit.y + b2*unitOrt.y + vcm.y
            }
            const k = distance/(pA.radius + pB.radius);
            pA.pos = {
                x: pA.pos.x - pA.radius*(1-k)*unit.x,
                y: pA.pos.y - pA.radius*(1-k)*unit.y
            }
            pB.pos = {
                x: pB.pos.x + pB.radius*(1-k)*unit.x,
                y: pB.pos.y + pB.radius*(1-k)*unit.y
            }
            console.log(pA.pos)
            console.log(pA.vel)

        }

        pB.acc = fB;
        pB.vel.x += pB.acc.x*timeStep;
        pB.vel.y += pB.acc.y*timeStep;
        pB.pos.x += pB.vel.x*timeStep;
        pB.pos.y += pB.vel.y*timeStep;

        pC.acc = fC;
        pC.vel.x += pC.acc.x*timeStep;
        pC.vel.y += pC.acc.y*timeStep;
        pC.pos.x += pC.vel.x*timeStep;
        pC.pos.y += pC.vel.y*timeStep;        
    })
})

simulationObjects.push(
   pC
);
animatedObjects.push(pC);
drawObjects.push(
    pA, pB, pC
);
