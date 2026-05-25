const fs = require('fs');
let content = fs.readFileSync('./js/data.js', 'utf8');

// Find bounds using regex to be safe
const id4Match = content.match(/[ \t]*\{\r?\n[ \t]*id: 4,/);
const id9Match = content.match(/[ \t]*\{\r?\n[ \t]*id: 9,/);

if (!id4Match || !id9Match) {
    console.log("Could not find bounds");
    process.exit(1);
}

const goodStart = content.substring(0, id4Match.index);
const goodEnd = content.substring(id9Match.index);

const replacement = `    {
        id: 4,
        name: "Nguyễn Đức Nhuận Phát",
        title: "Ông Hoàng Đi Trễ",
        fact: "Khoảng cách từ nhà đến trường chưa đầy 5 phút nhưng luôn vắt chân lên cổ chạy vào lớp vì bận... thở và ngắm cảnh.",
        extraFact: "Kỷ lục đi trễ: 15 lần trong 1 tháng.",
        birthday: "01/07",
        voucher: "HEAKY#20622026",
        mainImg: "https://picsum.photos/seed/main_3/400/400",
        subImgs: ["https://picsum.photos/seed/sub_3_1/200/200", "https://picsum.photos/seed/sub_3_2/200/200", "https://picsum.photos/seed/sub_3_3/200/200"]
    },
    {
        id: 5,
        name: "Phạm Liêu Hoàng Triều",
        title: "Thần Đồng Toán Học (Part-time)",
        fact: "Tốc độ giải phương trình cực nhanh khiến ai cũng lác mắt, nhưng toàn bấm sai máy tính hoặc nhầm dấu cộng trừ ở bước cuối cùng.",
        extraFact: "Số lần bị bắt bài: 99 lần.",
        birthday: "24/02",
        voucher: "HEAKY#90742026",
        mainImg: "https://picsum.photos/seed/main_4/400/400",
        subImgs: ["https://picsum.photos/seed/sub_4_1/200/200", "https://picsum.photos/seed/sub_4_2/200/200", "https://picsum.photos/seed/sub_4_3/200/200"]
    },
    {
        id: 6,
        name: "Phan Lê Ánh Ngọc",
        title: "Nữ Hoàng Ăn Vặt",
        fact: "Dưới hộc bàn luôn là một hệ sinh thái siêu thị mini, đầy đủ từ bánh tráng trộn, trà sữa cho đến khô gà lá chanh.",
        extraFact: "Tần suất ăn vặt: 5 phút/lần.",
        birthday: "29/03",
        voucher: "Cần gì thì nhắn tui tui tặng khỏi mua nha.",
        is_special: true,
        mainImg: "https://picsum.photos/seed/main_5/400/400",
        subImgs: ["https://picsum.photos/seed/sub_5_1/200/200", "https://picsum.photos/seed/sub_5_2/200/200", "https://picsum.photos/seed/sub_5_3/200/200"]
    },
    {
        id: 7,
        name: "Nguyễn Quốc Gia Huy",
        title: "Kẻ Hủy Diệt Cơn Buồn Ngủ",
        fact: "Có khả năng gục ngã ở mọi tư thế, trong mọi tiết học, kể cả khi giáo viên đang đứng thao giảng ngay bên cạnh.",
        extraFact: "Kỷ lục chép bài: 3 trang/phút.",
        birthday: "17/01",
        voucher: "HEAKY#23222026",
        mainImg: "https://picsum.photos/seed/main_6/400/400",
        subImgs: ["https://picsum.photos/seed/sub_6_1/200/200", "https://picsum.photos/seed/sub_6_2/200/200", "https://picsum.photos/seed/sub_6_3/200/200"]
    },
    {
        id: 8,
        name: "Lê Viết Triết",
        title: "Bộ Ngoại Giao T1K23",
        fact: "Quen mặt từ lớp trưởng các lớp kế bên cho đến cô bán căn tin, đi đến đâu trong trường cũng có người vẫy tay chào.",
        extraFact: "Khả năng buôn chuyện: Xuyên lục địa.",
        birthday: "24/06",
        voucher: "HEAKY#32112026",
        mainImg: "https://picsum.photos/seed/main_7/400/400",
        subImgs: ["https://picsum.photos/seed/sub_7_1/200/200", "https://picsum.photos/seed/sub_7_2/200/200", "https://picsum.photos/seed/sub_7_3/200/200"]
    },
`;

fs.writeFileSync('./js/data.js', goodStart + replacement + goodEnd);
console.log("Fixed!");
