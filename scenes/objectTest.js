backgroundColor = '#000000';
unit = 420;
camera = {
    x: canvas.width/2, 
    y: canvas.height/2
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;


const colorBar = new ColorScaleBar({
    pixelOrigin: {
        x: .85*canvas.width, 
        y: .01*canvas.height
    },
    pixelEnding: {
        x: .99*canvas.width, 
        y: .01*canvas.height
    }
});

const slider = new Slider({
    range: {start: .1, end: 5},
    label: 'w',
    color: 'white',
    animation: (() => {
        slider.origin = xy.pixelsToCoordinates({x: .15*canvas.width, y: 30});
        slider.ending = xy.pixelsToCoordinates({x: .45*canvas.width, y: 30});   
    })
});

const point = new CoordinatePoint({ 
    pos: {x: 0, y: 0}, 
    color: 'white', 
    radius: 25, 
    labelSize: 40,
    animation: (() => {
        point.label = `(${point.pos.x.toFixed(2)}, ${point.pos.y.toFixed(2)})`
    })
})


const field = new ColorField({
    opacity: .3,
    stepSize: 50,
    animation: (() => {
        field.mathFunction = ((coor) => {
            const r2 = (coor.x - point.pos.x)**2 + (coor.y -point.pos.y)**2;
            return coor.x + Math.sin(slider.value*r2);
        })
    })
})

const vectorField = new VectorField({
    color: 'white',
    constantLength: true,
    constantColor: true, 
    constantOpacity: false,
    animation: (() => {
        vectorField.mathFunction = ((coor) => {
            const r2 = (coor.x - point.pos.x)**2 + (coor.y -point.pos.y)**2;
            const w = slider.value
            return{
            x: 1 + 2*slider.value*coor.x*Math.cos(w*r2),
            y: 2*slider.value*coor.y*Math.cos(w*r2)
        }
        })
    })
});

const text = new Text({
    color: 'white',
    size: 30,
    animation: (() => {        
        text.text = [`f(x,y) = x + sin(w*(x - (${point.pos.x.toFixed(2)}))**2 + w*(y - (${point.pos.y.toFixed(2)}))**2)`],
        text.pos = xy.pixelsToCoordinates({
            x: .05*canvas.width, 
            y: .45*canvas.height
        })
    })
});

drawObjects.push(
    field,
    slider, 
    point,
    vectorField,
    text,
    colorBar
);
animatedObjects.push(
    field,
    slider, 
    vectorField, 
    point,
    text
);
interactiveObjects.push(
    point,
    slider.subObjects[0]
);
