backgroundColor = '#000000'
unit = 300;
camera =  {x: 500, y: 1700}
xy.grid = true;
xy.origin = {x: camera.x, y: camera.y}

const box = new Rectangle({
    respectTo: 'bottom-left',
    width: 2,
    height: 2
})
drawObjects.push(box);

const numberParticles = 2;
const v = 5;
const particleList = [];
const restitutionCoef = 1;
for(let i = 0; i < numberParticles; i++){
    const cRadius = .1; 
    particleList.push(
        new Particle({
            pos: {
                x: cRadius + Math.random()*(box.width - 2*cRadius), 
                y: cRadius + Math.random()*(box.height - 2*cRadius)
            },
            vel: {x: v*(2*Math.random()-1), y: v*(2*Math.random()-1)},
            acc: {x: 0, y: 0},
            radius: cRadius*(i+1),
            color: `hsl(${Math.random()*255}, ${100}%, ${50}%)`,
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
                                x: (particleList[i].vel.x + element.vel.x)/2,
                                y: (particleList[i].vel.y + element.vel.y)/2
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

                            const k = distance/(particleList[i].radius + element.radius);
                            particleList[i].pos = {
                                x: particleList[i].pos.x + particleList[i].radius*(1-k)*dUnitOrt.x,
                                y: particleList[i].pos.y + particleList[i].radius*(1-k)*dUnitOrt.y,
                            }

                            const e1 = dotProduct(v2cm, dUnit);
                            const e2 = dotProduct(v2cm, dUnitOrt);
                            element.vel = { 
                                x: -restitutionCoef*e1*dUnit.x + e2*dUnitOrt.x + Vcm.x,
                                y: -restitutionCoef*e1*dUnit.y + e2*dUnitOrt.y + Vcm.y,                             
                            }

                            element.pos = {
                                x: element.pos.x - element.radius*(1-k)*dUnitOrt.x,
                                y: element.pos.y - element.radius*(1-k)*dUnitOrt.y
                            }
                        }
                    }// end of if statement              
                })// end of for each
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
        }
        particleList.forEach(element => {
            average.x  += element.pos.x/numberParticles; 
            average.y  += element.pos.y/numberParticles;
            average.vx += element.vel.x/numberParticles;
            average.vy += element.vel.y/numberParticles;
            average.E += (element.vel.x**2 + element.vel.y**2);
        });
        description.text = Object.entries(average).map(([key, element]) => {
            return `${key} = ${element.toFixed(2)}`
        });

    })
})
drawObjects.push(description);
animatedObjects.push(description)



