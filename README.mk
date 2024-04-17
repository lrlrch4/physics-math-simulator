# Math and physics engine

This is a math and physics engine and calculator for academic purposes. It is inspired on geogebra but with personalized features to be more suitable for more advance uses, especially in math and physics topics. It is created canvas with javascript and HTML. 

Object general structure
class CoordinateObject { 
    constructor(props){ 

    }

    //Graphics props
    draw(){}

    rotate(){}

    applyMatrixTransformation(){}

    //Interaction props
    onMouseDown(){}

    onMouseMove(){}

    onMouseUp(){}

    //Animation props
    animate(){
        this.animation();
    }

    simulate(){
        this.simulation();
    }
    showTrace(){
    }
}
Objecst lists:
drawObjects = [];
interactiveObjects = [];
animatedObjects = [];
simulationObjects = [];

Code to start: 
backgroundColor = '#000000';
unit = 420;
camera = {
    x: 150, y: 1000
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;
