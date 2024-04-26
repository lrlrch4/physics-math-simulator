backgroundColor = '#000000';
unit = 280;
camera = {
    x: 550, y: 1584
}
xy.origin = {
    x: camera.x, 
    y: camera.y
};
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const xmax = 10;
const xmin = 0;
const ymax = 5;
const ymin = 0;

const m = 0;
const M = 100;
const d = .02;
const c = 1;
const r = .1;
const R = .39;
const attraction = {
    photons: {
        pos: {x: .1*xmax, y: .5*ymax}, 
        vel: {x: c, y: 0},

        pos2: {x: .9*xmax, y: .5*ymax},
        vel2: {x: -c, y: 0}
    },
    charges: {
        pos: {x: .2*xmax, y: .5*ymax}, 
        pos2: {x: .8*xmax, y: .5*ymax}
    }
}

const repulsion = {
    photons: {
        pos: {x: .5*xmax, y: .5*ymax}, 
        vel: {x: c, y: 0},

        pos2: {x: .5*xmax, y: .5*ymax},
        vel2: {x: -c, y: 0}
    },
    charges: {
        pos: {x: .45*xmax, y: .5*ymax}, 
        pos2: {x: .55*xmax, y: .5*ymax}
    }
}


const configuration = repulsion;

const particle = new Particle({
    pos: configuration.charges.pos,
    vel: {x: 0, y: 0},
    mass: M,
    drawVelVec: false,
    velVecScale: .5, 
    addVelController: false,
    drawVelController: false, 
    radius: R,
    animation: (() => {   
    }),
    simulation: (() => {

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
simulationObjects.push(particle);

const particle2 = new Particle({
    pos: configuration.charges.pos2,
    vel: {x: 0, y: 0},
    mass: M,
    drawVelVec: false,
    velVecScale: .5, 
    addVelController: false,
    drawVelController: false, 
    radius: R,
    animation: (() => {   
    }),
    simulation: (() => {

        particle2.pos.x += particle2.vel.x*timeStep;
        particle2.pos.y += particle2.vel.y*timeStep;

        if(particle2.pos.x >= xmax - particle2.radius){
            particle2.vel.x *= -1;
        }
        
        if(particle2.pos.x <= xmin + particle2.radius){
            particle2.vel.x *= -1;
        }
        if(particle2.pos.y >= ymax - particle2.radius){
            particle2.vel.y *= -1;
        }
        
        if(particle2.pos.y <= ymin + particle2.radius){
            particle2.vel.y *= -1;
        }
        const s = particle2.velVecScale;
        particle2.controllerPos.x = particle2.pos.x + s*particle2.vel.x; 
        particle2.controllerPos.y = particle2.pos.y + s*particle2.vel.y; 

    })
    
})
drawObjects.push(particle2);
simulationObjects.push(particle2);


const photon = new Particle({
    pos: configuration.photons.pos,
    vel: configuration.photons.vel,
    mass: m,
    drawVelVec: false,
    velVecScale: .5, 
    addVelController: false,
    drawVelController: false, 
    radius: r,
    color: 'white',
    animation: (() => {   
    }),
    simulation: (() => {        
        photon.vel.x = c*photon.vel.x/Math.abs(photon.vel.x); 
        photon.pos.x += photon.vel.x*timeStep;
        photon.pos.y += photon.vel.y*timeStep;

        if(photon.pos.x >= xmax - photon.radius){
            photon.vel.x *= -1;
        }
        
        if(photon.pos.x <= xmin + photon.radius){
            photon.vel.x *= -1;
        }
        if(photon.pos.y >= ymax - photon.radius){
            photon.vel.y *= -1;
        }
        
        if(photon.pos.y <= ymin + photon.radius){
            photon.vel.y *= -1;
        }
        
        photon.detectCollisionWith(particle);
        photon.detectCollisionWith(particle2);

    })    
})
drawObjects.push(photon);
simulationObjects.push(photon);

const photon2 = new Particle({
    pos: configuration.photons.pos2,
    vel: configuration.photons.vel2,
    mass: m,
    drawVelVec: false,
    velVecScale: .5, 
    addVelController: false,
    drawVelController: false, 
    radius: r,
    color: 'yellow',
    animation: (() => {   
    }),
    simulation: (() => {
        
        photon2.vel.x = c*photon2.vel.x/Math.abs(photon2.vel.x); 
        photon2.pos.x += photon2.vel.x*timeStep;
        photon2.pos.y += photon2.vel.y*timeStep;

        if(photon2.pos.x >= xmax - photon2.radius){
            photon2.vel.x *= -1;
        }
        
        if(photon2.pos.x <= xmin + photon2.radius){
            photon2.vel.x *= -1;
        }
        if(photon2.pos.y >= ymax - photon2.radius){
            photon2.vel.y *= -1;
        }
        
        if(photon2.pos.y <= ymin + photon2.radius){
            photon2.vel.y *= -1;
        }
        
        photon2.detectCollisionWith(particle);
        photon2.detectCollisionWith(particle2);

    })    
})
drawObjects.push(photon2);
simulationObjects.push(photon2);