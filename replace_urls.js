const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');
const searchString = 'https://e-commerce-be-yi97.onrender.com';
const replacementString = 'http://localhost:3000';

function findAndReplace(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    findAndReplace(filePath);
                } else if (stats.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.jsx'))) {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        if (data.includes(searchString)) {
                            const result = data.split(searchString).join(replacementString);
                            fs.writeFile(filePath, result, 'utf8', (err) => {
                                if (err) {
                                    console.error('Error writing file:', err);
                                } else {
                                    console.log(`Replaced in: ${filePath}`);
                                }
                            });
                        }
                    });
                }
            });
        });
    });
}

findAndReplace(directoryPath);
