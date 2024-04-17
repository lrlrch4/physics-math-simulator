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
        const length = Math.abs(this.ending.x - this.origin.x);
        
        const sinCurve = new ParametricCurve({
            mathFunction: ((s) => {
                const fs = this.thickness*Math.sin((s-this.origin.x)*this.order*Math.PI/length);
                const pFunction = {
                    x: Math.cos(theta)*s - Math.sin(theta)*fs, 
                    y: Math.sin(theta)*s + Math.cos(theta)*fs
                }
                return pFunction 
            }),
            range: {
                start: this.origin.x, 
                end: this.origin.x + length
            } 
        })
        sinCurve.draw();
    }

    animate(){
        this.animation();
    }
}