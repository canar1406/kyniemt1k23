// game1.js

class Game1 {
    constructor() {
        this.container = document.getElementById('game1-stage');
        this.questionCard = document.querySelector('#game1-stage .question-card');
        this.questionText = document.getElementById('game1-question-text');
        this.bgImagesContainer = document.getElementById('game1-background-images');
        this.currentIndex = 0;
        this.questions = QUESTIONS_DATA;
        this.isTransitioning = false;

        // Admin Panel
        this.btnToggleAdmin = document.getElementById('btn-toggle-admin-game1');
        this.adminPanel = document.getElementById('game1-admin-panel');
        this.adminList = document.getElementById('game1-admin-list');

        if (this.btnToggleAdmin) {
            this.btnToggleAdmin.addEventListener('click', (e) => {
                e.stopPropagation(); // Ngăn click lan ra container làm đổi câu hỏi
                this.adminPanel.classList.toggle('open');
            });
        }
        this.buildAdminMenu();
    }

    buildAdminMenu() {
        if (!this.adminList) return;
        this.adminList.innerHTML = '';
        this.questions.forEach((q, index) => {
            const btn = document.createElement('button');
            btn.innerText = `Câu ${index + 1}`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.adminPanel.classList.remove('open');
                this.jumpToQuestion(index);
            });
            this.adminList.appendChild(btn);
        });
    }

    updateAdminMenu() {
        if (!this.adminList) return;
        const buttons = this.adminList.querySelectorAll('button');
        buttons.forEach((btn, index) => {
            if (index === this.currentIndex) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    start() {
        this.currentIndex = 0;
        this.isTransitioning = false;
        
        // Initial state
        this.questionCard.style.transition = 'none';
        this.questionCard.style.opacity = 1;
        this.questionCard.style.transform = 'translateY(0)';
        this.bgImagesContainer.style.transition = 'none';
        this.bgImagesContainer.style.opacity = 1;
        
        this.renderFloatImages();
        this.questionText.innerText = this.questions[this.currentIndex];
        this.updateAdminMenu();
        
        // Setup event listener
        this.handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') this.nextQuestion();
            if (e.key === 'ArrowLeft') this.prevQuestion();
        };
        this.handleClick = () => {
            this.nextQuestion();
        };
        
        document.addEventListener('keydown', this.handleKeyDown);
        this.container.addEventListener('click', this.handleClick);
    }

    stop() {
        document.removeEventListener('keydown', this.handleKeyDown);
        this.container.removeEventListener('click', this.handleClick);
    }

    startAtLast() {
        this.start();
        this.currentIndex = this.questions.length - 1;
        this.questionText.innerText = this.questions[this.currentIndex];
        this.updateAdminMenu();
    }

    jumpToQuestion(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateAdminMenu();

        this.isTransitioning = true;

        this.questionCard.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        this.questionCard.style.opacity = 0;
        this.questionCard.style.transform = 'scale(0.9)';
        
        this.bgImagesContainer.style.transition = 'opacity 0.6s ease-out';
        this.bgImagesContainer.style.opacity = 0;
        
        setTimeout(() => {
            this.questionText.innerText = this.questions[this.currentIndex];
            this.renderFloatImages();
            
            this.questionCard.style.transition = 'none';
            this.questionCard.style.transform = 'scale(1.1)';
            void this.questionCard.offsetWidth;
            
            this.questionCard.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
            this.questionCard.style.opacity = 1;
            this.questionCard.style.transform = 'scale(1)';
            
            this.bgImagesContainer.style.transition = 'opacity 0.8s ease-out';
            this.bgImagesContainer.style.opacity = 1;
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
            
        }, 600);
    }

    nextQuestion() {
        if (this.isTransitioning) return;
        this.currentIndex++;
        
        if (this.currentIndex >= this.questions.length) {
            this.stop();
            app.goToStage('game2-stage');
            return;
        }

        this.isTransitioning = true;
        this.updateAdminMenu();

        // Fade out both the CARD and the BACKGROUND IMAGES
        this.questionCard.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        this.questionCard.style.opacity = 0;
        this.questionCard.style.transform = 'translateY(-20px)';
        
        this.bgImagesContainer.style.transition = 'opacity 0.6s ease-out';
        this.bgImagesContainer.style.opacity = 0;
        
        setTimeout(() => {
            // Update content while completely invisible
            this.questionText.innerText = this.questions[this.currentIndex];
            this.renderFloatImages();
            
            // Move card to bottom secretly (no transition)
            this.questionCard.style.transition = 'none';
            this.questionCard.style.transform = 'translateY(20px)';
            
            // Force reflow so the browser registers the new position
            void this.questionCard.offsetWidth;
            
            // Fade in and slide up smoothly
            this.questionCard.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
            this.questionCard.style.opacity = 1;
            this.questionCard.style.transform = 'translateY(0)';
            
            // Fade in background images smoothly
            this.bgImagesContainer.style.transition = 'opacity 0.8s ease-out';
            this.bgImagesContainer.style.opacity = 1;
            
            // Unlock after animation finishes
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
            
        }, 600); // Wait for the fade-out to complete
    }

    prevQuestion() {
        if (this.isTransitioning) return;
        
        if (this.currentIndex <= 0) {
            this.stop();
            app.goToStage('intro-stage');
            return;
        }

        this.currentIndex--;
        this.isTransitioning = true;
        this.updateAdminMenu();

        // Fade out both the CARD and the BACKGROUND IMAGES
        this.questionCard.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        this.questionCard.style.opacity = 0;
        this.questionCard.style.transform = 'translateY(20px)'; // Trôi ngược xuống
        
        this.bgImagesContainer.style.transition = 'opacity 0.6s ease-out';
        this.bgImagesContainer.style.opacity = 0;
        
        setTimeout(() => {
            // Update content while completely invisible
            this.questionText.innerText = this.questions[this.currentIndex];
            this.renderFloatImages();
            
            // Move card to top secretly (no transition)
            this.questionCard.style.transition = 'none';
            this.questionCard.style.transform = 'translateY(-20px)'; // Chuẩn bị trôi từ trên xuống
            
            // Force reflow
            void this.questionCard.offsetWidth;
            
            // Fade in and slide down smoothly
            this.questionCard.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
            this.questionCard.style.opacity = 1;
            this.questionCard.style.transform = 'translateY(0)';
            
            // Fade in background images smoothly
            this.bgImagesContainer.style.transition = 'opacity 0.8s ease-out';
            this.bgImagesContainer.style.opacity = 1;
            
            // Unlock after animation finishes
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
            
        }, 600);
    }

    renderFloatImages() {
        this.bgImagesContainer.innerHTML = '';
        
        // Tạo pool ảnh ngẫu nhiên từ GALLERY_URLS để đảm bảo không lặp lại
        if (!this.imagePool || this.imagePool.length < 5) {
            this.imagePool = typeof GALLERY_URLS !== 'undefined' ? [...GALLERY_URLS] : [];
            for (let i = this.imagePool.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.imagePool[i], this.imagePool[j]] = [this.imagePool[j], this.imagePool[i]];
            }
        }

        // Create 5 random images
        for(let i=0; i<5; i++) {
            if (!this.imagePool || this.imagePool.length === 0) break;
            
            let img = document.createElement('img');
            img.src = this.imagePool.pop();
            
            img.className = 'float-img tumble-float flashcard-3d';
            img.decoding = 'async'; // Tránh khựng main thread khi load ảnh nặng
            img.style.willChange = 'transform, opacity'; // Ép render bằng GPU
            
            // Random position avoiding the center card
            let posX, posY;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            // Kích thước vùng cấm (rộng hơn thẻ câu hỏi một chút)
            const forbiddenWidth = 800; // 400px mỗi bên
            const forbiddenHeight = 400; // 200px mỗi bên
            
            let isOverlapping = true;
            let attempts = 0;
            
            while (isOverlapping && attempts < 50) {
                posX = Math.random() * (window.innerWidth - 200);
                posY = Math.random() * (window.innerHeight - 200);
                
                // Tâm của ảnh được tạo
                const imgCenterX = posX + 100;
                const imgCenterY = posY + 100;
                
                // Kiểm tra xem có nằm trong vùng cấm không
                if (Math.abs(imgCenterX - centerX) > forbiddenWidth/2 || 
                    Math.abs(imgCenterY - centerY) > forbiddenHeight/2) {
                    isOverlapping = false;
                }
                attempts++;
            }
            
            img.style.left = `${posX}px`;
            img.style.top = `${posY}px`;
            
            // Random delay for animation
            img.style.animationDelay = `${Math.random() * 2}s`;
            
            this.bgImagesContainer.appendChild(img);
        }
    }
}

const game1 = new Game1();
