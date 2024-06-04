class NewAxis{ 
    constructor(props){
        //Special props
        this.newOrigin = props.newOrigin || {x: 0, y: 0};
        this.newBasis1 = props.newBasis1 || {x: 1, y: 0}; 
        this.newBasis2 = props.newBasis2 || {x: 0, y: 1}; 
        this.axis1Range = props.axis1Range || {start: 0, end: 5}
        this.axis2Range = props.axis2Range || {start: 0, end: 5}
        this.axis1Step = props.axis1Step || 1;
        this.axis2Step = props.axis2Step || 1;
 
        //Style props
        this.labelSize = props.labelSize || 60;
        this.axis1Label = props.axis1Label || "x'";
        this.axis2Label = props.axis2Label || "y'";
        this.ticksSize = props.ticksSize || 40;

        this.color = props.color || '#0af';
        this.axisWidth = props.axisWidth || 1;
        this.grid = props.grid || false;
        this.drawBasisVectors = props.drawBasisVectors || false;

        //Animation props
        this.animation = props.animation || (() => (console.log('animation added')));
    }//End of constructor

    draw(){
        const axis1 = new CoordinateVector({
            origin: this.getOriginalCoordinates({
                x: this.axis1Range.start,
                y: this.axis2Range.start
            }),
            ending: this.getOriginalCoordinates({
                x: this.axis1Range.end, 
                y: this.axis2Range.start
            }),
            color: this.color
        });

        const axis2 = new CoordinateVector({
            origin: this.getOriginalCoordinates({
                x: this.axis1Range.start,
                y: this.axis2Range.start
            }),
            ending: this.getOriginalCoordinates({
                x: this.axis1Range.start, 
                y: this.axis2Range.end
            }),
            color: this.color
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
        layer.fillStyle = this.color;   
        layer.fillText(
            this.axis1Label,
            pixels1.x + .25*this.labelSize,
            pixels1.y);

        const pixels2 = xy.coordinatesToPixels(axis2.ending); 
        layer.fillText(
            this.axis2Label,
            pixels2.x + .5*this.labelSize,
            pixels2.y);

        //Horizontal ticks
        const ticksNumber1 = Math.floor(
            (this.axis1Range.end - this.axis1Range.start)/this.axis1Step
        );         
        for(let i = 0; i < ticksNumber1; i++){
            const ticksValues = this.axis1Range.start + i*this.axis1Step
            const pixels = xy.coordinatesToPixels(
                this.getOriginalCoordinates({
                    x: ticksValues, 
                    y: this.axis2Range.start
                })
            )
            layer.font = `${this.ticksSize}px Courier`;
            layer.fillText(
                `${ticksValues.toFixed(0)}`,
                pixels.x,
                pixels.y + this.ticksSize
            );
        }    
        //Vertical ticks
        const ticksNumber2 = Math.floor(
            (this.axis2Range.end - this.axis2Range.start)/this.axis2Step
        );         
        for(let i = 0; i < ticksNumber2; i++){
            const ticksValues = this.axis2Range.start + i*this.axis2Step;
            const pixels = xy.coordinatesToPixels(
                this.getOriginalCoordinates({
                    x: this.axis1Range.start, 
                    y: ticksValues
                })
            )
            const dFactor = (ticksValues>=0)? 1 : 1.5;
            layer.font = `${this.ticksSize}px Courier`;
            layer.fillText(
                `${ticksValues.toFixed(0)}`,
                pixels.x - dFactor*this.ticksSize,
                pixels.y 
            );
        }    


    }//End of draw method

    getNewCoordinates(newCoordinates){        
        const forwardMatrix = new Matrix( [
            [this.newBasis1.x, this.newBasis2.x],
            [this.newBasis1.y, this.newBasis2.y]
        ]);
        const vector = { 
            x: newCoordinates.x - this.newOrigin.x,
            y: newCoordinates.y - this.newOrigin.y
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