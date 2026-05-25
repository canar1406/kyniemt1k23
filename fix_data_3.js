const fs = require('fs');
let content = fs.readFileSync('./js/data.js', 'utf8');

const questionsDataMatch = content.match(/const QUESTIONS_DATA = \[[\s\S]*?\];/g);
if (questionsDataMatch && questionsDataMatch.length > 1) {
    content = content.replace(questionsDataMatch[0], '');
}

content = content.replace(/\/\/ data\.js - Auto-generated from plain-tho\.txt[\r\n]+(?=\/\/ data\.js)/, '');

content = content.replace(/extraFact: "Kỷ lục chịu đựng: 1000 ngày không gục ngã!",\r?\n\s*birthday: "1",\r?\n\s*extraFact: "Kỷ lục chịu đựng: 1000 ngày không gục ngã!",\r?\n\s*birthday: "1",/g, 'extraFact: "Kỷ lục chịu đựng: 1000 ngày không gục ngã!",\n        birthday: "1",');

const khoaMatch = content.match(/\{\r?\n\s*id: 3,\r?\n\s*name: "Trương Minh Khoa"[\s\S]*?subImgs: \[.*?\]\r?\n\s*\},\r?\n\s*\{\r?\n\s*id: 3,\r?\n\s*name: "Trương Minh Khoa"[\s\S]*?subImgs: \[.*?\]\r?\n\s*\}/g);
if (khoaMatch) {
    const goodKhoa = `{
        id: 3,
        name: "Trương Minh Khoa",
        title: "Vua Chạy Deadline Phút 89",
        fact: "Luôn bắt đầu làm bài tập nhóm lúc 11h55 đêm trước ngày nộp nhưng sáng hôm sau vẫn thuyết trình trôi chảy như chưa có gì xảy ra.",
        extraFact: "Tốc độ nộp bài: 0.01 giây trước deadline.",
        birthday: "08/10",
        voucher: "HEAKY#80142026",
        mainImg: "https://picsum.photos/seed/main_2/400/400",
        subImgs: ["https://picsum.photos/seed/sub_2_1/200/200", "https://picsum.photos/seed/sub_2_2/200/200", "https://picsum.photos/seed/sub_2_3/200/200"]
    }`;
    content = content.replace(khoaMatch[0], goodKhoa);
}

fs.writeFileSync('./js/data.js', content, 'utf8');
console.log('Cleaned up data.js');
