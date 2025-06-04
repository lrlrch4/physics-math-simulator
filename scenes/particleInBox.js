backgroundColor = '#000000'
unit = 300;
camera =  {x: 500, y: 1700}
xy.grid = true;
xy.origin = {x: camera.x, y: camera.y}

const numberParticles = 500;

const box = new Rectangle({
    origin: {x: 0, y: 0},
    ending: {x: 5, y: 5}
});


const phasesDistributionRandom = (index) => {
    const speed = Math.random();
    const angle = 2*Math.PI*Math.random();
    const cRadius = .1*Math.random()+.001;
    const distribution = {
        pos: {
                x: cRadius + Math.random()*(box.width - 2*cRadius), 
                y: cRadius + Math.random()*(box.height - 2*cRadius)
        },
        vel: {
            x: speed*Math.cos(angle), 
            y: speed*Math.cos(angle)
        },
        cRadius: cRadius, 
        mass: .1*Math.random()+0.01, 
        speed: speed
    }
    return distribution;
}

const phasesDistributionOrdered = (index) => {
    const speed = 1;

    const cols = Math.ceil(Math.sqrt(numberParticles));
    const rows = Math.ceil(numberParticles / cols);

    const spacingX = box.width / (cols + 1);
    const spacingY = box.height / (rows + 1);

    const col = index % cols;
    const row = Math.floor(index / cols);

    const distribution = {
        pos: {
            x: spacingX * (col + 1),
            y: spacingY * (row + 1)
        },
        vel: {
            x: 0,
            y: 0
        },
        cRadius: .05,
        mass: .5,
        speed: 0
    };     

    if(index > numberParticles - 2){
        const angle = 2*Math.PI*Math.random();
        distribution.speed = 3;
        distribution.vel.x = speed * Math.cos(angle);
        distribution.vel.y = speed * Math.sin(angle);  
        distribution.mass = 20;   
        distribution.cRadius = 0.1;  
    }
    return distribution;
}

const energy = (distributionFunction) => {
    let energy = 0;
    for(let i = 0; i < numberParticles; i++){
        const distribution = distributionFunction(i);     
        energy += .5*distribution.mass*(distribution.speed**2)
    }
    return energy;
}

const kB = 1; // Boltzman constant
const entropy = (particles, bins = 20) => {
    const velocitiesX = particles.map(p => p.vel.x);
    const minVel = Math.min(...velocitiesX);
    const maxVel = Math.max(...velocitiesX);
    const binSize = (maxVel - minVel) / bins;
    
    const histogram = new Array(bins).fill(0);
    
    particles.forEach(p => {
        const bin = Math.floor((p.vel.x - minVel) / binSize);
        // Asegurarse de que el bin esté en el rango válido
        if (bin >= 0 && bin < bins) histogram[bin]++;
    });
    
    let entropy = 0;
    const totalParticles = particles.length;
    histogram.forEach(count => {
        if (count > 0) {
            const pi = count / totalParticles;
            entropy -= pi * Math.log(pi);
        }
    });    
    return kB * entropy;
};


const restitutionCoef = 1;
const distributionFunction = phasesDistributionOrdered;
const totalEnergy = energy(distributionFunction);
const particleList = [];

for(let i = 0; i < numberParticles; i++){
    const distribution = distributionFunction(i);

    const colorHue = (.5*distribution.mass*(distribution.speed**2) / totalEnergy) * 300;
    console.log(distribution.speed);
    particleList.push(
        new Particle({
            pos: {
                x: distribution.pos.x, 
                y: distribution.pos.y
            },
            vel: {
                x: distribution.vel.x, 
                y: distribution.vel.y
            },
            acc: {x: 0, y: 0},
            radius: distribution.cRadius,
            mass: distribution.mass,
            color: `hsl(${colorHue}, ${100}%, ${50}%)`,
            simulation: (() => {
                particleList[i].vel.y += timeStep*particleList[i].acc.y;

                particleList[i].pos.x += timeStep*particleList[i].vel.x;
                particleList[i].pos.y += timeStep*particleList[i].vel.y;

                if(particleList[i].pos.x >= box.width - particleList[i].radius){
                    particleList[i].pos.x = box.width - particleList[i].radius;
                    particleList[i].vel.x *= -1*restitutionCoef;
                }
                if(particleList[i].pos.x <= particleList[i].radius){
                    particleList[i].pos.x = particleList[i].radius;
                    particleList[i].vel.x *= -1*restitutionCoef;
                }

                if(particleList[i].pos.y <= particleList[i].radius){
                    particleList[i].pos.y = particleList[i].radius;
                    particleList[i].vel.y *= -1*restitutionCoef;
                }
                if(particleList[i].pos.y >= box.height - particleList[i].radius){
                    particleList[i].pos.y = box.height - particleList[i].radius;
                    particleList[i].vel.y *= -1*restitutionCoef;
                } 

                particleList.forEach((element, index) => { 
                    if(i != index){
                        const distanceVector = new Vector({
                            x: particleList[i].pos.x - element.pos.x,
                            y: particleList[i].pos.y - element.pos.y
                        });
                        const distance = distanceVector.module();

                        if(distance < particleList[i].radius + element.radius){
                            const dUnit = new Vector({
                                x: distanceVector.x/distance,
                                y: distanceVector.y/distance
                            })    
                            const dUnitOrt = dUnit.orthogonal();
                            const Vcm = {
                                x: (particleList[i].mass*particleList[i].vel.x + element.mass*element.vel.x)
                                    /(particleList[i].mass + element.mass),
                                y: (particleList[i].mass*particleList[i].vel.y + element.mass*element.vel.y)
                                    /(particleList[i].mass + element.mass)
                            }
                            
                            const v1cm = new Vector({
                                x: particleList[i].vel.x - Vcm.x, 
                                y: particleList[i].vel.y - Vcm.y
                            });
                            
                            const v2cm = new Vector({
                                x: element.vel.x - Vcm.x, 
                                y: element.vel.y - Vcm.y
                            })

                            const p1 = dotProduct(v1cm, dUnit);
                            const p2 = dotProduct(v1cm, dUnitOrt);
                            particleList[i].vel = {
                                x: -restitutionCoef*p1*dUnit.x + p2*dUnitOrt.x + Vcm.x,
                                y: -restitutionCoef*p1*dUnit.y + p2*dUnitOrt.y + Vcm.y,                                
                            }
                            const e1 = dotProduct(v2cm, dUnit);
                            const e2 = dotProduct(v2cm, dUnitOrt);
                            element.vel = { 
                                x: -restitutionCoef*e1*dUnit.x + e2*dUnitOrt.x + Vcm.x,
                                y: -restitutionCoef*e1*dUnit.y + e2*dUnitOrt.y + Vcm.y,                             
                            }
                            
                            const k = distance/(particleList[i].radius + element.radius) + 0.001;
                            particleList[i].pos = {
                                x: particleList[i].pos.x + particleList[i].radius*(1-k)*dUnit.x,
                                y: particleList[i].pos.y + particleList[i].radius*(1-k)*dUnit.y,
                            }
                            element.pos = {
                                x: element.pos.x - element.radius*(1-k)*dUnit.x,
                                y: element.pos.y - element.radius*(1-k)*dUnit.y
                            }
                        }
                    }// end of if statement              
                })// end of for each
                const speed = (particleList[i].vel.x)**2 + (particleList[i].vel.y)**2;
                const colorHue = (.5*particleList[i].mass* speed**2 / totalEnergy) * 300;
                particleList[i].color = `hsl(${colorHue}, ${100}%, ${50}%)`
            }) // end of simulation
        }) //end of object
    )// end of push
}
drawObjects.push(...particleList);
simulationObjects.push(...particleList);

const description = new Text({
    pos: {x: 1.1*box.width, y: .9*box.height},
    animation: (() => {
        const average = {
            N: numberParticles,
            x: 0,
            y: 0,
            vx: 0, 
            vy: 0,
            E: 0,    
            S: 0,        
        }
        particleList.forEach(element => {
            average.x  += element.pos.x/numberParticles; 
            average.y  += element.pos.y/numberParticles;
            average.vx += element.vel.x/numberParticles;
            average.vy += element.vel.y/numberParticles;
            average.E  += .5*element.mass*(element.vel.x**2 + element.vel.y**2);
        });

        average.S = entropy(particleList, 20);

        description.text = Object.entries(average).map(([key, element]) => {
            return `${key} = ${element.toFixed(2)}`
        });

    })
})
drawObjects.push(
    box,
    description
);
animatedObjects.push(description)



