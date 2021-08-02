import p5 from "p5";

export class Splash {
    private x: number;
    private y: number;
    private angle: number;
    private p5: p5;
    private speed: number;
    private iterations = 1;

    constructor(p5: p5) {
        this.p5 = p5;
        this.x = p5.random(0, p5.windowWidth);
        this.y = p5.windowHeight;
        this.angle = Math.floor(p5.random(30, 160));
        this.speed = p5.random(1, 3);
    }

    public splash() {
        if (this.iterations < 30) {
            this.x = this.x + this.p5.cos((this.p5.PI * this.angle) / 180) * this.speed;
            this.y = this.y + Math.sin((this.p5.PI * this.angle) / 180) * this.speed * -1;
            this.iterations++;
        } else {
            this.x = this.p5.random(this.p5.windowWidth);
            this.y = this.p5.windowHeight;
            this.speed = this.p5.random(1, 3);
            this.iterations = 1;
        }
    }

    public show() {
        this.p5.fill(148, 43, 226);
        this.p5.noStroke();
        this.p5.circle(this.x, this.y - 20 / 2, 20 - (20 / 30) * this.iterations);
    }
}