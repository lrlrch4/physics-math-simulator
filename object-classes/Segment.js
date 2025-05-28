class Segment{
    constructor(props){ 
        //Special props       
        this.origin = props.origin || {x: .25*canvas.width, y: .25*canvas.height}
        this.ending = props.ending || {x: .75*canvas.width, y: .75*canvas.height}

        //Style props
        this.lineWidth = props.lineWidth || 5;
        this.color = props.color || '#0af';
        this.opacity = props.opacity || 1;
        this.isDashed = props.isDashed || false;

        //interaction props 
        this.layer = 0
        this.isClicked = false;
        this.offsetOrigin = {x: 0, y: 0};
        this.offsetEnding = {x: 0, y: 0};

        //Animation props
        this.animation = props.animation || (
            () => (console.log('animation added'))
            );
    }

    //Graphics methods
    draw(){
        const layer = canvas.getContext('2d');
        const originPixels = this.origin;
        const endingPixels = this.ending;

        layer.save();
        layer.globalAlpha = this.opacity;
        layer.strokeStyle = this.color;  
        layer.lineWidth = this.lineWidth;
        if(this.isDashed){
            layer.setLineDash([10, 10]);
        }
        layer.beginPath();
        layer.moveTo(originPixels.x, originPixels.y);  
        layer.lineTo(endingPixels.x, endingPixels.y);      
        layer.stroke();                
        layer.closePath();
        layer.restore();

        if(this.isClicked){
            layer.save();
            layer.globalAlpha = .5*this.opacity;
            layer.strokeStyle = this.color;  // Line color
            layer.lineWidth = 4*this.lineWidth;
            layer.beginPath();
            layer.moveTo(originPixels.x, originPixels.y);  
            layer.lineTo(endingPixels.x, endingPixels.y);      
            layer.stroke();                
            layer.closePath();
            layer.restore();
        }
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
        const mouse = {
            x: resolutionFactor*event.x, 
            y: resolutionFactor*event.y
        }        
        const M = mouse;        

        const tolerance = 15; //unit tolerance
        const h = tolerance
        const A = this.origin;
        const B = this.ending;
       
        const theta = Math.atan((B.y - A.y)/(B.x - A.x));
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        const Ar = {
            x:  cos*A.x + sin*A.y, 
            y: -sin*A.x + cos*A.y
        }
        const Br = {
            x:  cos*B.x + sin*B.y, 
            y: -sin*B.x + cos*B.y
        }
        const Mr = {
            x:  cos*M.x + sin*M.y, 
            y: -sin*M.x + cos*M.y
        }

        const left  = Math.min(Ar.x, Br.x);
        const right = Math.max(Ar.x, Br.x);
        const bottom = Math.min(Ar.y, Br.y);
        const top = Math.max(Ar.y, Br.y);

        const pixelA = A;
        const pixelB = B;

        this.offsetOrigin.x = mouse.x - pixelA.x; 
        this.offsetOrigin.y = mouse.y - pixelA.y; 

        this.offsetEnding.x = mouse.x - pixelB.x; 
        this.offsetEnding.y = mouse.y - pixelB.y; 
        if(left < Mr.x & Mr.x <right  & bottom - h < Mr.y & Mr.y < top + h){
            this.isClicked = true;
            drawFrame();
        }
    }        
    
    onMouseMove(event) {
        const pA = this.origin;
        const pB = this.ending;   
        if(this.isClicked){
            pA.x = -this.offsetOrigin.x + resolutionFactor * event.x;
            pA.y = -this.offsetOrigin.y + resolutionFactor * event.y;

            pB.x = -this.offsetEnding.x + resolutionFactor * event.x;
            pB.y = -this.offsetEnding.y + resolutionFactor * event.y;

            this.origin = pA;
            this.ending = pB;
            drawFrame();
        }        
    }

    onMouseUp() {                    
        this.isClicked = false;
    }     
    
    //Animation methods
    animate(){ 
        this.animation()
    }

    showTrace(){ 

    }
}//End of class