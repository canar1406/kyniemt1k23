const fs = require('fs');
const path = 'c:/Users/Heavietnam/Desktop/cuối cấp 3/T1K23_Farewell_Web/js/data.js';
let content = fs.readFileSync(path, 'utf8');

const mapping = {
    "Mai Huỳnh Duy": { title: "Cốt của mọi nhà", fact: "Ai là cốt của mọi nhà?" },
    "Chu Nguyễn Gia Huy": { title: "Mr. Ấm áp", fact: "Ai là Mr. Ấm áp - lúc nào cũng rất là ga lăng với các bạn nữ?" },
    "Nguyễn Quốc Gia Huy": { title: "Người dám sống thật", fact: "Ai là người dám sống thật?" },
    "Trương Minh Khoa": { title: "Biết tuốt", fact: "Ai là người biết tuốt - hỏi cái gì cũng biết hết trơn?" },
    "Trần Tuấn Khoa": { title: "Body builder mong manh", fact: "Ai là body builder mong manh?" },
    "Hà Minh Khôi": { title: "Người đàn ông ngại ngùng", fact: "Ai là người đàn ông ngại ngùng?" },
    "Đỗ Minh Khôi": { title: "Người con trai gương mặt không góc chết", fact: "Ai là người con trai có gương mặt không góc chết?" },
    "Bùi Gia Lộc": { title: "Mắc cười và mắc nói", fact: "Ai là người hay mắc cười và mắc nói?" },
    "Võ Nguyễn Hoàng Long": { title: "Đa năng hơn cả AI", fact: "Ai là người đa năng hơn cả AI?" },
    "Nguyễn Khánh Minh": { title: "Tổng đài 1800", fact: "Ai là tổng đài 1800?" },
    "Nguyễn Võ Tiến Minh": { title: "Lộn xộn và rối ren", fact: "Ai là người luôn lộn xộn và rối ren?" },
    "Đặng Quang Minh": { title: "Cổ tay vàng", fact: "Ai là người có cổ tay vàng?" },
    "Hà Lê Bảo Nga": { title: "Nô lệ của sự kĩ tính", fact: "Ai là nô lệ của sự kĩ tính?" },
    "Huỳnh Bảo Ngọc": { title: "Cô gái hay nặng lòng", fact: "Ai là cô gái hay nặng lòng?" },
    "Phan Lê Ánh Ngọc": { title: "Nụ cười đầy năng lượng", fact: "Ai là người có nụ cười đầy năng lượng?" },
    "Phạm Nguyễn Thanh Ngọc": { title: "Lặng lẽ và dịu êm", fact: "Ai là người lặng lẽ và dịu êm?" },
    "Nguyễn Trọng Nhân": { title: "Ồn ồn nhưng dễ vỡ", fact: "Ai là người ồn ồn nhưng dễ vỡ?" },
    "Nguyễn Đức Nhuận Phát": { title: "Con người nhiều cảm xúc", fact: "Ai là con người nhiều cảm xúc?" },
    "Đặng Trường Phát": { title: "Hài hước trong từng hành động", fact: "Ai là người hài hước trong từng hành động?" },
    "Đặng Trần Diễm Phúc": { title: "Cô giáo dạy tiếng anh", fact: "Ai là cô giáo dạy tiếng anh?" },
    "Nguyễn Hoàng Phúc": { title: "Người hay bị bully nhất 12T1", fact: "Ai là người hay bị bully nhất 12T1?" },
    "Phạm Nguyễn Ngọc Phụng": { title: "Cô nàng yêu mèo", fact: "Ai là cô nàng yêu mèo?" },
    "Nguyễn Hoàng Quốc Thắng": { title: "Bác sĩ nhiều bệnh", fact: "Ai là bác sĩ nhiều bệnh?" },
    "Phan Huỳnh Bảo Trí": { title: "Ồn ào mà ấm áp", fact: "Ai là người ồn ào mà ấm áp?" },
    "Phạm Liêu Hoàng Triều": { title: "Đỉnh kout của sự trả thù", fact: "Ai là đỉnh kout của sự trả thù?" },
    "Lê Viết Triết": { title: "Cọc cằn mà tử tế", fact: "Ai là người cọc cằn mà tử tế?" },
    "Kiều Ngọc Thủy Tiên": { title: "Trung tâm sự kiện", fact: "Ai là trung tâm sự kiện?" },
    "Ngô Khánh Phương": { title: "Sai và nhiều tình", fact: "Ai là người sai và nhiều tình?" },
    "Phạm Nhã Uyên": { title: "Overthinking giai đoạn sắp cuối", fact: "Ai là người overthinking giai đoạn sắp cuối?" },
    "Thầy Trọn": { title: "Người ba, Người thầy, Người bạn", fact: "Ai là Người ba, Người thầy, Người bạn của 12T1?" }
};

for (const [name, data] of Object.entries(mapping)) {
    const nameIdx = content.indexOf('name: "' + name + '"');
    if(nameIdx !== -1) {
        let blockStart = content.lastIndexOf('{', nameIdx);
        let blockEnd = content.indexOf('}', nameIdx);
        let block = content.substring(blockStart, blockEnd);
        
        block = block.replace(/title:\s*"[^"]+"/, 'title: "' + data.title + '"');
        block = block.replace(/fact:\s*"[^"]+"/, 'fact: "' + data.fact + '"');
        
        content = content.substring(0, blockStart) + block + content.substring(blockEnd);
    } else {
        console.log("Name not found at all: " + name);
    }
}

fs.writeFileSync(path, content, 'utf8');
console.log("Done updating titles and facts");
