
var backgroundImg;
var gizmo,gizmoImg,gizmoStill,gizmoLeft,slash,gizmoUp,gizmoDown;
var f1,fImg,f2,f3,f4,f5,f6;
var edges
var bossC1,bossC2,bossC3,bossImg,bossImgr;
var portalBlue,portalBlueImg;
var ground;
var gameState=0
var START=0
var FLAPPYBIRD=1
var DEAD=2
var gameOver,gameOverImg;
var restart,restartImg;
var BackgroundMusic;
var fence
let posX=0,posY=0


function preload(){
  backgroundImg = loadImage("./Gizmo sprites/Grass Ground.png")
  gizmoImg = loadAnimation("./Gizmo sprites/gizmo-1.png","./Gizmo sprites/gizmo-2.png","./Gizmo sprites/gizmo-3.png","./Gizmo sprites/gizmo-4.png")
  gizmoStill = loadImage("./Gizmo sprites/gizmo-7.png")
  gizmoLeft = loadAnimation("./Gizmo sprites/gizmo-1-r.png","./Gizmo sprites/gizmo-2-r.png","./Gizmo sprites/gizmo-3-r.png","./Gizmo sprites/gizmo-4-r.png")
  bossImg = loadImage("./Gizmo sprites/Wasp-Boss-Clone.png")
  bossImgr = loadImage("./Gizmo sprites/Wasp-Boss-Clone-r.png")
  portalBlueImg = loadImage("./Gizmo sprites/portal-blue.png")
  BackgroundMusic = loadSound("./Music/Puzzle.mp3")
  slash = loadAnimation("./Gizmo sprites/Gizmo-Slashing-1.png","./Gizmo sprites/Gizmo-Slashing-2.png")
  gizmoUp = loadAnimation("./Gizmo sprites/gizmo-1-u.png","./Gizmo sprites/gizmo-2-u.png","./Gizmo sprites/gizmo-3-u.png","./Gizmo sprites/gizmo-4-u.png")
  gizmoDown = loadAnimation("./Gizmo sprites/gizmo-6.png","./Gizmo sprites/gizmo-7.png","./Gizmo sprites/gizmo-5.png","./Gizmo sprites/gizmo-7.png")
  fImg = loadImage("./Gizmo sprites/Stone-fence.png")
  restartImg = loadImage("./Flappy Bird/restart.png")
  gameOverImg = loadImage("./Flappy Bird/gameOver.png")

}

function setup() {
  createCanvas(800,600);

  gizmo = createSprite(100,550,10,10)
  gizmo.addImage("still", gizmoStill)
  gizmo.addAnimation("running", gizmoImg)
  gizmo.addAnimation("leftRunning", gizmoLeft)
  gizmo.addAnimation("slashing", slash)
  gizmo.addAnimation("downRunning", gizmoDown)
  gizmo.addAnimation("upRunning", gizmoUp)

  gizmo.setCollider("rectangle",0,0,100,200)

  gizmo.scale = 0.3

  bossC1 = createSprite(250,380,10,10)
  bossC1.velocityX=-5
  bossC1.addImage("walkingLeft", bossImg)
  bossC1.addImage("walkingRight", bossImgr)
  bossC1.scale=0.12
  //bossC1.debug=true
  bossC1.setCollider("rectangle",0,0,300,500)

  bossC2 = createSprite(450,230,10,10)
  bossC2.velocityX=-5
  bossC2.addImage("walkingLeft", bossImg)
  bossC2.addImage("walkingRight", bossImgr)
  bossC2.scale=0.12
  //bossC2.debug=true
  bossC2.setCollider("rectangle",0,0,300,500)

  bossC3 = createSprite(350,80,10,10)
  bossC3.velocityX=5
  bossC3.addImage("walkingRight", bossImgr)
  bossC3.addImage("walkingLeft", bossImg)
  bossC3.scale=0.12
  //bossC3.debug=true
  bossC3.setCollider("rectangle",0,0,300,500)



  edges = createEdgeSprites()


  f1 = createSprite(150,450,100,10)
  f1.addImage(fImg)
  f1.scale=0.5
  f1.setCollider("rectangle",5,25,670,155)

  f2 = createSprite(640,450,100,10)
  f2.addImage(fImg)
  f2.scale=0.5
  f2.setCollider("rectangle",5,25,670,155)

  f3 = createSprite(425,300,100,10)
  f3.addImage(fImg)
  f3.scale=0.5
  f3.setCollider("rectangle",5,25,670,155)

  f4 = createSprite(150,300,100,10)
  f4.addImage(fImg)
  f4.scale=0.5
  f4.setCollider("rectangle",5,25,670,155)

  f5 = createSprite(640,150,100,10)
  f5.addImage(fImg)
  f5.scale=0.5
  f5.setCollider("rectangle",5,25,670,155)

  f6 = createSprite(150,150,100,10)
  f6.addImage(fImg)
  f6.scale=0.5
  f6.setCollider("rectangle",5,25,670,155)
  
  gameOver = createSprite(400,230,20,20)
  gameOver.addImage(gameOverImg)
  gameOver.scale=1.3

  restart = createSprite(400,300,10,10)
  restart.addImage(restartImg)
  restart.scale=0.7

  portalBlue = createSprite(600,75,10,10)
  portalBlue.addImage("bluePortal", portalBlueImg)
  portalBlue.scale=0.3

  BackgroundMusic.loop()
  BackgroundMusic.setVolume(0.2)


}


function draw() 
{
  background(backgroundImg);
  textSize(20)
  stroke(10)
  fill("red")
  text("", 490, 190)

  
  gizmo.collide(f1)
  gizmo.collide(f2)
  gizmo.collide(f3)
  gizmo.collide(f4)
  gizmo.collide(f5)
  gizmo.collide(f6)

 

  
  portalBlue.depth=f5.depth
  f5.depth = f5.depth+1

 

  if(gameState===START){
    
    gameOver.visible=false
    restart.visible=false

    if(bossC2.x<20){
      bossC2.bounceOff(edges)
      bossC2.changeImage("walkingRight")
    }

    if(bossC2.x>780){
      bossC2.bounceOff(edges)
      bossC2.changeImage("walkingLeft")
    }

    if(bossC3.x<20){
      bossC3.bounceOff(edges)
      bossC3.changeImage("walkingRight")
    }

    if(bossC3.x>780){
      bossC3.bounceOff(edges)
      bossC3.changeImage("walkingLeft")
    }

    if(bossC1.x<20){
      bossC1.bounceOff(edges)
      bossC1.changeImage("walkingRight")
    }

    if(bossC1.x>780){
      bossC1.bounceOff(edges)
      bossC1.changeImage("walkingLeft")
    }



    if(keyDown("RIGHT_ARROW")){
      gizmo.x = gizmo.x+5
      gizmo.changeAnimation("running", gizmoImg)
    }
    else{
      gizmo.changeImage("still")
    }
  
    if(keyDown("LEFT_ARROW")){
      gizmo.x = gizmo.x-5
      gizmo.changeAnimation("leftRunning")
    }
    if(keyDown("UP_ARROW")){
      gizmo.y = gizmo.y-5
      gizmo.changeAnimation("upRunning")
    }
    if(keyDown("DOWN_ARROW")){
      gizmo.y = gizmo.y+5
      gizmo.changeAnimation("downRunning")
    }
    if(keyDown("SPACE")){
      gizmo.changeAnimation("slashing")
    }

    if(gizmo.isTouching(portalBlue)){
      gameState=FLAPPYBIRD

    }

    if(gizmo.isTouching(bossC1)||gizmo.isTouching(bossC2)||gizmo.isTouching(bossC3)){
      gameState=DEAD
    }
  }

if(gameState===DEAD){
  gameOver.visible=true
  restart.visible=true
  bossC1.velocityX=0
  bossC2.velocityX=0
  bossC3.velocityX=0
  if(mousePressedOver(restart)){
    window.location.reload()
  }
}

if(gameState===FLAPPYBIRD){
window.location="FlappyBird.html"
  }
 
  
  drawSprites()
}
/*if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }*/