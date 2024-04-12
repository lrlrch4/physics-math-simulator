backgroundColor = '#000000'

const G = 1;

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
    over = pA,
    by = [pB, pC]
}){
    const fBA = gravityForce(by[0], over);
    const fCA = gravityForce(by[1], over);

    return fr = {
        x: fBA.x + fCA.x, 
        y: fBA.y + fCA.y
    }
}

const pA = new Particle({
    pos: {x: 1, y: 0},
    color: 'red'
})

const pB = new Particle({
    pos: {x: 1, y: 0},
    color: 'green'
})

const pC = new Particle({
    pos: {x: 0, y: 0},
    color: 'blue',
    simulation: (() => {

    })
})

const fBA = gravityForce({by: pB, over: pA});
return (fBA)

simulationObjects.push(
   pC
);
drawObjects.push(
    pA, pB, pC
);