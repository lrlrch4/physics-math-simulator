var isSimulating = false; 
var startButtonCount = 0;

function update() {
    if(isSimulating){
        setTimeout(function () {                
            animate();
            drawFrame();
            update();
        }, 1000 / fps);
    }
}    

function startSimulation(){ 
    isSimulating = true; 
    startButtonCount += 1;
    if(startButtonCount==1){
        update();
    }                    
}

function pauseSimulation(){
    startButtonCount = 0;
    isSimulating = false;           
}

function resetSimulation(){
    isSimulating = false; 
    startButtonCount = 0;
    frame = 0;
    t = 0;

    resetValues();
    drawFrame();    
}

document.getElementById('startButton').addEventListener('click', startSimulation);
document.getElementById('pauseButton').addEventListener('click', pauseSimulation);
document.getElementById('restartButton').addEventListener('click', resetSimulation);

updateCanvasSize();        
window.addEventListener('resize', updateCanvasSize); 
