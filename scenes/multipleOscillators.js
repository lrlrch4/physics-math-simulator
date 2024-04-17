backgroundColor = '#000000';
unit = 120;
camera = {
    x: 100, y: 1000
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

fps = 60;

const N = 50; //Number of particles
const p = [new EmptyObject({})];
const dL = 1;
const pRadius = .5
const k = 100;
for(let i = 1; i <= N; i++){
    p.push(
        new Particle({
            pos: {x: dL*i, y: 0}, 
            radius: pRadius, 
        })
    )
}
const x = Array(N+2).fill(0);
const y = Array(N+2).fill(0);
const f = Array(N+2).fill(0);
const g = Array(N+2).fill(0);
// p[N].simulation = (() => {
//     for(let j = 1; j <= N; j++){
//         x[j] = p[j].pos.x - j*dL;
//     }
//     for(let j = 1; j <= N; j++){
//         p[j].acc.x  = k*(x[j+1] - 2*x[j] + x[j-1])/p[j].mass;
//         p[j].vel.x += p[j].acc.x*timeStep;
//         p[j].pos.x += p[j].vel.x*timeStep
//     }
// })  
// p[1].pos.y = 5;

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
          
        p[j].vel.x += p[j].acc.x*timeStep;
        p[j].vel.y += p[j].acc.y*timeStep;

        p[j].pos.x += p[j].vel.x*timeStep;
        p[j].pos.y += p[j].vel.y*timeStep;
    }
})  

drawObjects.push(...p);
simulationObjects.push(p[N])
interactiveObjects.push(...p);