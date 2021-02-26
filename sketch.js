var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var plinkos = [];
var divisions = []
var score = 0,
  turn = 0,
  particle = null;
var gameState = "play";

var divisionHeight = 300;
var score = 0;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(400, 790, 800, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}


function draw() {
  background("black");
  textSize(20)
  text("Score : " + score, 20, 30);
  text("Lives : " + (5-turn), width-100, 30);
  Engine.update(engine);
  ground.display();

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
    fill(255)
    if (k >= 0 && k <= 3) {
      num = 500
    } else if (k >= 4 && k <= 6) {
      num = 100
    } else {
      num = 200
    }
    text(num, ((k + 1) * 80 - 60), 550);
  }

  if (gameState === "play") {
    text("Click mouse to generate a ball", 250, 450);
    if (mouseIsPressed) {
      if (particle !== null)
        World.remove(world, particle.body)

      particle = new Particle(random(100, width - 100), -20);
    }

    if (particle !== null) {
      particle.display();
      if (particle.body.position.y > 760) {
        if (particle.body.position.x > 0 && particle.body.position.x < 320) {
          score += 500
          turn++
        } else if (particle.body.position.x > 320 && particle.body.position.x < 560) {
          score += 100
          turn++
        } else if (particle.body.position.x > 560 && particle.body.position.x < 800) {
          score += 200
          turn++
        }
        World.remove(world, particle.body)
        particle = null
      }
      if (turn === 5) {
        gameState = "end"
      }
    }
    console.log(turn)
  } else if (gameState === "end") {
    textSize(60)
    fill(255)
    text("Game Over ", 250, 450);
  }
}