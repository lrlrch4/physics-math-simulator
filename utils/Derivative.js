function derivative({
    f = (x) => (x**2), 
    x0 = 0, 
    h = 0.001
}){
    return (f(x0 + h) - f(x0))/h
}

const f = (x) => (x**3);

function gradient({
    f = (r) => (r.x**2 + r.y**2),
    r0 = {x: 0, y: 0}, 
    h = 0.001  
}){
    fx = ( f({x: r0.x + h, y: r0.y}) - f({x: r0.x, y: r0.y}) )/h;
    fy = ( f({x: r0.x, y: r0.y + h}) - f({x: r0.x, y: r0.y}) )/h;
    return {x: fx, y: fy}
}