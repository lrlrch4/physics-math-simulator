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

const circle = new CircleArc({
    radius: 1
})

const slider = new Slider({ 

})


drawObjects.push(circle, slider)
interactiveObjects.push(slider.subObjects[0])
