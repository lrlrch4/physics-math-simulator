backgroundColor = '#000000';
showSceneData = true;
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



const dataCurve = new DataCurve({

})


drawObjects.push(
    dataCurve
);
interactiveObjects.push();
animatedObjects.push();
simulationObjects.push();