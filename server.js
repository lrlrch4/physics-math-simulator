const http = require('http');
const process = require('process');
const fs = require('fs');
const htmlBaseContent = require('./scripts/htmlBaseContent');
const FileHandler = require('./FileHandler');

const utilsHandler = new FileHandler({folder: 'utils'});
const sceneSetupHandler = new FileHandler({folder: 'scene-setup'});
const objectClassesHandler = new FileHandler({folder: 'object-classes'})
const cObjectsHandler = new FileHandler({folder: 'object-classes/coordinateObjects'})
const sceneHandler = new FileHandler({folder: 'scenes'})

const SCENE = process.argv[2] || 'objectTest.js';


const htmlContent = 
    htmlBaseContent + '\n' +
    utilsHandler.htmlScripts() + '\n' +
    `<script src= 'scene-setup/canvasSetup.js'></script>` + '\n' +
    objectClassesHandler.htmlScripts() + '\n' +
    cObjectsHandler.htmlScripts() + '\n' +
    `<script src = 'scene-setup/animationSetup.js'></script> \n
    <script src = 'scene-setup/animationHandlers.js'></script>` +
    `<script src = 'scenes/${SCENE}'></script>` +  '\n' + 
    `<script src = 'scene-setup/sceneExecution.js'></script>`
;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } 
    utilsHandler.handleFiles(req, res);
    sceneSetupHandler.handleFiles(req, res);
    objectClassesHandler.handleFiles(req, res);
    cObjectsHandler.handleFiles(req, res);
    sceneHandler.handleFiles(req, res);
});

fs.writeFile('./index.html', htmlContent, 'utf8', (err) => {
    if (err) {
        console.error('Error escribiendo el archivo:', err);
        return;
    }
    console.log('Archivo HTML reescrito exitosamente');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});