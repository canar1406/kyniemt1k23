// gift.js

const HEAVIETNAM_SERVICES = {
    gemini: "Voucher kích hoạt Dịch vụ Google Gemini Pro / Advanced thời hạn 1 năm bảo hành chính thức bởi heavietnam server environment.",
    hardware: "Mã dịch vụ sửa chữa máy tính, bảo dưỡng phần cứng, vệ sinh PC/Laptop và khắc phục sự cố hệ thống bất kỳ lúc nào tại heavietnam studio."
};

const THANH_XUAN_BGM = [
    "assets/bgm/10_thanh_xuan_da_lab.mp3", "assets/bgm/11_bai_ca_tuoi_tre.mp3", 
    "assets/bgm/12_tinh_ban_dieu_ki.mp3", "assets/bgm/13_phao_hoa.mp3", 
    "assets/bgm/14_nho_mai_chuyen_i_nay.mp3", "assets/bgm/15_hai_muoi_hai.mp3", 
    "assets/bgm/16_forever_say_hi.mp3", "assets/bgm/17_say_hi_never_say_goodbye.mp3", 
    "assets/bgm/18_cho_em.mp3", "assets/bgm/19_biet_au.mp3", 
    "assets/bgm/1_cam_on_nguoi_a_thuc_cung_toi.mp3", "assets/bgm/20_ruc_ro_thang_nam.mp3", 
    "assets/bgm/2_phep_mau.mp3", "assets/bgm/3_vung_ky_uc.mp3", 
    "assets/bgm/4_minh_cung_nhau_ong_bang.mp3", "assets/bgm/5_chuyen_tau_thanh_xuan.mp3", 
    "assets/bgm/6_nu_cuoi_18_20.mp3", "assets/bgm/7_tu_au.mp3", 
    "assets/bgm/8_co_hen_voi_thanh_xuan.mp3", "assets/bgm/9_bau_troi_moi.mp3"
];

let currentUser = null;
let currentWish = "";

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mặc định giấu hết, chỉ hiện màn hình check sinh nhật
    document.getElementById('gift-content-wrapper').classList.add('hidden');
    document.getElementById('gatekeeper-wrapper').classList.remove('hidden');
    
    document.getElementById('btn-verify-bday').addEventListener('click', verifyBirthday);
    document.getElementById('btn-verify-pin').addEventListener('click', verifyNetflixPin);
});

// Hàm xác nhận Sinh Nhật
function verifyBirthday() {
    const bdayInput = document.getElementById('verify-birthday').value.trim();
    
    if (bdayInput === '1') {
        // Bypass for testing - default to first user
        currentUser = CLASS_DATA[0];
    } else {
        // Search globally by birthday instead of URL ID!
        currentUser = CLASS_DATA.find(user => user.birthday === bdayInput);
    }
    
    if(currentUser) {
        // Phát ngẫu nhiên nhạc thanh xuân
        const bgmPlayer = document.getElementById('gift-bgm');
        if (bgmPlayer) {
            const randomSong = THANH_XUAN_BGM[Math.floor(Math.random() * THANH_XUAN_BGM.length)];
            bgmPlayer.src = randomSong;
            bgmPlayer.play().catch(e => console.log("Không thể tự động phát nhạc:", e));
        }

        // Tìm lời chúc
        const memberIndex = CLASS_DATA.findIndex(user => user.id === currentUser.id);
        currentWish = typeof WISHES_DATA !== 'undefined' && WISHES_DATA[memberIndex] 
                        ? WISHES_DATA[memberIndex] 
                        : "Chúc bạn có một tương lai rực rỡ và thành công!";

        // Đúng sinh nhật -> Ẩn Gatekeeper, Mở Hộp quà
        document.getElementById('gatekeeper-wrapper').classList.add('hidden');
        document.getElementById('gift-content-wrapper').classList.remove('hidden');
        
        // Render thông tin chung
        renderCommonInfo(currentUser);
        
        // Nhánh logic kiểm tra Ánh Ngọc (hoặc ngày sinh 29/03)
        if(currentUser.is_special || bdayInput === "29/03") {
            setupNetflixGate();
        } else {
            showNormalVoucher();
            triggerConfetti();
        }
    } else {
        alert("Sai ngày sinh hoặc không tìm thấy! Vui lòng nhập đúng định dạng DD/MM.");
    }
}

function renderCommonInfo(user) {
    document.getElementById('user-name').innerText = user.name;
    document.getElementById('user-nickname').innerText = user.title;
    document.getElementById('user-wish').innerHTML = `${currentWish}<br><span style="font-size: 0.9rem; font-weight: 600; display: block; text-align: right; margin-top: 10px; opacity: 0.9;">- Kmin - BNga</span>`;
    
    if (user.is_special) {
        document.getElementById('heavietnam-services').innerHTML = `*Voucher bao gồm:<br><b>TẤT CẢ DỊCH VỤ CỦA HEAVN</b>`;
    } else {
        const servicesDesc = `${HEAVIETNAM_SERVICES.gemini}<br><br>Đính kèm: ${HEAVIETNAM_SERVICES.hardware}`;
        document.getElementById('heavietnam-services').innerHTML = `*Voucher bao gồm:<br>${servicesDesc}`;
    }
}

function showNormalVoucher() {
    const normalZone = document.getElementById('normal-voucher-zone');
    const netflixZone = document.getElementById('netflix-gate-zone');
    
    normalZone.classList.remove('hidden');
    netflixZone.classList.add('hidden');
    
    document.getElementById('voucher-code').innerText = currentUser.voucher;
}

function setupNetflixGate() {
    const normalZone = document.getElementById('normal-voucher-zone');
    const netflixZone = document.getElementById('netflix-gate-zone');
    
    normalZone.classList.add('hidden');
    netflixZone.classList.remove('hidden');
}

// Hàm được gọi khi Ánh Ngọc nhập PIN Netflix
function verifyNetflixPin() {
    const pin = document.getElementById('netflix-pin').value.trim();
    if(pin === "2903" || pin === "1") {
        triggerRomanticTransformation();
    } else {
        alert("Mã PIN không đúng nghen!");
    }
}

// Transform Ánh Ngọc Theme
function triggerRomanticTransformation() {
    // Phát âm thanh
    const netflixAudio = document.getElementById('sfx-netflix');
    if (netflixAudio) {
        netflixAudio.currentTime = 0;
        netflixAudio.volume = 1;
        netflixAudio.play().catch(e => console.log(e));
        
        // Cắt cái tiếng "ù ù" (bass rumble) kéo dài của file âm thanh sau 1.5s
        setTimeout(() => {
            let vol = 1;
            const fade = setInterval(() => {
                vol -= 0.1;
                if(vol <= 0) {
                    clearInterval(fade);
                    netflixAudio.pause();
                } else {
                    netflixAudio.volume = vol;
                }
            }, 30);
        }, 1500);
    }
    
    // Ẩn nội dung để chuẩn bị đổi theme
    document.getElementById('gift-content-wrapper').style.transition = 'opacity 0.4s ease';
    document.getElementById('gift-content-wrapper').style.opacity = 0;

    setTimeout(() => {
        // Đổi Theme
        document.body.classList.add('romantic-pink-bg');
        
        const wrapper = document.getElementById('gift-content-wrapper');
        wrapper.classList.add('romantic-pink-card');
        wrapper.style.opacity = 1;
        
        // Ẩn Gate Netflix
        document.getElementById('netflix-gate-zone').classList.add('hidden');
        
        // Cập nhật lời chúc riêng
        const newWish = `<div style="line-height: 1.6; font-size: clamp(0.9rem, 4vw, 1.1rem); text-align: justify; padding: 0 10px; overflow-y: auto; max-height: 55vh; display: flex; flex-direction: column; gap: 12px; margin-bottom: 10px;">
            <p style="margin: 0;">Hong biết viết gì nữa. Nhưng mà tích cực lên nha, tui biết trong giai đoạn này có rất nhiều áp lực từ những cuộc thi nhưng mà nhớ là phải tích cực lên nha.</p>
            <p style="margin: 0;">Với tui nghĩ mấy tài liệu tui gửi nhớ xem qua nha, thiệt ra là lựa kỹ lắm mới gửi, nên có gì xem qua chắc là sẽ dùng tới đó.</p>
            <p style="margin: 0;">Với tui cũng biết dạo này thi cử áp lực cũng nhiều, lỡ hôm nào mệt quá mà tui có vô tình gửi tài liệu hay gì đó thì cho tui xin lỗi tại không biết :( Nếu có vậy thiệt thì nhớ nói để tui không gửi nữa.</p>
            <p style="margin: 0;">Với thật sự hy vọng là có thể giúp gì đó thôi chứ cũng không có dám có 'tư tâm' nên là nếu coi thấy oke thì dùng nha.</p>
            <p style="margin: 0;">Nếu hôm nào mệt quá có thể nghe nhạc hoặc cần người tâm sự thì.... cũng không dám nói là có thể.. tâm sự hay giúp được gì nhưng mà nếu thật sự không tìm được người nào khác thì tui vẫn sẵn lòng ngồi nghe.</p>
            <p style="margin: 0;">Cuối cùng thì đừng áp lực bản thân quá dù sắp tới có nhiều cuộc thi nhưng cố lên nha.</p>
        </div>
        <div style="font-size: 1.1rem; font-weight: 700; text-align: right; color: #fff;">- HeaVN</div>`;
        document.getElementById('user-wish').innerHTML = newWish;
        
        // Kích hoạt hạt rơi trái tim
        triggerHeartsConfetti();
        
        // Bơm Text Mật vào HTML (In đen bình thường)
        const romanticZone = document.getElementById('romantic-zone');
        romanticZone.classList.remove('hidden');
        romanticZone.innerHTML = `
            <div style="margin-top: 20px; background: rgba(255, 255, 255, 0.95); padding: 20px 15px; border-radius: 12px; border: 2px dashed #e55039; position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #e55039; color: white; padding: 4px 15px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">🎁 VOUCHER DÀNH CHO BẠN 🎁</div>
                <p style="font-weight: bold; font-size: 1.15rem; color:#e55039; margin: 0; line-height: 1.4; text-align: center;">${currentUser.voucher}</p>
            </div>
        `;
        
        // Chèn vào ngay dưới Wish
        wrapper.insertBefore(romanticZone, document.getElementById('heavietnam-services'));
        
        // Kích hoạt hiệu ứng rơi rơi
        startFallingIcons();
        
    }, 450); // Chuyển cảnh nhanh chóng và mượt mà hơn (450ms thay vì 2500ms)
}

// Hiệu ứng rơi ngôi sao / icon cho Ánh Ngọc
function startFallingIcons() {
    const icons = ['💖', '✨', '🌸', '💫', '⭐', '🐱', '🐈', '😻', '😽'];
    setInterval(() => {
        const el = document.createElement('div');
        el.innerText = icons[Math.floor(Math.random() * icons.length)];
        el.style.position = 'fixed';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-50px';
        el.style.fontSize = (Math.random() * 20 + 15) + 'px';
        el.style.opacity = Math.random() * 0.5 + 0.5;
        el.style.zIndex = '1';
        el.style.pointerEvents = 'none';
        
        // Animation
        const duration = Math.random() * 3000 + 3000;
        el.animate([
            { transform: `translateY(0) rotate(0deg)` },
            { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)` }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        document.body.appendChild(el);
        
        setTimeout(() => {
            el.remove();
        }, duration);
    }, 300);
}

function triggerConfetti() {
    if (window.confetti) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
}

function triggerHeartsConfetti() {
    if (window.confetti) {
        var duration = 5 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff9a9e', '#fecfef', '#ff4757', '#e84393']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff9a9e', '#fecfef', '#ff4757', '#e84393']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}
