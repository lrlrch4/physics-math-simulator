
backgroundColor = '#000000';
unit = 420;
camera = {
    x: canvas.width/2, y: canvas.height/2
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;


const waveTrace = [];
const waveTraceLength = 10;
const waveVel = 1*unit;
const saveFrameRate = 20;
const rmax = .45*canvas.height
const particle = new Particle({
    pos: {x: 0, y: 0},
    vel: {x: .5, y: 0},
    drawVelVec: true,
    velVecScale: .5, 
    addVelController: true,
    drawVelController: true, 
    radius: .1,
    animation: (() => {      
       

        const layer = canvas.getContext('2d');
        layer.save();
        layer.strokeStyle = 'white';
        waveTrace.forEach( (element, index) => {
            const r = waveVel*(t - element.time);
            const radius = (r >= 0 & r < rmax)? r : 0;
            const pixelPos = xy.coordinatesToPixels(element.pos);
            layer.globalAlpha = 1 - r/rmax;
            layer.beginPath();
            layer.arc(pixelPos.x, pixelPos.y, radius, 0, 2*Math.PI);
            layer.stroke();
        })  
        layer.restore()
        // 
    }),
    simulation: (() => {
        if(frame % saveFrameRate === 0){
            waveTrace.push({
                pos: {x: particle.pos.x, y: particle.pos.y}, 
                time: t
            });
        }

        if(waveTrace.length >= waveTraceLength){
            waveTrace.shift();
        }


        particle.pos.x += particle.vel.x*timeStep;
        particle.pos.y += particle.vel.y*timeStep;

        const s = particle.velVecScale;
        particle.controllerPos.x = particle.pos.x + s*particle.vel.x; 
        particle.controllerPos.y = particle.pos.y + s*particle.vel.y; 

        xy.origin.x = camera.x - unit*particle.vel.x*t; 
    })
    
})
drawObjects.push(particle);
animatedObjects.push(particle);
interactiveObjects.push(particle);
simulationObjects.push(particle);