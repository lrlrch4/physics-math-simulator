backgroundColor = '#000000'
unit = 230;
camera =  {x: 100, y: 1700}
xy.grid = true;
xy.origin = {x: camera.x, y: camera.y}

const particle = {
    pos: {x: 1, y: 4}, 
    vel: {x: 2, y: 1},
    acc: {x : 0, y: 0}
}

const dot = new CoordinatePoint({
    pos: particle.pos,
    color: '#0af',
    simulation: (() => {
            particle.vel.x += timeStep*particle.acc.x;
            particle.vel.y += timeStep*particle.acc.y;
            
            particle.pos.x += timeStep*particle.vel.x;
            particle.pos.y += timeStep*particle.vel.y;
            
            if(particle.pos.x > 5 || particle.pos.x < 0){
                particle.vel.x *= -1;
            }
            if(particle.pos.y > 5 || particle.pos.y < 0){
                particle.vel.y *= -1;
            }
            dot.pos = {
                x: particle.pos.x, 
                y: particle.pos.y
        }
    }),
    animation: (()=>{
        dot.showTrace({});
    })
})
drawObjects.push(dot);
animatedObjects.push(dot);
simulationObjects.push(dot);

const description = new Text({
    color: '#0af',
    pos: {x: 6, y: 5},
    animation: (() => {
        description.text = [
            `t = ${t.toFixed(2)}s`,
            `vx = ${particle.vel.x.toFixed(2)}m/s`,
            `vy = ${particle.vel.y.toFixed(2)}m/s`,
            `x = ${dot.pos.x.toFixed(2)}m`, 
            `y = ${dot.pos.y.toFixed(2)}m`
        ];
    })
})
drawObjects.push(description);
animatedObjects.push(description);