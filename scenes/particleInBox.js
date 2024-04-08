backgroundColor = '#000000'
unit = 300;
camera =  {x: 500, y: 1700}
xy.grid = true;
xy.origin = {x: camera.x, y: camera.y}

const box = new Rectangle({
    respectTo: 'bottom-left',
    width: 5,
    height: 5
})
drawObjects.push(box);

const numberParticles = 10;
const v = 1;
const particleList = [];
for(let i = 0; i < numberParticles; i++){
    const cRadius = .2; 

    particleList.push(
        new CoordinatePoint({
            pos: {
                x: cRadius + Math.random()*(box.width - 2*cRadius), 
                y: cRadius + Math.random()*(box.height - 2*cRadius)
            },
            vel: {x: v*Math.random(), y: v*Math.random()},
            color: `hsl(${Math.random()*255}, ${100}%, ${50}%)`,
            animation: (() => {
                particleList[i].radius = xy.coordinatePixelUnit(cRadius);
            }),
            simulation: (() => {

                particleList[i].pos.x += timeStep*particleList[i].vel.x;
                particleList[i].pos.y += timeStep*particleList[i].vel.y;

                if(particleList[i].pos.x >= box.width - cRadius){
                    particleList[i].pos.x = box.width - cRadius;
                    particleList[i].vel.x *= -1;
                }
                if(particleList[i].pos.x <= cRadius){
                    particleList[i].pos.x = cRadius;
                    particleList[i].vel.x *= -1;
                }

                if(particleList[i].pos.y <= cRadius){
                    particleList[i].pos.y = cRadius;
                    particleList[i].vel.y *= -1;
                }
                if(particleList[i].pos.y >= box.height - cRadius){
                    particleList[i].pos.y = box.height - cRadius;
                    particleList[i].vel.y *= -1;
                } 

                particleList.forEach((element, index) => { 
                    if(i != index){
                        const distanceVector = new Vector({
                            x: particleList[i].pos.x - element.pos.x,
                            y: particleList[i].pos.y - element.pos.y
                        })

                        const distance = distanceVector.module();
                        
                        if(distance < 2*cRadius){

                            console.log(i, index, 'collided')
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

                            particleList[i].vel = {
                                x: -v1cm.projectOver(distanceVector).x + v1cm.projectOver(distanceVector.orthogonal()).x + Vcm.x,
                                y: -v1cm.projectOver(distanceVector).y + v1cm.projectOver(distanceVector.orthogonal()).y + Vcm.y,                                
                            }

                            element.vel = {
                                x: -v2cm.projectOver(distanceVector).x + v2cm.projectOver(distanceVector.orthogonal()).x + Vcm.x,
                                y: -v2cm.projectOver(distanceVector).y + v2cm.projectOver(distanceVector.orthogonal()).y + Vcm.y,                                
                            }

                            particleList[i].pos = {
                                x: particleList[i].pos.x + (cRadius - .5001*distance)*distanceVector.unitary().x,
                                y: particleList[i].pos.y + (cRadius - .5001*distance)*distanceVector.unitary().y,
                            }

                            element.pos = {
                                x: element.pos.x - (cRadius - .5001*distance)*distanceVector.unitary().x,
                                y: element.pos.y - (cRadius - .5001*distance)*distanceVector.unitary().y
                            }
                            console.log(particleList[i].pos)
                            console.log(particleList[i].vel)
                            console.log(element.pos)
                            console.log(element.vel)


                        }
                    }// end of if statement              
                })// end of for each
            }) // end of simulation
        }) //end of object
    )// end of push
}
drawObjects.push(...particleList);
animatedObjects.push(...particleList);
simulationObjects.push(...particleList);



const description = new Text({
    color: '#0af',
    pos: {x: 5.2, y: 4.5},
    animation: (() => {
        description.text = particleList.map(element => 
            `(${element.pos.x.toFixed(2)}, ${element.pos.y.toFixed(2)})`
        );

        // console.log(particleList.map(element => element.pos))

    })
})
drawObjects.push(description);
animatedObjects.push(description)
