class NewAxis{ 
    constructor(props){
        //Special props
        this.newOrigin = props.newOrigin || {x: 0, y: 0};
        this.newBasis1 = props.newBasis1; 
        this.newBasis2 = props.newBasis2; 

        
        //Style props
        this.axis1Range = props.axis1Range || {start: -2, end: 6}
        this.axis2Range = props.axis1Range || {start: -2, end: 6}
        this.axis1Length = props.axis1Length || 5;
        this.axis2Length = props.axis2Length || 5;
        this.labelSize = props.labelSize || 60;
        this.axis1Label = props.axis1Label || "x'";
        this.axis2Label = props.axis2Label || "y'";

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
            origin: this.getOriginalCoordinates({
                x: this.axis1Range.start,
                y: this.axis2Range.start
            }),
            ending: this.getOriginalCoordinates({
                x: this.axis1Range.end, 
                y: this.axis2Range.start
            })
        });
        const module2 = Math.sqrt(this.newBasis2.x**2 + this.newBasis2.y**2);  
        const direction2 = {
            x: this.newBasis2.x/module2,
            y: this.newBasis2.y/module2,
        }
        const axis2 = new CoordinateVector({
            origin: this.getOriginalCoordinates({
                x: this.axis1Range.start,
                y: this.axis2Range.start
            }),
            ending: this.getOriginalCoordinates({
                x: this.axis1Range.start, 
                y: this.axis2Range.end
            })
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
        const layer = canvas.getContext('2d');
        const pixels1 = xy.coordinatesToPixels(axis1.ending); 

        layer.font = `${this.labelSize}px Courier`;
        layer.fillStyle = this.axisColor;   
        layer.fillText(
            this.axis1Label,
            pixels1.x + .5*this.labelSize,
            pixels1.y);

        const pixels2 = xy.coordinatesToPixels(axis2.ending); 

        layer.font = `${this.labelSize}px Courier`;
        layer.fillStyle = this.axisColor;   
        layer.fillText(
            this.axis2Label,
            pixels2.x + .5*this.labelSize,
            pixels2.y);


    }//End of draw method

    getNewCoordinates(mainCoordinates){
        
        const forwardMatrix = new Matrix( [
            [this.newBasis1.x, this.newBasis2.x],
            [this.newBasis1.y, this.newBasis2.y]
        ]);

        const vector = { 
            x: mainCoordinates.x - this.newOrigin.x,
            y: mainCoordinates.y - this.newOrigin.y
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
    animate(){ 
        this.animation();
    }
    showTrace(){ 

    }
}//End of class