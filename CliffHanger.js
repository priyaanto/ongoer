
var gizmo, gizmoImg
var boss, bossImg
var backgroundImg
var bp,bpImg
var DDD,DDDIMG
var BackgroundMusic
var p2, p2Img



function preload(){

  backgroundImg = loadImage("./Gizmo sprites/Boss-Fight-Room.jpg")
  bossImg = loadImage("./Gizmo sprites/Boss-Bath.png")
  gizmoImg = loadImage("./Gizmo sprites/gizmo-2.png")
  bpImg = loadImage("./Gizmo sprites/portal-blue-r.png")
  DDDIMG = loadImage("./Gizmo sprites/To-Be-Continued.png")
  BackgroundMusic = loadSound("./Music/Puzzle.mp3")
  p2Img = loadImage("./Gizmo sprites/PART 2 poster.png")

}

function setup() {
  createCanvas(900,600);

  gizmo = createSprite(200,555,10,10)
  gizmo.addImage(gizmoImg)
  gizmo.scale=0.3

  boss = createSprite(750,490,10,10)
  boss.addImage(bossImg)
  boss.scale=0.3

  bp = createSprite(50,490,10,10)
  bp.addImage(bpImg)
  bp.scale=0.3

  DDD = createSprite(700,550,10,10)
  DDD.addImage(DDDIMG)
  DDD.scale=0.3

  p2 = createSprite(450,300,10,10)
  p2.addImage(p2Img)
  p2.scale=0.3

  BackgroundMusic.loop()
  BackgroundMusic.setVolume(0.2)

}






function draw() 
{
  background(backgroundImg);


  drawSprites()
  
}
