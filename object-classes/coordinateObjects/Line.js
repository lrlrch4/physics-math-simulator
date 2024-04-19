class Line{
    constructor(props){ 
        //Special props       
        this.origin = props.origin || {x: 0, y: 0}
        this.ending = props.ending || {x: 2, y: 1}

        //Style props
        this.lineWidth = props.lineWidth || 3;
        this.color = props.color || '#0af';
        this.opacity = props.opacity || 1;
        this.isDashed = props.isDashed || false;

        //Animation props
        this.animation = props.animation || (
            () => (console.log('animation added'))
            );

        //interaction props 
        this.layer = 0
    }

    //Graphics methods
    draw(){
        const layer = canvas.getContext('2d');
        layer.save();
        layer.globalAlpha = this.opacity;
        layer.strokeStyle = this.color;  // Line color
        layer.lineWidth = this.lineWidth;         // Line width
    
        // Define the starting and ending points of the line
        const originPixels = xy.coordinatesToPixels(this.origin);
        const endingPixels = xy.coordinatesToPixels(this.ending);

        // Draw the line
        if(this.isDashed){
            layer.setLineDash([10, 10]);
        }
        layer.beginPath();
        layer.moveTo(originPixels.x, originPixels.y);  
        layer.lineTo(endingPixels.x, endingPixels.y);      
        layer.stroke();                
        layer.closePath();
        layer.restore();
    } 
    
    rotate({angle, from = {x: 0, y: 0}}){
        const matrix = new Matrix([
            [Math.cos(angle), -Math.sin(angle)],
            [Math.sin(angle),  Math.cos(angle)]
        ])
        const originPoint = {
            x: this.origin.x - from.x, 
            y: this.origin.y - from.y
        }
        this.origin.x = from.x + matrix.applyMatrixTo(originPoint).x;
        this.origin.y = from.y + matrix.applyMatrixTo(originPoint).y;

        const endingPoint = {
            x: this.ending.x - from.x, 
            y: this.ending.y - from.y
        }
        this.ending.x = from.x + matrix.applyMatrixTo(endingPoint).x;
        this.ending.y = from.y + matrix.applyMatrixTo(endingPoint).y;
    }//End of method

    applyMatrixTransformation(matrix){
        this.origin = matrix.applyMatrixTo(this.origin);
        this.ending = matrix.applyMatrixTo(this.ending);
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
        this.animation()
    }

    showTrace(){ 

    }
}//End of class