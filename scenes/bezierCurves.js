backgroundColor = '#000000';
unit = 280;
camera = {
    x: .5*canvas.width, y: .5*canvas.height
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const pointsPositions = [
    {x: 0, y: 0},
    {x: 3, y: 4},
    {x: 5, y: 3},
    {x: 3, y: -1}
]

const points = pointsPositions.map(element => {
    return new CoordinatePoint({
        pos: element
    })
})

const bcCurve = new BezierConcCurve({
    anchorPoints: points, 
    isClosed: false
})

drawObjects.push(
    ...points,
    bcCurve, 
);
interactiveObjects.push(
    ...points, 
    ...bcCurve.controlPoints
);
animatedObjects.push();
simulationObjects.push();