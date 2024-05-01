backgroundColor = '#000000';
unit = 300;
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

const curve = new ParametricCurve({
    mathFunction: ((s) => ({x: Math.cos(s), y: Math.sin(s)})),
    range: {start: 0, end: 2*Math.PI}
})

const point = new CoordinatePoint({ 
    pos: {x: 1, y: 0}, 
    onMouseMoveAddition: ((event) => {
        const cMouse = xy.pixelsToCoordinates({
            x: resolutionFactor*event.x, 
            y: resolutionFactor*event.y
        })
        console.log(cMouse)
        const s0 = Math.atan2(cMouse.y, cMouse.x);

        point.pos = curve.mathFunction(s0)
    })
})


drawObjects.push(curve, point);
interactiveObjects.push(point);
