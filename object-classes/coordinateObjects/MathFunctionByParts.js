class MathFunctionByParts { 
    constructor(props){ 
        //Graphics props
        this.mathFunctions = props.mathFunctions || [
            [((x) => (2*x)), {start: 0, end: 1}],
            [((x) => (x**2)), {start: 1, end: 2}], 
            [((x) => (Math.sin(x))), {start: 2, end: 3}] 
        ]

        //Style props
        this.color = props.color || '#0af'; 
        this.opacity = props.opacity || 1;
        this.label = props.label || '';
        this.labelSize = props.labelSize || 60;
    }

    //Graphics props
    draw(){
        const pCurves = [];
        this.mathFunctions.forEach(element => {
            const f = element[0];
            pCurves.push(
                new ParametricCurve({
                    mathFunction: ((x) => ({x: x, y: f(x)})), 
                    range: element[1], 
                    opacity: this.opacity
                })
            )
        });
        pCurves.forEach(element => element.draw());
    }

    rotate(){

    }

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

    showTrace(){

    }
}