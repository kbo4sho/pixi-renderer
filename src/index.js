// import * as PIXI from 'pixi.js'
import * as Matter from 'matter-js'

// let type = "WebGL"
// if(!PIXI.utils.isWebGLSupported()){
//   type = "canvas"
// }

// PIXI.utils.sayHello(type)
// //Create a Pixi Application
// let app = new PIXI.Application({width: 500, height: 500});
// //Add the canvas that Pixi automatically created for you to the HTML document
// document.body.appendChild(app.view);


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showVelocity: true
    }
});
// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

var ball = Bodies.circle(100, 400, 50, { density: 0.04, frictionAir: 0.005});
    
Matter.World.add(engine.world, ball);
Matter.World.add(engine.world, Matter.Constraint.create({
    pointA: { x: 300, y: 100 },
    bodyB: ball
}));

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

Matter.World.add(engine.world, [boxA, boxB, ground]);


// add mouse control
var mouse = Matter.Mouse.create(render.canvas),
    mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

// keep the mouse in sync with rendering
render.mouse = mouse;

// add all of the bodies to the world
Matter.World.add(engine.world, mouseConstraint);

