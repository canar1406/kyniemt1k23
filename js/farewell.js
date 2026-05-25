// farewell.js - Khôi Farewell Mode
// Hạt Khôi dùng CÙNG container và animation với background.js để hiển thị rõ ràng sắc nét

class FarewellManager {
    constructor() {
        // Dùng CÙNG galaxy-container như background.js
        this.galaxyContainer = document.getElementById('galaxy-container');
        this.khoiVideo = document.getElementById('khoi-video');
        this.btnShowVideo = document.getElementById('btn-show-video');
        
        this.isKhoiMode = false;
        this.maxParticles = 80;
        this.spawnIntervalId = null;

        // Data mặc định
        this.wishes = [];
        this.gallery = [];

        this.setupListeners();
    }

    setupListeners() {
        if(this.btnShowVideo) {
            this.btnShowVideo.addEventListener('click', () => {
                this.showVideo();
            });
        }

        if(this.khoiVideo) {
            this.khoiVideo.addEventListener('ended', () => {
                this.hideVideo();
            });
        }
    }

    getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    switchToKhoiMode() {
        this.isKhoiMode = true;
        window.isKhoiFarewell = true; // Tell background.js to stop creating new particles

        // Đổi màu nền vũ trụ thành màu tím
        const globalGalaxy = document.getElementById('global-galaxy');
        if (globalGalaxy) {
            globalGalaxy.style.background = `
                radial-gradient(ellipse at 70% 30%, rgb(41 41 41 / 35%) 0%, transparent 50%), 
                radial-gradient(ellipse at 30% 70%, rgb(0 0 0 / 35%) 0%, transparent 50%), 
                radial-gradient(ellipse at 50% 50%, rgb(57 57 57 / 25%) 0%, transparent 40%), 
                radial-gradient(ellipse at 80% 80%, rgb(18 18 18 / 20%) 0%, transparent 50%), 
                linear-gradient(135deg, #0a001f 0%, #1c0038 50%, #232323 100%)
            `;
            globalGalaxy.style.transition = 'background 2s ease';
        }

        // === XOÁ SẠCH tất cả hạt cũ từ background chính ===
        if (this.galaxyContainer) {
            this.galaxyContainer.querySelectorAll('.bg-particle').forEach(el => el.remove());
        }
        // Xoá hạt cũ trong global-particles nếu có
        const globalParticles = document.getElementById('global-particles');
        if (globalParticles) {
            globalParticles.querySelectorAll('.particle, .flashcard-3d').forEach(el => el.remove());
        }

        // Chuẩn bị data riêng cho Khôi
        const khoiData = CLASS_DATA.find(m => m.id === 31) || CLASS_DATA[CLASS_DATA.length - 1];
        this.wishes = typeof KHOI_WISHES !== 'undefined' ? KHOI_WISHES : [khoiData.fact];
        this.gallery = ["assets/farewell/1HGCM2KCU_8VCDRU.jpg", "assets/farewell/9d2930fa47d3c68d9fc2.jpg", "assets/farewell/a2f4ba37cd1e4c40150f.jpg", "assets/farewell/bd12c2f3b5da34846dcb.jpg", "assets/farewell/d4a17e56097f8821d16e.jpg", "assets/farewell/IMG_1773.JPG", "assets/farewell/IMG_3826.JPG", "assets/farewell/IMG_4137.JPG", "assets/farewell/IMG_4604.JPG", "assets/farewell/IMG_4793.JPG", "assets/farewell/IMG_4904.JPG", "assets/farewell/IMG_5637.JPG", "assets/farewell/IMG_6355.JPG", "assets/farewell/IMG_6378.JPG", "assets/farewell/IMG_6734.jpg", "assets/farewell/IMG_6862.JPG", "assets/farewell/IMG_6959.JPG", "assets/farewell/IMG_7110.JPG", "assets/farewell/Messenger_creation_758675177119326.jpeg", "assets/farewell/received_241446405617006.jpeg", "assets/farewell/received_324197677224296.jpeg", "assets/farewell/received_337623109108340.jpeg", "assets/farewell/z7861096428779_4e835ea2448a30bb89350dc40c974bb3.jpg"]; // Sử dụng bộ ảnh riêng biệt bái bai Khôi

        // Bắt đầu spawn hạt Khôi ngay (dùng CÙNG kiểu animation với background.js)
        clearInterval(this.spawnIntervalId);
        this.spawnIntervalId = setInterval(() => this.createKhoiParticle(), 400);
    }

    createKhoiParticle() {
        if (!this.galaxyContainer) return;

        // Đếm hạt hiện tại (class khoi-particle)
        const currentCount = this.galaxyContainer.querySelectorAll('.khoi-particle').length;
        if (currentCount >= this.maxParticles) return;

        const particle = document.createElement('div');
        particle.className = 'bg-particle khoi-particle'; // Dùng cùng class bg-particle để CSS giống hệt

        // Tối ưu phân bố vị trí giống background.js
        let xPos, zPos;
        for (let i = 0; i < 5; i++) {
            xPos = this.getRandomInRange(5, 95);
            zPos = this.getRandomInRange(-300, 300);
            if (!this.lastX) { this.lastX = xPos; break; }
            const xDiff = Math.abs(xPos - this.lastX);
            if (xDiff > 20 && xDiff < 75) break;
        }
        this.lastX = xPos;

        // Phân bổ đều đặn tuần tự: Ảnh -> Chữ -> Ảnh -> Chữ -> Emoji
        this.typeCounter = (this.typeCounter || 0) + 1;
        const typeIndex = this.typeCounter % 5;

        if ((typeIndex === 0 || typeIndex === 2) && this.gallery.length > 0) {
            particle.classList.add('bg-image-particle');
            const img = document.createElement('img');
            img.src = this.gallery[Math.floor(Math.random() * this.gallery.length)];
            img.classList.add('glow-image');
            particle.appendChild(img);
        } else if ((typeIndex === 1 || typeIndex === 3) && this.wishes.length > 0) {
            particle.classList.add('bg-text-particle');
            particle.textContent = this.wishes[Math.floor(Math.random() * this.wishes.length)];
            particle.style.fontSize = `${this.getRandomInRange(20, 28)}px`;
            particle.style.color = '#ffd700';
            particle.style.textShadow = '0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)';
            particle.style.fontWeight = 'bold';
        } else {
            particle.classList.add('bg-heart-particle');
            const emojis = ['😸', '😺', '😻', '😊', '😁', '😽', '😹', '🐱'];
            particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.fontSize = `${this.getRandomInRange(24, 38)}px`;
            particle.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.6)';
        }

        const initialY = -150;
        const finalY = window.innerHeight + 150;
        const duration = this.getRandomInRange(10000, 20000); // 10-20s
        const rotation = this.getRandomInRange(-30, 30);

        particle.style.left = `${xPos}%`;
        particle.style.opacity = 0;
        particle.style.transform = `translateY(${initialY}px) translateZ(${zPos}px) rotate(${rotation}deg)`;

        this.galaxyContainer.appendChild(particle);

        // requestAnimationFrame loop - Y HỆT background.js
        let startTime = null;

        const animateParticle = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            let fraction = progress / duration;
            fraction = Math.min(fraction, 1);

            if (fraction < 1) {
                const currentY = initialY + (finalY - initialY) * fraction;
                particle.style.transform = `translateY(${currentY}px) translateZ(${zPos}px) rotate(${rotation}deg)`;
                
                if (fraction < 0.1) {
                    particle.style.opacity = fraction * 10;
                } else if (fraction > 0.9) {
                    particle.style.opacity = (1 - fraction) * 10;
                } else {
                    particle.style.opacity = 1;
                }
                requestAnimationFrame(animateParticle);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        };
        requestAnimationFrame(animateParticle);
    }

    showVideo() {
        if(typeof audioManager !== 'undefined') audioManager.fadeAudio(0.2, 1000);
        if(this.btnShowVideo) {
            this.btnShowVideo.style.opacity = 0;
            this.btnShowVideo.style.pointerEvents = 'none';
        }

        // Bật overlay cho video
        const overlay = document.getElementById('bg-overlay');
        if(overlay) overlay.classList.add('active');

        setTimeout(() => {
            if(this.khoiVideo) {
                this.khoiVideo.classList.remove('hidden-video');
                this.khoiVideo.play();
            }
        }, 500);
    }

    hideVideo() {
        if(this.khoiVideo) this.khoiVideo.classList.add('hidden-video');
        if(typeof audioManager !== 'undefined') audioManager.fadeAudio(1.0, 1000);
        
        const overlay = document.getElementById('bg-overlay');
        if(overlay) overlay.classList.remove('active');
    }
}

const farewell = new FarewellManager();
