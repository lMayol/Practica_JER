import Phaser from 'phaser';

export class ConfigurationScene extends Phaser.Scene {

    constructor() {
        super('ConfigurationScene');
    }

    init(data) {
        // guardar desde que escena se a lanzado para poder usarlo en menu y en game
        this.previous = data.previous; // "MenuScene" o "PauseScene"
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

        this.add.text(400, 200, 'Configuration', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Volver atrás (al menú o al pause)
        const backBtn = this.add.text(400, 320, "Back", { 
            fontSize: "32px", 
            color: "#0f0" ,
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => backBtn.setColor('#ff8888'))
            .on('pointerout', () => backBtn.setColor('#ffffff'))
            .on('pointerdown', () => {
                this.scene.stop();                 
                this.scene.wake(this.previous); 
            });

    }
}
