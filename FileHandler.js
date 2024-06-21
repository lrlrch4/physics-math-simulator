//FileHandler.js
const path = require('path');
const fs = require('fs');

class FileHandler {
    constructor(props){
        this.dirName = __dirname;

        this.projectPath = path.dirname(__dirname);
        this.projectName = path.basename(__dirname);

        this.folder = props.folder;

        this.folderPath = path.join(
            this.projectPath, 
            this.projectName, 
            this.folder
        );

        this.folderFiles = fs.readdirSync(this.folderPath).
            filter( file => file.endsWith('.js'));

        this.folderProps = {
            name: this.folder, 
            path: this.folderPath, 
            files: this.folderFiles
        }    
    }

    htmlScripts(){
        const scripts = this.folderProps.files.map( (element, index) => { 
            return `<script src= ${this.folder}/${element}></script>`
        })

        return scripts;
    }

    handleFiles(req, res){     
        this.folderProps.files.forEach( (element, index) => {
            if(req.url === '/' + this.folderProps.name + `/${element}`){
                const filePath = path.join(this.folderProps.path, element);
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
}

module.exports = FileHandler;