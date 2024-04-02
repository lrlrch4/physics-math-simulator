backgroundColor = '#000000'
unit = 500;
xy.grid = true;


const point = new CoordinatePoint({
    animation: (() => {
        point.pos = { 
            x: Math.cos(t),
            y: Math.sin(t)
        }
        point.showTrace({});
    })
});
drawObjects.push(point);
animatedObjects.push(point);

const vector = new CoordinateVector({ 
    animation: (() => {
        vector.ending = { 
            x: Math.cos(t),
            y: Math.sin(t)
        }
    })
});
drawObjects.push(vector);
animatedObjects.push(vector);

const horizontalVector = new CoordinateVector({ 
    animation: (() => {
        horizontalVector.ending = { 
            x: Math.cos(t),
            y: 0
        }
    })
});
drawObjects.push(horizontalVector);
animatedObjects.push(horizontalVector);

const verticalVector = new CoordinateVector({ 
    animation: (() => {
        verticalVector.ending = { 
            x: 0,
            y: Math.sin(t)
        }
    })
});
drawObjects.push(verticalVector);
animatedObjects.push(verticalVector);

const hLine = new Line({ 
    animation: (() => { 
        hLine.origin = verticalVector.ending;
        hLine.ending = point.pos;

        hLine.isDashed = true;
        hLine.color = 'white';
        hLine.opacity = .25;
    })
})
drawObjects.push(hLine);
animatedObjects.push(hLine);

const vLine = new Line({ 
    animation: (() => { 
        vLine.origin = horizontalVector.ending;
        vLine.ending = point.pos;

        vLine.isDashed = true;
        vLine.color = 'white';
        vLine.opacity = .25;
    })
})
drawObjects.push(vLine);
animatedObjects.push(vLine);

const arc = new CircleArc({
    radius: .2,
    labelSize: 40,
    animation: (() => {
        n = Math.floor(t/(2*Math.PI))
        arc.endAngle = t-2*n*Math.PI;

        arc.label = `a = ${arc.endAngle.toFixed(2)}`;
        arc.color = 'white'
    })
});
drawObjects.push(arc);
animatedObjects.push(arc);

const sinCurve = new ParametricCurve({
    animation: (() => {
        sinCurve.mathFunction = ((s) => ({
            x: s, 
            y: Math.sin(t-s)
        }))

        sinCurve.range = {
            start: 0,
            end: Math.min(t, xy.pixelsToCoordiantes({x: canvas.width, y: 0}).x)
        }
    })
});
drawObjects.push(sinCurve);
animatedObjects.push(sinCurve);

const cosCurve = new ParametricCurve({
    animation: (() => {
        cosCurve.mathFunction = ((s) => ({
            x: Math.cos(t-s), 
            y: s
        }))

        cosCurve.range = {
            start: 0,
            end: Math.min(t, xy.pixelsToCoordiantes({x: 0, y: 0}).y)
        }
    })
});
drawObjects.push(cosCurve);
animatedObjects.push(cosCurve);