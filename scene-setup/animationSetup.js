var fps = 60;
var timeStep = 1 / fps;
var frame = 0;
var t = frame*timeStep;

var backgroundColor = '#242424';
function drawBackground(){

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const backgroundInformation = [
        `frame: ${frame}`, 
        `t = ${t.toFixed(2)}s`, 
        `fps: ${fps}`, 
        `unit: ${unit.toFixed(0)}px`, 
        `resolution: ${canvas.width}x${canvas.height}`, 
        `window: ${windowWidth}x${windowHeight}`
    ]
    var informationString = ''
    for(let i = 0; i < backgroundInformation.length; i++){
        informationString +=  backgroundInformation[i] + '  ' 
     }  

    const fontSize = 36;
    ctx.font = `${fontSize}px Courier`;
    ctx.fillStyle = "#0af";   
    ctx.fillText(
        informationString,
        .01*canvas.width,
        .99*canvas.height);     
}

//Creating objects
const drawObjects = [];
const interactiveObjects = [];
const animatedObjects = [];

//Create the main coordinates axis
const xy = new AxisCoordinates({});

interactiveObjects.push(xy);

//Handle animation
var updateValuesBeforeDrawing = () => {}

function drawFrame(){
    
    console.log(`Frame ${frame} drawn`);    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBackground();  
    //Keep values updated each frame
    // arrow.origin = particle.pos;
    // arrow.ending = controller.pos;
    
    //Draw list of objects
    xy.draw();
    updateValuesBeforeDrawing();
    drawObjects.forEach(element => element.draw())
} 

function animate() {
    frame += 1; 
    t = frame * timeStep;
}

//handle on mouse down events
var selectPosStart = {};
var selectPosEnd = {};
var boxSelectionActivate = false; 
function updateSceneSetup(){
    //Sets a layer for every object that interacts
    interactiveObjects.forEach( (obj, index) => {
        obj.layer = index;
    });

    canvas.addEventListener('mousedown', (event) => {
        //Element selection
        if(event.button === 0){
            var selectedLayer = 0;
            //Set the selected layer as the element with the greatest layer value
            interactiveObjects.forEach(element => {
                element.onMouseDown(event);
                if(selectedLayer < element.layer & element.isClicked){
                    selectedLayer = element.layer;
                }
            });
            
            interactiveObjects.forEach(element => {
                if(element.layer != selectedLayer){
                    element.isClicked = false;
                }
            });
        }

        //Box selection
        
        // var boxSelectionActivated = false;
        if(event.button === 0 & event.ctrlKey){
            console.log('control clicked')
            interactiveObjects.forEach(element => element.isClicked = false)

            selectPosStart.x = resolutionFactor * event.x;
            selectPosStart.y = resolutionFactor * event.y;
            console.log(selectPosStart);
            boxSelectionActivate = true; 
        }
    });
    
    //handle on mouse move events
    canvas.addEventListener('mousemove', (event) => {
        
        interactiveObjects.forEach(element => {
            element.onMouseMove(event);
        }); 
        
        if(boxSelectionActivate){ 
            selectPosEnd.x = resolutionFactor * event.x;
            selectPosEnd.y = resolutionFactor * event.y;
            
            drawFrame();
            drawSelectionRectangle(
                [selectPosStart.x, selectPosStart.y],
                [selectPosEnd.x, selectPosEnd.y]
                );
        }
    });
    
    //handle on mouse up events
    canvas.addEventListener('mouseup', (event) => {   
    
        interactiveObjects.forEach(element => {
            element.onMouseUp();
        }); 

        //Box selection
        boxSelectionActivate = false;
        selectPosEnd.x = resolutionFactor * event.x;
        selectPosEnd.y = resolutionFactor * event.y;
        drawFrame();
    });
    
    //Handle zoom
    window.addEventListener('wheel', (event) => {
    
        xy.addZoom(event);
        drawFrame();
    });

    updateValuesBeforeDrawing = () => {
        animatedObjects.forEach(element => element.update());
    }
}