class ColorScaleBar{
    constructor(props){
        this.pixelOrigin = props.pixelOrigin || {x: .675*canvas.width, y: .985*canvas.height}; 
        this.pixelEnding = props.pixelOrigin || {x: .98*canvas.width, y: .985*canvas.height}; 
        this.steps = props.steps || 50;
        
        this.opacity = props.opacity || 1;
        this.lineWidth = props.lineWidth || 25;
    }

    draw(){
        const layer = canvas.getContext('2d');
        layer.save();
        layer.globalAlpha = this.opacity;
        layer.lineWidth = this.lineWidth;         // Line width
        
        // Define the starting and ending points of the line
        const dl = (this.pixelEnding.x - this.pixelOrigin.x)/this.steps;
        // const dl = 1;
        for(let i = 0; i < this.steps; i++){
            
            layer.strokeStyle = `hsl(${(i*300)/(this.steps-1)}, 100%, 50%)`;  // Line color
            layer.beginPath();
            layer.moveTo(
                this.pixelOrigin.x + i*dl, 
                this.pixelOrigin.y 
            );  
            layer.lineTo(
                this.pixelOrigin.x + (i+1)*dl, 
                this.pixelEnding.y
            );      
            layer.stroke();                
            layer.closePath();
        }
        layer.restore();
    }
}