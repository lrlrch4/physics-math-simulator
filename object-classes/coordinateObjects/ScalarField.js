class ScalarField {
    constructor(props){
        this.mathFunction = props.mathFunction ||
            function(coor){return (coor.x)**2 + (coor.y)**2};
        this.color = props.color || '#0af';
        this.distanceBetweenArrows = props.distanceBetweenArrows || 1;

        this.dotRadius = props.dotRadius || 20;
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

        const horizontalArrows = Math.ceil(
            Math.abs(maxXCoordinate - minXCoordinate)/this.distanceBetweenArrows
            ); 
        const verticalArrows = Math.ceil(
            Math.abs(maxYCoordinate - minYCoordinate)/this.distanceBetweenArrows
            ); 

        
        var minFunctionValue = this.mathFunction(topLeftCoordinates);
        var maxFunctionValue = minFunctionValue;

        for(let i = 0; i < horizontalArrows; i++){
            for(let j = 0; j < verticalArrows; j++){                
                const coorPos = {
                    x: minXCoordinate + i*this.distanceBetweenArrows,
                    y: minYCoordinate + j*this.distanceBetweenArrows
                }
                const functionValue = this.mathFunction(coorPos);
                
                if(functionValue < minFunctionValue){
                    minFunctionValue = functionValue;
                }
                if(functionValue > maxFunctionValue){
                    maxFunctionValue = functionValue;
                }                              
            }
        }//End of double for loop 


        const fittingMap = new FittingMap({
            inRange: {min: minFunctionValue, max: maxFunctionValue},
            outRange: {min: 0, max: 300}
        });
        
        for(let i = 0; i < horizontalArrows; i++){
            for(let j = 0; j < verticalArrows; j++){
                
                const coorPos = {
                    x: minXCoordinate + i*this.distanceBetweenArrows,
                    y: minYCoordinate + j*this.distanceBetweenArrows
                }

                const functionValue = this.mathFunction(coorPos);
                
                const dot = new CoordinatePoint({
                    pos: coorPos, 
                    color: `hsl(${fittingMap.linear(functionValue)}, 100%, 50%)`, 
                    radius: this.dotRadius
                })

                dot.draw();                           
            }
        }//End of double for loop 
    }//End of draw method

    onMouseDown(event) {                      

    }        
    
    onMouseMove(event) {
        
    }

    onMouseUp() {                    

    }     
}

