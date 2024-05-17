backgroundColor = '#000000'
unit = 400;
xy.grid = true;
xy.origin = {
    x: 454,
    y: 1407
}

var w = 1;
const point = new CoordinatePoint({
    color: '#0fa',
    animation: (() => {
        point.pos = { 
            x: Math.cos(w*t),
            y: Math.sin(w*t)
        }
        point.showTrace({
            maxLength: 100
        });
    })
});
animatedObjects.push(point);

const vector = new CoordinateVector({
    color: '#0fa', 
    animation: (() => {
        vector.ending = { 
            x: Math.cos(w*t),
            y: Math.sin(w*t)
        }
    })
});
animatedObjects.push(vector);

const horizontalVector = new CoordinateVector({ 
    color: 'red',
    label: 'cos',
    labelSize: 50,
    animation: (() => {
        horizontalVector.ending = { 
            x: Math.cos(w*t),
            y: 0
        }
    })
});
animatedObjects.push(horizontalVector);

const verticalVector = new CoordinateVector({
    color: '#0af',
    label: 'sin', 
    labelSize: 50, 
    animation: (() => {
        verticalVector.ending = { 
            x: 0,
            y: Math.sin(w*t)
        }
        verticalVector.label = 'sin'
    })
});
animatedObjects.push(verticalVector);

const hLine = new Line({ 
    animation: (() => { 
        hLine.origin = verticalVector.ending;
        hLine.ending = point.pos;

        hLine.isDashed = true;
        hLine.color = 'white';
        hLine.opacity = .5;
    })
});
animatedObjects.push(hLine);

const vLine = new Line({ 
    animation: (() => { 
        vLine.origin = horizontalVector.ending;
        vLine.ending = point.pos;

        vLine.isDashed = true;
        vLine.color = 'white';
        vLine.opacity = .5;
    })
});
animatedObjects.push(vLine);

const arc = new CircleArc({
    radius: .2,
    labelSize: 40,
    animation: (() => {
        n = Math.floor(w*t/(2*Math.PI))
        arc.endAngle = w*t-2*n*Math.PI;

        arc.label = `a = ${arc.endAngle.toFixed(2)}`;
        arc.color = 'white'
    })
});
animatedObjects.push(arc);

const sinCurve = new ParametricCurve({
    animation: (() => {
        sinCurve.mathFunction = ((s) => ({
            x: s, 
            y: Math.sin(w*t-w*s)
        }))

        sinCurve.range = {
            start: 0,
            end: Math.min(t, xy.pixelsToCoordinates({x: canvas.width, y: 0}).x)
        }
    })
});
animatedObjects.push(sinCurve);

const cosCurve = new ParametricCurve({
    color: 'red',
    animation: (() => {
        cosCurve.mathFunction = ((s) => ({
            x: Math.cos(w*t-w*s), 
            y: s
        }))

        cosCurve.range = {
            start: 0,
            end: Math.min(t, xy.pixelsToCoordinates({x: 0, y: 0}).y)
        }
    })
});
animatedObjects.push(cosCurve);

drawObjects.push(
    hLine,
    vLine, 
    arc,
    horizontalVector,
    verticalVector,
    vector,
    sinCurve, 
    cosCurve,
    point
)