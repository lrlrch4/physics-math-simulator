class BezierCubicCurve{
    constructor(props){
        this.anchorPoints = props.anchorPoints;
        this.controlPoints = [
            new CoordinatePoint({
                pos: {
                    x: (2*this.anchorPoints[0].pos.x + this.anchorPoints[1].pos.x)/3, 
                    y: (2*this.anchorPoints[0].pos.y + this.anchorPoints[1].pos.y)/3
                }, 
                color: 'white', 
                radius: 10,
            }), 
            new CoordinatePoint({
                pos: {
                    x: (this.anchorPoints[0].pos.x + 2*this.anchorPoints[1].pos.x)/3, 
                    y: (this.anchorPoints[0].pos.y + 2*this.anchorPoints[1].pos.y)/3
                }, 
                color: 'white',
                radius: 10,
            })
        ];

        this.color = props.color || '#0af';
    }

    draw(){
        const p0 = this.anchorPoints[0].pos;
        const p1 = this.controlPoints[0].pos;
        const p2 = this.controlPoints[1].pos;
        const p3 = this.anchorPoints[1].pos;

        const cubic = new ParametricCurve({
            mathFunction: ((s) => ({
                x: (1-s)**3*p0.x + 3*(1-s)**2*s*p1.x + 3*(1-s)*s**2*p2.x + s**3*p3.x,
                y: (1-s)**3*p0.y + 3*(1-s)**2*s*p1.y + 3*(1-s)*s**2*p2.y + s**3*p3.y                
            })), 
            color: this.color
        });

        const line1 = new Line({
            origin: p0, 
            ending: p1,
            color: 'white',
            opacity: .25
        })
        const line2 = new Line({
            origin: p1, 
            ending: p2, 
            color: 'white',
            opacity: .25
        })
        const line3 = new Line({
            origin: p2, 
            ending: p3,
            color: 'white',
            opacity: .25
        })
        line1.draw();
        line2.draw();
        line3.draw();

        cubic.draw();
    }
}

class BezierConcCurve{
    constructor(props){
        this.anchorPoints = props.anchorPoints;
        this.isClosed = props.isClosed || false;
        this.bezierCurves = this.anchorPoints.map((element,index, arr) => {
            const nextElement = arr[(index + 1) % arr.length];
            const bCurve = new BezierCubicCurve({
                anchorPoints: [
                    element, 
                    nextElement
                ]
            });
            return bCurve
        })

        if(!this.isClosed){
            this.bezierCurves.pop()
        }
        this.controlPoints = [];
        this.bezierCurves.forEach(element => {
            this.controlPoints.push(...element.controlPoints);
        })
    }

    draw(){
        this.bezierCurves.forEach(element => element.draw())
        this.controlPoints.forEach(element => element.draw())
    }
}