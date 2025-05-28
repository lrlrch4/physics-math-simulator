backgroundColor = '#000000';
showSceneData = true;
unit = 1600;
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

const n1 = 5; 
const n2 = 3;
const scalarField = new ScalarField({
    mathFunction: (
        (coor) => (coor.x + coor.y)
    ), 
    // domainRelation: (
    //     (coor) => (1)
    // ),
    stepSize: 500, 
    opacity: .5
})



drawObjects.push(
    scalarField
);
interactiveObjects.push();
animatedObjects.push();
simulationObjects.push();