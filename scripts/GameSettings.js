export const GameSettings = {

    musicVolume: parseFloat(localStorage.getItem("musicVolume")) ?? 0.8,
    sfxVolume: parseFloat(localStorage.getItem("sfxVolume")) ?? 0.8,

    currentMusic: null,
    ambientSound: null,
    seagullSound: null,

    playMusic(scene, key) {
        if (this.currentMusic && this.currentMusic.key === key) return;

        if (this.currentMusic) {
            this.currentMusic.stop();
        }

        this.currentMusic = scene.sound.add(key, {
            loop: true,
            volume: this.musicVolume
        });

        this.currentMusic.play();
    },

    pauseMusic() {
        if (this.currentMusic) this.currentMusic.pause();
    },

    resumeMusic() {
        if (this.currentMusic) this.currentMusic.resume();
    },

    stopSfx() {
        if (this.ambientSound) {
            this.ambientSound.stop();
            this.ambientSound = null;
        }
        if (this.seagullSound) {
            this.seagullSound.stop();
            this.seagullSound = null;
        }
    }
};
