import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { ConfigurationScene } from './scenes/ConfigurationScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { CreditsScene } from './scenes/CreditsScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,        // Ajusta para que quepa en la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centra el juego
        width:  window.innerWidth,      // Usa el tamaño disponible
        height: window.innerHeight
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloadScene, MenuScene, GameScene, ConfigurationScene, CreditsScene, PauseScene],
    backgroundColor: '#1a1a2e',
}

const game = new Phaser.Game(config);
