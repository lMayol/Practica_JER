import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene.js';
import { ConfigurationScene } from './scenes/ConfigurationScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { CreditsScene } from './scenes/CreditsScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { ControlsScene } from './scenes/ControlsScene.js';
import { InstructionScene } from './scenes/InstructionScene.js';
import { LeftScene } from './scenes/LeftScene.js';
import { RightScene } from './scenes/RightScene.js';
import { SplitScreenScene } from './scenes/SplitScreenScene.js';
import { VictoryScene } from './scenes/VictoryScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,        // ajusta para que quepa en la pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH, // centra el juego
        width:  1920,      // usa el tamaño disponible
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloadScene, MenuScene, ConfigurationScene, CreditsScene, PauseScene, ControlsScene, InstructionScene, LeftScene, RightScene, SplitScreenScene, VictoryScene],
    backgroundColor: '#1a1a2e',
}

const game = new Phaser.Game(config);
