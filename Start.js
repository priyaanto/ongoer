 
var play, playImg
var title, titleImg;
var backgroundImg
var gameState=0
var START=0
var STORY=1
var OBJECTIVE=2
var AGREEMENT=3
var BEGIN=4
var story, storyImg;
var next, nextImg, next2;
var objective, objectiveImg;
var start, startImg
var  BackgroundMusic

function preload(){
  playImg = loadImage("./Gizmo sprites/Play Button.png")
  titleImg = loadImage("./Gizmo sprites/The Ongoer Title.png")
  backgroundImg = loadImage("./Gizmo sprites/BackGround-Better.png")
  storyImg = loadImage("./Gizmo sprites/story.png")
  nextImg = loadImage("./Gizmo sprites/Next.png")
  objectiveImg = loadImage("./Gizmo sprites/Objectives.png")
  startImg = loadImage("./Gizmo sprites/Play.png")
  bMusic = loadSound("./Music/Puzzle.mp3")
}

function setup() {
  createCanvas(1200,600);

  play = createSprite(600,400,20,20)
  play.addImage(playImg)
  play.scale=0.1

  title = createSprite(600,200,20,20)
  title.addImage(titleImg)
  title.scale=0.5

  story = createSprite(600,300,20,20)
  story.addImage(storyImg)
  story.scale=0.7

  next = createSprite(1130,530,10,10)
  next.addImage(nextImg)
  next.scale=0.2

  next2 = createSprite(1130,430,10,10)
  next2.addImage(nextImg)
  next2.scale=0.2

  objective = createSprite(600,300,20,20)
  objective.addImage(objectiveImg)
  objective.scale=0.8

  start = createSprite(600,300,10,10)
  start.addImage(startImg)
  start.scale=0.3

  bMusic.loop()
  bMusic.setVolume(0.2)
  
}

console.log("this is:",gameState)

function draw() 
{
  background(backgroundImg);

  if(gameState===START){
    story.visible=false
    next.visible=false
    next2.visible=false
    objective.visible=false
    start.visible=false

    if(mousePressedOver(play)){
      gameState=STORY
    }
  }

  if(gameState===STORY){
    story.visible=true
    next.visible=true
    title.visible=false
    play.visible=false
    objective.visible=false
    start.visible=false
    next2.visible=false


    if(mousePressedOver(next)){
      gameState=OBJECTIVE
    }

  }

  if(gameState===OBJECTIVE){
    objective.visible=true
    story.visible=false
    next.visible=false

    title.visible=false
    play.visible=false
    start.visible=false
    next2.visible=true

    if(mousePressedOver(next2)){
      gameState=AGREEMENT
    }

  }

  if(gameState===AGREEMENT){
    start.visible=true
    objective.visible=false
    story.visible=false
    next.visible=false
    next2.visible=false
    title.visible=false
    play.visible=false

    if(mousePressedOver(start)){
      gameState=BEGIN
    }

  }

  if(gameState===BEGIN){
    window.location="TheOngoer.html"
  }

  drawSprites()
  
}