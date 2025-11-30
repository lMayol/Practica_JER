import Phaser from 'phaser';

export class CreditsScene extends Phaser.Scene {

    constructor() {
        super('CreditsScene');
    }

    create(data) {
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

        this.add.text(400, 200, 'Credits', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const menuBtn = this.add.text(400, 400, 'Return to Main Menu', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => menuBtn.setColor('#ff8888'))
        .on('pointerout', () => menuBtn.setColor('#ffffff'))
        .on('pointerdown', () => {
            this.scene.stop(data.originalScene);
            this.scene.start('MenuScene');
        });
    }
}
