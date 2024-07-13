backgroundColor = '#000000';
unit = 230;
camera = {
    x: .2*canvas.width, y: .8*canvas.height
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;


const waveTrace = [];
const waveTraceLength = 20;
const waveVel = 1;
const saveFrameRate = 20;

const xmax = 9;
const xmin = 0;
const ymax = 5;
const ymin = 0;
const particle = new Particle({
    pos: {x: xmax/2, y: ymax/2},
    vel: {x: 0, y: 0},
    drawVelVec: true,
    velVecScale: .5, 
    addVelController: true,
    drawVelController: true, 
    radius: .1,
    animation: (() => {   
        const rmax = .45*canvas.height;
        const layer = canvas.getContext('2d');
        layer.save();
        layer.strokeStyle = 'white';
        waveTrace.forEach( (element, index) => {
            const r = waveVel*(t - element.time)*unit;
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

        if(particle.pos.x >= xmax - particle.radius){
            particle.vel.x *= -1;
        }
        
        if(particle.pos.x <= xmin + particle.radius){
            particle.vel.x *= -1;
        }
        if(particle.pos.y >= ymax - particle.radius){
            particle.vel.y *= -1;
        }
        
        if(particle.pos.y <= ymin + particle.radius){
            particle.vel.y *= -1;
        }

        const s = particle.velVecScale;
        particle.controllerPos.x = particle.pos.x + s*particle.vel.x; 
        particle.controllerPos.y = particle.pos.y + s*particle.vel.y; 

    })
    
})
drawObjects.push(particle);
animatedObjects.push(particle);
interactiveObjects.push(particle);
simulationObjects.push(particle);