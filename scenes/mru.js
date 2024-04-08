backgroundColor = '#000000'
unit = 230;

camera =  {
    x: 100,
    y: 1700
}

xy.grid = true;
xy.origin = {x: camera.x, y: camera.y};

const particle = {
    pos: {x: 4, y: 3}, 
    vel: {x: 2, y: 1}
}

const dot = new CoordinatePoint({
    radius: 100,
    color: '#0af',
    labelSize: 30,
    animation: (() => {
        
        dot.pos = {
            x: particle.pos.x + particle.vel.x*t,
            y: particle.pos.y + particle.vel.y*t
        };

        dot.showTrace({
            maxLength: 20, 
            opacity: .1
        });

        // dot.label = `x(t) = x(${t.toFixed(2)}) = ${dot.pos.x.toFixed(2)}`
        xy.origin.x = camera.x - particle.vel.x*t*unit;
        xy.origin.y = camera.y + particle.vel.y*t*unit;
    })
})
drawObjects.push(dot);
animatedObjects.push(dot);

const description = new Text({
    color: '#0af',
    animation: (() => {
        description.pos = {
            x: dot.pos.x + .1,
            y: dot.pos.y - .7
        }

        description.text = [
            `t = ${t.toFixed(2)}s`,
            `vx = ${particle.vel.x.toFixed(2)}m/s`,
            `vy = ${particle.vel.y.toFixed(2)}m/s`,
            `x0 = ${particle.pos.x}`, 
            `y0 = ${particle.pos.y}`,
            `x(${t.toFixed(2)}) = x0 + vx t = ${dot.pos.x.toFixed(2)}m`, 
            `y(${t.toFixed(2)}) = y0 + vy t = ${dot.pos.y.toFixed(2)}m`
        ];
    })
})
drawObjects.push(description);
animatedObjects.push(description);