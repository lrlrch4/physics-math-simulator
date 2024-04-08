class Polygon { 
    constructor(props){
        this.vertexCoordinates = props.vertexCoordinates;
        this.vertices = this.vertexCoordinates.map(
            (element, index) => new CoordinatePoint({
                pos: element, 
                label: `P${index}`
                })
            );

        this.drawVertices = props.drawVertices || false;
    }

    draw(){    
        if(this.drawVertices){
            this.vertices.forEach(point => point.draw());
        }

        for (let i = 0; i < this.vertices.length; i++) {
            const origin = this.vertices[i].pos;
            const ending = this.vertices[(i + 1) % this.vertices.length].pos;

            new Line({ origin, ending }).draw();
        }        
    }//End of draw

    rotate({angle, from = {x: 0, y: 0}}){ 
        this.vertices.forEach(element => element.rotate({angle, from}));
    }

    applyMatrixTransformation(matrix){ 
        this.vertices.forEach(element => element.applyMatrixTransformation(matrix));
        
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

