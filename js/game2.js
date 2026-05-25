// game2.js

class Game2 {
    constructor() {
        this.container = document.getElementById('game2-stage');
        this.game2Container = document.getElementById('game2-container');
        
        // Phases/States
        this.introTitle = document.getElementById('game2-intro');
        this.state12Container = document.getElementById('state12-container');
        this.state3Reveal = document.getElementById('state3-reveal');
        
        // Elements State 1 & 2
        this.factText = document.getElementById('fact-text');
        this.countdownNumber = document.getElementById('countdown-number');
        
        // Elements State 3
        this.revealMainImage = document.getElementById('reveal-main-image');
        this.subImgsContainer = document.getElementById('reveal-sub-images');
        this.revealName = document.getElementById('reveal-name');
        this.revealTitle = document.getElementById('reveal-title');
        this.btnScanQR = document.getElementById('btn-scan-qr');
        
        // Elements State 4
        this.giftModal = document.getElementById('gift-modal');
        this.qrCodeImg = document.getElementById('qr-code-img');
        this.qrTitleText = document.getElementById('qr-title-text');
        this.btnNextPerson = document.getElementById('btn-next-person');

        // Admin
        this.btnToggleAdmin = document.getElementById('btn-toggle-admin');
        this.adminPanel = document.getElementById('admin-panel');
        this.adminMemberList = document.getElementById('admin-member-list');

        this.members = CLASS_DATA;
        this.currentIndex = 0;
        this.isTimerRunning = false;
        this.timerInterval = null;

        this.setupListeners();
        this.buildAdminMenu();
    }

    setupListeners() {
        this.btnScanQR.addEventListener('click', () => {
            this.startState4Gift();
        });

        this.btnNextPerson.addEventListener('click', () => {
            this.nextPerson();
        });

        this.btnToggleAdmin.addEventListener('click', () => {
            this.adminPanel.classList.toggle('open');
        });
    }

    buildAdminMenu() {
        this.adminMemberList.innerHTML = '';
        this.members.forEach((member, index) => {
            const btn = document.createElement('button');
            btn.innerText = member.id;
            btn.title = member.name;
            btn.addEventListener('click', () => {
                this.adminPanel.classList.remove('open');
                this.jumpToPerson(index);
            });
            this.adminMemberList.appendChild(btn);
        });
    }

    updateAdminMenu() {
        const buttons = this.adminMemberList.querySelectorAll('button');
        buttons.forEach((btn, index) => {
            if (index === this.currentIndex) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    start() {
        this.currentIndex = 0;
        
        this.hideAllStates();
        if (this.introTitle) {
            this.introTitle.classList.remove('hidden');
            setTimeout(() => {
                this.introTitle.classList.add('hidden');
                this.startState1Mystery();
            }, 3000);
        } else {
            this.startState1Mystery();
        }
    }

    hideAllStates() {
        if (this.introTitle) this.introTitle.classList.add('hidden');
        this.state12Container.classList.add('hidden');
        this.state3Reveal.classList.add('hidden');
        this.giftModal.classList.add('hidden');
    }

    jumpToPerson(index) {
        clearInterval(this.timerInterval);
        
        // Smooth transition out
        this.game2Container.style.transition = 'all 0.5s ease';
        this.game2Container.style.opacity = 0;
        this.game2Container.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.currentIndex = index;
            this.startState1Mystery();
            
            // Transition back in
            this.game2Container.style.opacity = 1;
            this.game2Container.style.transform = 'scale(1)';
        }, 500);
    }

    nextPerson() {
        clearInterval(this.timerInterval);
        
        this.game2Container.style.transition = 'all 0.5s ease';
        this.game2Container.style.opacity = 0;
        this.game2Container.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.currentIndex++;
            if (this.currentIndex >= this.members.length) {
                app.goToStage('farewell-stage');
                return;
            }
            this.startState1Mystery();
            
            this.game2Container.style.opacity = 1;
            this.game2Container.style.transform = 'scale(1)';
        }, 500);
    }

    startState1Mystery() {
        this.updateAdminMenu();
        this.hideAllStates();
        
        this.state12Container.classList.remove('hidden');
        
        const member = this.members[this.currentIndex];
        this.factText.innerText = member.fact;
        
        // Clear old reveal state
        this.revealMainImage.src = '';
        this.revealMainImage.className = 'reveal-main-img'; 
        this.subImgsContainer.innerHTML = '';
        this.revealName.innerText = '';
        this.revealTitle.innerText = '';
        this.revealName.className = 'reveal-name-text';
        this.revealTitle.className = 'reveal-title-text';
        
        // Immediately start countdown
        this.startState2Countdown();
    }

    startState2Countdown() {
        this.countdownNumber.classList.remove('hidden');
        
        let count = 10;
        this.countdownNumber.innerText = count;
        this.countdownNumber.classList.add('pulse');

        this.timerInterval = setInterval(() => {
            count--;
            if (count > 0) {
                this.countdownNumber.innerText = count;
            } else {
                clearInterval(this.timerInterval);
                this.countdownNumber.classList.remove('pulse');
                this.startState3Reveal();
            }
        }, 1000);
    }


    startState3Reveal() {
        this.hideAllStates();
        this.state3Reveal.classList.remove('hidden');
        
        const member = this.members[this.currentIndex];
        
        if (typeof audioManager !== 'undefined') {
            audioManager.playExplosion();
        }

        // Main Image
        this.revealMainImage.src = member.mainImg;
        this.revealMainImage.classList.add('reveal-animate-main');

        // Sub Images
        member.subImgs.forEach((src, idx) => {
            let img = document.createElement('img');
            img.src = src;
            img.className = 'reveal-sub-img flashcard-3d';
            
            // Thuật toán hào quang: Chỉ bắn ảnh lên trên và sang hai bên, không bao giờ bắn xuống dưới
            let angle;
            if (member.subImgs.length === 1) {
                angle = Math.PI * 1.5 + (Math.random() - 0.5) * 0.5; // Bay thẳng lên trên
            } else {
                let startAngle = Math.PI * 0.8; // Trái dưới (~144 độ)
                let angleRange = Math.PI * 1.4; // Trải dài 252 độ qua đỉnh đầu sang phải dưới
                angle = startAngle + (angleRange / (member.subImgs.length - 1)) * idx + (Math.random() - 0.5) * 0.3;
            }

            let cos = Math.cos(angle);
            let sin = Math.sin(angle);
            
            // Tính khoảng cách an toàn tối thiểu (không đè ảnh chính 400x400)
            let avoidBox = 280;
            let reqDistX = Math.abs(avoidBox / cos);
            let reqDistY = Math.abs(avoidBox / sin);
            let minDistance = Math.min(reqDistX, reqDistY);
            
            // Tính khoảng cách tối đa (không văng khỏi màn hình)
            let maxTx = Math.max((window.innerWidth / 2) - 120, 300);
            let maxTy = Math.max((window.innerHeight / 2) - 120, 300);
            
            let maxDistX = Math.abs(maxTx / cos);
            let maxDistY = Math.abs(maxTy / sin);
            let maxDistance = Math.min(maxDistX, maxDistY);
            
            if (maxDistance <= minDistance) {
                maxDistance = minDistance + 10;
            }
            
            let distance = minDistance + Math.random() * (maxDistance - minDistance);
            
            let tx = cos * distance;
            let ty = sin * distance;
            let rot = (Math.random() - 0.5) * 60;

            img.style.setProperty('--tx', `${tx}px`);
            img.style.setProperty('--ty', `${ty}px`);
            img.style.setProperty('--rot', `${rot}deg`);

            this.subImgsContainer.appendChild(img);
        });

        // Name and Title
        this.revealName.innerText = member.name;
        this.revealName.classList.add('reveal-animate-text');
        
        this.revealTitle.innerText = member.title;
        this.revealTitle.classList.add('reveal-animate-text');
    }

    startState4Gift() {
        this.giftModal.classList.remove('hidden');
        
        const member = this.members[this.currentIndex];
        
        // Show Title on QR screen
        if(this.qrTitleText) {
            this.qrTitleText.innerText = member.title;
        }
        // Luôn trỏ link QR về Github Pages để điện thoại có thể truy cập được từ bất cứ đâu
        let giftUrl = 'https://canar1406.github.io/kyniemt1k23/gift.html';
        
        // Show QR
        this.qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(giftUrl)}`;
    }
}

const game2 = new Game2();
