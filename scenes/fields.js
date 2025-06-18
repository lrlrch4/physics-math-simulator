backgroundColor = '#000000';
showSceneData = true;
unit = 150;
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


const scalarField = new ScalarField({
    mathFunction: (
        (coor) => (coor.x*Math.cos(coor.x-t))
    ), 
    domainRelation: (()=>true),
    stepSize: 100, 
    opacity: .5,
    simulation: (() => {
        scalarField.mathFunction = (coor) => (
            coor.x*Math.cos(coor.x-t)
        )        
    })
})


drawObjects.push(
    scalarField
);
interactiveObjects.push();
animatedObjects.push();
simulationObjects.push(
    scalarField
);