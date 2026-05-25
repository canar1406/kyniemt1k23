const fs = require('fs');
const file = 'c:/Users/Heavietnam/Desktop/cuối cấp 3/T1K23_Farewell_Web/js/data.js';
let content = fs.readFileSync(file, 'utf8');

const extraFacts = [
    "Kỷ lục chịu đựng: 1000 ngày không gục ngã!", // 1 Thầy
    "Số bàn phím đã hỏng: 5 cái.", // 2
    "Tốc độ nộp bài: 0.01 giây trước deadline.", // 3
    "Kỷ lục đi trễ: 15 lần trong 1 tháng.", // 4
    "Số lần bị bắt bài: 99 lần.", // 5
    "Tần suất ăn vặt: 5 phút/lần.", // 6
    "Kỷ lục chép bài: 3 trang/phút.", // 7
    "Khả năng buôn chuyện: Xuyên lục địa.", // 8
    "Chỉ số thân thiện: 100/10.", // 9
    "Số lần làm rơi não: Đếm không xuể.", // 10
    "Độ mặn: Vượt mức cho phép của đại dương.", // 11
    "Số lần lạc đường trong trường: 7 lần/tuần.", // 12
    "Kỷ lục ngủ trong lớp: 8 tiết/ngày.", // 13
    "Số tiền nợ canteen: Không thể thống kê.", // 14
    "Khả năng hát nhép: Đạt giải Oscar.", // 15
    "Chỉ số may mắn trong giờ kiểm tra: 0.001%.", // 16
    "Tốc độ chạy xuống căn tin: Nhanh hơn ánh sáng.", // 17
    "Số câu chuyện tình trường: Drama hơn phim Hàn.", // 18
    "Độ nhạt: Có thể dùng để bảo quản thực phẩm.", // 19
    "Số lần xin đi vệ sinh để trốn học: 50+.", // 20
    "Kỷ lục cười không kiểm soát: 3 tiếng liên tục.", // 21
    "Chỉ số sống ảo: Vượt ngàn like.", // 22
    "Số lần quên làm bài tập: Nhiều quá nhớ không nổi.", // 23
    "Tốc độ nhắn tin trong giờ: 100 từ/phút.", // 24
    "Số lần trốn lao động: Chuyên gia ẩn thân.", // 25
    "Khả năng tàng hình khi thầy cô gọi bảng: Max level.", // 26
    "Số lần tỏ tình thất bại: Tuyệt mật.", // 27
    "Độ phũ phàng: Xát muối vào tim người khác.", // 28
    "Kỷ lục ăn vụng không bị bắt: Trình độ Huyền thoại.", // 29
    "Chỉ số lầy lội: Vô cực.", // 30
    "Trùm cuối ẩn danh: Bí mật chưa từng được hé lộ!" // 31 Đỗ Khôi
];

let index = 0;
// We replace the current extraFact values
content = content.replace(/extraFact:\s*".*?"/g, (match) => {
    let fact = extraFacts[index] || "Thông tin bí mật chưa được tiết lộ!";
    index++;
    return `extraFact: "${fact}"`;
});

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully generated extraFacts!');
