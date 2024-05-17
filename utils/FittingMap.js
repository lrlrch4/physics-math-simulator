class FittingMap { 
    constructor(props) {
        this.inRange = props.inRange;
        this.outRange = props.outRange || {min: 0, max: 1};
    }

    linear(value){
        const m = (this.outRange.max - this.outRange.min)/
            (this.inRange.max - this.inRange.min);
        const b = this.outRange.min - m*this.inRange.min;

        return m*value + b;
    }
}

