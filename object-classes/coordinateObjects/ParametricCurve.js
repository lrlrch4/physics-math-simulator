class ParametricCurve { 
    constructor(props){
        //Special props
        this.mathFunction = props.mathFunction || ( 
            (s) => ({x: Math.cos(s), y: Math.sin(s)})
            );
        this.range = props.range || {start: 0, end: 1};
        this.nonLinearTransformation = props.nonLinearTransformation || (
            (coor) => ({x: coor.x, y: coor.y})
            );
        this.ds = props.ds || .005

        //Style props
        this.color = props.color || '#0af';
        this.opacity = props.opacity || 1;
        this.lineWidth = props.lineWidth || 5; 

        //Interactive props
        this.isClicked = false;
        this.pointClicked = {x: 0, y: 0};

        //Animation props
        this.animation = props.animation || (() => (
            console.log('Animation added')
        ));
    }

    draw(){
        const layer = canvas.getContext('2d');
        layer.save();
        layer.strokeStyle = this.color; 
        layer.lineWidth = this.lineWidth;
        layer.globalAlpha = this.opacity;
        layer.beginPath();
        for(let s = this.range.start; s <= this.range.end; s+= this.ds){            
            const coordinates = this.nonLinearTransformation(
                this.mathFunction(s)
                );
            const pixels = xy.coordinatesToPixels(coordinates);
            layer.lineTo(
                pixels.x,
                pixels.y
            )
        }
        layer.stroke();
        layer.restore();

        if(this.isClicked){ 
            new CoordinatePoint({
                pos: this.pointClicked, 
                label: `(${this.pointClicked.x.toFixed(2)}, ${this.pointClicked.y.toFixed(2)})`,
                radius: 10,
                color: this.color, 
                labelSize: 50
            }).draw()
        }
    }

    rotate({angle, from = {x: 0, y: 0}}){
        const originalFunction = this.mathFunction;

        this.mathFunction = (t) => { 
            const vector = {
                x: originalFunction(t).x - from.x,
                y: originalFunction(t).y - from.y
            };

            const matrix = new Matrix([
                [Math.cos(angle), -Math.sin(angle)],
                [Math.sin(angle),  Math.cos(angle)]
            ]);

            return {
                x: from.x + matrix.applyMatrixTo(vector).x, 
                y: from.y + matrix.applyMatrixTo(vector).y
            };
        }
    }

    applyMatrixTransformation(matrix){
        const originalFunction = this.mathFunction;
        this.mathFunction = (t) => { 
            const vector = originalFunction(t);
            return matrix.applyMatrixTo(vector);
        }
    }

    applyNonLinearTransformation(transformationFunction){ 
        this.nonLinearTransformation = transformationFunction;
    }

    //Interaction methods
    onMouseDown(event) {    
        const pixelMouse = { 
            x: resolutionFactor * event.x,
            y: resolutionFactor * event.y
        }
        const pixelTolerance = 10;
        for(let s = this.range.start; s <= this.range.end; s+= this.ds){            
            const curvePixelPoint = xy.coordinatesToPixels(this.mathFunction(s));            
            if(
                pixelMouse.x - pixelTolerance < curvePixelPoint.x & 
                curvePixelPoint.x < pixelMouse.x + pixelTolerance &
                pixelMouse.y - pixelTolerance < curvePixelPoint.y & 
                curvePixelPoint.y < pixelMouse.y + pixelTolerance
            ){
                this.pointClicked = this.mathFunction(s);
                this.isClicked = true;
                drawFrame();
                return
            }
        }

    }        
    
    onMouseMove(event) {
        
    }

    onMouseUp() {                    
        this.isClicked = false;
    }       

    //Animation methods
    update(){ 
        this.animation();
    }

    showTrace(){
        
    }

}//End of object