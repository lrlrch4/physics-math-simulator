class Curve {
    constructor(props){
        //Special props
        this.mathFunction = props.mathFunction || ((coorX) => coorX**2);   
        
        //Style props
        this.color = props.color || '#0af';  
        this.lineWidth = props.lineWidth || 2; 
        
        //Animation props
        this.animation = props.animation || (
            () => (console.log('animation added'))
            );
    }

    draw(){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;

        for (let pixelX = 0; pixelX < canvas.width; pixelX++) {
            const coorX = xy.pixelsToCoordiantes({x: pixelX, y: 0}).x
            const coorY = this.mathFunction(coorX);
    
            const pixelY = xy.coordinatesToPixels({x: coorX, y: coorY}).y;
    
            if(pixelY != 0) {ctx.lineTo(pixelX, pixelY);}        
        }    
        ctx.stroke();
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
        this.animation();
    }

    showTrace(){

    }
}