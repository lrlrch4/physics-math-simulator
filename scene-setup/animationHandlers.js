var isSimulating = false; 
var startButtonCount = 0;

function update() {
    if(isSimulating){
        setTimeout(function () {                
            simulate();
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
    document.getElementById('startButton').classList.add('simulating');  
    document.getElementById('pauseButton').classList.remove('simulating');  
    document.getElementById('restartButton').classList.remove('simulating');                 
}

function pauseSimulation(){
    startButtonCount = 0;
    isSimulating = false; 
    document.getElementById('startButton').classList.remove('simulating');  
    document.getElementById('pauseButton').classList.add('simulating');  
    document.getElementById('restartButton').classList.remove('simulating');       
}
var resetValues = (() => {});
function resetSimulation(){
    isSimulating = false; 
    startButtonCount = 0;
    frame = 0;
    t = 0;
    document.getElementById('startButton').classList.remove('simulating'); 
    document.getElementById('pauseButton').classList.remove('simulating'); 
    document.getElementById('restartButton').classList.add('simulating'); 
    resetValues();
    drawFrame();    
}

document.getElementById('startButton').addEventListener('click', startSimulation);
document.getElementById('pauseButton').addEventListener('click', pauseSimulation);
document.getElementById('restartButton').addEventListener('click', resetSimulation);

updateCanvasSize();        
window.addEventListener('resize', updateCanvasSize); 
