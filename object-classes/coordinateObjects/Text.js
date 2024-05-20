class Text { 
    constructor(props){ 
        this.text = props.text || ['hello world'];
        this.pos = props.pos || {x: 0, y: 0};
        this.size = props.size || 50;
        this.absolutePosition = props.absolutePosition || false;
        this.lineSpacing = props.lineSpacing || 75;

        this.color = props.color || '#0af', 
        this.opacity = props.opacity || 1;

        this.layer = 0;

        this.animation = props.animation || (
            () => (console.log('animation added'))
        );
    }

    //Graphics props
    draw(){
        const layer = canvas.getContext('2d');
        const pixels = (this.absolutePosition)? 
            this.pos : xy.coordinatesToPixels(this.pos);

        this.text.forEach( (element, index) => {
            layer.font = `${this.size}px Courier`;
            layer.fillStyle = this.color;   
            layer.fillText(
                element,
                pixels.x,
                pixels.y + index*this.lineSpacing);
        })
    }

    rotate(){

    }

    applyMatrixTransformation(){ 

    }

    //Interaction props
    onMouseDown(){ 

    }

    onMouseMove(){

    }

    onMouseUp(){

    }

    //Animation props
    animate(){
        this.animation()
    }

    showTrace(){

    }
}