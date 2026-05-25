const fs = require('fs');

let content = fs.readFileSync('./js/data.js', 'utf8');
content = content.replace(/const CLASS_DATA/g, 'var CLASS_DATA').replace(/const WISHES_DATA/g, 'var WISHES_DATA').replace(/const QUESTIONS_DATA/g, 'var QUESTIONS_DATA').replace(/const GALLERY_URLS/g, 'var GALLERY_URLS');

// Safely evaluate the arrays
eval(content);

// Remove the duplicate Trương Minh Khoa (ID 3 appears twice, one with name missing the title but having Long's data, wait what did the replace do?)
// Let's just fix the array programmatically
let cleanClassData = [];
for (let user of CLASS_DATA) {
    // wait, what does ID 2 (Long) look like right now in the file?
}
// Actually, let's just use string replacement on the file because JSON.stringify will lose variable names and formatting (and `WISHES_DATA`).
