import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class CreditsScene extends Phaser.Scene {

    constructor() {
        super('CreditsScene');
    }

    init(data) {
        this.previous = data.previous || "MenuScene";
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // fondo 
        this.add.image(0, 0, 'menuBg')
            .setOrigin(0, 0)
            .setDisplaySize(
                cx * 2, 
                cy * 2
            );

        // titulo
        this.add.image(cx + 50, cy - 350, 'creditTit')
            .setScale(0.8) 
            .setOrigin(0.5);

        // texto
        this.add.image(cx + 50, cy + 80, 'creditTex')
            .setScale(0.6) 
            .setOrigin(0.5);
        
        // pescador
        this.add.image(cx - 550, cy, 'pesc2Im')
            .setScale(0.6) // tamaño base
            .setOrigin(0.5);
        
        // boton volver
        const backBtn = this.add.image(cx + 700, cy + 300, 'btnBack')
            .setScale(0.1) // tamaño base
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        
            backBtn.on('pointerover', () => { 
            backBtn.setScale(0.14);
            });
            backBtn.on('pointerout', () => backBtn.setScale(0.1));
        
            backBtn.on('pointerdown', () => {
                this.sound.play('clickSound', { volume: GameSettings.sfxVolume });
                // Cerrar configuración
                this.scene.stop('CredtiScene');
        
                // Volver exactamente a la escena anterior
                this.scene.start(this.previous);
        });
    }
}
