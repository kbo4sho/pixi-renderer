// Ground and walls of level
import * as Matter from 'matter-js';


class Scene {
    static Init(engine: any) {
        Matter.World.add(engine.world, [
            // walls
            Matter.Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            // Matter.Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            // Matter.Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);
    }
}

export { Scene }