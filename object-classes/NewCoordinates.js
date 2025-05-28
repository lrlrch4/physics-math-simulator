class NewCoordinates {
    constructor(props){
        //Special props
        this.origin = props.origin || {x: .6*canvas.width, y: .4*canvas.height};
        this.width = props.width || .25*canvas.width;
        this.height = props.height || .25*canvas.height;
        this.xRange = {min: -10, max: 10}
        this.yRange = {min: 5, max: 10}
        this.digits = props.digits || 0;
        this.unit = {
            x: this.width/Math.abs(this.xRange.max - this.xRange.min),
            y: this.height/Math.abs(this.yRange.max - this.yRange.min)
        }

        this.xTicks = props.xTicks || 10;
        this.yTicks = props.yTicks || 5;

        this.offset = {x: 0, y: 0}
        this.grid = props.grid || false;
        this.horizontalAxis = true;
        this.verticalAxis = true;

        //Style props
        this.axisColor = props.axisColor || '#0af';
        this.tipSize = props.tipSize || 20;
        this.labelSize = props.labelSize || 30;
        this.labelColor = props.labelColor || '#0af';
        
        this.gridWidth = props.gridWidth || 1;
        this.gridOpacity = props.gridOpacity || .25;
        this.gridColor = props.gridColor || 'white';

        //Interaction props
        this.isClicked = false;
        this.layer = props.layer || 0; 
    }

    draw(){        
        const xAxis = new axisArrow ({
            origin: {x: this.origin.x, y: this.origin.y},
            ending: {x: this.origin.x + this.width, y: this.origin.y}, 
            color: this.axisColor, 
            tipSize: this.tipSize
        })

        const yAxis = new axisArrow ({
            origin: {x: this.origin.x, y: this.origin.y},
            ending: {x: this.origin.x, y: this.origin.y - this.height},
            color: this.axisColor, 
            tipSize: this.tipSize
        })
        if(this.horizontalAxis){xAxis.draw()}
        if(this.verticalAxis){yAxis.draw()};

        //Drawing axis        
        const xStepUnit = (this.xRange.max - this.xRange.min)/this.xTicks;
        const yStepUnit = (this.yRange.max - this.yRange.min)/this.yTicks;

        ctx.font = `${this.labelSize}px Couriers`;
        ctx.fillStyle = this.labelColor;    
                
        const xValues = Array.from({length: this.xTicks}, (_, i) => i);
        xValues.forEach(index => {
            ctx.fillText(
                `${(this.xRange.min + xStepUnit*index).toFixed(this.digits)}`, 
                this.origin.x + index*this.unit.x*xStepUnit,
                this.origin.y + this.labelSize
            )
        });

        const yValues = Array.from({length: this.yTicks}, (_, i) => i);
        yValues.forEach(index => {
            ctx.fillText(
                `${(this.yRange.min + yStepUnit*index).toFixed(this.digits)}`, 
                this.origin.x - this.labelSize,
                this.origin.y - index*this.unit.y*yStepUnit
            )
        });
    }

    //Interaction methods
    onMouseDown(event) { 
        this.offset.x = this.origin.x - resolutionFactor * event.x;
        this.offset.y = this.origin.y - resolutionFactor * event.y;             
        this.isClicked = true;
    }        

    onMouseMove(event) {
        if(this.isClicked){
            this.origin.x = this.offset.x + resolutionFactor * event.x;
            this.origin.y = this.offset.y + resolutionFactor * event.y;
            drawFrame();
        }                         
    }

    onMouseUp() {
        this.isClicked = false;            
    }

    //Coordinates methods    
    coordinatesToPixels(coordinates){
        const coordinateOrigin = {
            x: this.origin.x - this.unit.x*this.xRange.min,
            y: this.origin.y + this.unit.y*this.yRange.min, 
        }

        return {
            x:  coordinates.x*this.unit.x + coordinateOrigin.x,
            y: -coordinates.y*this.unit.y + coordinateOrigin.y
        };
    }

    pixelsToCoordinates(pixels){
        const coordinateOrigin = {
            x: this.origin.x - this.unit.x*this.xRange.min,
            y: this.origin.y + this.unit.y*this.yRange.min, 
        }
        return {
            x: ( pixels.x - coordinateOrigin.x)/this.unit.x,
            y: (-pixels.y + coordinateOrigin.y)/this.unit.y
        };
    }
}//End of Axis Coordinates class