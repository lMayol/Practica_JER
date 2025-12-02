import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class SplitScreenScene extends Phaser.Scene {
    constructor() {
        super('SplitScreenScene');
    }
    
    create() {

        this.gameOver = false;

        // musica del juego
        GameSettings.playMusic(this, 'gameMs');

        // sonido olas
        GameSettings.ambientSound = this.sound.add('ambientSound', {
            loop: true,
            volume: GameSettings.sfxVolume
        });
        GameSettings.ambientSound.play();

        // sonido gaviotas
        GameSettings.seagullSound = this.sound.add('seagullSound', {
            loop: true,
            volume: GameSettings.sfxVolume * 0.6
        });
        GameSettings.seagullSound.play();

        // lista de teclas permitidas
        const VALID_KEYS = [
            "A","S","D","F","G","H","J","K","L",
            "Q","W","E","R","T","Y","U","I","O","P",
            "Z","X","C","V","B","N","M"
        ];

        // generar tecla
        this.leftKey = Phaser.Utils.Array.GetRandom(VALID_KEYS);

        do {
            this.rightKey = Phaser.Utils.Array.GetRandom(VALID_KEYS);
        } while (this.rightKey === this.leftKey);

        // lanzar escenas
        this.scene.launch('LeftScene', { assignedKey: this.leftKey });
        this.scene.launch('RightScene', { assignedKey: this.rightKey });

        // pausa global
        this.isPaused = false;

        this.escKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );

        // timer global
        this.timeLeft = 90;

        this.timerText = this.add.text(
            this.scale.width / 2 - 5,
            80,
            "1:30",
            { fontSize: "48px", color: "#ffffff", fontStyle: "bold", align: "center"}
        ).setOrigin(0.5).setDepth(101).setScale(0.8);

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;

                const min = Math.floor(this.timeLeft / 60);
                const sec = this.timeLeft % 60;

                this.timerText.setText(
                    `${min}:${sec.toString().padStart(2, "0")}`
                );

                // cuando llegue a 0 fin del juego
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            },
            loop: true
        });

        this.cameras.main.setViewport(
            0,
            0,
            this.scale.width,
            this.scale.height
        );
        this.cameras.main.setScroll(0, 0);

        // barra central
        this.divider = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'barBg'
        )
        .setOrigin(0.5, 0.5)
        .setDepth(99)  
        .setScale(1);    

        this.divider.setDisplaySize(30, this.scale.height);

        // reloj
        this.reloj = this.add.image(
            this.scale.width / 2,
            80,                     
            'relojIm'
        ).setOrigin(0.5)
        .setDepth(100)
        .setScale(0.1);

    }

    update() {
        // si el juego ha terminado no hacer nada
        if (this.gameOver) return;

        if (this.escKey.isDown && !this.wasDown) {
            this.togglePause();
        }
        this.wasDown = this.escKey.isDown;
    }

    togglePause() {

        // si el juego ha terminado no permitir pausar
        if (this.gameOver) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            // pausar escenas jugables
            this.scene.pause('LeftScene');
            this.scene.pause('RightScene');

            // pausar escena controladora
            this.scene.pause('SplitScreenScene');

            // abrir menu de pausa
            this.scene.launch('PauseScene', { parent: 'SplitScreenScene' });
            this.scene.bringToTop('PauseScene');

        } else {
            // reanudar escenas jugables
            this.scene.resume('LeftScene');
            this.scene.resume('RightScene');

            // reanudar escena controladora
            this.scene.resume('SplitScreenScene');
        }
    }
    getNewKey(currentOtherKey) {
        const VALID_KEYS = [
            "A","S","D","F","G","H","J","K","L",
            "Q","W","E","R","T","Y","U","I","O","P",
            "Z","X","C","V","B","N","M"
        ];

        let newKey;
        do {
            newKey = Phaser.Utils.Array.GetRandom(VALID_KEYS);
        } while (newKey === currentOtherKey); // no repetir tecla del otro jugador

        return newKey;
    }

    changeLeftKey() {
        this.leftKey = this.getNewKey(this.rightKey);
        this.scene.get('LeftScene').setNewKey(this.leftKey);
    }

    changeRightKey() {
        this.rightKey = this.getNewKey(this.leftKey);
        this.scene.get('RightScene').setNewKey(this.rightKey);
    }

    endGame() {

        // si ya se llamo antes no repetir
        if (this.gameOver) return;
        this.gameOver = true;

        // detener timer
        if (this.timerEvent) this.timerEvent.remove();

        // pausar escenas del juego
        this.scene.pause('LeftScene');
        this.scene.pause('RightScene');

        // obtener puntuación
        const leftScore  = parseInt(this.scene.get('LeftScene').scoreLeft.text);
        const rightScore = parseInt(this.scene.get('RightScene').scoreRight.text);

        // lanzar pantalla de victoria
        this.scene.launch('VictoryScene', {
            leftScore,
            rightScore
        });

        this.scene.bringToTop('VictoryScene');

        this.scene.pause(); 
    }

}
