backgroundColor = '#000000'
unit = 230;
xy.grid = true;
xy.origin = {x: 1394, y: 1493};

const xtAxis = new NewAxis({
    newOrigin: {x: -5, y: 2}, 
    newBasis1: {x: .1, y: 0},
    newBasis2: {x: 0, y: .25}, 
    axis1Length: 10,
    axis2Length: 3, 
    axis1Label: 't',
    axis2Label: 'x(t)'
});
drawObjects.push(xtAxis);   

const particle = {
    pos: {x: 5, y: 0}, 
    vel: {x: -1, y: 0},
    acc: {x: 0, y: 0} 
}

const parameter = {
    k: 1, 
    b: .1 
}

const dot = new CoordinatePoint({
    pos: particle.pos,
    color: 'red',
    animation: (() => { 
        if(isSimulating){
            particle.acc.x = -parameter.k*particle.pos.x - parameter.b*particle.vel.x;
            particle.vel.x += particle.acc.x*timeStep;
            particle.pos.x += particle.vel.x*timeStep + particle.acc.x*(timeStep**2)/2;
    
            dot.pos = particle.pos;
        }  
    })
})
drawObjects.push(dot);
animatedObjects.push(dot);
xtAxis.getOriginalCoordinates(particle.pos);

const graph = new CoordinatePoint({
    color: 'red',
    animation: (() => {
        graph.pos = {
            x: xtAxis.getOriginalCoordinates({x: t, y: 0}).x,
            y: xtAxis.getOriginalCoordinates({x: 0, y: particle.pos.x}).y
        }
        graph.showTrace({
            maxLength: 1000,
            saveFrameRate: 10, 
            radiusFunction: ((index) => (.5))
        });
    })
})

console.log(
    xtAxis.getOriginalCoordinates({x: 5, y: 0})
)
drawObjects.push(graph);
animatedObjects.push(graph);
