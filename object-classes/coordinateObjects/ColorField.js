class ColorField { 
    constructor(props){ 
        //Specitial props
        this.mathFunction = props.mathFunction || 
            ((coor) => (coor.x**2 + coor.y**2));
        this.stepSize = props.stepSize || 30;

        this.opacity = props.opacity || .5;
        this.color = props.color || '#0af';
        //Interaction props    
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

        const horizontalSteps = Math.floor(canvas.width/this.stepSize);
        const verticalSteps = Math.ceil(canvas.height/this.stepSize);
        layer.save();
        layer.globalAlpha = this.opacity;
        layer.lineWidth = this.stepSize;

        const topLeftCoordinates = xy.pixelsToCoordinates({x: 0, y: 0});
        const extremeValues = {
            max: this.mathFunction(topLeftCoordinates),
            min: this.mathFunction(topLeftCoordinates)
        }
        for(let i = 0; i <= horizontalSteps; i++){
            for(let j = 0; j <= verticalSteps; j++){
                const coor = xy.pixelsToCoordinates({
                    x: (i+.5)*this.stepSize, 
                    y: j*this.stepSize 
                });
                
                const fValue = this.mathFunction(coor);
                if(fValue > extremeValues.max){
                    extremeValues.max = fValue;
                }
                if(fValue < extremeValues.min){
                    extremeValues.min = fValue;
                }
            }   
        }
        const map = new FittingMap({ 
            inRange: extremeValues
        })

        for(let i = 0; i <= horizontalSteps; i++){
            for(let j = 0; j <= verticalSteps; j++){
                const coor = xy.pixelsToCoordinates({
                    x: (i+.5)*this.stepSize, 
                    y: j*this.stepSize 
                });                
                const fValue = this.mathFunction(coor);

                layer.beginPath();
                layer.strokeStyle = `hsl(${300*map.linear(fValue)}, 100%, 50%)`;  
                layer.moveTo(i*this.stepSize, j*this.stepSize);  
                layer.lineTo((i+1)*this.stepSize, j*this.stepSize);      
                layer.stroke();                
                layer.closePath();                
            }   
        }
        layer.restore();
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