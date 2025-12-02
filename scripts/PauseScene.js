import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class PauseScene extends Phaser.Scene {

    constructor() {
        super('PauseScene');
    }

    init(data) {
        // escena que controla la pausa
        this.parentSceneKey = data.parent || 'SplitScreenScene';
    }

    create() {

        // asegurar camara global superpuesta
        this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);
        this.cameras.main.setScroll(0, 0);

        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.clickSound = this.sound.add('clickSound', {
            volume: GameSettings.sfxVolume
        });

        this.escKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );

        // pausar sonidos
        GameSettings.pauseMusic();

        // fondo
        this.add.image(0, 0, 'menuBg')
            .setOrigin(0, 0)
            .setDisplaySize(cx * 2, cy * 2);

        // titulo pausa
        this.add.image(cx + 50, cy - 350, 'pauseTit')
            .setScale(0.8)
            .setOrigin(0.5);

        // chica
        this.add.image(cx - 550, cy, 'chicIm')
            .setScale(0.6)
            .setOrigin(0.5);

        // boton ajustes
        const congifBtn = this.add.image(cx + 50, cy - 50, 'btnOptions')
            .setScale(0.2)
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

            // lanzar ajustes
            this.scene.launch('ConfigurationScene', { previous: 'PauseScene' });

            // traer configuracion arriba del todo
            this.scene.bringToTop('ConfigurationScene');

            // dormir menu de pausa
            this.scene.sleep('PauseScene');
        });


        // boton de salir al menu
        const exitBtn = this.add.image(cx + 50, cy + 200, 'btnExit')
            .setScale(0.7)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        exitBtn.on('pointerover', () => { 
            exitBtn.setScale(0.74);
            this.sound.play('hoverSound', {
                volume: GameSettings.sfxVolume,
                detune: Phaser.Math.Between(-20, 20)
            }); 
        });

        exitBtn.on('pointerout', () => exitBtn.setScale(0.7));

        exitBtn.on('pointerdown', () => {
            this.sound.play('clickSound', { volume: GameSettings.sfxVolume });

            GameSettings.stopSfx();

            // cerramos todo lo relacionado con el juego dividido
            this.scene.stop('LeftScene');
            this.scene.stop('RightScene');
            this.scene.stop(this.parentSceneKey); // SplitScreenScene
            this.scene.stop('PauseScene');

            // volvemos al menu principal
            this.scene.start('MenuScene');
        });
        
        // boton de volver
        const backBtn = this.add.image(cx + 700, cy + 300, 'btnBack')
            .setScale(0.1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        backBtn.on('pointerover', () => { 
            backBtn.setScale(0.14);
        });

        backBtn.on('pointerout', () => backBtn.setScale(0.1));

        backBtn.on('pointerdown', () => {
            this.sound.play('clickSound', { volume: GameSettings.sfxVolume });

            // reanudar musica
            GameSettings.resumeMusic();

            // cerramos solo esta escena
            this.scene.stop('PauseScene');

            // le decimos a SplitScreenScene que haga togglePause
            this.scene.get(this.parentSceneKey).togglePause();
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.closePauseMenu();
        }
    }

    closePauseMenu() {

        // reanudar musica
        GameSettings.resumeMusic();

        // cerrar el menu de pausa
        this.scene.stop(); // detiene PauseScene

        // reanudar escenas del juego
        const parent = 'SplitScreenScene';

        this.scene.resume(parent);
        this.scene.resume('LeftScene');
        this.scene.resume('RightScene');
    }
}
