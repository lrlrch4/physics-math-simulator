backgroundColor = '#000000';
unit = 250;
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

const colorField = new ColorField({
    mathFunction: ((coor) => (coor.x**2 + coor.y**2))
});

drawObjects.push(colorField);