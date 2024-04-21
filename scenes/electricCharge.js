backgroundColor = '#000000';
unit = 156;
camera = {
    x: canvas.width/2, 
    y: canvas.height/2
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const particleA = new CoordinatePoint({
    pos: {x: 0, y: 0}, 
    radius: 30,
    color: 'yellow'
})
drawObjects.push(particleA);
interactiveObjects.push(particleA);

const particleB = new CoordinatePoint({
    pos: {x: 1, y: 0}, 
    radius: 30,
    color: '#f0a000'
})
drawObjects.push(particleB);
interactiveObjects.push(particleB);

const rmin = .5;
const vectorFunction = ((coor, particle) => {
    const r = Math.sqrt(
        (coor.x - particle.pos.x)**2 + (coor.y - particle.pos.y)**2
    ); 
    if(r < rmin){
        return {
            x: (coor.x - particle.pos.x)/rmin**3,
            y: (coor.y - particle.pos.y)/rmin**3
        }
    }
    if(r >= rmin){
        return {
            x: (coor.x - particle.pos.x)/r**3,
            y: (coor.y - particle.pos.y)/r**3
        }
    }

})  

const electricField = new VectorField({ 
    pixelScale: 100,
    color: 'yellow',
    constantLength: true,
    constantColor: true, 
    constantOpacity: false,
    animation: (() => {
        electricField.mathFunction = ((coor) => {
            const fieldA = vectorFunction(coor, particleA);
            const fieldB = vectorFunction(coor, particleB);
            return {
                x: fieldA.x + fieldB.x, 
                y: fieldA.y + fieldB.y
            }
        })
    }) 
});
drawObjects.push(electricField);
animatedObjects.push(electricField);


const charge = new CoordinatePoint({
    pos: {x: 1, y: 1}, 
    radius: 15, 
    color: '#3bff00'
})
drawObjects.push(charge);
interactiveObjects.push(charge);

const forceVector = new CoordinateVector({
    animation: (() => {
        const vector = electricField.mathFunction(charge.pos);
        const scale = 5;
        forceVector.origin = charge.pos;
        forceVector.ending = {
            x: charge.pos.x + scale*vector.x,
            y: charge.pos.y + scale*vector.y
        }

    })
})
drawObjects.push(forceVector);
animatedObjects.push(forceVector);

