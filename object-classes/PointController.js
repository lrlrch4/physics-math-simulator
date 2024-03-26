class PointController {
    constructor(props){
        this.radius = props.radius || 20;
        this.color = props.color || 'red';
        this.pos = props.pos || {x: canvas.width/2, y: canvas.height/2};
        
        this.isClicked = false;
        this.isAbsolute = props.isAbsolute || false;
        this.layer = props.layer || 0; 
    }
    
    draw() {
        const layer = canvas.getContext('2d');
        layer.fillStyle = this.color;
        layer.beginPath();
        layer.arc(
            this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
        layer.closePath();
        layer.fill(); 
    }
    
    setAsControllerFor(particle) {
        this.pos = {x: particle.pos.x + particle.vel.x, y: particle.pos.y + particle.vel.y},
        this.vel = {x: particle.vel.x, y: particle.vel.y}
    }

    updateWith(particle) {
        this.pos.x = particle.pos.x + particle.vel.x;
        this.pos.y = particle.pos.y + particle.vel.y; 
    }
    
    onMouseDown(event){
        const mouseX = resolutionFactor * event.x;
        const mouseY = resolutionFactor * event.y;

        if( (this.pos.x - mouseX)**2 + (this.pos.y - mouseY)**2 <= this.radius**2  ){
            this.isClicked = true;
        }
    }

    onMouseMove(event){
        if(this.isClicked){
            this.pos.x = resolutionFactor * event.x;
            this.pos.y = resolutionFactor * event.y;
            drawFrame();
        }    
    }

    onMouseUp(){
        this.isClicked = false;
    }
}