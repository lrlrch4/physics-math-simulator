const http = require('http');
const fs = require('fs');
const path = require('path');
const process = require('process');
const htmlBaseContent = require('./scripts/htmlBaseContent');

const SCENE = process.argv[2] || 'objectTest.js';

const createFolderProps = (folder) => {
    const folderPath = path.join(projectPath, projectName, folder);
    const folderFiles = fs.readdirSync(folderPath).filter( file => file.endsWith('.js'));
    return {
        name: folder,
        path: folderPath, 
        files: folderFiles
    }
}

const handleFiles = (fileProps, req, res) => {
    fileProps.files.forEach( (element, index) => {
        if(req.url === '/' + fileProps.name + `/${element}`){
            const filePath = path.join(fileProps.path, element);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': 'text/javascript',
                });
                res.end(data);
            });
        }
    });
}

const projectPath = path.dirname(__dirname);
const projectName = path.basename(__dirname);

//Include utils 
const utilsProps = createFolderProps('utils');
const utilsScripts = utilsProps.files.map( (element, index) => { 
    return `<script src= utils/${element}></script>`
});

//Include scene-setup
const sceneSetupProps = createFolderProps('scene-setup');

//Include object-classes
const objectClassesProps = createFolderProps('object-classes');
const objectClassesScripts = objectClassesProps.files.map((element, index) => {
    return `<script src= object-classes/${element}></script>`
})

//Include object-classes/coordinateObjects
const cObjectProps = createFolderProps('object-classes/coordinateObjects');
const cObjectsScripts = cObjectProps.files.map( (element, index) => {
    return `<script src= object-classes/coordinateObjects/${element}></script>`
})

//Include scenes folder
const scenesProps = createFolderProps('scenes');

//Create de html content
const htmlContent = 
    htmlBaseContent + 
    utilsScripts +
    `<script src= 'scene-setup/canvasSetup.js'></script>` +
    objectClassesScripts +
    cObjectsScripts +
    `<script src = 'scene-setup/animationSetup.js'></script>
    <script src = 'scene-setup/animationHandlers.js'></script>` +
    `<script src = 'scenes/${SCENE}'></script>` + 
    `<script src = 'scene-setup/sceneExecution.js'></script>`
;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } 

    handleFiles(utilsProps, req, res);
    handleFiles(sceneSetupProps, req, res);
    handleFiles(objectClassesProps, req, res);
    handleFiles(cObjectProps, req, res);
    handleFiles(scenesProps, req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sever is listening on port http://localhost:${PORT}`);
});