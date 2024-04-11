xy.grid = true;

const axis1 = new NewAxis({
    newOrigin: {x: 2, y: 1},
    newBasis1: {x: .5, y: 0}, 
    newBasis2: {x: 0, y: .5}
})
drawObjects.push(axis1);