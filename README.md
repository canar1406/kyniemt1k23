# T1K23 Farewell - Thanh Xuân Rực Rỡ 🎓✨

Chào mừng đến với dự án **Kỷ Niệm T1K23**. Đây là một trang web tương tác đặc biệt được xây dựng để tri ân và lưu giữ những kỷ niệm đẹp nhất của tập thể lớp T1K23 trong 3 năm cấp 3 (1000 days).

## Tính Năng Nổi Bật 🚀

Trang web không chỉ là một album ảnh mà còn được thiết kế dưới dạng một **hành trình tương tác** với các minigame, hiệu ứng GSAP mượt mà, và hệ thống quản trị Admin chuyên nghiệp:

### 1. Game 1: Giơ ngón tay xuống (Never Have I Ever) ☝️
- Trò chơi tương tác liệt kê các câu hỏi/kỷ niệm tuổi học trò.
- Hỗ trợ tiến/lùi câu hỏi mượt mà bằng phím mũi tên hoặc click chuột.
- Hiệu ứng ảnh trôi nổi 3D làm nền siêu đẹp.
- **Bảng Admin** cho phép nhảy nhanh đến bất kỳ câu hỏi nào.

### 2. Game 2: Sự Thật Trần Trụi Về 12T1 🎁
- Hiển thị "Biệt danh" đặc trưng của từng thành viên với đếm ngược 10 giây hồi hộp.
- Khi hết giờ → kích hoạt hiệu ứng **"Hào quang nổ tung"** (Fountain Explosion) bung toả ảnh kỷ niệm.
- Mỗi thành viên nhận quà qua mã QR dẫn đến trang quà riêng biệt.
- **Bảng Admin** cho phép nhảy nhanh đến bất kỳ thành viên nào.

### 3. Góc Nhận Quà (Gift Zone) 💌
- Nhập đúng sinh nhật để nhận lời chúc riêng biệt từ Kmin và HeaVN.
- Trang quà riêng cho Thầy Trọn với lời tri ân đặc biệt.

### 4. Chia Tay Đỗ Khôi ✈️
- Chuyên mục đặc biệt gửi gắm **118 lời chúc** và dặn dò đầy yêu thương dành cho Đỗ Khôi trước khi lên đường sang Mỹ.
- Hiệu ứng mưa rơi galaxy và viền phát sáng vàng lung linh.
- Video chia tay cảm động.

### 5. Hiệu Ứng Chuyển Cảnh Bùng Nổ 💥
- Chuyển cảnh từ Game 2 sang trang Đỗ Khôi với hiệu ứng **hàng loạt ảnh tập thể bay dồn dập rồi nổ trắng xoá** cực kỳ ấn tượng.
- Được xây dựng hoàn toàn bằng GSAP Timeline.

### 6. Hệ Thống Admin Toàn Diện ⚙️
- **Điều hướng liên thông**: Phím `←` / `→` cho phép Admin di chuyển tự do giữa tất cả các giai đoạn (Intro → Game 1 → Game 2 → Farewell) và ngược lại.
- **Bảng điều khiển Âm thanh**: Điều chỉnh âm lượng nhạc nền và video độc lập, chuyển đổi linh hoạt danh sách 20 bài nhạc nền.
- **Bảng menu Admin**: Mỗi game có bảng chọn nhanh để nhảy đến câu hỏi/thành viên bất kỳ.

### 7. Trình Phát Nhạc Thanh Xuân (BGM) 🎵
- Tích hợp **20 bài hát thanh xuân** bất hủ.
- Tự động phát nhạc nền khi tương tác, chuyển bài tự động khi hết nhạc.
- Giao diện đĩa nhạc xoay tròn hiển thị tên bài hát đang phát.

## Công Nghệ Sử Dụng 💻

| Công nghệ | Mục đích |
|---|---|
| **HTML5 / CSS3** | Cấu trúc và giao diện |
| **Vanilla JavaScript** | Logic tương tác, state management |
| **GSAP 3.12** | Hiệu ứng animation mượt mà, timeline, easing |
| **Canvas Confetti** | Hiệu ứng pháo hoa, confetti |
| **CSS 3D Transforms** | Hiệu ứng lật thẻ, ảnh bay 3D |
| **Google Fonts** | Typography (Be Vietnam Pro, Dancing Script) |

## Cách Chạy (Local) 🛠️

1. Clone repository này về máy:
   ```bash
   git clone https://github.com/canar1406/kyniemt1k23.git
   ```
2. Mở terminal và chạy server:
   ```bash
   cd T1K23_Farewell_Web
   python -m http.server 8080
   ```
3. Truy cập `http://localhost:8080` trên trình duyệt.

> **Lưu ý**: Cần chạy qua HTTP server (không mở trực tiếp file HTML) để các tài nguyên âm thanh và video hoạt động đúng.

> **Video**: File video chia tay Đỗ Khôi (`assets/video/dokhoi_video.mp4`) không được push lên GitHub do dung lượng lớn. Hãy tự đặt file video vào thư mục `assets/video/` trước khi chạy.

## Cấu Trúc Thư Mục 📁

```
T1K23_Farewell_Web/
├── index.html              # Trang chính
├── gift.html               # Trang nhận quà cho học sinh
├── gift_thay.html          # Trang nhận quà cho Thầy Trọn
├── css/
│   ├── main.css            # Stylesheet chính
│   ├── animations.css      # Keyframes animation
│   └── glory_text.css      # Hiệu ứng chữ vàng golden
├── js/
│   ├── app.js              # State machine & điều hướng
│   ├── game1.js            # Logic Game 1
│   ├── game2.js            # Logic Game 2
│   ├── farewell.js         # Logic trang Đỗ Khôi
│   ├── audio-manager.js    # Quản lý âm thanh & playlist
│   ├── background.js       # Hiệu ứng nền galaxy
│   └── data.js             # Dữ liệu thành viên & câu hỏi
└── assets/
    ├── audio/              # Nhạc nền & SFX
    ├── images/             # Ảnh thành viên & gallery
    └── video/              # Video chia tay
```

---

*Được tạo ra với rất nhiều tâm huyết dành cho T1K23. Mãi nhớ về nhau nhé!* ❤️
