class Arrow {
    constructor(props){
        this.origin = props.origin;
        this.ending = props.ending;
        this.color = props.color || '#0af';
        this.strokeWidth = props.strokeWidth || 5;
        this.sideLength = props.sideLength || 100;
        this.tipSize = props.tipSize || 20;
    }

    draw(){
        const layer0 = canvas.getContext('2d');
        const layer1 = canvas.getContext('2d');

        const vector = new Vector({
            x: this.ending.x - this.origin.x, 
            y: this.ending.y - this.origin.y
        });

        const r = this.tipSize;
        const u = vector.unitary();
        const pointR = {
            x: this.ending.x - .5*r*u.x + (Math.sqrt(3)/2)*r*u.orthogonal().x,
            y: this.ending.y - .5*r*u.y + (Math.sqrt(3)/2)*r*u.orthogonal().y
        }            
        const pointQ = {
            x: this.ending.x - .5*r*u.x - (Math.sqrt(3)/2)*r*u.orthogonal().x,
            y: this.ending.y - .5*r*u.y - (Math.sqrt(3)/2)*r*u.orthogonal().y
        }    
               
        layer1.beginPath();            
        layer1.moveTo(
            this.ending.x + r*vector.unitary().x, 
            this.ending.y + r*vector.unitary().y
            ); 
        layer1.lineTo(pointR.x, pointR.y);  
        layer1.lineTo(pointQ.x, pointQ.y);             
        layer1.closePath();            
        layer1.fillStyle = this.color;            
        layer1.fill();

        layer0.beginPath();
        layer0.moveTo(this.origin.x, this.origin.y);
        layer0.lineTo(this.ending.x, this.ending.y);
        layer0.strokeStyle = this.color; 
        layer0.lineWidth = this.strokeWidth;
        layer0.stroke();
    }   
}