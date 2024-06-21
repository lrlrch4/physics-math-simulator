const htmlBaseContent = `
<!DOCTYPE html><html>
<head>
    <title>Psi-mulator</title>
</head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>
<style>
    h1{
        color: white
    } 
    body{
        background-color: rgb(12, 12, 12);
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
    }
    canvas {
        border: 1px solid rgb(100, 100, 100);
        padding: 0;
        box-sizing: border-box;
    }
    button {
        font-size: 2vh;
        width: 3vw;
        height: 3vh;
        background-color: rgba(0, 0, 0, .2);
        color: #0af;
        border: none;
        outline: none;
        box-shadow: none;
        margin: 2px;
    }
    .buttonContainer{
        position: absolute;
        background-color: transparent;
        padding: 0;
        margin: 0;
        display: flex; 
    }
</style>
<body>
    <div class = 'buttonContainer'> 
        <button id="startButton"><i class="fas fa-play"></i></button>
        <button id="pauseButton"><i class="fas fa-pause"></i></button>
        <button id="restartButton"><i class="fas fa-redo"></i></button>       
    </div>
    <canvas id = 'canvas'></canvas>
</body>
</html>
`

module.exports = htmlBaseContent;