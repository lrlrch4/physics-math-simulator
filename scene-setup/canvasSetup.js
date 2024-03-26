const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
canvas.style.width = `${windowWidth}px`;
canvas.style.height = `${windowHeight}px`;

const resolutionFactor = 2;

canvas.width = resolutionFactor * windowWidth;
canvas.height = resolutionFactor * windowHeight;

var pixelsPerUnit = 15;
var unit = Math.max(canvas.width, canvas.height)/pixelsPerUnit;

function updateCanvasSize() {
//Screen setup
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowHeight}px`;

    canvas.width = resolutionFactor * windowWidth;
    canvas.height = resolutionFactor * windowHeight;
    
    unit = Math.max(canvas.width, canvas.height)/pixelsPerUnit; 

    drawFrame();             
}