class MathFunction{
    constructor(props){
        this.f = props.f || ((x) => (x));
        this.h = props.h || .001;
    }

    derivative(){
        const df = ( (x) => ( (this.f(x + this.h) - this.f(x))/this.h) );
        return new MathFunction({f: df});
    }
}

class MathParametricFunction {
    constructor(props){
        this.f = props.f || ((s) => ({x: s, y: s}));
        this.h = props.h || .001;
    }

    derivative(){
        const df = ((s) => ({
            x: (this.f(s + this.h).x - this.f(s).x)/this.h,
            y: (this.f(s + this.h).y - this.f(s).y)/this.h
        }      
        ));
        return new MathParametricFunction({f: df});
    }
}

class MathFieldFunction{ 
    constructor(props){
        this.f = props.f || ((r) => ({x: r.x, y: r.y}));
        this.h = props.h || .001
    }
}

class MathScalarFunction{ 
    constructor(props){
        this.f = props.f || ((r) => (r.x**2 + r.y**2));
        this.h = props.h || .001
    }

    partial(v){
        if(v === 'x'){
            const df = ( (r) => (
                (this.f({x: r.x + this.h, y: r.y}) - this.f({x: r.x, y: r.y}))/this.h
            ))
            return new MathScalarFunction({f: df})
        }
        if(v === 'y'){
            const df = ( (r) => (
                (this.f({x: r.x, y: r.y + this.h}) - this.f({x: r.x, y: r.y}))/this.h
            ))
            return new MathScalarFunction({f: df})
        }
    }
}