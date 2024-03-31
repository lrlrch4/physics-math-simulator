backgroundColor = '#000000'
xy.grid = true;
xy.origin = {x: 270, y: 1600}

const initial = {
    pos: {x: 0, y: 3}, 
    vel: {x: 5, y: 10}, 
    acc: {x: 0, y: -9.81}
}

const scaleVelocityFactor = .1
const controller = new CoordinatePoint({ 
    pos: {
        x: initial.pos.x + initial.vel.x*scaleVelocityFactor, 
        y: initial.pos.y + initial.vel.y*scaleVelocityFactor
    }, 
    animation: (() => { 
        if(isSimulating){
            controller.pos.x = particle.pos.x + 
            scaleVelocityFactor*(initial.vel.x + initial.acc.x*t);
            controller.pos.y = particle.pos.y +
            scaleVelocityFactor*(initial.vel.y + initial.acc.y*t);
        }
    }),
    onMouseMoveAddition: ( () => {   
        if(!isSimulating){
            initial.vel.x = (controller.pos.x - particle.pos.x)/scaleVelocityFactor;
            initial.vel.y = (controller.pos.y - particle.pos.y)/scaleVelocityFactor;
        }     
    }),
    color: 'red'
})
drawObjects.push(controller);
interactiveObjects.push(controller);
animatedObjects.push(controller);


const particle = new CoordinatePoint({
    pos: {x: initial.pos.x, y: initial.pos.y},
    color: '#0af', 
    animation: (() => {
        if(isSimulating){
            particle.pos = { 
                x: initial.pos.x + initial.vel.x*t + initial.acc.x*(t**2/2), 
                y: initial.pos.y + initial.vel.y*t + initial.acc.y*(t**2/2) 
            }
        }
    }), 
    onMouseMoveAddition: (() => {
        if(!isSimulating){
            initial.pos.x = particle.pos.x;
            initial.pos.y = particle.pos.y;

            controller.pos.x = particle.pos.x + initial.vel.x*scaleVelocityFactor;
            controller.pos.y = particle.pos.y + initial.vel.y*scaleVelocityFactor;
        }
    })
})
drawObjects.push(particle);
interactiveObjects.push(particle);
animatedObjects.push(particle);




const freeFallCurve = new ParametricCurve({
    mathFunction: ((s) => ({
        x: initial.pos.x + initial.vel.x*s + initial.acc.x*(s**2/2), 
        y: initial.pos.y + initial.vel.y*s + initial.acc.y*(s**2/2)
    })), 
    range: {start: 0, end: 5},
    opacity: .25
})
drawObjects.push(freeFallCurve);

const velocityVector = new CoordinateVector({ 
    animation: (() => {
        velocityVector.origin = {x: particle.pos.x, y: particle.pos.y};
        velocityVector.ending = {x: controller.pos.x, y: controller.pos.y};
    })
})
drawObjects.push(velocityVector);
animatedObjects.push(velocityVector);


const resetValues = (() => {
    particle.pos = initial.pos;
    controller.pos = {
        x: initial.pos.x + initial.vel.x*scaleVelocityFactor, 
        y: initial.pos.y + initial.vel.y*scaleVelocityFactor
    } 
})