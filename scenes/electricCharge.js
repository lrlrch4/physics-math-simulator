backgroundColor = '#000000';
unit = 252;
camera = {
    x: canvas.width/2, 
    y: canvas.height/2
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;

const k = 10000;
const rmin = .25;
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
});
const potentialFunction = ((coor, particle) => {
    const r = Math.sqrt(
        (coor.x - particle.pos.x)**2 + (coor.y - particle.pos.y)**2
    ); 
    if(r < rmin){
        return k/rmin
    }
    if(r >= rmin){
        return k/r
    }
});

const particleA = new CoordinatePoint({
    pos: {x: -1, y: 0}, 
    radius: 20,
    color: 'yellow', 
    label: 'A'
})

interactiveObjects.push(particleA);

const particleB = new CoordinatePoint({
    pos: {x: 1, y: 0}, 
    radius: 20,
    color: 'yellow', 
    label: 'B'
})

interactiveObjects.push(particleB);

const electricField = new VectorField({ 
    pixelScale: 100,
    color: 'white',
    constantLength: false,
    constantColor: true, 
    constantOpacity: true,
    distanceBetweenArrows: .5,
    opacity: .5,
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

animatedObjects.push(electricField);

const potentialField = new ScalarField({
    dotRadius: 50,
    distanceBetweenArrows: .5,
    animation: (() => {        
        potentialField.mathFunction = ((coor) => {
            potentialA = potentialFunction(coor, particleA);
            potentialB = potentialFunction(coor, particleB);

            return potentialA + potentialB;
        })
    }) 
})

animatedObjects.push(potentialField);


const q = -1;
const charge = new CoordinatePoint({
    pos: {x: 0, y: 3}, 
    radius: 15, 
    color: '#3bff00', 
    label: 'q'
})

interactiveObjects.push(charge);

const forceVector = new CoordinateVector({
    color: '#3bff00',
    animation: (() => {
        const vector = electricField.mathFunction(charge.pos);
        const scale = 5;
        forceVector.origin = charge.pos;
        forceVector.ending = {
            x: charge.pos.x + q*scale*vector.x,
            y: charge.pos.y + q*scale*vector.y
        }

    })
})
animatedObjects.push(forceVector);

drawObjects.push(
    potentialField, 
    electricField, 
    particleA, 
    particleB,
    charge,
    forceVector
)