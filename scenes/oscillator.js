backgroundColor = '#000000'
unit = 230;
xy.grid = true;
xy.origin = {x: 1394, y: 1493};

const xtAxis = new NewAxis({
    newOrigin: {x: 0, y: 2}, 
    newBasis1: {x: .1, y: 0},
    newBasis2: {x: 0, y: .1}, 
    axis1Length: 5,
    axis2Length: 3
});
drawObjects.push(xtAxis);   

const particle = {
    pos: {x: 5, y: 0}, 
    vel: {x: -1, y: 0},
    acc: {x: 0, y: 0} 
}

const parameter = {
    k: 1, 
    b: -1 
}

const dot = new CoordinatePoint({
    pos: particle.pos,
    color: 'red',
    animation: (() => { 
        if(isSimulating){
            particle.acc.x = -parameter.k*particle.pos.x;
            particle.vel.x += particle.acc.x*timeStep;
            particle.pos.x += particle.vel.x*timeStep + particle.acc.x*(timeStep**2)/2;
    
            dot.pos = particle.pos;
        }  
    })
})
drawObjects.push(dot);
animatedObjects.push(dot);

const graph = new CoordinatePoint({
    pos: xtAxis.getOriginalCoordinates({x: t, y: particle.pos.x}),
    animation: (() => {
        graph.pos = {
            x: xtAxis.getOriginalCoordinates({x: t, y: 0}).x,
            y: xtAxis.getOriginalCoordinates(particle.pos).x 
        };
    })
})
drawObjects.push(graph);
animatedObjects.push(graph);
