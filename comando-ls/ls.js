const fs = require('node:fs/promises');
const path = require('node:path');

const folder = process.argv[2] ?? '.'

async function ls(folder) {
    let files; 
    
    try {
        files = await fs.readdir(folder);
        
    } catch (error) {
        console.log(`No se pudo leer el directorio ${folder}`);
        process.exit(1);
    };


    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file);
        let stats;
        try {
            stats = await fs.stat(filePath);
        } catch (error) {
            console.log(`No se pudo leer el directorio ${folder}`);
            process.exit(1);
        };

        const isDirectory = stats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f';
        const fiseSize = stats.size;
        const fileModified = stats.mtime.toLocaleString();


        return `${fileType.padEnd(4)} ${file.padEnd(20)} ${fiseSize.toString().padStart(10)} ${fileModified}`
    });

    const filesInfo = await Promise.all(filesPromises);
    console.log(`Type ${'File Name'.padEnd(20)} ${'Size'.padStart(10)} 'Last Modified`)
    filesInfo.forEach(fileInfo => console.log(fileInfo));

    
};


ls(folder);