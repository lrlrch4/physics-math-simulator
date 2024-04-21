class EmptyObject{
    constructor(props){
        this.animation = props.animation || (() => {
            console.log('animation added');
        });
        this.simulation = props.simulation || (() => {
            console.log('simulation added');
        });
    }

    //Graphics props
    draw(){}

    rotate(){}

    applyMatrixTransformation(){

    }

    //Interaction props
    onMouseDown(event){

    }

    onMouseMove(event){

    }

    onMouseUp(){

    }

    //Animation props
    animate(){
        this.animation();
    }

    simulate(){
        this.simulation();
    }
}//End of class