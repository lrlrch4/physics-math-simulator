class Box { 
    constructor(props){
        //Spectial props
        this.pixelPos = props.pixelPos ?? {x: 0, y: 0};

        //Style props
        this.strokeColor = props.borderColor ?? 'white';
        this.strokeWidth = props.strokeWidth ?? 5;
        this.showStroke = props.showStroke ?? true;
        this.fillColor = props.fillColor ?? '#202020';
        this.width = props.width ?? 800;
        this.height = props.height ?? 500;
        this.borderRadius = props.borderRadius ?? 25;

        this.opacity = props.opacity ?? .8;
    }

    draw(){ 
        const layer = canvas.getContext('2d');

        const x = this.pixelPos.x;
        const y = this.pixelPos.y;
        const width = this.width;  
        const height = this.height; 
        const radius = this.borderRadius;  


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
        layer.globalAlpha = this.opacity;
        layer.fill();
        layer.restore();
        if(this.showStroke){layer.stroke()};
    }
}