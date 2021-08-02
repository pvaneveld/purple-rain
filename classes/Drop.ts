import p5 from "p5";

export class Drop {
    private x: number;
    private y: number;
    private p5: p5;
    private ySpeed: number;
    private distance;
    private length: number;

    constructor(p5: p5) {
        this.p5 = p5;
        this.x = p5.random(0, p5.windowWidth);
        this.y = this.setToStart();

        // zero being close, 20 being far
        this.distance = p5.random(0, 20);

        // items that are farther away should appear smaller
        this.length = p5.map(this.distance, 0, 20, 20, 10);

        this.ySpeed = this.setSpeed();
    }

    private setToStart() {
        return this.p5.random(-500, 50);
    }

    private setSpeed() {
        // items that are close should appear to go faster
        return this.p5.map(this.distance, 0, 20, 15, 5);
    }

    public fall() {
        this.y = this.y + this.ySpeed;

        // reset start position and speed when out of view
        if (this.y > this.p5.windowHeight) {
            this.y = this.setToStart();
            this.ySpeed = this.setSpeed();
        }
    }

    public show() {
        const width = this.p5.map(this.distance, 0, 20, 3, 1);
        const direction = this.p5.map(this.distance, 0, 20, 3, 1);
        this.p5.stroke(148, 43, 226);
        this.p5.strokeWeight(width);
        this.p5.line(this.x, this.y, this.x + direction, this.y + this.length);
    }
}