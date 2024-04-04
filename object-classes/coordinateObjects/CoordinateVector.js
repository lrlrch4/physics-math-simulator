class CoordinateVector{ 
    constructor(props){
        //Special props
        this.origin = props.origin || {x: 0, y: 0};
        this.ending = props.ending;

        //Style props
        this.color = props.color || '#0af';
        this.opacity = props.opacity || 1;
        this.label = props.label || '';
        this.labelSize = props.labelSize || 60;
        this.strokeWidth = props.strokeWidth || 5;
        this.tipSize = props.tipSize || 20;

        //Interaction props

        //Animation props
        this.animation = props.animation || (
            () => ( console.log('animation added') )
        );
    }

    //Graphic methods
    draw(){
        const layer0 = canvas.getContext('2d');
        const layer1 = canvas.getContext('2d');

        const pixelsOrigin = xy.coordinatesToPixels(this.origin);
        const pixelsEnding = xy.coordinatesToPixels(this.ending);

        const vector = new Vector({
            x: pixelsEnding.x - pixelsOrigin.x, 
            y: pixelsEnding.y - pixelsOrigin.y
        });

        const r = this.tipSize;
        const u = vector.unitary();
        const pointR = {
            x: pixelsEnding.x - 2*r*u.x + (Math.sqrt(3)/2)*r*u.orthogonal().x,
            y: pixelsEnding.y - 2*r*u.y + (Math.sqrt(3)/2)*r*u.orthogonal().y
        }            
        const pointQ = {
            x: pixelsEnding.x - 2*r*u.x - (Math.sqrt(3)/2)*r*u.orthogonal().x,
            y: pixelsEnding.y - 2*r*u.y - (Math.sqrt(3)/2)*r*u.orthogonal().y
        }   
        
        layer1.save();
        layer0.save();

        layer0.globalAlpha = this.opacity;
        layer1.globalAlpha = this.opacity;               
        layer1.beginPath();            
        layer1.moveTo(
            pixelsEnding.x, 
            pixelsEnding.y
            ); 
        layer1.lineTo(pointR.x, pointR.y);  
        layer1.lineTo(pointQ.x, pointQ.y);             
        layer1.closePath();            
        layer1.fillStyle = this.color;            
        layer1.fill();

        layer0.beginPath();
        layer0.moveTo(pixelsOrigin.x, pixelsOrigin.y);
        layer0.lineTo(pixelsEnding.x, pixelsEnding.y);
        layer0.strokeStyle = this.color; 
        layer0.lineWidth = this.strokeWidth;
        layer0.stroke();

        if(this.label != ''){
            const layer3 = canvas.getContext('2d');

            layer3.font = `${this.labelSize}px Courier`;
            layer3.fillStyle = this.color;   
            layer3.fillText(
                this.label,
                (pixelsOrigin.x + pixelsEnding.x)/2,
                (pixelsOrigin.y + pixelsEnding.y)/2
                );
        }
        layer0.restore();
        layer1.restore();
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
    }

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
    update(){
        this.animation();
    }

    showTrace(){

    }
}