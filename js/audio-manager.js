// audio-manager.js

class AudioManager {
    constructor() {
        this.bgMusic = document.getElementById('bg-music');
        this.explosionSound = document.getElementById('sfx-explosion');
        this.netflixSound = document.getElementById('sfx-netflix');
        
        const songNames = [
            "1_cam_on_nguoi_a_thuc_cung_toi.mp3", "2_phep_mau.mp3", "3_vung_ky_uc.mp3", 
            "4_minh_cung_nhau_ong_bang.mp3", "5_chuyen_tau_thanh_xuan.mp3", "6_nu_cuoi_18_20.mp3",
            "7_tu_au.mp3", "8_co_hen_voi_thanh_xuan.mp3", "9_bau_troi_moi.mp3",
            "10_thanh_xuan_da_lab.mp3", "11_bai_ca_tuoi_tre.mp3", "12_tinh_ban_dieu_ki.mp3",
            "13_phao_hoa.mp3", "14_nho_mai_chuyen_i_nay.mp3", "15_hai_muoi_hai.mp3",
            "16_forever_say_hi.mp3", "17_say_hi_never_say_goodbye.mp3", "18_cho_em.mp3",
            "19_biet_au.mp3", "20_ruc_ro_thang_nam.mp3"
        ];
        
        this.playlist = songNames.map(name => `assets/audio/background_sound/${name}`);
        this.currentTrackIndex = 0;
        this.isPlaying = false;

        this.bgMusic.addEventListener('ended', () => this.playNextTrack());

        // Bind Music Player UI
        const playerUi = document.getElementById('music-player-ui');
        if (playerUi) {
            playerUi.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.bgMusic.pause();
                    this.isPlaying = false;
                    document.getElementById('music-disc').classList.remove('spinning');
                    document.getElementById('music-disc').classList.add('paused');
                } else {
                    if (!this.bgMusic.src || this.bgMusic.src === '' || this.bgMusic.src === window.location.href) {
                        this.start();
                    } else {
                        this.bgMusic.play().catch(e => console.log(e));
                        this.isPlaying = true;
                        document.getElementById('music-disc').classList.add('spinning');
                        document.getElementById('music-disc').classList.remove('paused');
                    }
                }
            });
        }
    }

    start() {
        if (this.isPlaying) return;
        this.playTrack(0);
        this.isPlaying = true;
    }

    playTrack(index) {
        this.currentTrackIndex = index;
        this.bgMusic.src = this.playlist[this.currentTrackIndex];
        this.bgMusic.load();
        this.bgMusic.play().catch(e => console.log("Audio autoplay prevented", e));
        this.bgMusic.volume = 1.0;

        // Update UI
        const trackNameUi = document.getElementById('music-track-name');
        if (trackNameUi) {
            let name = this.playlist[this.currentTrackIndex].split('/').pop().replace('.mp3', '').replaceAll('_', ' ');
            // capitalize
            name = name.replace(/\b\w/g, l => l.toUpperCase());
            trackNameUi.innerText = name;
        }
        const disc = document.getElementById('music-disc');
        if (disc) {
            disc.classList.add('spinning');
            disc.classList.remove('paused');
        }
    }

    playNextTrack() {
        let nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.playTrack(nextIndex);
    }

    fadeAudio(targetVolume, durationMs) {
        const startVolume = this.bgMusic.volume;
        const diff = targetVolume - startVolume;
        const steps = 20;
        const stepTime = durationMs / steps;
        const volumeStep = diff / steps;
        
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            let newVolume = startVolume + (volumeStep * currentStep);
            if (newVolume > 1) newVolume = 1;
            if (newVolume < 0) newVolume = 0;
            this.bgMusic.volume = newVolume;
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.bgMusic.volume = targetVolume;
            }
        }, stepTime);
    }

    playExplosion() {
        this.explosionSound.currentTime = 0;
        this.explosionSound.play().catch(e => console.log(e));
    }

    playNetflix() {
        this.netflixSound.currentTime = 0;
        this.netflixSound.play().catch(e => console.log(e));
    }
}

const audioManager = new AudioManager();
