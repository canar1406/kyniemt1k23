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
    }

    startGame() {
        audioManager.start();
        this.goToStage('game1-stage');
    }

    goToStage(stageId) {
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
