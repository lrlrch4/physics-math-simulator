class CircleArc {
    constructor(props){        
        //Special props
        this.pos = props.pos || {x: 0, y: 0};        

        this.startAngle = props.startAngle || 0;
        this.endAngle = props.endAngle || 2*Math.PI;
        this.radius = props.radius || 1;
        
        this.startPoint = {
            x: this.pos.x + this.radius*Math.cos(this.startAngle),
            y: this.pos.y + this.radius*Math.sin(this.startAngle)
        }

        this.endPoint = {
            x: this.pos.x + Math.cos(this.endAngle),
            y: this.pos.y + Math.sin(this.endAngle)
        }

        //Style props
        this.color = props.color || '#0fa', 
        this.opacity = props.opacity || .3;
        this.label = props.label || '';
        this.labelSize = props.labelSize || 60;
        
        //interaction props
        this.layer = 0;
        this.offset = {x: 0, y: 0};
        this.isClicked = false;
        
        //Animation props
        this.animation = props.animation || (
            () => ( console.log('animation added') )
            );

        this.trackList = [];
    }
    
    //Graphics methods
    draw(){   

        const layer = canvas.getContext('2d');
        const pixels = xy.coordinatesToPixels(this.pos);
        const pixelRadius = xy.coordinatePixelUnit(this.radius);   
        const pixelStartPoint = xy.coordinatesToPixels(this.startPoint);

        layer.save();

        layer.fillStyle = this.color;
        layer.globalAlpha = this.opacity;
        
        layer.beginPath();
        layer.moveTo(pixelStartPoint.x, pixelStartPoint.y);
        layer.lineTo(pixels.x, pixels.y);
        layer.arc(
            pixels.x, pixels.y, pixelRadius, -this.endAngle, -this.startAngle);
        layer.lineTo(pixels.x, pixels.y);
        layer.closePath();
        layer.fill(); 
        layer.restore();
        
        if(this.label != ''){
            layer.font = `${this.labelSize}px Courier`;
            layer.fillStyle = this.color;   
            layer.fillText(
                this.label,
                pixels.x + .75*this.labelSize,
                pixels.y);
            }
            
            if(this.isClicked){ 
                layer.strokeStyle = this.color;
                layer.lineWidth = 3;
            layer.stroke();
        }
    }

    rotate({angle, from = {x: 0, y: 0}}){
        const matrix = new Matrix([
            [Math.cos(angle), -Math.sin(angle)],
            [Math.sin(angle),  Math.cos(angle)]
        ])
        const vector = {
            x: this.pos.x - from.x, 
            y: this.pos.y - from.y
        }

        this.pos.x = from.x + matrix.applyMatrixTo(vector).x;
        this.pos.y = from.y + matrix.applyMatrixTo(vector).y;

        const startVector = { 
            x: this.startPoint.x - from.x, 
            y: this.startPoint.y - from.y
        }

        this.startPoint.x = from.x + matrix.applyMatrixTo(startVector).x;
        this.startPoint.y = from.y + matrix.applyMatrixTo(startVector).y;

        const arcAngle = this.endAngle - this.startAngle;

        this.startAngle = Math.atan2(
            this.startPoint.y - this.pos.y, 
            this.startPoint.x - this.pos.x
            );

        this.endAngle = this.startAngle + arcAngle;
    }
    
    applyMatrixTransformation(matrix){
        this.pos = matrix.applyMatrixTo(this.pos);
        this.startPoint = matrix.applyMatrixTo(this.startPoint);

        const arcAngle = this.endAngle - this.startAngle;
        this.startAngle = Math.atan2(
            this.startPoint.y - this.pos.y, 
            this.startPoint.x - this.pos.x
            );

        this.endAngle = this.startAngle + arcAngle;
    }

    //Interaction methods
    onMouseDown(event) {                      
        const mouseX = resolutionFactor * event.x;
        const mouseY = resolutionFactor * event.y;
        
        const mouseCoordinates = xy.pixelsToCoordiantes({x: mouseX, y: mouseY});
        const mouseAngle = Math.atan2(
            mouseCoordinates.y - this.pos.y, 
            mouseCoordinates.x - this.pos.x
            );
        
        const pixels = xy.coordinatesToPixels(this.pos)
        this.offset.x = mouseX - pixels.x;
        this.offset.y = mouseY - pixels.y;

        const pixelRadius = xy.coordinatePixelUnit(this.radius);
        if( 
            (pixels.x - mouseX)**2 + (pixels.y - mouseY)**2 <= pixelRadius**2 & 
            mouseAngle > this.startAngle & mouseAngle < this.endAngle
        ){
            this.isClicked = true;
            drawFrame();
        }      
    }        
    
    onMouseMove(event) {        
        const pixels = xy.coordinatesToPixels(this.pos);        
        if(this.isClicked){            
            pixels.x = -this.offset.x + resolutionFactor * event.x;
            pixels.y = -this.offset.y + resolutionFactor * event.y;
            
            this.pos = xy.pixelsToCoordiantes(pixels); 
            
            this.startPoint = {
                x: this.pos.x + Math.cos(this.startAngle),
                y: this.pos.y + Math.sin(this.startAngle)
            }
            
            this.endPoint = {
                x: this.pos.x + Math.cos(this.endAngle),
                y: this.pos.y + Math.sin(this.endAngle)
            }                
            drawFrame();
        }
    }
    
    onMouseUp() {                    
        this.isClicked = false;
    }

    //Animation methods
    update() {
        this.animation();
    }

    showTrace({
        maxLength = 20,
        saveFrameRate = 3, 
        opacity = .3
    }){ 
        if(this.trackList.length >= maxLength){ 
            this.trackList.shift();
        }
        if(frame % saveFrameRate === 0){ 
            this.trackList.push(this.pos);
        }

        this.trackList.forEach((element, index) => {
            new CoordinatePoint({
                pos: element, 
                color: pointA.color, 
                radius: ((index+1)/maxLength)*this.radius, 
                opacity: opacity
            }).draw();
        });
    }//End of showTrace method
}// End of class