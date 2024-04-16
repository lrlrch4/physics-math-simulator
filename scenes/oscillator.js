backgroundColor = '#000000'
unit = 230;
xy.grid = true;
xy.origin = {x: 1394, y: 1493};

const xtAxis = new NewAxis({
    newOrigin: {x: -5, y: 3}, 
    newBasis1: {x: .1, y: 0},
    newBasis2: {x: 0, y: .25}, 
    axis1Range: {start: 0, end: 100},
    axis2Range: {start: -6, end: 6},
    axis1Step: 10,
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
    simulation: (() => { 
        if(isSimulating){
            particle.acc.x = -parameter.k*particle.pos.x - parameter.b*particle.vel.x;
            particle.vel.x += particle.acc.x*timeStep;
            particle.pos.x += particle.vel.x*timeStep + particle.acc.x*(timeStep**2)/2;
    
            dot.pos = particle.pos;
        }  
    })
})
drawObjects.push(dot);
simulationObjects.push(dot);


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

drawObjects.push(graph);
animatedObjects.push(graph);


var order = 50;
const springOrigin = {x: -6, y: 0};
const springEnding = {x:  5, y: 0};
var springLength = Math.sqrt(
    (springEnding.x - springOrigin.x)**2 + (springEnding.y - springOrigin.y)**2
);

const spring = new ParametricCurve({ 
    mathFunction: (
        (s) => ({x: s, y: .05*Math.sin((order*Math.PI*(s-springOrigin.x))/springLength)})
    ),
    range: {
        start: springOrigin.x, 
        end: springOrigin.x + springLength
    },
    simulation: (() => {
        springEnding.x = particle.pos.x;

        springLength = Math.sqrt(
            (springEnding.x - springOrigin.x)**2 + (springEnding.y - springOrigin.y)**2
        );

        spring.mathFunction = (
            (s) => ({x: s, y: .05*Math.sin((order*Math.PI*(s-springOrigin.x))/springLength)})
        );
        spring.range = {
            start: springOrigin.x, 
            end: springOrigin.x + springLength
        }
    })
})
drawObjects.push(spring)
simulationObjects.push(spring)