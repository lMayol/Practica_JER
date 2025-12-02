import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {

        // fondo del menu
        this.load.image('menuBg', 'assets/images/Fondo.png');

        // fondo juego
        this.load.image('gameBg', 'assets/images/Fondo_juego.png');
        this.load.image('barBg', 'assets/images/Barra.png');

        // fondo fin
        this.load.image('victoryBg', 'assets/images/PantallaVictoria.png');

        // logo menu
        this.load.image('logoBg', 'assets/images/Bicho.png');

        // titulos
        this.load.image('pauseTit', 'assets/images/PausaTitulo.png');
        this.load.image('optionsTit', 'assets/images/AjustesTitulo.png');
        this.load.image('creditTit', 'assets/images/CreditosTitulo.png'); 

        // textos
        this.load.image('musicTex', 'assets/images/Musica.png');
        this.load.image('sfxTex', 'assets/images/SFX.png');
        this.load.image('creditTex', 'assets/images/CreditosTexto.png');

        // barra sonido
        this.load.image('barraIm', 'assets/images/BarraSonido.png');
        this.load.image('bolitaIm', 'assets/images/Bolita.png');

        // botones
        this.load.image('btnPlay', 'assets/images/Jugar.png');
        this.load.image('btnOptions', 'assets/images/Ajustes.png');
        this.load.image('btnCredits', 'assets/images/Creditos.png');
        this.load.image('btnResume', 'assets/images/ReanudarButton.png');
        this.load.image('btnExit', 'assets/images/Salir.png');
        this.load.image('btnSkip', 'assets/images/Saltar.png');
        this.load.image('btnBack', 'assets/images/Atras.png');

        // pantalla instrucciones y controles
        this.load.image('instIm', 'assets/images/Instrucciones.png');
        this.load.image('contIm', 'assets/images/ControlesExplicacion.png');

        // pj
        this.load.image('abuIm', 'assets/images/Abuela.png');
        this.load.image('friIm', 'assets/images/Friki.png');
        this.load.image('chicIm', 'assets/images/Chica.png');
        this.load.image('pescIm', 'assets/images/Pescador.png');
        this.load.image('pesc2Im', 'assets/images/YAYO.png'); 

        /// animaciones 
        // jugador 1
        this.load.image('pj1-0Im', 'assets/images/animations/1Yayo.png'); 
        this.load.image('pj1-1Im', 'assets/images/animations/2Yayo.png'); 
        this.load.image('pj1-2Im', 'assets/images/animations/3Yayo.png'); 
        this.load.image('pj1-3Im', 'assets/images/animations/4YayoPez.png'); 

        // jugador 2
        this.load.image('pj2-0Im', 'assets/images/animations/1Chica.png'); 
        this.load.image('pj2-1Im', 'assets/images/animations/2Chica.png'); 
        this.load.image('pj2-2Im', 'assets/images/animations/3Chica.png'); 
        this.load.image('pj2-3Im', 'assets/images/animations/4ChicaPez.png'); 

        // cubo
        this.load.image('cubo-0Im', 'assets/images/animations/1PezCubo.png');
        this.load.image('cubo-1Im', 'assets/images/animations/2PezCubo.png');
        this.load.image('cubo-2Im', 'assets/images/animations/3PezCubo.png');
        this.load.image('cubo-3Im', 'assets/images/animations/4PezCubo.png');
        this.load.image('cubo-4Im', 'assets/images/animations/5PezCubo.png');
        this.load.image('cubo-5Im', 'assets/images/animations/UltraGordoCubo.png');
        this.load.image('cubo-emptyIm', 'assets/images/animations/VacioCubo.png');

        // reloj
        this.load.image('relojIm', 'assets/images/Reloj.png');

        // tecla
        this.load.image('teclaIm', 'assets/images/Tecla.png');

        // sonidos
        this.load.audio('clickSound', 'assets/sounds/button-press.mp3');
        this.load.audio('hoverSound', 'assets/sounds/button-hover.wav');
        this.load.audio('keySound', 'assets/sounds/key-press.wav');
        this.load.audio('successSound', 'assets/sounds/key-success.wav');

        this.load.audio('splashSound', 'assets/sounds/splash-sound.wav');
        this.load.audio('bucketSound', 'assets/sounds/bucket.wav');

        this.load.audio('rodSound', 'assets/sounds/fishing-reel.mp3');

        this.load.audio('winSound', 'assets/sounds/level-win.mp3');

        /// musica 
        // juego
        this.load.audio('ambientSound', 'assets/sounds/ambient-sound.wav');
        this.load.audio('seagullSound', 'assets/sounds/seagulls.wav');

        this.load.audio('gameMs', 'assets/sounds/musica-juego.wav');

        // menu
        this.load.audio('menuMs', 'assets/sounds/musica-menu.wav');

    }

    create() {
        this.scene.start('MenuScene');
    }
}

export default PreloadScene;
