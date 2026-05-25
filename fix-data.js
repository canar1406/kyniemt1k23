const fs = require('fs');
const file = 'c:/Users/Heavietnam/Desktop/cuối cấp 3/T1K23_Farewell_Web/js/data.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/fact: "(.*?),\r?\n\s*extraFact: "\(Chưa có thông tin bổ sung\)",(.*?)"/g, 'fact: "$1,$2",\n        extraFact: "(Chưa có thông tin bổ sung)"');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed data.js syntax error');
