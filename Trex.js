var PLAY = 1;
var BACKWARDS = 2
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided, trex_leftRunning;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var pBossGroup, pBossImg;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var BackgroundMusic

var PortalP,PortalPImg
var PortalBR,portalBRImg


function preload(){
  trex_running = loadAnimation("./Gizmo sprites/gizmo-1.png","./Gizmo sprites/gizmo-2.png","./Gizmo sprites/gizmo-3.png","./Gizmo sprites/gizmo-4.png");
  trex_leftRunning = loadAnimation("./Gizmo sprites/gizmo-1-r.png","./Gizmo sprites/gizmo-2-r.png","./Gizmo sprites/gizmo-3-r.png","./Gizmo sprites/gizmo-4-r.png")
  trex_collided = loadAnimation("./Gizmo sprites/gizmo-7.png");
  
  groundImage = loadImage("./Dinosaur Game/ground2.png");
  
  cloudImage = loadImage("./Dinosaur Game/cloud.png");

  pBossImg = loadImage("./Dinosaur Game/Wasp-Purple-flying.png")
  
  obstacle1 = loadImage("./Dinosaur Game/obstacle1.png");
  obstacle2 = loadImage("./Dinosaur Game/obstacle2.png");
  obstacle3 = loadImage("./Dinosaur Game/obstacle3.png");
  obstacle4 = loadImage("./Dinosaur Game/obstacle4.png");
  obstacle5 = loadImage("./Dinosaur Game/obstacle5.png");
  obstacle6 = loadImage("./Dinosaur Game/obstacle6.png");
  
   restartImg = loadImage("./Dinosaur Game/restart.png")
  gameOverImg = loadImage("./Dinosaur Game/gameOver.png")
  PortalPImg = loadImage("./Dinosaur Game/Portal-Purple.png")
  portalBRImg = loadImage("./Gizmo sprites/portal-blue-r.png")
  
  jumpSound = loadSound("./Dinosaur Game/jump.mp3")
  dieSound = loadSound("./Dinosaur Game/die.mp3")
  checkPointSound = loadSound("./Dinosaur Game/checkPoint.mp3")
  BackgroundMusic = loadSound("./Music/Puzzle.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  var message="hi"

  trex = createSprite(50,150,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("runningLeft", trex_leftRunning);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.2;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(300,185,600,10);
  invisibleGround.visible = false;

  PortalP = createSprite(650,100,10,10)
  PortalP.addImage(PortalPImg)
  PortalP.scale=0.2

  PortalBR = createSprite(-50,100,10,10)
  PortalBR.addImage(portalBRImg)
  PortalBR.scale=0.2
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  pBossGroup = createGroup();
  BackgroundMusic.loop()
  BackgroundMusic.setVolume(0.2)
  
  console.log("Hello" + 5);
  //trex.setCollider("circle",0,0,40)
  trex.setCollider("rectangle",0,0,120,300);
  //trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(250);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log(ground.width)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false

    ground.velocityX = -(4+3*score/100);
   
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score%1000===0){
      checkPointSound.play()
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    

    if(keyDown("UP_ARROW")&& trex.y >= 130) {
        trex.velocityY = -12;
        jumpSound.play()
    }

    if(score===500){
      PortalP.velocityX=-5
    }

    if(trex.isTouching(PortalP)){
      gameState=BACKWARDS
      ground.velocityX=0
      score=0
      cloudsGroup.destroyEach()
      obstaclesGroup.destroyEach()
      trex.x=550
      trex.changeAnimation("runningLeft")
    }
    

    trex.velocityY = trex.velocityY + 0.8
  

    spawnClouds();
  

    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        dieSound.play()
        //trex.velocityY=-12
        //jumpSound.play()
    }
  }

  if(gameState===BACKWARDS){

    ground.velocityX = (4+3*score/100);
   
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score%100===0){
      checkPointSound.play()
    }
    
    if (ground.x > 600){
      ground.x = -(ground.width/2)+620;
    }
    

    if(keyDown("UP_ARROW")&& trex.y >= 130) {
        trex.velocityY = -12;
        jumpSound.play()
    }

    if(keyDown("DOWN_ARROW")){
      trex.setCollider("rectangle",0,-60,120,200)
    }
    else{
      trex.setCollider("rectangle",0,0,120,300);
    }

    if(score===700){
      PortalBR.velocityX=5
    }

    if(trex.isTouching(pBossGroup)){
      gameState=END
    }

    if(trex.isTouching(PortalBR)){
      window.location="BreakoutGame.html"
    }
    
    

    trex.velocityY = trex.velocityY + 0.8
  

    spawnReverseClouds();

   // spawnFlyingBoss();

    spawnReverseObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        dieSound.play()
        //trex.velocityY=-12
        //jumpSound.play()
    }
  
  }

   if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
 
      trex.changeAnimation("collided", trex_collided);
     
 
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 

  trex.collide(invisibleGround);
  if(mousePressedOver(restart)){
    window.location="TheOngoer.html"
  }
  


  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 40 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6+score/100);
   

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
   

    obstaclesGroup.add(obstacle);
 }
}

function spawnReverseObstacles(){
 if (frameCount % 40 === 0){
   var obstacle = createSprite(0,165,10,40);
   obstacle.velocityX = (6+score/100);
   

    var rand = Math.round(random(1,9));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      case 7: obstacle.addImage(pBossImg);
              break;
      case 8: obstacle.addImage(pBossImg);
              break;
      case 9: obstacle.addImage(pBossImg);
              break;
      default: break;
    }

    //obstacle.debug=true

    if(rand == 7||rand == 8||rand == 9){
      obstacle.y = Math.round(random(60,165))
      obstacle.setCollider("rectangle",0,0,100,50)
    }
    else{
      obstacle.y=165
    }
   
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   

    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {


  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 241;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

function spawnReverseClouds() {

if (frameCount % 60 === 0) {
   cloud = createSprite(0,100,40,10);
  cloud.y = Math.round(random(10,60));
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;
  cloud.velocityX = 3;
  
   //assign lifetime to the variable
  cloud.lifetime = 241;
  
  //adjust the depth
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  
  //adding cloud to the group
 cloudsGroup.add(cloud);
  }
}

/*function spawnFlyingBoss(){
    if(frameCount % 100 === 0 ){
    pBoss = createSprite(0,50,10,10);
    pBoss.y = Math.round(random(10,70));
    pBoss.addImage(pBossImg)
    pBoss.scale = 0.2
    pBoss.velocityX = (6+score/100);
    pBoss.lifetime = 200
    pBoss.depth=cloud.depth
    pBoss.depth=pBoss.depth+1
    pBossGroup.add(pBoss)
    pBoss.debug=true
    pBoss.setCollider("rectangle", 0,0,100,20)
  }
  
 
}
*/

/*function reset(){
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running", trex_running)
  score=0
}
*/