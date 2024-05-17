xy.grid = true;

const w = .05*2*Math.PI;

const axis = new NewAxis({
    newOrigin: {x: 0, y: 0},
    newBasis1: {x: 1, y: 0}, 
    newBasis2: {x: 0, y: 1},

    axis1Range: {start: 0, end: 3},
    axis2Range: {start: 0, end: 3},

    animation: (() => {
        axis.newBasis1 = {
            x: Math.cos(w*t),
            y: Math.sin(w*t)
        }
        axis.newBasis2 = {
            x: -Math.sin(w*t),
            y: Math.cos(w*t)
        }
    })
})
animatedObjects.push(axis);

const eta = 0.05;
const axis2 = new NewAxis({
    color: '#0fa',
    newOrigin: {x: 0, y: 0},
    newBasis1: {x: 1, y: 0}, 
    newBasis2: {x: 0, y: 1},

    axis1Range: {start: 0, end: 3},
    axis2Range: {start: 0, end: 3},

    animation: (() => {
        axis2.newBasis1 = {
            x: Math.cosh(eta*t),
            y: -Math.sinh(eta*t)
        }
        axis2.newBasis2 = {
            x: -Math.sinh(eta*t),
            y: Math.cosh(eta*t)
        }
    })
})
animatedObjects.push(axis2);

const dot = new CoordinatePoint({
    pos: {x: 2, y: 1},
    color: 'white',
    animation: (() => { 
        const nCoor = axis.getNewCoordinates(dot.pos)
        dot.label = `r' = (${nCoor.x.toFixed(2)}, ${nCoor.y.toFixed(2)})`
    })
})
animatedObjects.push(dot);

drawObjects.push(
    axis, axis2, dot
)


console.log('axisScene loaded')