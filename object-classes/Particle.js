class Particle {
    constructor(props){
        this.radius = props.radius || 20;
        this.color = props.color || '#0af';
        
        //Dynamic values
        this.pos = {...props.pos} || {x: canvas.width/2, y: canvas.height/2};
        this.vel = {...props.vel} || {x: 0, y: 0};
        this.acc = {...props.acc} || {x: 0, y: 0};

        this.initPos = {...props.pos} || {x: canvas.width/2, y: canvas.height/2};
        this.initVel = {...props.vel} || {x: 0, y: 0};
        this.initAcc = {...props.acc} || {x: 0, y: 0};
       
        this.isClicked = false;
        
        this.offset = {x: 0, y: 0};
        this.layer = props.layer || 0;
        
        this.isAbsolute = props.isAbsolute || false;
    }
    
    draw() {        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fill(); 
    }

    update() {
        this.vel.x += this.acc.x * timeStep;
        this.vel.y += this.acc.y * timeStep;
        this.pos.x += this.vel.x * timeStep;
        this.pos.y += this.vel.y * timeStep;

        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x = -this.vel.x;
        }
        if (this.pos.x > canvas.width - this.radius) {
            this.pos.x = canvas.width - this.radius;
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.y = -this.vel.y;
        }
        if (this.pos.y > canvas.height - this.radius) {
            this.pos.y = canvas.height - this.radius;
            this.vel.y = -this.vel.y;
        }   
    }

    //update the particle 
    updateWith(controller){
        this.vel.x = controller.pos.x - this.pos.x;
        this.vel.y = controller.pos.y - this.pos.y;
    }

    resetInitialConditions(initialConditions) {
        this.pos = {...initialConditions.pos};
        this.vel = {...initialConditions.vel};
        this.acc = {...initialConditions.acc};
    }

    //Add interaction
    onMouseDown(event) {                      
        const mouseX = resolutionFactor * event.x;
        const mouseY = resolutionFactor * event.y;

        if( (this.pos.x - mouseX)**2 + (this.pos.y - mouseY)**2 <= this.radius**2){
            this.isClicked = true;
        }
        this.offset.x = mouseX - this.pos.x;
        this.offset.y = mouseY - this.pos.y;
    }        
    
    onMouseMove(event) {
        
        if(this.isClicked){
            this.acc = {x: 0, y: 0};
            this.vel = {x: 0, y: 0};
            this.pos.x = -this.offset.x + resolutionFactor * event.x;
            this.pos.y = -this.offset.y + resolutionFactor * event.y;
            
            drawFrame();
        }                     
    }

    onMouseUp() {                    
        this.isClicked = false;

        drawFrame();
    }
}