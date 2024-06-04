class CheckButton { 
    constructor(props){
        //Spectial props
        this.pixelPos = props.pixelPos ?? {x: 0, y: 0};
        this.label = props.label ?? 'Check Button';
        this.size = props.size || 75;
        this.labelSize = props.labelSize ?? this.size;

        //Style props
        this.strokeColor = props.borderColor ?? 'white';
        this.strokeWidth = props.strokeWidth ?? 5;
        this.fillColor = props.fillColor ?? '#0af';
        this.borderRadius = props.borderRadius ?? 10;

        this.checkValue = props.checkValue ?? false;

        this.layer = 0;

        this.simulation = props.simulation || (()=>{
            'simulation added'
        });
        this.animation = props.animation || (()=>{
            'simulation added'
        })
    }

    draw(){ 
        const layer = canvas.getContext('2d');

        const x = this.pixelPos.x;
        const y = this.pixelPos.y;
        const width = this.size;  
        const height = this.size; 
        let radius = this.borderRadius;  

        layer.fillStyle = this.fillColor; 
        layer.strokeStyle = this.borderColor; 
        layer.lineWidth = this.strokeWidth; 
        
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;

        layer.beginPath();
        layer.moveTo(x + radius, y);
        layer.arcTo(x + width, y, x + width, y + height, radius);
        layer.arcTo(x + width, y + height, x, y + height, radius);
        layer.arcTo(x, y + height, x, y, radius);
        layer.arcTo(x, y, x + width, y, radius);
        layer.closePath();
        layer.save();
        layer.globalAlpha = (this.checkValue)? 1: 0;
        layer.fill();
        layer.restore();
        layer.stroke();

        const fontSize = this.labelSize;
        const X = this.pixelPos.x + 1.5*this.size;
        const Y = this.pixelPos.y + .5*this.size;
        layer.save();
        layer.font = `${fontSize}px Courier`;
        layer.fillStyle = 'white'; 
        layer.lineWidth = 2; 
        layer.textAlign = 'left'; 
        layer.textBaseline = 'middle'; 
        layer.fillText(this.label, X, Y);
        layer.strokeText(this.label, X, Y);
        layer.restore();
    }
    onMouseDown(event) {                      
        const mouse = {
            x: resolutionFactor * event.x,
            y: resolutionFactor * event.y,
        }
        const inH = this.pixelPos.x < mouse.x & mouse.x < this.pixelPos.y + this.size;
        const inV = this.pixelPos.y < mouse.y & mouse.y < this.pixelPos.y + this.size   
        if(inH & inV){
            this.checkValue = !this.checkValue;
            drawFrame();
        }      
    }        
    
    onMouseMove(event) {        
    }
    
    onMouseUp() {                    
    
    }

    animate(){
        this.animation();
    }

    simulate(){
        this.simulation();
    }

}