xy.grid = true;

const axis1 = new NewAxis({
    newOrigin: {x: 0, y: 0},
    newBasis1: {x: .5, y: 0}, 
    newBasis2: {x: 0, y: .5},

    axis1Range: {start: -2, end: 3},
    axis2Range: {start: -2, end: 3}
})
drawObjects.push(axis1);