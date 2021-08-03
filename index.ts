import p5 from "p5";
import { Drop } from "./classes/Drop";
import { Splash } from "./classes/Splash";

const sketch = (p5: p5) => {
    let drops: Drop[] = [];
    let splashes: Splash[] = [];

    p5.setup = async () => {
        await init();
    };

    p5.windowResized = async () => {
        await init();
    }

    p5.draw = async () => {
        p5.background(230, 230, 250);
        initDrops(drops);
        initSplashes(splashes);
    };

    const init = async () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        drops = getDrops(p5);

        // wait for the drops to hit the ground :)
        await sleep(1000);

        // go splash!
        splashes = [];
        await getSplashes(p5, splashes);
    }


    const getDrops = (p5: p5) => {
        let drops: Drop[] = [];
        for (let index = 0; index < p5.windowWidth / 2; index++) {
            drops.push(new Drop(p5));
        }

        return drops;
    };

    const initDrops = (drops: Drop[]) => {
        drops.forEach((drop) => {
            drop.show();
            drop.fall();
        });
    };

    const getSplashes = async (p5: p5, splashes: Splash[]) => {
        for (let index = 0; index < p5.windowWidth / 20; index++) {
            await sleep(p5.random(10, 30));
            splashes.push(new Splash(p5));
        }
    }

    const initSplashes = (splashes: Splash[]) => {
        splashes.forEach((splash) => {
            splash.show();
            splash.splash();
        });
    };


    const sleep = (millisecondsDuration: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, millisecondsDuration);
        });
    }
};


new p5(sketch);
