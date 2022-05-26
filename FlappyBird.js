var sea;
var seaImg,patrickImg,patrickDownImg;
var patrickRunningDownImg;
var patrickFallingDownImg;
var edges;
var invisibleground
var patrick;
var pipe,pipeImg;
var pipetTop,pipeTopImg;
var pipesGroup,pipeTopGroup;
var PLAY=1
var END=0
var PLAYDOWN=2
var TREX=3
var gameState=PLAY
var gameOver,gameOverImg;
var restart,restartImg;
var score=0;
var start,startImg;
var settings,settingsImg;
var portalG,portalGImg
var PortalB,portalBImg;
var BackgroundMusic

function preload(){
  
  pipesGroup = new Group()
  pipeTopGroup = new Group()

  patrickImg = loadAnimation("./Gizmo sprites/gizmo-1.png")
  patrickDownImg = loadImage("./Gizmo sprites/gizmo-2.png")
  seaImg = loadImage("./Flappy Bird/sea.png");
  pipeImg = loadImage("./Flappy Bird/flappy-bird-pipes.png")
  pipeTopImg = loadImage("./Flappy Bird/flappy-bird-pipes-top.png")
  gameOverImg = loadImage("./Flappy Bird/gameOver.png")
  restartImg = loadImage("./Flappy Bird/restart.png")
  startImg = loadImage("./Gizmo sprites/press-space-to-start.png")
  settingsImg = loadImage("./Flappy Bird/settings.png")
  portalGImg = loadImage("./Flappy Bird/Portal-green.png")
  patrickRunningDownImg = loadAnimation("./Flappy Bird/gizmo-1-Upside-Down.png")
  patrickFallingDownImg = loadImage("./Flappy Bird/gizmo-2-Upside-Down.png")
  portalBImg = loadImage("./Gizmo sprites/portal-blue.png")
  BackgroundMusic = loadSound("./Music/Puzzle.mp3")
}

function setup(){
  createCanvas(400,400);
  background("blue");

  sea=createSprite(400,200);
  sea.addImage(seaImg);
  sea.velocityX = -5;
  sea.scale=0.3;

  edges = createEdgeSprites()

  patrick = createSprite(130,200,30,30)
  patrick.addImage("fallingPatrick", patrickDownImg)
  patrick.addAnimation("flyingPatrick",patrickImg)
  patrick.addAnimation("upsideDownFlyingPatrick", patrickRunningDownImg)
  patrick.addImage("upsideDownFallingPatrick", patrickFallingDownImg)
  patrick.scale =0.12

  invisibleground=createSprite(200,400,400,20)
  invisibleground.visible = false

  gameOver = createSprite(200,200)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.7

  restart = createSprite(200,250)
  restart.addImage(restartImg)
  restart.scale=0.7

  start = createSprite(200,200)
  start.addImage(startImg)
  start.scale=0.2

  settings = createSprite(20,20)
  settings.addImage(settingsImg)
  settings.scale=0.05

  portalG = createSprite(460,200,10,10)
  portalG.addImage("GreenPortal", portalGImg)
  portalG.scale=0.3

  PortalB = createSprite(460,200,10,10)
  PortalB.addImage("BluePortal", portalBImg)
  PortalB.scale = 0.3

  BackgroundMusic.loop()
  BackgroundMusic.setVolume(0.1)
}



function draw() {
  background(0);
 

  if(patrick.isTouching(invisibleground)){
    patrick.collide(invisibleground)
  }
  //console.log("this is", gameState)
  if(gameState===PLAY){

    score = score + Math.round(getFrameRate()/60)
    sea.velocityX = -(3 + 3*score/100)

    sea.velocityX = -3;

    if(sea.x < 0){
     sea.x = sea.width/8;
    }

    if(keyDown("UP_ARROW")){
      patrick.velocityY = -7
      patrick.changeAnimation("flyingPatrick")
    }
    else{
      patrick.changeImage("fallingPatrick")
    }
    
    if(score===400){
      portalG.velocityX = -4
    }

    if(patrick.isTouching(portalG)){
      //patrick.velocityY=patrick.velocityY-0.7
      //patrick.changeImage("upsideDownFallingPatrick")
      gameState=PLAYDOWN
    }
   
  
    patrick.velocityY = patrick.velocityY+0.7
    patrick.collide(edges)
    gameOver.visible = false
    restart.visible=false
    start.visible=false
    settings.visible=true
    patrick.visible=true
    //patrick.debug=true
    patrick.setCollider("circle",0,0,70)

    spawnPipes()
    spawnPipeTop()

    if(pipesGroup.isTouching(patrick)){
      gameState=END
    }
 
    if(pipeTopGroup.isTouching(patrick)){
      gameState=END
    }

  }

  if(gameState===PLAYDOWN){
    
    score = score + Math.round(getFrameRate()/60)
    sea.velocityX = -(3 + 3*score/100)

    sea.velocityX = -3;

    if(sea.x < 0){
     sea.x = sea.width/8;
    }
    patrick.velocityY=patrick.velocityY-0.7
    if(keyDown("UP_ARROW")){
      patrick.velocityY=7
      patrick.changeAnimation("upsideDownFlyingPatrick")
    }
    else{
      patrick.changeAnimation("upsideDownFallingPatrick")
    }

    if(score===600){
      PortalB.velocityX = -4
    }

    if(patrick.isTouching(PortalB)){
      gameState=TREX
    }

    patrick.collide(edges)
    gameOver.visible = false
    restart.visible=false
    start.visible=false
    settings.visible=true
    patrick.visible=true

    spawnPipes()
    spawnPipeTop()

    if(pipesGroup.isTouching(patrick)){
      gameState=END
    }
 
    if(pipeTopGroup.isTouching(patrick)){
      gameState=END
    }
  }

  if(gameState===TREX){
    window.location="T-rex.html"
  }

  if(gameState===END){
    sea.velocityX=0
    gameOver.visible=true
    restart.visible=true
    start.visible=false
    settings.visible=true
    sea.visible=false
    patrick.visible=false
    pipesGroup.setVelocityXEach(0)
    pipeTopGroup.setVelocityXEach(0)
   pipesGroup.destroyEach()
   pipeTopGroup.destroyEach()
    patrick.velocityY=0

    if(mousePressedOver(restart)){
      //reset()
      window.location="TheOngoer.html"
    }
    
  }



  drawSprites();

  textSize(15)
  fill("orange")
  text("Score: "+ score,300,30)
}

function spawnPipes(){
if(frameCount%75===0){
  pipe=createSprite(400,350,40,200)
pipe.addImage(pipeImg)
pipe.y = Math.round(random(350,400))
pipe.velocityX=-3
pipe.scale = 0.3
//console.log(frameCount)
pipe.lifetime = 133
pipesGroup.add(pipe)
pipesGroup.depth=gameOver.depth
gameOver.depth=gameOver.depth +1
pipesGroup.depth=restart.depth
restart.depth=restart.depth +1
pipesGroup.velocityX = -(3 + 3*score/100)
}
}

function spawnPipeTop(){
  if(frameCount%75===0){
    pipeTop=createSprite(400,100,40,200)
  pipeTop.addImage(pipeTopImg)
  pipeTop.y = Math.round(random(10,60))
  pipeTop.velocityX=-3
  pipeTop.scale = 0.3
  //console.log(frameCount)
  pipeTop.lifetime = 133
  pipeTopGroup.add(pipeTop)
  pipeTopGroup.depth=gameOver.depth
  gameOver.depth=gameOver.depth +1
  pipeTopGroup.depth=restart.depth
  restart.depth=restart.depth +1
  pipeTopGroup.velocityX = -(3 + 3*score/100)
  }
  }

  /*function reset(){
    
    gameOver.visible=false
    restart.visible=false
    pipeTopGroup.destroyEach()
    pipesGroup.destroyEach()
    score=0
  }
  */