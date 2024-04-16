# Math and physics engine

This is a math and physics engine and calculator for academic purposes. It is inspired on geogebra but with personalized features to be more suitable for more advance uses, especially in math and physics topics. It is created canvas with javascript and HTML. 

Object general structure
class CoordinateObject { 
    constructor(props){ 

    }

    //Graphics props
    draw(){

    }

    rotate(){

    }

    applyMatrixTransformation(){ 

    }

    //Interaction props
    onMouseDown(){ 

    }

    onMouseMove(){

    }

    onMouseUp(){

    }

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
drawObjects = [];
interactiveObjects = [];
animatedObjects = [];
simulationObjects = [];