import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.clickSound = this.sound.add('clickSound', {
            volume: GameSettings.sfxVolume
        });

        // musica menu
        GameSettings.playMusic(this, 'menuMs');

        // fondo 
        this.add.image(0, 0, 'menuBg')
            .setOrigin(0, 0)
            .setDisplaySize(
                cx * 2, 
                cy * 2
            );
        // logo
        this.add.image(cx, cy, 'logoBg')
            .setOrigin(0.5)
            .setScale(0.7);

        // boton de jugar
        const playBtn = this.add.image(cx + 400, cy - 200, 'btnPlay')
            .setScale(0.2)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            playBtn.on('pointerover', () => { 
                playBtn.setScale(0.24);

                this.sound.play('hoverSound', {
                    volume: GameSettings.sfxVolume,
                    detune: Phaser.Math.Between(-20, 20)
                }); 
            });

            playBtn.on('pointerout', () => playBtn.setScale(0.2));

            playBtn.on('pointerdown', () => {
                this.sound.play('clickSound', { volume: GameSettings.sfxVolume });
                this.scene.start('InstructionScene');
            });
        
        // boton de configuracion
        const congifBtn = this.add.image(cx + 400, cy - 10, 'btnOptions')
            .setScale(0.2) // tamaño base
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            congifBtn.on('pointerover', () => { 
                congifBtn.setScale(0.24);

                this.sound.play('hoverSound', {
                    volume: GameSettings.sfxVolume,
                    detune: Phaser.Math.Between(-20, 20)
                }); 
            });
            congifBtn.on('pointerout', () => congifBtn.setScale(0.2));

            congifBtn.on('pointerdown', () => {
                this.sound.play('clickSound', { volume: GameSettings.sfxVolume });
                this.scene.sleep(); 
                this.scene.launch('ConfigurationScene', { previous: 'MenuScene' });
            });

        // boton de creditos
        const creditsBtn = this.add.image(cx + 400, cy + 190, 'btnCredits')
            .setScale(0.2) // tamaño base
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            creditsBtn.on('pointerover', () => { 
                creditsBtn.setScale(0.24);

                this.sound.play('hoverSound', {
                    volume: GameSettings.sfxVolume,
                    detune: Phaser.Math.Between(-20, 20)
                }); 
            });
            creditsBtn.on('pointerout', () => creditsBtn.setScale(0.2));

            creditsBtn.on('pointerdown', () => {
                this.sound.play('clickSound', { volume: GameSettings.sfxVolume });
                this.scene.start('CreditsScene');
            });
    }
}
