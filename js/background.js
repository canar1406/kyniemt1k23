// background.js
// Kế thừa hiệu ứng Galaxy 3D từ Hea_20_11

class GalaxyBackground {
    constructor() {
        this.galaxyContainer = document.getElementById('galaxy-container');
        this.bodyElement = document.body;
        
        this.currentRotationX = 0;
        this.currentRotationY = 0;
        this.isDragging = false;
        this.previousPointerX = 0;
        this.previousPointerY = 0;
        this.ROTATION_SENSITIVITY = 0.2;
        
        this.maxParticles = 100;
        this.baseMinAnimationDuration = 10000;
        this.baseMaxAnimationDuration = 20000;
        
        this.lastParticleProps = { x: null, z: null };
        this.heartEmojis = ['💖', '✨', '🌸', '💫', '⭐'];
        
        // Lấy ảnh từ tập thể lớp (GALLERY_URLS)
        this.imageUrls = [];
        if (typeof GALLERY_URLS !== 'undefined' && GALLERY_URLS.length > 0) {
            this.imageUrls = GALLERY_URLS;
        } else if (typeof CLASS_DATA !== 'undefined') {
            this.imageUrls = CLASS_DATA.map(m => m.mainImg);
        }
    }

    init() {
        this.updateGalaxyTransform();
        
        // Mouse Events
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', () => this.handleMouseUpOrLeave());
        document.addEventListener('mouseleave', () => this.handleMouseUpOrLeave());

        // Touch Events
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        document.addEventListener('touchend', () => this.handleTouchEnd());
        document.addEventListener('touchcancel', () => this.handleTouchEnd());

        // Initial setup
        for (let i = 0; i < 80; i++) {
            this.createStar();
        }

        // Particle generator loop
        setInterval(() => {
            this.createParticle();
        }, 500);
    }

    updateGalaxyTransform() {
        this.galaxyContainer.style.transform = `rotateX(${this.currentRotationX}deg) rotateY(${this.currentRotationY}deg)`;
    }

    handleMouseDown(event) {
        this.isDragging = true;
        this.previousPointerX = event.clientX;
        this.previousPointerY = event.clientY;
    }

    handleMouseMove(event) {
        if (!this.isDragging) return;
        const deltaX = event.clientX - this.previousPointerX;
        const deltaY = event.clientY - this.previousPointerY;
        this.currentRotationY += deltaX * this.ROTATION_SENSITIVITY;
        this.currentRotationX -= deltaY * this.ROTATION_SENSITIVITY;
        this.currentRotationX = Math.max(-90, Math.min(90, this.currentRotationX));
        this.updateGalaxyTransform();
        this.previousPointerX = event.clientX;
        this.previousPointerY = event.clientY;
    }

    handleMouseUpOrLeave() {
        this.isDragging = false;
    }

    handleTouchStart(event) {
        if (event.touches.length === 1) {
            this.isDragging = true;
            this.previousPointerX = event.touches[0].clientX;
            this.previousPointerY = event.touches[0].clientY;
        }
    }

    handleTouchMove(event) {
        if (!this.isDragging || event.touches.length !== 1) return;
        const deltaX = event.touches[0].clientX - this.previousPointerX;
        const deltaY = event.touches[0].clientY - this.previousPointerY;
        this.currentRotationY += deltaX * this.ROTATION_SENSITIVITY;
        this.currentRotationX -= deltaY * this.ROTATION_SENSITIVITY;
        this.currentRotationX = Math.max(-90, Math.min(90, this.currentRotationX));
        this.updateGalaxyTransform();
        this.previousPointerX = event.touches[0].clientX;
        this.previousPointerY = event.touches[0].clientY;
    }

    handleTouchEnd() {
        this.isDragging = false;
    }

    getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    createStar() {
        const star = document.createElement('div');
        star.className = 'bg-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        const size = this.getRandomInRange(0.5, 2.5);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        this.galaxyContainer.appendChild(star);
    }

    createParticle() {
        if (window.isKhoiFarewell) return; // Stop collective particles in Khoi mode

        if (this.galaxyContainer.querySelectorAll('.bg-particle').length >= this.maxParticles) {
            return;
        }

        const particle = document.createElement('div');
        particle.className = 'bg-particle';

        let xPos, zPos;
        for (let i = 0; i < 5; i++) {
            xPos = this.getRandomInRange(5, 95);
            zPos = this.getRandomInRange(-300, 300);
            if (this.lastParticleProps.x === null) break;
            const xDiff = Math.abs(xPos - this.lastParticleProps.x);
            // Cách nhau ít nhất 20% nhưng không bắt buộc phải nhảy xa quá 75%
            if (xDiff > 20 && xDiff < 75) break;
        }
        this.lastParticleProps = { x: xPos, z: zPos };

        // Phân bổ đều đặn tuần tự: Ảnh -> Chữ -> Ảnh -> Chữ -> Emoji
        this.typeCounter = (this.typeCounter || 0) + 1;
        const typeIndex = this.typeCounter % 5;

        if ((typeIndex === 0 || typeIndex === 2) && this.imageUrls.length > 0) { 
            particle.classList.add('bg-image-particle');
            const img = document.createElement('img');
            img.src = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
            particle.appendChild(img);
        } else if ((typeIndex === 1 || typeIndex === 3) && typeof WISHES_DATA !== 'undefined') { 
            particle.classList.add('bg-text-particle');
            particle.textContent = WISHES_DATA[Math.floor(Math.random() * WISHES_DATA.length)];
            particle.style.fontSize = `${this.getRandomInRange(20, 30)}px`;
            particle.style.color = `hsl(${Math.random()*360}, 100%, 75%)`;
        } else { 
            particle.classList.add('bg-heart-particle');
            particle.innerHTML = this.heartEmojis[Math.floor(Math.random() * this.heartEmojis.length)];
            particle.style.fontSize = `${this.getRandomInRange(20, 34)}px`;
        }

        const initialY = -150;
        const finalY = window.innerHeight + 150;
        const duration = this.getRandomInRange(this.baseMinAnimationDuration, this.baseMaxAnimationDuration);
        const rotation = this.getRandomInRange(-30, 30);

        particle.style.left = `${xPos}%`;
        particle.style.opacity = 0;
        particle.style.transform = `translateY(${initialY}px) translateZ(${zPos}px) rotate(${rotation}deg)`;
        
        this.galaxyContainer.appendChild(particle);

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
}

// Start immediately
const bgGalaxy = new GalaxyBackground();
document.addEventListener('DOMContentLoaded', () => {
    bgGalaxy.init();
});
