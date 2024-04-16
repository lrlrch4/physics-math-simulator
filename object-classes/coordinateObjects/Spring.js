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
        )
        const length = Math.sqrt(
            (this.ending.y - this.origin.y)**2 + (this.ending.x - this.origin.x)**2
        )

        const sinCurve = new ParametricCurve({
            mathFunction: ((s) => ({
                x: Math.cos(theta)*s - this.thickness*Math.sin(theta)*Math.sin(s*this.order*Math.PI/length), 
                y: Math.sin(theta)*s + this.thickness*Math.cos(theta)*Math.sin(s*this.order*Math.PI/length) 
            })),
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