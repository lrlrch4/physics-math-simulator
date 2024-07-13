class Particle {
    constructor(props){        
        //Special props
        this.pos = props.pos,
        this.vel = props.vel || {x: 0, y: 0};
        this.acc = props.acc || {x: 0, y: 0};
        this.radius = props.radius || .1;
        this.mass = props.mass || 2;
        
        //style props
        this.color = props.color || '#0af', 
        this.opacity = props.opacity || 1;
        this.label = props.label || '';
        this.labelSize = props.labelSize || 60;

        this.drawPosVec = props.drawPosVec || false;
        this.posVecColor = props.posVecColor || '#ff7300'; //Orange
        
        this.drawVelVec = props.drawVelVec || false;
        this.velVecScale = props.velVecScale || 1;
        this.velVecColor = props.velVecColor || '#3bff00'; //Green 

        this.drawAccVec = props.drawAccVec || false;
        this.accVecScale = props.accVecScale || 1;
        this.accVecColor = props.accVecColor || '#f6ff00'; //Yellow

        //interaction props
        this.layer = 0;
        this.offset = {x: 0, y: 0},
        this.isClicked = false;

        //Velocity controller props
        this.addVelController = props.addVelController || false;
        this.drawVelController = props.drawVelController || false;
        this.controllerRadius = props.controllerRadius || 25;
        this.controllerOffset = {x: 0, y: 0};
        this.controllerPos = {
            x: this.pos.x + this.velVecScale*this.vel.x,
            y: this.pos.y + this.velVecScale*this.vel.y,
        }
        this.controllerIsClicked = false;

        //On mouse move addition
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
            pixels.x, pixels.y, 1.5*pixelRadius, 0, 2*Math.PI);
            layer.closePath();
            layer.fill();

            layer.restore(); 
        }

        if(this.drawPosVec){
            const posVector = new CoordinateVector({ 
                origin: {x: 0, y: 0}, 
                ending: {
                    x: this.pos.x, 
                    y: this.pos.y
                }, 
                color: this.posVecColor
            })
            posVector.draw();
        }

        if(this.drawVelVec){
            const velocityVector = new CoordinateVector({ 
                origin: {x: this.pos.x, y: this.pos.y}, 
                ending: {
                    x: this.pos.x + this.velVecScale*this.vel.x, 
                    y: this.pos.y + this.velVecScale*this.vel.y
                }, 
                color: this.velVecColor
            })
            velocityVector.draw();
        }
        if(this.drawAccVec){
            const accVector = new CoordinateVector({ 
                origin: {x: this.pos.x, y: this.pos.y}, 
                ending: {
                    x: this.pos.x + this.accVecScale*this.acc.x, 
                    y: this.pos.y + this.accVecScale*this.acc.y
                }, 
                color: this.accVecColor
            })
            accVector.draw();
        }

        if(this.addVelController & this.drawVelController){
            const velController = new CoordinatePoint({
                pos: {
                    x: this.controllerPos.x,
                    y: this.controllerPos.y
                },
                radius: this.controllerRadius,
                color: 'red', 
                opacity: .5
            })
            velController.draw()
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
        
        const pixelRadius = xy.coordinatePixelUnit(this.radius);
        if( (pixels.x - mouseX)**2 + (pixels.y - mouseY)**2 <= pixelRadius**2){
            this.isClicked = true;
            drawFrame();
        }  
        if(this.addVelController){
            const controllerPixels = xy.coordinatesToPixels(this.controllerPos);
            this.controllerOffset.x = mouseX - controllerPixels.x;
            this.controllerOffset.y = mouseY - controllerPixels.y;
            if((controllerPixels.x - mouseX)**2 + (controllerPixels.y - mouseY)**2 <= this.controllerRadius**2){
                this.controllerIsClicked = true;
                this.isClicked = true;
            }
        }
    }//End of draw method        
    
    onMouseMove(event) {        
        const pixels = xy.coordinatesToPixels(this.pos);        
        if(this.isClicked & !this.controllerIsClicked){            
            pixels.x = -this.offset.x + resolutionFactor * event.x;
            pixels.y = -this.offset.y + resolutionFactor * event.y;
            
            this.pos = xy.pixelsToCoordinates(pixels);  
            this.vel.x = 0; 
            this.vel.y = 0;
            const s = this.velVecScale;               
            this.controllerPos.x = this.pos.x + s*this.vel.x; 
            this.controllerPos.y = this.pos.y + s*this.vel.y; 
            this.onMouseMoveAddition();
            drawFrame();
        }
        const controllerPixels = xy.coordinatesToPixels(this.controllerPos);
        if(this.controllerIsClicked){
            controllerPixels.x = -this.controllerOffset.x + resolutionFactor*event.x;
            controllerPixels.y = -this.controllerOffset.y + resolutionFactor*event.y;
            this.controllerPos = xy.pixelsToCoordinates(controllerPixels);
            
            this.vel.x = (this.controllerPos.x - this.pos.x)/this.velVecScale;
            this.vel.y = (this.controllerPos.y - this.pos.y)/this.velVecScale;

            drawFrame();
        }
    }
    
    onMouseUp() {                    
        this.isClicked = false;
        this.controllerIsClicked = false;
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
            const k = distance/(this.radius + particle.radius);
            this.pos.x = this.pos.x - this.radius*(1-k)*u1.x;
            this.pos.y = this.pos.y - this.radius*(1-k)*u1.y;
            particle.pos.x = particle.pos.x + particle.radius*(1-k)*u1.x;
            particle.pos.y = particle.pos.y + particle.radius*(1-k)*u1.y;
        } 
    }//End of collision method
}// End of class

