backgroundColor = '#000000';
unit = 150;
camera = {
    x: 300, y: 600
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;
fps = 60;

const N = 40; //Number of particles
const dL = .5;
const pRadius = .1;
const k = 10;
const b = 5;
const totalMass = .1;
const gr = 10;

const p = [new EmptyObject({})];
for(let i = 1; i <= N; i++){
    p.push(
        new Particle({
            pos: {x: dL*i, y: 0}, 
            mass: totalMass/N,
            radius: pRadius, 
            onMouseMoveAddition: (() => {
                p[i].pos.x = dL*i
            })
        })
    )
}
const x = Array(N+2).fill(0);
const y = Array(N+2).fill(0);
const f = Array(N+2).fill(0);
const g = Array(N+2).fill(0);

p[N].simulation = (() => {
    for(let j = 1; j <= N; j++){
        x[j] = p[j].pos.x - j*dL;
        y[j] = p[j].pos.y;
    }
    for(let j = 0; j <= N; j++){
        f[j] = (x[j] - x[j+1] - dL)**2 + (y[j] - y[j+1])**2; 
        // f[j] = (y[j] - y[j+1])**2;        
        g[j] = 1 - dL/Math.sqrt(f[j])
    }

    for(let j = 1; j <= N; j++){
        // p[j].acc.x  = k*(g[j]*x[j+1] - (g[j] + g[j-1])*x[j] + g[j-1]*x[j-1] + (g[j] - g[j-1])*dL)/p[j].mass;
        p[j].acc.y  = k*(g[j]*y[j+1] - (g[j] + g[j-1])*y[j] + g[j-1]*y[j-1])/p[j].mass;
        p[j].acc.y += -gr;
        p[j].acc.y += -b*p[j].vel.y;

        // p[j].vel.x += p[j].acc.x*timeStep;
        p[j].vel.y += p[j].acc.y*timeStep;

        // p[j].pos.x += p[j].vel.x*timeStep;
        p[j].pos.y += p[j].vel.y*timeStep;
    }
});  

const rx = Array(N+2).fill(0);
const ry = Array(N+2).fill(0);
const springs = [];
for(let i = 0; i <= N; i++){
    springs.push(
        new Spring({
            origin: {x: x[i] + i*dL, y: y[i]},
            ending: {x: x[i+1] + (i+1)*dL, y: y[i+1]}, 
            order: 5
        })
    )
}
springs[0].animation = (() => {
    for(let i = 0; i <= N; i++){
        for(let j = 1; j <= N; j++){
            rx[j] = p[j].pos.x;
            ry[j] = p[j].pos.y;
        }
        rx[N+1] = dL*(N+1);

        springs[i].origin = {x: rx[i], y: ry[i]};
        springs[i].ending = {x: rx[i+1], y: ry[i+1]};
    }
});

drawObjects.push(...p);
drawObjects.push(...springs);

animatedObjects.push(springs[0]);
simulationObjects.push(p[N])
interactiveObjects.push(...p);
