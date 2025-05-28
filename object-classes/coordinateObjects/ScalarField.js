class ScalarField { 
    constructor(props){ 
        //Specitial props
        this.mathFunction = props.mathFunction || 
            ((coor) => (coor.x**2 + coor.y**2));
        this.domainRelation = props.domainRelation ||
            ((coor) => (0 <= coor.x & coor.x <= 1 & 0 <= coor.y & coor.y <= 1))

        this.stepSize = props.stepSize || 50;
        this.hueValue = props.hueValue || 180;
        this.saturationValue = props.saturationValue || 0;
        this.opacity = props.opacity || .75;
        this.color = props.color || '#0af';
        //Interaction props    
        this.layer = 0;
        
        this.simulation = props.simulation || (()=>{
            'simulation added'
        });
        this.animation = props.animation || (()=>{
            'animation added'
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
        
        const matrixValues = [];
        for(let i = 0; i <= horizontalSteps; i++){
            matrixValues[i] = [];
            for(let j = 0; j <= verticalSteps; j++){
                const coor = xy.pixelsToCoordinates({
                    x: (i+.5)*this.stepSize, 
                    y: j*this.stepSize 
                });                
                if(this.domainRelation(coor)){
                    matrixValues[i][j] = this.mathFunction(coor);
                }
                else {
                    matrixValues[i][j] = NaN;
                }
            }   
        }
        console.log(matrixValues)

        
        const map = new FittingMap({ 
            inRange: extremeValues
        });

        const h = this.hueValue;
        const s = this.saturationValue
        for(let i = 0; i <= horizontalSteps; i++){
            for(let j = 0; j <= verticalSteps; j++){
                const coor = xy.pixelsToCoordinates({
                    x: (i+.5)*this.stepSize, 
                    y: j*this.stepSize 
                });  
                if(this.domainRelation(coor)){
                    const fValue = this.mathFunction(coor);
                    layer.beginPath();
                    layer.strokeStyle = `hsl(${h}, ${s}%, ${100*map.linear(fValue)}%)`;  
                    layer.moveTo(i*this.stepSize, j*this.stepSize);  
                    layer.lineTo((i+1)*this.stepSize, j*this.stepSize);      
                    layer.stroke();                
                    layer.closePath();                
                }        
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