class Vector {
    constructor(props){
        this.x = props.x;
        this.y = props.y
    }

    square(){
        return this.x**2 + this.y**2;
    }

    module(){
        return Math.sqrt(this.square());
    }

    unitary(){
        return new Vector({x: this.x/this.module(), y: this.y/this.module()});
    }

    orthogonal(){
        return new Vector({x: -this.y, y: this.x});
    }

    projectOver(b){
        const factor = (dotProduct(this, b)/dotProduct(b, b))

        return new Vector({x: factor*b.x, y: factor*b.y});
    }
}

function sumVectors(vector1, vector2){ 
    return new Vector({
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y
    })
}

function dotProduct(vector1, vector2){
    return vector1.x*vector2.x + vector1.y*vector2.y;
}

// const vector1 = new Vector({x: 60, y: 80});
// const vector2 = new Vector({x: 2, y: 1});

   
