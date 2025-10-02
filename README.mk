# Math and physics engine

This is a math and physics engine and calculator for academic purposes. It is inspired on geogebra but with personalized features to be more suitable for more advance uses, especially in math and physics topics. It is created canvas with javascript and HTML. 

You can create your own scene in the scenes files. To execute it: 
node server.js 'myScene.js'


Object general structure:
class CoordinateObject { 
    constructor(props){         
        this.layer = 0;

        this.simulation = props.simulation || (()=>{
            'simulation added'
        });
        this.animation = props.animation || (()=>{
            'simulation added'
        })
    }

    //Graphics props
    draw(){}

    rotate(){}

    applyMatrixTransformation(){}

    //Interaction props
    onMouseDown(event){}

    onMouseMove(event){}

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



Code to the starting configuration: 

backgroundColor = '#000000'; //Background color of the simulation
showSceneData = true; //Show scene frames, time, resolution, etc. 
unit = 15; // pixels of a unit in coordinate system
camera = {
    x: 980, y: 980
} //Position of the window camera in window coordinates
xy.origin = {
    x: camera.x, 
    y: camera.y
}; //Origin of coordinates position in the window coordinates
xy.grid = false; //show coordinates grid
xy.horizontalAxis = false; //Show horizontal axis in scene
xy.verticalAxis = false; //Show vertical axis in scene

drawObjects.push();
interactiveObjects.push();
animatedObjects.push();
simulationObjects.push();