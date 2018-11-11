import * as Matter from 'matter-js'
import { MyRender } from './render';

const CollisonCategories = {
    playerCategory: 0x0001,
    curdCategory: 0x0002,
    mouthCategory: 0x0004
};

export const PointsGenerator = {
    name: "points-generator",
    version: "0.1.3",
    for: "matter-js@^0.12.0",
    install: function (base: any) {
        console.log(base);
        let previousTimestamp = 0;
        const World = base.World;
        const Body = base.Body;
        const Bodies = base.Bodies;
        const Common = base.Common;

        base.after("Engine.update", function (event: any) {
            // ADD POINTS ON INTERVAL
            const currentTimestamp = event.timing.timestamp;
            const steppable = currentTimestamp - previousTimestamp > 1000;
            if (steppable) {
                let body = Bodies.circle(0, 300, 15, {
                    timeScale: 0.2,
                    density: 0.0000001,
                    collisionFilter: {
                        category: CollisonCategories.curdCategory,
                        mask:
                            CollisonCategories.playerCategory |
                            CollisonCategories.mouthCategory
                    }
                });
                Body.applyForce(body, body.position, { x: 0.000025, y: -0.00001 });
                World.add(event.world, body);
                previousTimestamp = event.timing.timestamp;
            }
        });
    }
};