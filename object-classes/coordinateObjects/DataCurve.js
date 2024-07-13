class DataCurve { 
    constructor(props){ 
        this.input = props.input || [];
        this.output = props.output || [];

        this.color = props.color || '#0af';
        this.opacity = props.opacity || 1;
        this.lineWidth = props.lineWidth || 5; 

        this.layer = 0;

        this.simulation = props.simulation || (()=>{
            'simulation added'
        });
        this.animation = props.animation || (()=>{
            'simulation added'
        })
    }

    //Graphics props
    draw(){
        const layer = canvas.getContext('2d');
        layer.save();
        layer.strokeStyle = this.color; 
        layer.lineWidth = this.lineWidth;
        layer.globalAlpha = this.opacity;
        layer.beginPath();
        for(let s = 0; s < this.input.length; s++){  
            const coordinates = {x: this.input[s], y: this.output[s]}          
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

    rotate(){}

    applyMatrixTransformation(){}

    //Interaction props
    onMouseDown(event){}

    onMouseMove(event){}

    onMouseUp(){}

    //Animation props
    animate(){
        this.animation();
    }

    simulate(){
        this.simulation();
    }
    showTrace(){
    }
}