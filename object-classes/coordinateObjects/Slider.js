class Slider { 
    constructor(props){ 
        this.origin = props.origin || {x: 0, y: 2};
        this.ending = props.ending || {x: 2, y: 2};



        this.simulation = props.simulation || (()=>{
            'simulation added'
        });
        this.animation = props.animation || (()=>{
            'simulation added'
        })

        this.layer = 0;
        this.subObjects = [
            new CoordinatePoint({
                pos: this.origin, 
                onMouseMoveAddition: (() => { 
                    this.subObjects[0].pos.y = this.origin.y
                })
            }),
            new Line({
                origin: this.origin, 
                ending: this.ending, 
                lineWidth: 5 
            })
        ];
    }

    //Graphics props
    draw(){
        this.subObjects.forEach( element => element.draw() )
        
    }

    rotate(){}

    applyMatrixTransformation(){}

    //Interaction props
    onMouseDown(event){
    }

    onMouseMove(){
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
    showTrace(){
    }
}