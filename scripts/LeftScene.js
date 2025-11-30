import Phaser from 'phaser';
import { Paddle } from '../entities/Paddle';

export class LeftScene extends Phaser.Scene {

    constructor() {
        super('LeftScene');
    }

    create() {

    const FULL = this.scale.width;
    const HALF = FULL / 2;
    const W = HALF;        // el mundo de la escena mide la mitad
    const H = this.scale.height;

    // La cámara ocupa la mitad izquierda
    this.cameras.main.setViewport(0, 0, HALF, H);
    this.cameras.main.setScroll(0, 0);

    const CX = W / 2;      // centro de la escena (200)

    // Fondo centrado
    this.add.rectangle(CX, H/2, W, H, 0x1a1a2e);

    // Línea discontinua centrada
    for (let i = 0; i < 12; i++) {
        this.add.rectangle(CX, i * 50 + 25, 5, 30, 0x444444);
    }

    // Score centrado a izquierda/derecha
    this.scoreLeft = this.add.text(CX - 120, 50, "0", { fontSize: "48px", color: "#0f0" });
    this.scoreRight = this.add.text(CX + 80, 50, "0", { fontSize: "48px", color: "#0f0" });

    // Paddles centrados en su mundo
    this.p1 = new Paddle(this, 'p1', CX - 150, H/2).sprite;
    this.p2 = new Paddle(this, 'p2', CX + 150, H/2).sprite;

    // Pelota centrada
    this.ball = this.physics.add.sprite(CX, H/2, "ball")
        .setBounce(1)
        .setCollideWorldBounds(true);

    this.physics.add.collider(this.ball, this.p1);
    this.physics.add.collider(this.ball, this.p2);

    // Goles alineados a los extremos del mundo
    this.goalLeft = this.physics.add.sprite(0, H/2, null).setImmovable(true).setVisible(false);
    this.goalLeft.setDisplaySize(10, H);

    this.goalRight = this.physics.add.sprite(W, H/2, null).setImmovable(true).setVisible(false);
    this.goalRight.setDisplaySize(10, H);

    this.physics.add.overlap(this.ball, this.goalLeft, () => this.score("right"));
    this.physics.add.overlap(this.ball, this.goalRight, () => this.score("left"));

    // Controles solo WASD
    this.keyW = this.input.keyboard.addKey('W');
    this.keyS = this.input.keyboard.addKey('S');

    this.input.keyboard.removeKey('UP');
    this.input.keyboard.removeKey('DOWN');

    this.launchBall();
}


    ensureBallTexture() {
        if (this.textures.exists('ball')) return;

        const g = this.add.graphics();
        g.fillStyle(0xffffff, 1);
        g.fillCircle(8, 8, 8);
        g.generateTexture('ball', 16, 16);
        g.destroy();
    }

    score(side) {
        if (side === 'left') {
            this.scoreLeft.setText(String(parseInt(this.scoreLeft.text) + 1));
        } else {
            this.scoreRight.setText(String(parseInt(this.scoreRight.text) + 1));
        }

        const W = this.scale.width;
        const H = this.scale.height;

        this.ball.setPosition(W / 4, H / 2);
        this.ball.setVelocity(0, 0);

        this.time.delayedCall(500, () => this.launchBall());
    }

    launchBall() {
        const angle = Phaser.Math.Between(-30, 30);
        const speed = 250;
        const dir = Math.random() < 0.5 ? 1 : -1;

        this.ball.setVelocity(
            Math.cos(Phaser.Math.DegToRad(angle)) * speed * dir,
            Math.sin(Phaser.Math.DegToRad(angle)) * speed
        );
    }

    update() {
        if (this.keyW.isDown) this.p1.setVelocityY(-300);
        else if (this.keyS.isDown) this.p1.setVelocityY(300);
        else this.p1.setVelocityY(0);

        // IA
        this.p2.setVelocityY(Math.sin(this.time.now / 600) * 150);
    }
}
