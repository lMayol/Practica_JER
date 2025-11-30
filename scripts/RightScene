import Phaser from 'phaser';
import { Paddle } from '../entities/Paddle';

export class RightScene extends Phaser.Scene {

    constructor() {
        super('RightScene');
    }

    create() {

    const FULL = this.scale.width;
    const HALF = FULL / 2;
    const W = HALF;
    const H = this.scale.height;

    // La cámara ocupa la mitad derecha
    this.cameras.main.setViewport(HALF, 0, HALF, H);
    this.cameras.main.setScroll(0, 0);

    const CX = W / 2;   // centro del mundo de esta escena

    // Fondo
    this.add.rectangle(CX, H/2, W, H, 0x1a1a2e);

    // Línea
    for (let i = 0; i < 12; i++) {
        this.add.rectangle(CX, i * 50 + 25, 5, 30, 0x444444);
    }

    // Score centrado dentro de su mitad
    this.scoreLeft = this.add.text(CX - 120, 50, "0", { fontSize: "48px", color: "#0f0" });
    this.scoreRight = this.add.text(CX + 80, 50, "0", { fontSize: "48px", color: "#0f0" });

    // Paddles
    this.p1 = new Paddle(this, 'rp1', CX - 150, H/2).sprite;
    this.p2 = new Paddle(this, 'rp2', CX + 150, H/2).sprite;

    // Pelota
    this.ball = this.physics.add.sprite(CX, H/2, "ball")
        .setBounce(1)
        .setCollideWorldBounds(true);

    this.physics.add.collider(this.ball, this.p1);
    this.physics.add.collider(this.ball, this.p2);

    // Goles
    this.goalLeft = this.physics.add.sprite(0, H/2, null).setImmovable(true).setVisible(false);
    this.goalLeft.setDisplaySize(10, H);

    this.goalRight = this.physics.add.sprite(W, H/2, null).setImmovable(true).setVisible(false);
    this.goalRight.setDisplaySize(10, H);

    this.physics.add.overlap(this.ball, this.goalLeft, () => this.score("right"));
    this.physics.add.overlap(this.ball, this.goalRight, () => this.score("left"));

    // Controles solo flechas
    this.keyUP = this.input.keyboard.addKey('UP');
    this.keyDOWN = this.input.keyboard.addKey('DOWN');

    this.input.keyboard.removeKey('W');
    this.input.keyboard.removeKey('S');

    this.launchBall();
}



    score(side) {
        if (side === "left") {
            this.scoreLeft.setText(String(parseInt(this.scoreLeft.text) + 1));
        } else {
            this.scoreRight.setText(String(parseInt(this.scoreRight.text) + 1));
        }

        const W = 400;
        const H = this.scale.height;

        this.ball.setPosition(W/2, H/2);
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

        if (this.keyUP.isDown) {
            this.p1.setVelocityY(-300);
        } else if (this.keyDOWN.isDown) {
            this.p1.setVelocityY(300);
        } else {
            this.p1.setVelocityY(0);
        }

        // IA
        this.p2.setVelocityY(Math.sin(this.time.now / 600) * 150);
    }
}
