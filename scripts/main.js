import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { PauseScene } from './scenes/PauseScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,        // Ajusta para que quepa en la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el juego
        width: window.innerWidth,      // Usa el tamaño disponible
        height: window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene, PauseScene],
    backgroundColor: '#1a1a2e',
}

//Para que se actualice al redimensionar la ventana
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

const game = new Phaser.Game(config);
