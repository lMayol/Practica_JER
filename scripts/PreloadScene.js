import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        // fondo del menu
        this.load.image('menuBg', 'assets/images/FondoMenuInicio.png');

        // botones menu
        this.load.image('btnPlay', 'assets/images/Jugar.png');
        this.load.image('btnExit', 'assets/images/Salir.png');
        this.load.image('btnCredits', 'assets/images/Creditos.png');
    }


    create() {
        this.scene.start('MenuScene');
    }
}

export default PreloadScene;
