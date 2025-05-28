class Spring {
    constructor(props){
        //Special props
        this.origin = props.origin || {x: 0, y: 0};
        this.ending = props.ending || {x: 2, y: 0};
        this.order = props.order || 20;
        this.thickness = props.thickness || .05

        //Style props
        this.color = props.color || '#0af';

        //Animation props 
        this.animation = props.animation || (() => {
            console.log('animation added')
        });

        this.simulation = props.simulation || (() => {
            console.log('simulation added')
        })
    }

    draw(){
        const theta = Math.atan(
            (this.ending.y - this.origin.y)/(this.ending.x - this.origin.x)
        );
        const length = Math.sqrt(
            (this.ending.x - this.origin.x)**2 + (this.ending.y - this.origin.y)**2
        );
        
        const sinCurve = new ParametricCurve({
            mathFunction: ((s) => {
                const fs = this.thickness*Math.sin(s*this.order*Math.PI/length);
                const pFunction = {
                    x: this.origin.x + Math.cos(theta)*s - Math.sin(theta)*fs, 
                    y: this.origin.y +Math.sin(theta)*s + Math.cos(theta)*fs
                }
                return pFunction 
            }),
            range: {
                start: 0, 
                end: length
            }, 
            color: this.color
        })
        sinCurve.draw();
    }

    animate(){
        this.animation();
    }

    simulate(){
        this.simulation();
    }
}