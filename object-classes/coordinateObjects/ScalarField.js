class ScalarField {
    constructor(props){
        //Special props
        this.mathFunction = props.mathFunction || ((coor) => (
            (coor.x)**2 + (coor.y)**2
        ));
        this.distanceBetweenArrows = props.distanceBetweenArrows || 1;

        //Style props    
        this.color = props.color || '#0af';
        this.dotRadius = props.dotRadius || 20;
        this.opacity = props.opacity || .5;

        this.animation = props.animation || (() => {
            console.log('animation added')
        });
        this.simulation = props.simulation || (() => {
            console.log('animation added')
        });
    }

    draw(){        
        const topLeftCoordinates = xy.pixelsToCoordinates({
            x: 0, 
            y: 0
        });
        const BottomRightCoordinates = xy.pixelsToCoordinates({
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
                    radius: this.dotRadius, 
                    opacity: this.opacity
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
    
    animate() {
        this.animation();
    }

    simulate(){
        this.simulation();
    }
}

