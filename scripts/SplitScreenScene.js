import Phaser from 'phaser';

export class SplitScreenScene extends Phaser.Scene {
    constructor() {
        super('SplitScreenScene');
    }

    create() {
        // Lanzar las dos escenas de juego en paralelo
        this.scene.launch('LeftScene');
        this.scene.launch('RightScene');

        // Esta escena ya no pinta nada, podemos dormirla o pararla
        this.scene.stop(); // se auto-detiene
    }
}
