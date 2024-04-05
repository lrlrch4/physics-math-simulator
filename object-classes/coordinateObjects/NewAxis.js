class NewAxis{ 
    constructor(props){
        //Special props
        this.newOrigin = props.newOrigin || {x: 0, y: 0};
        this.newBasis1 = props.newBasis1; 
        this.newBasis2 = props.newBasis2; 
        this.axis1Length = props.axis1Length || 5;
        this.axis2Length = props.axis2Length || 5;

        //Style props
        this.axisColor = props.axisColor || '#0af';
        this.axisWidth = props.axisWidth || 1;
        this.grid = props.grid || false;
        this.drawBasisVectors = props.drawBasisVectors || false;

    }//End of constructor

    draw(){
        const module1 = Math.sqrt(this.newBasis1.x**2 + this.newBasis1.y**2);  
        const direction1 = {
            x: this.newBasis1.x/module1,
            y: this.newBasis1.y/module1,
        }
        const axis1 = new CoordinateVector({
            origin: this.newOrigin,
            ending: {
                x: this.newOrigin.x + this.axis1Length*direction1.x, 
                y: this.newOrigin.y + this.axis1Length*direction1.y
            }
        });
        const module2 = Math.sqrt(this.newBasis2.x**2 + this.newBasis2.y**2);  
        const direction2 = {
            x: this.newBasis2.x/module2,
            y: this.newBasis2.y/module2,
        }
        const axis2 = new CoordinateVector({
            origin: this.newOrigin,
            ending: {
                x: this.newOrigin.x + this.axis2Length*direction2.x, 
                y: this.newOrigin.y + this.axis2Length*direction2.y
            }
        });
        axis1.draw();
        axis2.draw();

        const newBasisVector1 = new CoordinateVector({
            origin: this.newOrigin,
            ending: {
                x: this.newOrigin.x + this.newBasis1.x, 
                y: this.newOrigin.y + this.newBasis1.y
            }
        });
        const newBasisVector2 = new CoordinateVector({
            origin: this.newOrigin,
            ending: {
                x: this.newOrigin.x + this.newBasis2.x,
                y: this.newOrigin.y + this.newBasis2.y
            }
        });

        if(this.drawBasisVectors){
            newBasisVector1.draw();
            newBasisVector2.draw();
        }
        const topLeftCoordinates = xy.pixelsToCoordiantes({x: 0, y: 0});
        const bottomRightCoordinates = xy.pixelsToCoordiantes({x: canvas.width, y: canvas.height});

        // console.log(topLeftCoordinates, bottomRightCoordinates);
        const drawLine = (slope, point) => {
            //Calculate point where intercepts with the top screen 
            const topScreenIntersection = {
                x: (topLeftCoordinates.y - point.y)/slope + point.x,
                y: topLeftCoordinates.y
            }

            const leftScreenIntersection = { 
                x: topLeftCoordinates.x, 
                y: slope*(topLeftCoordinates.x - point.x) + point.y
            }

            //Calculate point where intercepts with the bottom screen 
            const bottomScreenIntersection = {
                x: (bottomRightCoordinates.y - point.y)/slope + point.x, 
                y: bottomRightCoordinates.y
            };

            const rightScreenIntersection = {
                x: bottomRightCoordinates.x, 
                y: slope*(bottomRightCoordinates.x - point.x) + point.y
            };

            ctx.strokeStyle = this.axisColor;  // Line color
            ctx.lineWidth = this.axisWidth;         // Line width

            const startPoint = {};
            const endPoint = {};

            if(topScreenIntersection.x > topLeftCoordinates.x & topScreenIntersection.x < bottomRightCoordinates.x){
                startPoint.x = topScreenIntersection.x;
                startPoint.y = topLeftCoordinates.y;
            }
            if(leftScreenIntersection.y > bottomRightCoordinates.y & leftScreenIntersection.y < topLeftCoordinates.y){
                startPoint.x = topLeftCoordinates.x;
                startPoint.y = leftScreenIntersection.y;
            }
            if(bottomScreenIntersection.x > topLeftCoordinates.x & bottomScreenIntersection.x < bottomRightCoordinates.x){
                endPoint.x = bottomScreenIntersection.x;
                endPoint.y = bottomRightCoordinates.y;
            }
            if(rightScreenIntersection.y > bottomRightCoordinates.y & rightScreenIntersection.y < topLeftCoordinates.y){
                endPoint.x = bottomRightCoordinates.x;
                endPoint.y = rightScreenIntersection.y;
            }
            
            // Draw the line
            ctx.beginPath();
            ctx.moveTo(
                xy.coordinatesToPixels(startPoint).x, 
                xy.coordinatesToPixels(startPoint).y
                );  
            ctx.lineTo(
                xy.coordinatesToPixels(endPoint).x,
                xy.coordinatesToPixels(endPoint).y
                );      
            ctx.stroke();                
            ctx.closePath();
        }
    if(this.grid){
        const m1 = this.newBasis1.y/this.newBasis1.x;
        const m2 = this.newBasis2.y/this.newBasis2.x;
        
        drawLine(m1, this.newOrigin);        
        drawLine(m2, this.newOrigin);
    }
    }//End of draw method

    getNewCoordinates(coor){
        const forwardMatrix = new Matrix( [
            [this.newBasis1.x, this.newBasis2.x],
            [this.newBasis1.y, this.newBasis2.y]
        ]);

        const vector = { 
            x: coor.x - this.newOrigin.x,
            y: coor.y - this.newOrigin.y
        }
    
        return forwardMatrix.inverse().applyMatrixTo(vector);
    }

    getOriginalCoordinates(coor){
        const forwardMatrix = new Matrix( [
            [this.newBasis1.x, this.newBasis2.x],
            [this.newBasis1.y, this.newBasis2.y]
        ]);
        
        return {
            x: this.newOrigin.x + forwardMatrix.applyMatrixTo(coor).x,
            y: this.newOrigin.y + forwardMatrix.applyMatrixTo(coor).y
        }
    }

    //Interaction methods
    onMouseDown(event) {                      

    }        
    
    onMouseMove(event) {
        
    }

    onMouseUp() {                    

    }    
    
    //Animation methods
    update(){ 
        this.animation();
    }
    showTrace(){ 

    }
}//End of class