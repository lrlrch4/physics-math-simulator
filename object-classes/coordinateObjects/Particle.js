class Particle {
    constructor(props){        
        //Special props
        this.pos = props.pos,
        this.vel = props.vel || {x: 0, y: 0};
        this.acc = props.acc || {x: 0, y: 0};
        this.radius = props.radius || .1;
        this.mass = props.mass || 2;
        
        //additional props
        this.color = props.color || '#0af', 
        this.opacity = props.opacity || 1;
        this.label = props.label || '';
        this.labelSize = props.labelSize || 60;
        
        //interaction props
        this.layer = 0;
        this.offset = {x: 0, y: 0},
        this.isClicked = false;

        this.onMouseMoveAddition = props.onMouseMoveAddition || (() => {});
        
        //Animation props
        this.animation = props.animation || (
            () => ( console.log('animation added') )
            );

        this.simulation = props.simulation || (
            () => ( console.log('simulation added') )
            );
        
        this.trackList = [];
    }
    
    //Graphics methods
    draw(){
        const layer = canvas.getContext('2d');
        layer.save();
        layer.fillStyle = this.color;
        layer.globalAlpha = this.opacity;

        const pixels = xy.coordinatesToPixels(this.pos);
        const pixelRadius = xy.coordinatePixelUnit(this.radius);
        layer.beginPath();
        layer.arc(
            pixels.x, pixels.y, pixelRadius, 0, 2*Math.PI);
        layer.closePath();
        layer.fill(); 

        layer.restore();

        if(this.label != ''){
            layer.font = `${this.labelSize}px Courier`;
            layer.fillStyle = this.color;   
            layer.fillText(
                this.label,
                pixels.x + this.radius +  .75*this.labelSize,
                pixels.y - this.radius);
        }

        if(this.isClicked){ 
            layer.save();

            layer.globalAlpha = 0.3*this.opacity;
            layer.fillStyle = this.color;
            layer.beginPath();
            layer.arc(
            pixels.x, pixels.y, 1.5*this.radius, 0, 2*Math.PI);
            layer.closePath();
            layer.fill();

            layer.restore(); 
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
    }
    
    applyMatrixTransformation(matrix){
        this.pos = matrix.applyMatrixTo(this.pos);
    }

    //Interaction methods
    onMouseDown(event) {                      
        const mouseX = resolutionFactor * event.x;
        const mouseY = resolutionFactor * event.y;
        
        const pixels = xy.coordinatesToPixels(this.pos);
        this.offset.x = mouseX - pixels.x;
        this.offset.y = mouseY - pixels.y;
        
        if( (pixels.x - mouseX)**2 + (pixels.y - mouseY)**2 <= this.radius**2){
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
            this.onMouseMoveAddition();
            drawFrame();
        }

    }
    
    onMouseUp() {                    
        this.isClicked = false;
    }

    //Animation methods
    animate() {
        this.animation();
    }

    simulate(){
        this.simulation();
    }

    showTrace({
        maxLength = 20,
        saveFrameRate = 3, 
        opacity = .3, 
        radiusFunction = ((index) => (index + 1)/maxLength)
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
                color: this.color, 
                radius: radiusFunction(index)*this.radius, 
                opacity: opacity
            }).draw();
        });

    }//End of showTrace method
}// End of class