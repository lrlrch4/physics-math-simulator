class Slider { 
    constructor(props){ 
        this.origin = props.origin || {x: 0, y: 2};
        this.ending = props.ending || {x: 3, y: 2};
        this.range = props.range || {start: 0, end: 5}
        this.value = this.range.start;
 
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
                radius: 15, 
                opacity: .75, 
                color: '#3db1ff',
                onMouseMoveAddition: (() => { 
                    if(this.subObjects[0].pos.x <= this.origin.x){
                        this.subObjects[0].pos.x = this.origin.x;
                    }
                    if(this.subObjects[0].pos.x >= this.ending.x){
                        this.subObjects[0].pos.x = this.ending.x;
                    }      
                    const map = new FittingMap({
                        inRange: {min: this.origin.x, max: this.ending.x},
                        outRange: {min: this.range.start, max: this.range.end}
                    })
                    this.value = map.linear(this.subObjects[0].pos.x);
                })
            }),
            new Line({
                lineWidth: 6 
            })
        ];
    }

    //Graphics props
    draw(){
        const map = new FittingMap({
            inRange: {min: this.range.start, max: this.range.end},
            outRange: {min: this.origin.x, max: this.ending.x}            
        })
        this.subObjects[0].pos.x = map.linear(this.value);
        this.subObjects[0].pos.y = this.origin.y;

        this.subObjects[1].origin = this.origin;
        this.subObjects[1].ending = this.ending;

        this.subObjects.forEach(element => element.draw())        
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