import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {

    constructor() {
        super('PauseScene');
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

        this.add.text(400, 200, 'Game Paused', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // boton resume
        const resumeBtn = this.add.text(400, 320, 'Resume', {
            fontSize: '32px',
            color: '#00ff00',
        }).setOrigin(0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => resumeBtn.setColor('#00ff88'))
        .on('pointerout', () => resumeBtn.setColor('#00ff00'))
        .on('pointerdown', () => {
            this.scene.stop();               
                this.scene.resume("GameScene");
        });

        // boton configuracion
        const configurationBtn = this.add.text(400, 390, 'Options', {
            fontSize: '32px',
            color: '#00ff00',
        }).setOrigin(0.5)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => configurationBtn.setColor('#00ff88'))
        .on('pointerout', () => configurationBtn.setColor('#00ff00'))
        .on('pointerdown', () => {
            this.scene.sleep(); 
            this.scene.launch("ConfigurationScene", { previous: "PauseScene" });
        });

        const menuBtn = this.add.text(400, 460, 'Return to Main Menu', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => menuBtn.setColor('#ff8888'))
        .on('pointerout', () => menuBtn.setColor('#ffffff'))
        .on('pointerdown', () => {
            this.scene.stop("GameScene");   // cierro juego
            this.scene.start("MenuScene");  // vuelvo al menú
        });
    }
}
