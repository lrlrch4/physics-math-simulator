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

const inputData = [];
const outputData = [];

const dataCurve = new DataCurve({
    animation: (() => {
        if(Math.ceil(t*60) % 10 == 1){
            inputData.push(t);
            outputData.push(Math.random());
        }
        dataCurve.input = inputData;
        dataCurve.output = outputData;
    }) 
})


drawObjects.push(
    dataCurve
);
interactiveObjects.push();
animatedObjects.push(
    dataCurve
);
simulationObjects.push();