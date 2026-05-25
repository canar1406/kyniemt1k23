const fs = require('fs');
const file = 'c:/Users/Heavietnam/Desktop/cuối cấp 3/T1K23_Farewell_Web/js/data.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/fact: (.*?),/g, 'fact: $1,\n        extraFact: "(Chưa có thông tin bổ sung)",');

if (!content.includes('KHOI_WISHES')) {
    content += '\n\nconst KHOI_WISHES = [\n    "Chúc Đỗ Khôi luôn thành công trên con đường phía trước!",\n    "T1K23 sẽ luôn nhớ về cậu!",\n    "Cảm ơn vì đã là một phần của T1K23!",\n    "Bay cao và bay xa nhé Đỗ Khôi!",\n    "Tương lai rực rỡ đang chờ đón cậu!"\n];\n';
}

fs.writeFileSync(file, content, 'utf8');
console.log('Updated data.js');
