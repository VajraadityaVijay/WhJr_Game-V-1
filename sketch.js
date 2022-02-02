const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const BackgroundColor = "#563b1b";
var world, engine;
var center = { x: 400, y: 400 };

var BigCircle, BigCircleSprite, BigCircleRadius;
var ControlCircle, ControlCircleSprite;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create();
  world = engine.world;
  engine.world.gravity.y = 1.2;

  var options = {
    isStatic: true
  };
  BigCircleRadius = 300;
  BigCircle = Bodies.circle(400, 400, BigCircleRadius, options);
  World.add(world, BigCircle);
  BigCircle.collisionFilter = {
    'group': -1,
    'category': 2,
    'mask': 0,
  };

  ControlCircle = Bodies.circle(400, 400, 25, { density: 0.004, frictionAir: 0.008 });
  ControlCircle.setMass = 10;
  World.add(world, ControlCircle);

  centerCircle = Bodies.circle(400, 400, 0.5, { isStatic: true });
  World.add(world, centerCircle);
  centerCircle.collisionFilter = {
    'group': -1,
    'category': 2,
    'mask': 0,
  };

  rope = Constraint.create({
    bodyA: ControlCircle,
    pointB: center,
    stiffness: 2,
    length: BigCircleRadius / 2 - 25
  })
  World.add(world, rope);
}

function draw() {
  background(BackgroundColor);
  Engine.update(engine);

  fill("#d89545");
  noStroke();
  circle(BigCircle.position.x, BigCircle.position.y, BigCircleRadius);
  fill("#442f15");
  circle(ControlCircle.position.x, ControlCircle.position.y, 50);

  drawSprites();
}