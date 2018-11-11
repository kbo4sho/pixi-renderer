// import * as PIXI from 'pixi.js'
import * as Matter from 'matter-js';
import { Composites, Composite, Constraint, IBodyDefinition, Engine, Render, Bodies, World, Events, Mouse, MouseConstraint, Gravity } from 'matter-js';
import { Scene } from './scene';
import { PointsGenerator } from './points-generator'
import { IMouseConstraintDefinition } from 'matter-js';
import { MyRender } from './render';


//NOTES
// to configure looping change, gravity scale and rope constraint stiffness and dampening

// let type = "WebGL"
// if(!PIXI.utils.isWebGLSupported()){
//   type = "canvas"
// }

// PIXI.utils.sayHello(type)
// //Create a Pixi Application
// let app = new PIXI.Application({width: 500, height: 500});
// //Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(app.view);
console.log(PointsGenerator);
Matter.Plugin.register(PointsGenerator as Matter.Plugin);


// module aliases

// create an engine
var engine = Engine.create();
engine.world.gravity.scale = .0014;

var render = new MyRender();
render.create(engine)
// create a renderer
// var render = Render.create({
//     element: document.body,
//     engine: engine,
//     options: {
//         width: 800,
//         height: 600
//     }
// });

const CollisionCategories = {
    playerCategory: 0x0001,
    pointCategory: 0x0002,
};


// Points
var point1 = Bodies.circle(200, 200, 20,
    <IBodyDefinition>{
        isStatic: true,
        collisionFilter: {
            category: CollisionCategories.pointCategory,
        }
    }
);

var point2 = Bodies.circle(500, 400, 20,
    <IBodyDefinition>{
        isStatic: true,
        collisionFilter: {
            category: CollisionCategories.pointCategory
        }
    }
);


World.add(engine.world, [point1, point2]);

const group = Matter.Body.nextGroup(true);
let item = 0;
var ropeB = Composites.stack(350, 50, 2, 1, 2, 10, (x: number, y: number) => {
    // item+=;
    return Bodies.circle(x, y, 15 + item, <IBodyDefinition>{ collisionFilter: { category: CollisionCategories.playerCategory} });
});

Composites.chain(ropeB, 0.5, 0, -0.5, 0, { stiffness: 1, render: { type: 'revolute' } });
const ropeConstraint = Constraint.create({
    bodyB: ropeB.bodies[0],
    pointB: { x: -20, y: 0 },
    pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
    length: 0,
    stiffness: 0.007,
    damping: 0.9
})
Composite.add(ropeB, ropeConstraint);

World.add(engine.world, ropeB);


//Game Loop
(function run() {
    window.requestAnimationFrame(run);
    Engine.update(engine, 1000 / 60);
})();

// run the renderer
Render.run(render.render as Render);

Scene.Init(engine);

// Add mouse control
const mouse = Mouse.create(render.render.canvas);
const mouseConstraint = MouseConstraint.create(engine, <IMouseConstraintDefinition>{
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    },
    collisionFilter: {
        // mask: CollisionCategories.pointCategory
    }
});

// an example of using mouse events on a mouse
Events.on(mouseConstraint, 'startdrag', function (event) {
    var mousePosition = event.mouse.position;
    ropeConstraint.pointA= {x:event.body.position.x, y: event.body.position.y};
});


World.add(engine.world, mouseConstraint);
// PointsGenerator.options.width = render.options.width;
Matter.use("points-generator");

