class EmptyObject{
    constructor(props){
        this.animation = props.animation || (() => {});
        this.simulation = props.simulation || (() => {});
    }

    //Graphics props
    draw(){}

    rotate(){}

    applyMatrixTransformation(){

    }

    //Interaction props
    onMouseDown(){

    }

    onMouseMove(){

    }

    onMouseUp(){

    }

    //Animation props
    animate(){

    }

    simulate(){

    }
    showTrace(){
        
    }
}