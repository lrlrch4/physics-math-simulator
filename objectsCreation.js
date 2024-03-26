const matrix = new Matrix([
    [2, 3], 
    [-1, 0]
]);
//Scene config
backgroundColor = '#000000';
unit = 300;
xy.grid = true;
// xy.origin = {x: .1*canvas.width, y: .9*canvas.height};
// xy.axisColor = 'black';
// xy.labelColor = 'black';
// xy.gridColor = 'black'

// const pointA = new CoordinatePoint({ 
//     label: 'A', 
//     color: '#0af',
//     animation: (() => {      
//         pointA.pos = {
//             x: Math.cos(t), 
//             y: Math.sin(t)
//         }
        
//         pointA.showTrace({
//             maxLength: 20
//         });
//     })
// })
// drawObjects.push(pointA);
// interactiveObjects.push(pointA);
// animatedObjects.push(pointA);


// const pointB = new CoordinatePoint({ 
//     pos: {x: -4, y: 1}, 
//     label: 'B'
// })
// drawObjects.push(pointB);
// interactiveObjects.push(pointB);

// const pointC = new CoordinatePoint({ 
//     pos: {x: 2, y: -1}, 
//     label: 'C'
// })
// drawObjects.push(pointC);
// interactiveObjects.push(pointC);



// const coordinateVector = new CoordinateVector({ 
//     ending: {x: 4, y: 3},
//     color: '#0fa', 
//     opacity: 0.5
// });
// drawObjects.push(coordinateVector);
// animatedObjects.push(coordinateVector);




// const newAxis = new NewAxis({
//     newOrigin: {x: 3, y: 2},
//     newBasis1: {x: 3, y: 1}, 
//     newBasis2: {x: -1, y: 2}
// })
// drawObjects.push(newAxis);




// const polygon = new Polygon({ 
//     vertexCoordinates: [
//         {x:  0, y:  0},
//         {x:  1, y:  0},
//         {x:  1, y:  1}, 
//         {x:  0, y:  1} 
//     ],
//     drawVertices: true
// });
// // polygon.rotate({angle: .5, from: {x: -4, y: 0}});
// drawObjects.push(polygon);
// interactiveObjects.push(...polygon.vertices)




// const rectangle = new Rectangle({
//     width: 4,
//     respectTo: 'center', 
//     drawVertices: true
// });

// drawObjects.push(rectangle);
// interactiveObjects.push(rectangle);
// interactiveObjects.push(...rectangle.vertices);




// const curve = new ParametricCurve({
//     mathFunction: ( (s) => ({x: s, y: s}) ),
//     range: {start: 0, end: 1}, 
//     opacity: 1
// });
// const transformationFunction = (coor) => ({
//     x: coor.x + Math.min(t,1)*(coor.y*Math.cos(coor.x) - coor.x),
//     y: coor.y + Math.min(t,1)*(coor.y*Math.sin(coor.x) - coor.y)
// });
// const transformationFunction2 = (coor) => ({
//     x: coor.x + (coor.y*Math.cos(t*coor.x) ),
//     y: coor.y + (coor.y*Math.sin(t*coor.x) )
// });
// curve.applyNonLinearTransformation(transformationFunction2);
// drawObjects.push(curve);
// interactiveObjects.push(curve);



// const arc = new CircleArc({ 
    //     pos: {x: 0, y: 0},
//     startAngle: 0,
//     endAngle: Math.PI/2, 
//     radius: 2
// })
// drawObjects.push(arc);
// interactiveObjects.push(arc);



// const functionByParts = new MathFunctionByParts({ 
//     mathFunctions: [
//         [((x) => (x)), {start: 0, end: 1}],
//         [((x) => (2-x)), {start: 1, end: 2}]
//     ]
// })
// drawObjects.push(functionByParts);


//Start the drawing
updateSceneSetup();
drawFrame();