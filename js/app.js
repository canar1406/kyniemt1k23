// app.js

class App {
    constructor() {
        this.stages = {
            'intro-stage': document.getElementById('intro-stage'),
            'game1-stage': document.getElementById('game1-stage'),
            'game2-stage': document.getElementById('game2-stage'),
            'farewell-stage': document.getElementById('farewell-stage')
        };
        
        this.currentStage = 'intro-stage';
        
        // Bind "Bắt Đầu" button
        this.btnStart = document.getElementById('btn-start');
        this.btnStart.addEventListener('click', () => this.startGame());

        // Autoplay audio on first user interaction anywhere on the page
        document.body.addEventListener('click', () => {
            if (typeof audioManager !== 'undefined' && !audioManager.isPlaying) {
                audioManager.start();
            }
        }, { once: true });

        // Phím điều hướng cho intro
        document.addEventListener('keydown', (e) => {
            if (this.currentStage === 'intro-stage' && e.key === 'ArrowRight') {
                this.startGame();
            }
        });

        // Khởi tạo hiệu ứng GSAP cho màn hình chính
        this.initIntroAnimation();
    }

    initIntroAnimation() {
        if (typeof gsap !== 'undefined') {
            const title = document.querySelector('.intro-title');
            const btn = document.getElementById('btn-start');
            
            // Nếu có class text-pop-up-top của CSS cũ, GSAP vẫn sẽ đè lên inline style
            gsap.from(title, {
                y: -80,
                opacity: 0,
                duration: 1.5,
                ease: "bounce.out"
            });
            
            gsap.from(btn, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.5,
                ease: "back.out(1.7)"
            });
        }
    }

    startGame() {
        audioManager.start();
        this.goToStage('game1-stage');
    }

    goToStage(stageId) {
        if (stageId === 'farewell-stage') {
            this.triggerExplosiveTransition(() => {
                this.executeGoToStage(stageId);
            });
        } else {
            this.executeGoToStage(stageId);
        }
    }

    executeGoToStage(stageId) {
        // Handle bg-overlay
        const overlay = document.getElementById('bg-overlay');
        if (overlay) {
            if (stageId === 'intro-stage' || stageId === 'farewell-stage') {
                overlay.classList.remove('active');
            } else {
                overlay.classList.add('active');
            }
        }

        // Hide all
        Object.values(this.stages).forEach(stage => {
            stage.classList.remove('active');
        });

        // Show target
        this.stages[stageId].classList.add('active');
        this.currentStage = stageId;
        this.initStageLogic(stageId);
    }

    triggerExplosiveTransition(callback) {
        if (typeof gsap === 'undefined' || typeof CLASS_DATA === 'undefined') {
            callback();
            return;
        }

        // Tạo màn chớp trắng và overlay chứa ảnh bay
        const flashOverlay = document.createElement('div');
        flashOverlay.style.position = 'fixed';
        flashOverlay.style.top = 0; flashOverlay.style.left = 0;
        flashOverlay.style.width = '100vw'; flashOverlay.style.height = '100vh';
        flashOverlay.style.background = 'white';
        flashOverlay.style.zIndex = 9999;
        flashOverlay.style.opacity = 0;
        flashOverlay.style.pointerEvents = 'none';

        const imgOverlay = document.createElement('div');
        imgOverlay.style.position = 'fixed';
        imgOverlay.style.top = 0; imgOverlay.style.left = 0;
        imgOverlay.style.width = '100vw'; imgOverlay.style.height = '100vh';
        imgOverlay.style.zIndex = 9998;
        imgOverlay.style.pointerEvents = 'none';
        imgOverlay.style.overflow = 'hidden';

        document.body.appendChild(imgOverlay);
        document.body.appendChild(flashOverlay);

        const timeline = gsap.timeline({
            onComplete: () => {
                callback(); // Switch to farewell stage
                gsap.to(flashOverlay, { opacity: 0, duration: 1.5, delay: 0.5, onComplete: () => {
                    flashOverlay.remove();
                    imgOverlay.remove();
                }});
            }
        });

        // Bơm hình ảnh dồn dập
        const numImages = 40;
        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            // Random hình ảnh từ CLASS_DATA
            const randomPerson = CLASS_DATA[Math.floor(Math.random() * CLASS_DATA.length)];
            img.src = randomPerson.mainImg;
            img.style.position = 'absolute';
            img.style.width = '200px';
            img.style.height = '200px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '15px';
            img.style.left = `${Math.random() * 80 + 10}vw`;
            img.style.top = `${Math.random() * 80 + 10}vh`;
            img.style.transform = 'translate(-50%, -50%) scale(0) rotate(0deg)';
            img.style.opacity = 0;
            img.style.boxShadow = '0 0 20px rgba(255,255,255,0.5)';
            imgOverlay.appendChild(img);

            timeline.to(img, {
                opacity: 1,
                scale: Math.random() * 1.5 + 1,
                rotation: (Math.random() - 0.5) * 90,
                duration: 0.3,
                ease: "back.out(2)"
            }, i * 0.05); // Bắn liên tục mỗi 0.05s
        }

        // Đoạn nổ trắng xóa
        timeline.to(flashOverlay, { opacity: 1, duration: 0.2, ease: "power4.in" }, "-=0.2");
    }

    initStageLogic(stageId) {
        if (stageId === 'game1-stage') {
            game1.start();
        } else if (stageId === 'game2-stage') {
            game2.start();
        } else if (stageId === 'farewell-stage') {
            farewell.switchToKhoiMode();
        }
    }
}

const app = new App();
