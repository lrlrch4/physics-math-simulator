class Polygon { 
    constructor(props){
        this.vertexPoints = props.vertexPoints; //list of CoordinatePoints elements
        this.isClosed = props.isClosed || false;
        this.lines = this.vertexPoints.map(() => (new Line({})));
        if(!this.isClosed){
            this.lines.pop()
        }
    }

    draw(){ 
        this.lines.forEach( (element, index, arr) => {
            const nextIndex = (index + 1) % this.vertexPoints.length;
            element.origin = this.vertexPoints[index].pos
            element.ending = this.vertexPoints[nextIndex].pos;
            element.draw();            
        })
    }//End of draw

    rotate({angle, from = {x: 0, y: 0}}){ 
        this.vertexPoints.forEach(element => element.rotate({angle, from}));
    }

    applyMatrixTransformation(matrix){ 
        this.vertexPoints.forEach(element => element.applyMatrixTransformation(matrix));
        
    }

    animate(){
        
    }
    
    onMouseDown(event) {                      

    }        
    
    onMouseMove(event) {
        
    }

    onMouseUp() {                    

    }       

}//End of class

