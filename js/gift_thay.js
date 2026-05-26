// gift_thay.js

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
});

// Hàm xác nhận Sinh Nhật - Luôn trúng Thầy Trọn dù nhập gì
function verifyBirthday() {
    // Ép cứng user luôn là Thầy Trọn (id: 1)
    currentUser = CLASS_DATA.find(user => user.id === 1);
    
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
                        : "Chúc Thầy có một ngày thật vui vẻ và hạnh phúc!";

        // Đúng sinh nhật -> Ẩn Gatekeeper, Mở Hộp quà
        document.getElementById('gatekeeper-wrapper').classList.add('hidden');
        const giftWrapper = document.getElementById('gift-content-wrapper');
        giftWrapper.classList.remove('hidden');
        
        if (typeof gsap !== 'undefined') {
            gsap.from(giftWrapper, {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            });
        }
        
        // Render thông tin chung
        renderCommonInfo(currentUser);
        
        // Hiện voucher
        showNormalVoucher();
        triggerConfetti();
    }
}

function renderCommonInfo(user) {
    document.getElementById('user-name').innerText = user.name;
    document.getElementById('user-nickname').innerText = user.title;
    document.getElementById('user-wish').innerHTML = `${currentWish}<br><span style="font-size: 0.9rem; font-weight: 600; display: block; text-align: right; margin-top: 10px; opacity: 0.9;">- Tập thể T1K23</span>`;
    
    const servicesDesc = `${HEAVIETNAM_SERVICES.gemini}<br><br>Đính kèm: ${HEAVIETNAM_SERVICES.hardware}`;
    document.getElementById('heavietnam-services').innerHTML = `*Voucher bao gồm:<br>${servicesDesc}`;
}

function showNormalVoucher() {
    const normalZone = document.getElementById('normal-voucher-zone');
    
    if (normalZone) {
        normalZone.classList.remove('hidden');
        document.getElementById('voucher-code').innerText = currentUser.voucher;
    }
}

function triggerConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}
