backgroundColor = '#000000';
unit = 215;
camera = {
    x: 323, 
    y: 917
}
xy.origin = camera;
xy.grid = true;
xy.horizontalAxis = true;
xy.verticalAxis = true;
const colorScale = new ColorScaleBar({});

const rmin = .05;
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

const circularDisctribution = ((index) => (
    {x: Math.cos(2*Math.PI*index/N), y: Math.sin(2*Math.PI*index/N)}
))
const linearDistribution = ((index) => (
    {x: index*dl, y: 0}
))


const N = 30
const dl = .5;
const particles = []
for(let i = 0; i<= N; i++){
    particles.push(
        new CoordinatePoint({
            pos: linearDistribution(i),
            radius: 30
        })
    )
}

const electricField = new VectorField({ 
    pixelScale: 100,
    color: 'white',
    constantLength: true,
    constantColor: false, 
    constantOpacity: true,
    distanceBetweenArrows: 1,
    opacity: .5,
    animation: (() => {
        electricField.mathFunction = ((coor) => {
            const field = {x: 0, y: 0};
            for(let i = 0; i<= N; i++){
                field.x += vectorFunction(coor, particles[i]).x;
                field.y += vectorFunction(coor, particles[i]).y;
            }            

            return {
                x: field.x, 
                y: field.y
            }
        })
    }) 
});

drawObjects.push(
    ...particles,
    electricField, 
    colorScale 
)
animatedObjects.push( 
    electricField
)
