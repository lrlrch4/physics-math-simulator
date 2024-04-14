class Particle {
    constructor(props){        
        //Special props
        this.pos = props.pos,
        this.vel = props.vel || {x: 0, y: 0};
        this.acc = props.acc || {x: 0, y: 0};
        this.radius = props.radius || .25;
        this.mass = props.mass || 2;
        
        //additional props
        this.color = props.color || '#0af', 
        this.opacity = props.opacity || 1;
        this.label = props.label || '';
        this.labelSize = props.labelSize || 60;
        
        //interaction props
        this.layer = 0;
        this.offset = {x: 0, y: 0},
        this.isClicked = false;

        this.onMouseMoveAddition = props.onMouseMoveAddition || (() => {});
        
        //Animation props
        this.animation = props.animation || (
            () => ( console.log('animation added') )
            );

        this.simulation = props.simulation || (
            () => ( console.log('simulation added') )
            );
        
        this.trackList = [];
    }
    
    //Graphics methods
    draw(){
        const layer = canvas.getContext('2d');
        layer.save();
        layer.fillStyle = this.color;
        layer.globalAlpha = this.opacity;

        const pixels = xy.coordinatesToPixels(this.pos);
        const pixelRadius = xy.coordinatePixelUnit(this.radius);
        layer.beginPath();
        layer.arc(
            pixels.x, pixels.y, pixelRadius, 0, 2*Math.PI);
        layer.closePath();
        layer.fill(); 

        layer.restore();

        if(this.label != ''){
            layer.font = `${this.labelSize}px Courier`;
            layer.fillStyle = this.color;   
            layer.fillText(
                this.label,
                pixels.x + .8*pixelRadius ,
                pixels.y - .8*pixelRadius);
        }

        if(this.isClicked){ 
            layer.save();

            layer.globalAlpha = 0.3*this.opacity;
            layer.fillStyle = this.color;
            layer.beginPath();
            layer.arc(
            pixels.x, pixels.y, 1.5*this.radius, 0, 2*Math.PI);
            layer.closePath();
            layer.fill();

            layer.restore(); 
        }
    }

    rotate({angle, from = {x: 0, y: 0}}){
        const matrix = new Matrix([
            [Math.cos(angle), -Math.sin(angle)],
            [Math.sin(angle),  Math.cos(angle)]
        ])
        const vector = {
            x: this.pos.x - from.x, 
            y: this.pos.y - from.y
        }
        this.pos.x = from.x + matrix.applyMatrixTo(vector).x;
        this.pos.y = from.y + matrix.applyMatrixTo(vector).y;
    }
    
    applyMatrixTransformation(matrix){
        this.pos = matrix.applyMatrixTo(this.pos);
    }

    //Interaction methods
    onMouseDown(event) {                      
        const mouseX = resolutionFactor * event.x;
        const mouseY = resolutionFactor * event.y;
        
        const pixels = xy.coordinatesToPixels(this.pos);
        this.offset.x = mouseX - pixels.x;
        this.offset.y = mouseY - pixels.y;
        
        if( (pixels.x - mouseX)**2 + (pixels.y - mouseY)**2 <= this.radius**2){
            this.isClicked = true;
            drawFrame();
        }      
    }        
    
    onMouseMove(event) {        
        const pixels = xy.coordinatesToPixels(this.pos);        
        if(this.isClicked){            
            pixels.x = -this.offset.x + resolutionFactor * event.x;
            pixels.y = -this.offset.y + resolutionFactor * event.y;
            
            this.pos = xy.pixelsToCoordiantes(pixels);                 
            this.onMouseMoveAddition();
            drawFrame();
        }

    }
    
    onMouseUp() {                    
        this.isClicked = false;
    }

    //Animation methods
    animate() {
        this.animation();
    }

    simulate(){
        this.simulation();
    }

    showTrace({
        maxLength = 20,
        saveFrameRate = 3, 
        opacity = .2, 
        radiusFunction = ((index) => (index + 1)/maxLength)
    }){ 
        if(this.trackList.length >= maxLength){ 
            this.trackList.shift();
        }
        if(frame % saveFrameRate === 0){ 
            this.trackList.push({
                x: this.pos.x, 
                y: this.pos.y
            });
        }
         const pixelRadius = xy.coordinatePixelUnit(this.radius);
        this.trackList.forEach((element, index) => {
            new CoordinatePoint({
                pos: element, 
                color: this.color, 
                radius: radiusFunction(index)*pixelRadius, 
                opacity: opacity
            }).draw();
        });         
    }//End of showTrace method

    gravityInteractionWith(particles){
        const g = {x: 0, y: 0}
        particles.forEach((element, index) => {
            const dr = {
                x: element.pos.x - this.pos.x,
                y: element.pos.y - this.pos.y
            }
            const dr3 = (dr.x**2 + dr.y**2)**(3/2)
            g.x += G*element.mass*dr.x/dr3; 
            g.y += G*element.mass*dr.y/dr3;
        });
        return g;
    }

    detectCollisionWith(particle){
        const distanceVector = new Vector({
            x: particle.pos.x - this.pos.x, 
            y: particle.pos.y - this.pos.y
        });
        const distance = distanceVector.module();
        const totalMass = this.mass + particle.mass;
        if(distance < (this.radius + particle.radius)){

            const u1 = distanceVector.unitary();
            const u2 = u1.orthogonal();            
            const vcm = {
                x: (this.mass*this.vel.x + particle.mass*particle.vel.x)/totalMass,
                y: (this.mass*this.vel.y + particle.mass*particle.vel.y)/totalMass
            }
            const thisVel = {
                x: this.vel.x - vcm.x, 
                y: this.vel.y - vcm.y
            }
            const particleVel = {
                x: particle.vel.x - vcm.x, 
                y: particle.vel.y - vcm.y
            }
            const a1 = dotProduct(thisVel, u1);
            const a2 = dotProduct(thisVel, u2);
            this.vel = {
                x: -a1*u1.x + a2*u2.x + vcm.x,
                y: -a1*u1.y + a2*u2.y + vcm.y
            }
            
            const b1 = dotProduct(particleVel, u1);
            const b2 = dotProduct(particleVel, u2);
            particle.vel = {
                x: -b1*u1.x + b2*u2.x + vcm.x, 
                y: -b1*u1.y + b2*u2.y + vcm.y
            }
            const k = distance/(this.radius + particle.radius)+0.001;

            this.pos.x = this.pos.x - this.radius*(1-k)*u1.x;
            this.pos.y = this.pos.y - this.radius*(1-k)*u1.y;

            particle.pos.x = particle.pos.x + particle.radius*(1-k)*u1.x;
            particle.pos.y = particle.pos.y + particle.radius*(1-k)*u1.y;
        } 
    }//End of collision method
}// End of class