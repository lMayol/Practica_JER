import Phaser from 'phaser';
import { GameSettings } from '../GameSettings.js';

export class RightScene extends Phaser.Scene {

    constructor() {
        super('RightScene');
    }

    init(data) {
        // tecla única que viene desde SplitScreenScene
        this.assignedKey = data.assignedKey;  
    }

    create() {
        // sonidos 
        this.sndHit = this.sound.add('keySound', {
            volume: GameSettings.sfxVolume
        });
        this.sndDone = this.sound.add('successSound',{
            volume: GameSettings.sfxVolume
        });
        this.sndSplash = this.sound.add('splashSound', {
            volume: GameSettings.sfxVolume
        });
        this.sndBucket = this.sound.add('bucketSound', {
            volume: GameSettings.sfxVolume
        });

        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        const FULL = this.scale.width;
        const HALF = FULL / 2;
        const W = HALF;
        const H = this.scale.height;

        this.totalHits = 0;      // clicks totales (0–20)
        this.keyHits   = 0;      // clicks de la tecla actual (0–5)
        this.currentKey = this.assignedKey;
        this.floatingKeyText = null;
        this.frameToggle = false;  // para alternar sprites

        // camara mitad derecha
        this.cameras.main.setViewport(HALF, 0, HALF, H);
        this.cameras.main.setScroll(HALF, 0);

        // fondo
        this.add.image(HALF + W / 2, H / 2, 'gameBg')
            .setDisplaySize(W, H)
            .setOrigin(0.5);

        // score
        this.scoreRight = this.add.text(cx + 720, cy + 230, "0", {
            fontSize: "48px",
            color: "rgba(255, 255, 255, 1)"
        }).setDepth(99);

        // deteccion universal de teclado
        this.input.keyboard.on('keydown', (event) => {
            if (event.key.toUpperCase() === this.currentKey) {
                this.handleFloatingKey();
            }
        });

        // pj 2
        this.pj2 = this.add.image(cx + 560, cy + 170, 'pj2-0Im')
        .setScale(0.55)
        .setOrigin(0.5);

        // cubo del jugador 2
        this.cubo = this.add.image(cx + 850, cy + 350, 'cubo-emptyIm')
            .setScale(0.5)
            .setOrigin(0.5);

        this.hasPlayedSplash = false;

        this.spawnFloatingKey();
    }

    updateCuboSprite() {
        const points = parseInt(this.scoreRight.text);
        let spriteKey = 'cubo-emptyIm';

        if (points == 15) {
            spriteKey = 'cubo-5Im';

            // si aún no sonó, reproducimos sincronizado
            if (!this.hasPlayedSplash) {

                // primero cambiar el sprite del cubo
                this.cubo.setTexture(spriteKey);

                // luego reproducir sonido 120ms después
                this.time.delayedCall(120, () => {
                    this.sndSplash.play({
                        volume: GameSettings.sfxVolume * 1.2
                    });
                    this.sndBucket.play({
                        volume: GameSettings.sfxVolume * 0.1
                    });
                });

                this.hasPlayedSplash = true;
                return;
            }
        }
        else if (points >= 8) spriteKey = 'cubo-4Im';
        else if (points >= 5) spriteKey = 'cubo-3Im';
        else if (points >= 3) spriteKey = 'cubo-2Im';
        else if (points >= 2) spriteKey = 'cubo-1Im';
        else if (points >= 1) spriteKey = 'cubo-0Im';

        // cambiar sprite si no estamos en la etapa con sonido
        this.cubo.setTexture(spriteKey);
    }

    updateFisherSprite() {

        this.frameToggle = !this.frameToggle;
        const h = this.totalHits;

        // etapa 1
        if (h < 10) {
            this.pj2.setTexture(this.frameToggle ? "pj2-0Im" : "pj2-1Im");
            return;
        }

        // etapa 2 
        if (h < 20) {
            this.pj2.setTexture(this.frameToggle ? "pj2-1Im" : "pj2-2Im");
            return;
        }

        // etapa final
        if (h === 20) {
            this.pj2.setTexture("pj2-3Im");
            return;
        }
    }

    spawnFloatingKey() {

        if (this.floatingKeyText) {
            this.floatingKeyText.destroy();
        }

        // imagen de fondo
        this.floatingKeyBg = this.add.image(
            this.cameras.main.width + 470,
            105, "teclaIm"
        )
        .setScale(0.3)
        .setOrigin(0.5)
        .setDepth(5);

        // letra de la tecla
        this.floatingKeyText = this.add.text(
            this.cameras.main.width + 470,
            100,
            this.currentKey,
            { fontSize: "72px", color: "#ffffff" }
        ).setOrigin(0.5).setDepth(6);

        // animacion pop
        this.floatingKeyText.setScale(0);
        this.tweens.add({
            targets: this.floatingKeyText,
            scale: 1,
            duration: 180,
            ease: 'Back.Out'
        });
    }

    handleFloatingKey() {
    
            // sonido por pulsación correcta
            this.sndHit.play({
                volume: GameSettings.sfxVolume,
                detune: Phaser.Math.Between(-40, 40)
            });

            // efecto flash 
            this.tweens.add({
                targets: this.floatingKeyText,
                alpha: 0.2,
                duration: 50,
                yoyo: true
            });
    
            // sumar click total y click de tecla
            this.totalHits++;
            this.keyHits++;
    
            // actualizar animación según etapa
            if (this.totalHits < 20) {
                this.updateFisherSprite();
            }
    
            if (this.keyHits >= 5 && this.totalHits < 20) {
    
                // sonido de success 
                this.sndDone.play({
                    volume: GameSettings.sfxVolume * 0.4
                });
    
                // reset de clicks de esta tecla 
                this.keyHits = 0;
    
                // pedir nueva tecla al controlador
                const controller = this.scene.get('SplitScreenScene');
                controller.changeRightKey(); 
    
                return;
            }
    
            if (this.totalHits >= 20) {
    
                // cambiar sprite final 
                this.pj2.setTexture('pj2-3Im');
    
                // sumar punto 
                this.scoreRight.setText(String(parseInt(this.scoreRight.text) + 1));

                // actualizar cubo segun puntos 
                this.updateCuboSprite(); 
    
                // cambiar tecla para la siguiente ronda
                const controller = this.scene.get('SplitScreenScene');
                controller.changeRightKey();
    
                // reproducir splash 
                this.sndSplash.stop();
                this.sndSplash.play({
                    volume: GameSettings.sfxVolume * 1.2
                });
                this.sndBucket.play({
                        volume: GameSettings.sfxVolume * 0.1
                    });
    
                // mantener sprite final 
                this.time.delayedCall(300, () => {
                    this.totalHits = 0;
                    this.keyHits   = 0;
                    this.frameToggle = false;
    
                    // volver al estado inicial
                    this.pj2.setTexture('pj2-0Im');
                });
    
                return;
            }
        }

        setNewKey(key) {
            this.currentKey = key;
            this.spawnFloatingKey(); 
        }  
    }
