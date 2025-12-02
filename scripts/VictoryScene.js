import Phaser from "phaser";
import { GameSettings } from "../GameSettings.js";

export class VictoryScene extends Phaser.Scene {

    constructor() {
        super("VictoryScene");
    }

    init(data) {
        this.leftScore  = data.leftScore;
        this.rightScore = data.rightScore;
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // pausar musica
        GameSettings.pauseMusic();

        // reproducir sonido de victoria
        this.sound.play('winSound', {
            volume: GameSettings.sfxVolume
        });

        // fondo transparente oscuro
        this.add.rectangle(0, 0, W, H, 0x000000, 0.5).setOrigin(0);

        // fondo
        this.add.image(W/2, H/2, 'victoryBg')
            .setOrigin(0.5)
            .setDepth(1)
            .setScale(0.5); 

        // Determinar ganador
        let leftColor  = "#ffffff";
        let rightColor = "#ffffff";

        if (this.leftScore > this.rightScore) {
            leftColor  = "#00ff00";
            rightColor = "#ff0000";
        }
        else if (this.rightScore > this.leftScore) {
            rightColor = "#00ff00";
            leftColor  = "#ff0000";
        }
        else {
            leftColor  = "#ffff00";
            rightColor = "#ffff00";
        }

        // Puntuaciones
        this.add.text(W/2 - 150, H/2 + 20, `${this.leftScore}`, {
            fontSize: "80px",
            color: leftColor,
            fontStyle: "bold"
        }).setOrigin(0.5).setDepth(2);

        this.add.text(W/2 + 150, H/2 + 20, `${this.rightScore}`, {
            fontSize: "80px",
            color: rightColor,
            fontStyle: "bold"
        }).setOrigin(0.5).setDepth(2);

        // Botón continuar → vuelve al menú
        const backBtn = this.add.image(cx + 700, cy + 300, 'btnBack')
            .setScale(0.1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        backBtn.on('pointerover', () => { 
            backBtn.setScale(0.14);
        });

        backBtn.on('pointerout', () => backBtn.setScale(0.1));

        backBtn.on('pointerdown', () => {
            this.sound.play('clickSound', { volume: GameSettings.sfxVolume });

            GameSettings.stopSfx();

            this.scene.stop("VictoryScene");
            this.scene.stop("SplitScreenScene");
            this.scene.stop("LeftScene");
            this.scene.stop("RightScene");
            
            this.scene.start("MenuScene");
        });
    }
}
