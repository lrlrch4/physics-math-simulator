const http = require('http');
const fs = require('fs');
const path = require('path');
const process = require('process');
const htmlBaseContent = require('./scripts/htmlBaseContent');

const SCENE = process.argv[2] || 'whiteScene.js';

const projectPath = path.dirname(__dirname);
const projectName = path.basename(__dirname);

// Función para crear las propiedades de la carpeta
const createFolderProps = (folder) => {
    const folderPath = path.join(projectPath, projectName, folder);
    const folderFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    return {
        name: folder,
        path: folderPath,
        files: folderFiles
    }
};

// Función para manejar la carga de archivos
const handleFiles = (fileProps, req, res) => {
    fileProps.files.forEach((element) => {
        if (req.url === `/${fileProps.name}/${element}`) {
            const filePath = path.join(fileProps.path, element);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(data);
            });
        }
    });
};

// Incluye utilidades
const utilsProps = createFolderProps('utils');
const utilsScripts = utilsProps.files.map(element => `<script src="utils/${element}" defer></script>`).join('\n');

// Incluye scene-setup
const sceneSetupProps = createFolderProps('scene-setup');
const sceneSetupScripts = sceneSetupProps.files.map(element => `<script src="scene-setup/${element}" defer></script>`).join('\n');

// Incluye object-classes
const objecClassesProps = createFolderProps('object-classes');
const objectClassesScripts = objecClassesProps.files.map(element => `<script src="object-classes/${element}" defer></script>`).join('\n');

// Incluye object-classes/coordinateObjects
const cObjectProps = createFolderProps('object-classes/coordinateObjects');
const cObjectsScripts = cObjectProps.files.map(element => `<script src="object-classes/coordinateObjects/${element}" defer></script>`).join('\n');

// Incluye scenes folder
const scenesProps = createFolderProps('scenes');

// Crea el contenido HTML
const htmlContent = `
    ${htmlBaseContent}
    ${utilsScripts}
    ${sceneSetupScripts}
    ${objectClassesScripts}
    ${cObjectsScripts}
    <script src="scenes/${SCENE}" defer></script>
`;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } else {
        handleFiles(utilsProps, req, res);
        handleFiles(sceneSetupProps, req, res);
        handleFiles(objecClassesProps, req, res);
        handleFiles(cObjectProps, req, res);
        handleFiles(scenesProps, req, res);
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
