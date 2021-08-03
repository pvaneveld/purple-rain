import p5 from "p5";

export class Splash {
    private x: number;
    private y: number;
    private angle: number;
    private p5: p5;
    private speed: number;
    private currentIteration = 1;
    private totalIterations = 30;
    private speedRange: [number, number] = [1, 3];
    private sizeRange: [number, number] = [5, 20];

    constructor(p5: p5) {
        this.p5 = p5;
        this.x = p5.random(0, p5.windowWidth);
        this.y = p5.windowHeight;
        this.angle = Math.floor(p5.random(30, 160));
        this.speed = p5.random(...this.speedRange);
    }

    public splash() {
        if (this.currentIteration < this.totalIterations) {
            this.updatePosition();
            this.currentIteration++;
        } else {
            this.resetSplash();
        }
    }

    private updatePosition() {
        // move at an angle
        this.x = this.x + this.p5.cos((this.p5.PI * this.angle) / 180) * this.speed;
        this.y =
            this.y + Math.sin((this.p5.PI * this.angle) / 180) * this.speed * -1;
    }

    private resetSplash() {
        this.x = this.p5.random(this.p5.windowWidth);
        this.y = this.p5.windowHeight;
        this.speed = this.p5.random(...this.speedRange);
        this.currentIteration = 1;
    }

    public show() {
        // the lower the speed the smaller the splash
        const size = this.p5.map(this.speed, ...this.speedRange, ...this.sizeRange);

        // set purple color
        this.p5.fill(148, 43, 226);
        this.p5.noStroke();

        this.p5.circle(
            this.x,
            this.y - size / 2, // start halfway below screen
            size - (size / this.totalIterations) * this.currentIteration // get smaller gradually
        );
    }
}
