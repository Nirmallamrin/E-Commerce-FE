const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function findAndReplace(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findAndReplace(filePath);
        } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
            let data = fs.readFileSync(filePath, 'utf8');
            
            // 1. Double quotes
            data = data.replace(/"http:\/\/localhost:3000([^"]*)"/g, '`${window.API_URL}$1`');
            
            // 2. Single quotes
            data = data.replace(/'http:\/\/localhost:3000([^']*)'/g, '`${window.API_URL}$1`');
            
            // 3. Backticks
            data = data.replace(/`http:\/\/localhost:3000([^`]*)`/g, '`${window.API_URL}$1`');
            
            fs.writeFileSync(filePath, data, 'utf8');
            console.log('Processed', filePath);
        }
    });
}

findAndReplace(directoryPath);
