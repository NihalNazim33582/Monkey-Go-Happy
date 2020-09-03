var bananaImage, BananaGroup;
var obstacleImage, ObstacleGroup;
var backgroundSprite, backgroundImage, inviground;
var score, lives;
var monkey, monkeyImage;
var PLAY = 1,
    END = 0;
var gameState = PLAY;
  
function preload() {
  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("stone.png");

  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png");

  backgroundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600, 400);
  
  backgroundSprite = createSprite(50, 180, 20, 50);
  backgroundSprite.addImage("background",
    backgroundImage);
  backgroundSprite.x = backgroundSprite.width / 2;


  inviground = createSprite(200, 370, 400, 10);
  inviground.visible = false;

  monkey = createSprite(200, 200, 20, 20);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.1;
  //monkey.debug=true;

  score = 0;
  lives = 4;

  BananaGroup = new Group();
  ObstacleGroup = new Group();

}

function draw() {
  background(255);

  backgroundSprite.velocityX = -2;

  if (backgroundSprite.x < 200) {
    backgroundSprite.x = backgroundSprite.width / 2;
  }

  if (gameState === PLAY) {

    monkey.velocityY = monkey.velocityY = +3.5;

    if (BananaGroup.collide(monkey)) {
        score = score + 2;
      BananaGroup.destroyEach();
    }

    if (ObstacleGroup.collide(monkey)) {
      score = 0;
      ObstacleGroup.destroyEach();
      lives = lives - 1;
    }

    if (keyDown("space") && monkey.y > 334) {
      monkey.velocityY = -100;
    }

    if (lives === 0) {
      gameState = END;
    }

    food();
    obstaclesGroup();

  } else if (gameState === END) {
    text("Sorry Try again.", 200, 180)
    text("To restart press R.", 200, 220)

    if (keyDown("r")) {
      reset();
    }

    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);

    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);

  }

  monkey.collide(inviground);

  drawSprites();

  fill("white");
  stroke("white");
  textSize(20);
  text("Points: " + score, 450, 35)
  text("Lives: " + lives, 50, 35)

}

function reset() {
  gameState = PLAY;
  ObstacleGroup.destroyEach();
  BananaGroup.destroyEach();
  count = 0;
}

function food() {
  if (World.frameCount % 100 === 0) {
    var foodY = Math.round(random(280, 300));
    var banana = createSprite(600, foodY, 20, 20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 150;
    //banana.debug=true;
    BananaGroup.add(banana);
  }
}

function obstaclesGroup() {
  if (World.frameCount % 300 === 0) {
    var stone = createSprite(600, 350, 20, 20);
    stone.addImage("Stone", obstacleImage);
    stone.scale = 0.15;
    stone.velocityX = -4;
    stone.lifetime = 150;
    //stone.debug=true;
    ObstacleGroup.add(stone);
    ObstacleGroup.setColliderEach("rectangle", 80, 80, 80, 80, 80);
  }
}  