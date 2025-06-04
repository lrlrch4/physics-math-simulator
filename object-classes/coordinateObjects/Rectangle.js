class Rectangle{
    constructor(props){
        this.origin = props.origin ?? {x: 0, y: 0};
        this.ending = props.ending ?? {x: 1, y: 2};

        this.width = Math.abs(this.origin.x - this.ending.x);
        this.height = Math.abs(this.origin.y - this.ending.y);
        this.strokeColor = props.strokeColor ?? '#0af';
        this.strokeWidth = props.strokeWidth ?? 5;
        this.showStroke = props.showStroke ?? true;
        this.showFill = props.showFill ?? false;
        this.fillColor = props.fillColor ?? '#202020';
        this.borderRadius = props.borderRadius ?? 25;     
        this.opacity = props.opacity ?? .8;  
    }


    draw() { 
        const layer = canvas.getContext('2d');

        const pixelsOrigin = xy.coordinatesToPixels(this.origin);
        const pixelEnding = xy.coordinatesToPixels(this.ending);

        const x = Math.min(pixelsOrigin.x, pixelEnding.x);
        const y = Math.min(pixelsOrigin.y, pixelEnding.y);

        const pixelWidth = Math.abs(pixelEnding.x - pixelsOrigin.x);
        const pixelHeight = Math.abs(pixelEnding.y - pixelsOrigin.y);

        layer.save();
        layer.globalAlpha = this.opacity;
        layer.fillStyle = this.fillColor; 
        layer.strokeStyle = this.strokeColor; 
        layer.lineWidth = this.strokeWidth; 
        
        layer.strokeRect(x, y, pixelWidth, pixelHeight);        
        if(this.showFill){
            layer.fillRect(x, y, pixelWidth, pixelHeight);
        }  
        layer.restore();      
    }   
}

