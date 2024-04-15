class axisArrow {
    constructor(props){
        //special properties
        this.origin = props.origin;
        this.ending = props.ending;

        //Style properties
        this.color = props.color || 'white';
        this.strokeWidth = props.strokeWidth || 3;
        this.sideLength = props.sideLength || 100;
        this.tipSize = props.tipSize || 10;
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
            x: this.ending.x - 1.5*r*u.x + (Math.sqrt(3)/2)*r*u.orthogonal().x,
            y: this.ending.y - 1.5*r*u.y + (Math.sqrt(3)/2)*r*u.orthogonal().y
        }            
        const pointQ = {
            x: this.ending.x - 1.5*r*u.x - (Math.sqrt(3)/2)*r*u.orthogonal().x,
            y: this.ending.y - 1.5*r*u.y - (Math.sqrt(3)/2)*r*u.orthogonal().y
        }           
        layer1.beginPath();            
        layer1.moveTo(this.ending.x, this.ending.y); 
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

class AxisCoordinates {
    constructor(props){
        //Special props
        this.origin = props.origin || {x: .5*canvas.width, y: .5*canvas.height};
        this.offset = {x: 0, y: 0}
        this.grid = props.grid || false;
        this.horizontalAxis = true;
        this.verticalAxis = true;

        //Style props
        this.axisColor = props.axisColor || 'white';
        this.labelSize = props.labelSize || 30;
        this.labelColor = props.labelColor || 'white';
        
        this.gridWidth = props.gridWidth || 1;
        this.gridOpacity = props.gridOpacity || .25;
        this.gridColor = props.gridColor || 'white';

        //Interaction props
        this.isClicked = false;
        this.layer = props.layer || 0; 
    }

    draw(){
        const xAxis = new axisArrow ({
            origin: {x: 0, y: this.origin.y},
            ending: {x: canvas.width, y: this.origin.y}, 
            color: this.axisColor
        })

        const yAxis = new axisArrow ({
            origin: {x: this.origin.x, y: canvas.height},
            ending: {x: this.origin.x, y: 0},
            color: this.axisColor
        })
        if(this.horizontalAxis){xAxis.draw()}
        if(this.verticalAxis){yAxis.draw()};
    
    //Draw horizontal labels
        const horizontalPositiveLabels = Math.ceil(
            (canvas.width - this.origin.x)/unit
            );
        const horizontalNegativeLabels = Math.ceil(
            (this.origin.x)/unit
            );
        const labelsMultiplicity = Math.ceil(
            (horizontalPositiveLabels + horizontalNegativeLabels)/20
            );

        var unitScale = 1;
        var toFixedValue = 0;

        if(unit > 500){unitScale = 4; toFixedValue = 2}
        if(unit > 3000){unitScale = 20; toFixedValue = 3}            
        const hLabelPos = { 
            x: 0,
            y: this.origin.y + this.labelSize
        }
        ctx.font = `${this.labelSize}px Couriers`;
        ctx.fillStyle = this.labelColor;                

        if(this.horizontalAxis){        
            for(let i = -unitScale*horizontalNegativeLabels; i <= unitScale*horizontalPositiveLabels; i++){
                if(i != 0 & i%labelsMultiplicity === 0){
                    hLabelPos.x = i*(1/unitScale)*unit + this.origin.x - this.labelSize;

                    if(hLabelPos.y > canvas.height){
                        hLabelPos.y = canvas.height;
                    }
                    ctx.fillText(
                        `${((1/unitScale)*i).toFixed(toFixedValue)}`,
                        hLabelPos.x,
                        hLabelPos.y
                    ); 
                }                           
            }
        }

    //Draw vertical labels
        const verticalPositiveLabels = Math.ceil(this.origin.y/unit);
        const verticalNegativeLabels = Math.ceil((canvas.height - this.origin.y)/unit);
        const vLabelPos =  { 
            x: this.origin.x - this.labelSize, 
            y: 0
        }
        if(this.verticalAxis){
            for(let i = -unitScale*verticalNegativeLabels; i < unitScale*verticalPositiveLabels; i++){                        
                if(i != 0 & i%labelsMultiplicity === 0){
                    vLabelPos.y = -i*unit*(1/unitScale) + this.origin.y + this.labelSize
                    if(vLabelPos.x < 0){
                        vLabelPos.x = 0;
                    }

                    ctx.fillText(
                        `${((1/unitScale)*i).toFixed(toFixedValue)}`, 
                        vLabelPos.x,
                        vLabelPos.y
                    );
                }
            }
        }
    //Draw grid
        if(this.grid){
            //Horizontal lines
            const gridCtx = canvas.getContext('2d');
            for(let i = -unitScale*horizontalNegativeLabels; i < unitScale*horizontalPositiveLabels; i++){
                if(i%labelsMultiplicity === 0){
                    gridCtx.save()
                    gridCtx.globalAlpha = this.gridOpacity;
                    gridCtx.beginPath();
                    gridCtx.moveTo(i*unit*(1/unitScale) + this.origin.x, 0);
                    gridCtx.lineTo(i*unit*(1/unitScale) + this.origin.x, canvas.height);
                    gridCtx.strokeStyle = this.gridColor; 
                    gridCtx.lineWidth = this.gridWidth;
                    gridCtx.stroke();
                    gridCtx.restore();
                }                           
            }

            for(let i = -unitScale*verticalNegativeLabels; i < unitScale*verticalPositiveLabels; i++){  
                if(i%labelsMultiplicity === 0){  
                    gridCtx.save()
                    gridCtx.globalAlpha = this.gridOpacity;         
                    gridCtx.beginPath();
                    gridCtx.moveTo(0,  -i*unit*(1/unitScale) + this.origin.y);
                    gridCtx.lineTo(canvas.width,  -i*unit*(1/unitScale) + this.origin.y);
                    gridCtx.strokeStyle = this.gridColor; 
                    gridCtx.lineWidth = this.gridWidth;
                    gridCtx.stroke();
                    gridCtx.restore();
                }                    
            }
        }   
    }

    //Interaction methods
    onMouseDown(event) { 
        this.offset.x = this.origin.x - resolutionFactor * event.x;
        this.offset.y = this.origin.y - resolutionFactor * event.y;             
        this.isClicked = true;
    }        

    onMouseMove(event) {
        if(this.isClicked){
            this.origin.x = this.offset.x + resolutionFactor * event.x;
            this.origin.y = this.offset.y + resolutionFactor * event.y;
            drawFrame();
        }                         
    }

    onMouseUp() {
        this.isClicked = false;            
    }

    addZoom(event){                
        if (event.deltaY > 0) {
            unit = unit*.95;
        } else {
            unit = unit*1.05;
        }   
             
    }

    //Coordinates methods    
    coordinatesToPixels(coordinates){
        return {
            x: coordinates.x*unit + this.origin.x,
            y: -coordinates.y*unit + this.origin.y
        };
    }

    pixelsToCoordiantes(pixels){
        return {
            x: ( pixels.x - this.origin.x)/unit,
            y: (-pixels.y + this.origin.y)/unit
        };
    }

    coordinatePixelUnit(unit){
        //pixels value of one coordinate unit
        const pixelFactor = this.coordinatesToPixels({x: 1, y: 0}).x - this.coordinatesToPixels({x: 0, y: 0}).x  
        return pixelFactor*unit;
    }

}//End of Axis Coordinates class