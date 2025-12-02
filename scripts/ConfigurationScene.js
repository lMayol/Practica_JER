import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class ConfigurationScene extends Phaser.Scene {

    constructor() {
        super('ConfigurationScene');
    }

    init(data) {
        this.previous = data.previous || "MenuScene";
    }

    create() {

        // restaurar volumen guardado
        const savedMusic = localStorage.getItem("musicVolume");
        const savedSFX   = localStorage.getItem("sfxVolume");

        if (savedMusic !== null) GameSettings.musicVolume = parseFloat(savedMusic);
        if (savedSFX !== null)   GameSettings.sfxVolume   = parseFloat(savedSFX);

        // actualizar volumen de musica en reproduccion si existe
        if (GameSettings.currentMusic) {
            GameSettings.currentMusic.setVolume(GameSettings.musicVolume);
        }

        // asegurar camara completa superpuesta
        this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);
        this.cameras.main.setScroll(0, 0);

        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // fondo 
        this.add.image(0, 0, 'menuBg')
            .setOrigin(0, 0)
            .setDisplaySize(
                cx * 2, 
                cy * 2
            );
            
        // titulo
        this.add.image(cx + 50, cy - 350, 'optionsTit')
            .setScale(0.8) // tamaño base
            .setOrigin(0.5);
            
        // textos
        this.add.image(cx + 50, cy - 150, 'musicTex')
            .setScale(0.8) // tamaño base
            .setOrigin(0.5);
        this.add.image(cx + 50, cy + 25, 'sfxTex')
            .setScale(0.8) // tamaño base
            .setOrigin(0.5);

        // barra sonido
        this.add.image(cx + 50, cy - 75, 'barraIm')
            .setScale(0.8) // tamaño base
            .setOrigin(0.5);
        this.add.image(cx + 50, cy + 100, 'barraIm')
            .setScale(0.8) // tamaño base
            .setOrigin(0.5);

        // pescador
        this.add.image(cx - 570, cy, 'pescIm')
            .setScale(0.6) // tamaño base
            .setOrigin(0.5);

        // SLIDER MÚSICA
        this.createSlider(cx - 371, cy - 75, "", GameSettings.musicVolume, (value) => {

            GameSettings.musicVolume = value;
            localStorage.setItem("musicVolume", value);

            if (GameSettings.currentMusic) {
                GameSettings.currentMusic.setVolume(value* 0.7);
            }
        });

        // SLIDER SFX
        this.createSlider(cx - 371, cy + 100, "", GameSettings.sfxVolume, (value) => {

            GameSettings.sfxVolume = value;
            localStorage.setItem("sfxVolume", value);

            // actualizar TODAS las fuentes de SFX
            if (GameSettings.ambientSound)  GameSettings.ambientSound.setVolume(value);
            if (GameSettings.seagullSound)  GameSettings.seagullSound.setVolume(value);
        });

        // boton volver
        const backBtn = this.add.image(cx + 700, cy + 300, 'btnBack')
            .setScale(0.1) // tamaño base
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

            backBtn.on('pointerover', () => { 
                backBtn.setScale(0.14);
            });
            backBtn.on('pointerout', () => backBtn.setScale(0.1));

            backBtn.on('pointerdown', () => {
                this.sound.play('clickSound', { volume: GameSettings.sfxVolume });
                // cerrar configuración
                this.scene.stop('ConfigurationScene');

                // volver exactamente a la escena anterior
                this.scene.start(this.previous);
            });
        
    }
    
    // crear el slider de sonido
    createSlider(x, y, label, initialValue, onValueChange) {

        const barWidth = 840;

        this.add.rectangle(x, y, barWidth, 8, 0xF5B32C, 0).setOrigin(0, 0.5);

        // asegurar que initialValue esta entre 0 y 1
        initialValue = Phaser.Math.Clamp(initialValue, 0, 1);

        const handle = this.add.image(x + (barWidth * initialValue), y, 'bolitaIm')
            .setScale(0.5)
            .setInteractive({ draggable: true });

        handle.on('drag', (pointer, dragX) => {

            dragX = Phaser.Math.Clamp(dragX, x, x + barWidth);
            handle.x = dragX;

            const value = (dragX - x) / barWidth;

            onValueChange(value);
        });
    }
}   
