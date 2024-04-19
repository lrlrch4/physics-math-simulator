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

const slider = new Slider({
    animation: (() => {
        slider.origin = xy.pixelsToCoordinates({x: .15*canvas.width, y: 30});
        slider.ending = xy.pixelsToCoordinates({x: .85*canvas.width, y: 30});   
    })
})

const circle = new CircleArc({
    animation: (() => { 
        circle.pos.x = t
        circle.radius = .1*slider.value + .1;
    })
})


drawObjects.push(circle, slider)
animatedObjects.push(circle, slider)
interactiveObjects.push(slider.subObjects[0])
