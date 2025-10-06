backgroundColor = '#000000'; //Background color of the simulation
showSceneData = true; //Show scene frames, time, resolution, etc. 
unit = 30; // pixels of a unit in coordinate system
camera = {
    x: 0.05*canvas.width, y: 0.9*canvas.height
} //Position of the window camera in window coordinates
xy.origin = {
    x: camera.x, 
    y: camera.y
}; //Origin of coordinates position in the window coordinates
xy.grid = true; //show coordinates grid
xy.horizontalAxis = true; //Show horizontal axis in scene
xy.verticalAxis = true; //Show vertical axis in scene

const n = 100;
const temperature = 100;
const scale = 1;
const r = 10;
const iterationsPerFrame = 10;

let iterations = 0;
let energies = new Array(n).fill(0);  // Inicialmente todos en estado fundamental (n=0)
let m = 0;

const monteCarloStep = () => {    
    const randomIndex = Math.floor(Math.random() * n);
    const currentEnergy = energies[randomIndex];    
   
    const delta = Math.random() < 0.5 ? -1 : 1;
    
    const proposedEnergy = currentEnergy + delta;   
    
    if (proposedEnergy < 0) return false;    
    
    const deltaE = proposedEnergy - currentEnergy;      
    
    if (deltaE <= 0 || Math.random() < Math.exp(-deltaE / temperature)) {
        energies[randomIndex] = proposedEnergy;
        m += deltaE;  
        return true;   
    }    
    return false;  
}

const oscillators = Array.from({ length: n }, (_, index) => {
    return new CoordinatePoint({
        pos: { x: index + 1, y: energies[index] },
        radius: r,
    });
});

const oscillatorsSorted = Array.from({ length: n }, (_, index) => {
    return new CoordinatePoint({
        pos: { x: index + 1, y: energies[index] },
        color: '#f00', 
        radius: r
    });
});

const mt = n / (Math.exp(1/temperature) - 1);
const tEntropy = n*Math.log((n+mt)/n) + mt*Math.log((n+mt)/mt);
const tChemPot = - Math.log((mt+n)/n)/Math.log((mt+n)/mt)
const tCapacity = (mt/n)*(mt+n)*( Math.log((n+mt)/mt) )**2


const canonicalData = new Text({
    text: [], 
    pos: {x: 400, y: 100}, 
    absolutePosition: true, 
    color: '#FFFFFF',
    animation: (() => {
        
        
        if(frame > 0) {            
            for (let i = 0; i < iterationsPerFrame; i++) {
                monteCarloStep(); 
                iterations++; 
            }     
        }
        
        const sEntropy = n*Math.log((n+m )/n) + m *Math.log((n+m )/m);
        const sChemPot = - Math.log((m+n )/n)/Math.log((m +n)/m);           
        const sCapacity = (m/n)*(m+n)*( Math.log((n+m)/m) )**2;        

        canonicalData.text = [
        `Iterations: ${iterations}`, 
        `Particles: ${n}`, 
        `Temperature: ${temperature.toFixed(1)}`, 
        `(S. packets, T. packets) : (${m}, ${mt.toFixed(0)})`,         
        `(S. entropy, T. entropy) : (${sEntropy.toFixed(2)}, ${tEntropy.toFixed(2)})`,
        `(S. chem. pot., T. chem. pot.): (${sChemPot.toFixed(2)}, ${tChemPot.toFixed(2)})`, 
        `(S. Capacity, T. Capacity): (${sCapacity.toFixed(2)}, ${tCapacity.toFixed(2)})`, 
        ]

        oscillators.forEach((oscillator, index) => {
            oscillator.pos.y = scale*energies[index];
        });       

        const sortedEnergies = [...energies].sort((a,b) => b-a)
        

        oscillatorsSorted.forEach((oscillator, index) => {
            oscillator.pos.y = scale*sortedEnergies[index];
        });       

    })
})



drawObjects.push(
    canonicalData, 
    ...oscillators, 
    ...oscillatorsSorted
);
interactiveObjects.push();
animatedObjects.push(
    canonicalData, 
);
simulationObjects.push();