backgroundColor = '#000000'
unit = 230;
xy.grid = true;
xy.origin = {x: 700, y: 1000};

const particle = {
    pos: {x: 0, y: 0}, 
    vel: {x: 1, y: 0}
}

const dot = new CoordinatePoint({
    radius: 100,
    color: '#0af',
    labelSize: 50,
    animation: (() => {
        
        dot.pos = {
            x: particle.pos.x + particle.vel.x*t,
            y: 0
        };

        dot.showTrace({
            maxLength: 20, 
            opacity: .1
        });

        dot.label = `x(t) = x(${t.toFixed(2)}) = ${dot.pos.x.toFixed(2)}`
        xy.origin.x = 700 - particle.vel.x*t*unit;
    })
})
drawObjects.push(dot);
animatedObjects.push(dot);

