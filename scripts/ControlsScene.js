import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class ControlsScene extends Phaser.Scene {

    constructor() {
        super('ControlsScene');
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

        // controles
        this.add.image(cx, cy, 'contIm')
            .setScale(0.7) // tamaño base
            .setOrigin(0.5);
        
        // friki
        this.add.image(cx - 650, cy, 'friIm')
            .setScale(0.6) // tamaño base
            .setOrigin(0.5);

        // boton skip
        const skipBtn = this.add.image(cx + 700, cy + 300, 'btnSkip')
            .setScale(0.2) // tamaño base
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            skipBtn.on('pointerover', () => { 
                skipBtn.setScale(0.14);
            });
            skipBtn.on('pointerout', () => skipBtn.setScale(0.1));

            skipBtn.on('pointerdown', () => {
                this.sound.play('clickSound', { volume: GameSettings.sfxVolume });
                this.scene.start('SplitScreenScene');
            });
    }  
}
