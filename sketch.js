var bananaImage, banana, bananaGroup;
var obstacleImage, rock, obstacleGroup;
var background1, backgroundImage;
var monkeyAnimation, monkeyIRL;
var ground;
var invisibleGround;
var score = 0;

function preload() {
  monkeyAnimation = loadAnimation("Monkey1.png", "Monkey2.png", "Monkey3.png", "Monkey4.png", "Monkey5.png", "Monkey6.png", "Monkey7.png", "Monkey8.png", "Monkey9.png", "Monkey10.png");

  bananaImage = loadImage("banana.png");

  backgroundImage = loadImage("jungle.png");

  obstacleImage = loadImage("stone.png");  
}

function setup() {
  createCanvas(600, 200);

  background1 = createSprite(280, 180, 200, 600);
  background1.addImage(backgroundImage)
  background1.scale = 3;
  background1.x = background1.width / 2;
  background1.velocityX = -6;

  monkeyIRL = createSprite(50, 180, 20, 50);
  monkeyIRL.addAnimation("monkeyIRL", monkeyAnimation);
  monkeyIRL.scale = 0.1;


  ground = createSprite(190, 300, 400, 20);

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  obstacleGroup = new Group();

  bananaGroup = new Group();
}

function draw() {
  background(220);

  stroke("white");
  textSize(20);
  fill("white");
  score = score + Math.round(getFrameRate() / 60);
  
  if (keyDown("space") && monkeyIRL.y > 145) {
    monkeyIRL.velocityY = monkeyIRL.velocityY - 6;
  }
  
  if (monkeyIRL.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score+10;
  }
  
  if (monkeyIRL.isTouching(obstacleGroup)){
      monkeyIRL.scale = 0.1;
      obstacleGroup.destroyEach();
  }
  
  if (background1.x < 0) {
    background1.x = background1.width / 2;
  }

  monkeyIRL.velocityY = monkeyIRL.velocityY + 0.8;

  monkeyIRL.collide(invisibleGround);

  switch (score) {
    case 10:
      monkeyIRL.scale = 0.12;
      break;

    case 20:
      monkeyIRL.scale = 0.14;
      break;

    case 30:
      monkeyIRL.scale = 0.16;
      break;

    case 40:
      monkeyIRL.scale = 0.18;
      break;


    default:
      break;
  }

  spawnBananas();
  spawnObstacles();
  
  drawSprites();
  
  text("Score: " + score, 400, 50);
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    banana = createSprite(600, 100, 40, 10);
    banana.y = Math.round(random(30, 100));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    monkeyIRL.depth = background1.depth + 1;

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth
    banana.depth = monkeyIRL.depth; 

    bananaGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
  }
}