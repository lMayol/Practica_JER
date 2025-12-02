import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class InstructionScene extends Phaser.Scene {

    constructor() {
        super('InstructionScene');
    }

    create() {
        
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.clickSound = this.sound.add('clickSound', {
            volume: GameSettings.sfxVolume
        });

        // fondo 
        this.add.image(0, 0, 'menuBg')
            .setOrigin(0, 0)
            .setDisplaySize(
                cx * 2, 
                cy * 2
            );

        // intrucciones
        this.add.image(cx, cy, 'instIm')
            .setScale(0.8) // tamaño base
            .setOrigin(0.5);

        // abuela
        this.add.image(cx - 650, cy, 'abuIm')
            .setScale(0.6) // tamaño base
            .setOrigin(0.5);

        // boton skip    
        const skipBtn = this.add.image(cx + 700, cy + 300, 'btnSkip')
            .setScale(0.1) // tamaño base
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            skipBtn.on('pointerover', () => { 
                skipBtn.setScale(0.14);
            });
            
            skipBtn.on('pointerout', () => skipBtn.setScale(0.1));

            skipBtn.on('pointerdown', () => {
                this.sound.play('clickSound', { volume: GameSettings.sfxVolume });
                this.scene.start('ControlsScene');
            });
    }
}
