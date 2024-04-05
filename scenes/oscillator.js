backgroundColor = '#000000'
unit = 230;
xy.grid = true;
xy.origin = {x: 1394, y: 1493};

const xtAxis = new NewAxis({
    newOrigin: {x: 0, y: 4}, 
    newBasis1: {x: 1, y: 0},
    newBasis2: {x: 0, y: 1}
});
drawObjects.push(xtAxis);   

const particle = {
    pos: {x: 4, y: 0}, 
    vel: {x: -1, y: 0},
    acc: {x: 0, y: 0} 
}

const parameter = {
    k: 1, 
    b: -1 
}

const dot = new CoordinatePoint({
    pos: particle.pos,
    animation: (() => {    
        particle.acc = {
            x: -parameter.k*particle.pos.x, 
            y: 0
        };
        particle.vel = {
            x: particle.acc.x*timeStep + particle.vel.x, 
            y: 0
        }
        particle.pos = { 
            x: particle.pos.x + particle.vel.x*timeStep + particle.acc.x*(timeStep**2)/2, 
            y: 0
        }

        dot.pos = {
            x: particle.pos.x, 
            y: particle.pos.y
        };
    })
})
drawObjects.push(dot);
animatedObjects.push(dot);