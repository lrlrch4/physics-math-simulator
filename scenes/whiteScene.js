backgroundColor = '#000000';
unit = 250;
camera = {
    x: 200, y: 1000
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const inputData = Array.from(
    {length: 200}, 
    (element, index) => .05*index
);

const outputData = Array.from({
    length: inputData.length}, 
    (element, index) => Math.random()
);

const dataCurve = new DataCurve({
    input: inputData,
    output: outputData
});

drawObjects.push(dataCurve);
interactiveObjects.push();
simulationObjects.push()