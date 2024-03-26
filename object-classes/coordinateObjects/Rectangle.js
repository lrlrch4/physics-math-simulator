class Rectangle{ 
    constructor(props){
        this.pos = props.pos || {x: 0, y: 0};
        
        this.width = props.width || 3;
        this.height = props.height || this.width;

        this.respectTo = props.respectTo || 'top-left';
        this.color = props.color || '#0af';
        this.lineWidth = props.lineWidth || 3;

        this.vertexCoordinates = [];
        this.drawVertices = props.drawVertices || false;

        if(this.respectTo === 'top-left'){

            this.vertexCoordinates = [
                this.pos,
                {x: this.pos.x + this.width, y: this.pos.y}, 
                {x: this.pos.x + this.width, y: this.pos.y - this.height}, 
                {x: this.pos.x, y: this.pos.y - this.height}
            ]
        }

        if(this.respectTo === 'center'){

            this.vertexCoordinates = [
                {x: this.pos.x - this.width/2, y: this.pos.y + this.height/2},
                {x: this.pos.x + this.width/2, y: this.pos.y + this.height/2}, 
                {x: this.pos.x + this.width/2, y: this.pos.y - this.height/2}, 
                {x: this.pos.x - this.width/2, y: this.pos.y - this.height/2}, 
            ]         
        }
        
        if(this.respectTo === 'bottom-left'){
                  
        }
        if(this.respectTo === 'bottom-right'){
 
        }

        this.vertices = this.vertexCoordinates.map(
            (element, index) => new CoordinatePoint({
                pos: element, 
                label: `P${index}`
                })
            ) ;
    }

    draw(){ 
        ctx.strokeStyle = this.color;  // Color del contorno negro
        ctx.lineWidth = this.lineWidth;  // Ancho del contorno

        if(this.drawVertices){
            this.vertices.forEach(point => point.draw());
        }

        for (let i = 0; i < this.vertices.length; i++) {
            const origin = this.vertices[i].pos;
            const ending = this.vertices[(i + 1) % this.vertices.length].pos;

            new Line({ origin, ending }).draw();
        }        
        
    }//End of draw method
    
    
    rotate({angle, from = {x: 0, y: 0}}){ 
        this.vertices.forEach(element => element.rotate({angle, from}));        
    }

    applyMatrixTransformation(matrix){ 
        this.vertices.forEach(element => element.applyMatrixTransformation(matrix));
    }

    
    onMouseDown(event) {                     

        
    }        
    
    onMouseMove(event) {
        if(this.vertices[0].isClicked){
            this.vertices[3].pos.x = this.vertices[0].pos.x

            this.vertices[1].pos.y = this.vertices[0].pos.y
        }

        if(this.vertices[1].isClicked){
            this.vertices[2].pos.x = this.vertices[1].pos.x

            this.vertices[0].pos.y = this.vertices[1].pos.y
        }

        if(this.vertices[2].isClicked){
            this.vertices[1].pos.x = this.vertices[2].pos.x

            this.vertices[3].pos.y = this.vertices[2].pos.y
        }

        if(this.vertices[3].isClicked){
            this.vertices[0].pos.x = this.vertices[3].pos.x

            this.vertices[2].pos.y = this.vertices[3].pos.y
        }
    }

    onMouseUp() {                  
        
        drawFrame();
    }
}