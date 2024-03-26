const rn = [];
const pointsNumber = 20;
for(let i = 0; i < pointsNumber; i++){
    rn.push(  );
}

const endPoint = new CoordinatePoint({
    radius: 10,
    animation: (() => {
        const position = {x: 0, y: 0};
        for(let i = 0; i < rn.length; i++){
            position.x += rn[i]*Math.cos(i*t);
            position.y += rn[i]*Math.sin(i*t); 
        }        
        endPoint.pos = position;
        endPoint.showTrace({
            maxLength: 500, 
            saveFrameRate: 1,
        });

        const coordinatesList = [{x: 0, y: 0}];        
        const sumCosinesSines = (n) => {
            const sum = {
                sin: 0,
                cos: 0
            };
            if(n <= rn.length){
                for(let i = 0; i <= n; i++){
                    sum.cos += rn[i]*Math.cos(i*t);
                    sum.sin += rn[i]*Math.sin(i*t);
                }
            }
            else{ 
                console.error('n bigger than rn')
            }
            return sum;
        }

        rn.forEach( (element, index) => { 
            coordinatesList.push({ 
                x: sumCosinesSines(index).cos,
                y: sumCosinesSines(index).sin,
            })
        })

        rn.forEach( (element, index) => { 
            new CoordinateVector({ 
                origin: coordinatesList[index], 
                ending: coordinatesList[index + 1]
            }).draw()
        })

    })
})
drawObjects.push(endPoint);
animatedObjects.push(endPoint);

const fourierCurve = new ParametricCurve({       
    range: {start: 0, end: 2*Math.PI},  
    mathFunction: ((s) => {
        const position = {x: 0, y: 0};
        for(let i = 0; i < rn.length; i++){
            position.x += rn[i]*Math.cos(i*s);
            position.y += rn[i]*Math.sin(i*s); 
        } 
        return position;        
      }),
    opacity: .5      
})
drawObjects.push(fourierCurve)

//Start the drawing
updateSceneSetup();
drawFrame();