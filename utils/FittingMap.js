class FittingMap { 
    constructor(props) {
        this.inRange = props.inRange,
        this.outRange = props.outRange
    }

    linear(value){
        const slope = (this.outRange.max - this.outRange.min)/(this.inRange.max - this.inRange.min);
        const bias = this.outRange.min - slope*this.inRange.min;

        return slope*value + bias;
    }
}
