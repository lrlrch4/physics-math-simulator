class VectorFieldArrow {
    constructor(props){
        this.pos = props.pos;
        this.vector = props.vector;
        this.color = props.color || '#0af';
        this.height = props.height || 100;
        this.width = props.width || 15;        
    }

    draw(){
        const pixelsPos = xy.coordinatesToPixels(this.pos);
        const direction = new Vector(this.vector).unitary();

        const pointP = {
            x: pixelsPos.x + this.height*direction.x,
            y: pixelsPos.y - this.height*direction.y
        }
        const pointQ = {
            x: pixelsPos.x + this.width*direction.orthogonal().x,
            y: pixelsPos.y - this.width*direction.orthogonal().y
        }
        const pointR = {
            x: pixelsPos.x - this.width*direction.orthogonal().x,
            y: pixelsPos.y + this.width*direction.orthogonal().y
        }

        ctx.beginPath();            
        ctx.moveTo(pointP.x, pointP.y); 
        ctx.lineTo(pointR.x, pointR.y);  
        ctx.lineTo(pointQ.x, pointQ.y);             
        ctx.closePath();            
        ctx.fillStyle = this.color;            
        ctx.fill();
    }
}


class VectorField {
    constructor(props){
        this.mathFunction = props.mathFunction ||
            function(coor){return {x: -coor.y, y: coor.x}};
        this.color = props.color || '#0af';
        this.distanceBetweenArrows = props.distanceBetweenArrows || 1;

        this.height = props.height || 100;
        this.width = props.width || 15;

        this.constantArrowLength = props.constantArrowLength && true;
        this.pixelScale = props.pixelScale || 10;
    }

    draw(){
        
        const topLeftCoordinates = xy.pixelsToCoordiantes({
            x: 0, 
            y: 0
        });

        const BottomRightCoordinates = xy.pixelsToCoordiantes({
            x: canvas.width, 
            y: canvas.height
        });

        const minXCoordinate = Math.ceil(topLeftCoordinates.x) - 1;
        const maxXCoordinate = Math.floor(BottomRightCoordinates.x) + 1;

        const minYCoordinate = Math.ceil(BottomRightCoordinates.y) - 1;
        const maxYCoordinate = Math.floor(topLeftCoordinates.y) + 1;

        const horizontalArrows = Math.ceil(Math.abs(maxXCoordinate - minXCoordinate)/this.distanceBetweenArrows) 
        const verticalArrows = Math.ceil(Math.abs(maxYCoordinate - minYCoordinate)/this.distanceBetweenArrows) 

        
        var minMagnitudeValue = (this.mathFunction(topLeftCoordinates).x)**2 + (this.mathFunction(topLeftCoordinates).y)**2;
        var maxMagnitudeValue = minMagnitudeValue;

        for(let i = 0; i < horizontalArrows; i++){
            for(let j = 0; j < verticalArrows; j++){                
                const coorPos = {
                    x: minXCoordinate + i*this.distanceBetweenArrows,
                    y: minYCoordinate + j*this.distanceBetweenArrows
                }
                const magnitude = Math.sqrt(
                    (this.mathFunction(coorPos).x)**2 + (this.mathFunction(coorPos).y)**2
                    );
                
                if(magnitude < minMagnitudeValue){
                    minMagnitudeValue = magnitude;
                }
                if(magnitude > maxMagnitudeValue){
                    maxMagnitudeValue = magnitude;
                }                              
            }
        }//End of double for loop 


        const fittingMap = new FittingMap({
            inRange: {min: minMagnitudeValue, max: maxMagnitudeValue},
            outRange: {min: 0, max: 300}
        });
        
        for(let i = 0; i < horizontalArrows; i++){
            for(let j = 0; j < verticalArrows; j++){
                
                const coorPos = {
                    x: minXCoordinate + i*this.distanceBetweenArrows,
                    y: minYCoordinate + j*this.distanceBetweenArrows
                }

                const magnitude = Math.sqrt(
                    (this.mathFunction(coorPos).x)**2 + (this.mathFunction(coorPos).y)**2
                    );

                const arrow = new VectorFieldArrow({
                    pos: coorPos, 
                    vector: this.mathFunction(coorPos),

                    width: this.width,
                    height: this.constantArrowLength ? this.height : this.pixelScale * magnitude,
                    color: `hsl(${fittingMap.linear(magnitude)}, 100%, 50%)`
                });                
                arrow.draw();
            }
        }//End of double for loop 
    }//End of draw method

    onMouseDown(event) {                      

    }        
    
    onMouseMove(event) {
        
    }

    onMouseUp() {                    

    }   
    
    animate() {

    }
    simulate() {
        
    }
}

