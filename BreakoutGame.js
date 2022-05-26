
var ball,ballImg;

var score=0
var lives=3
var gameState=0

var SERVE=0
var PLAY=1
var END=2

var paddle;
var bricks;
var edges;
var floor

var bp, bpImg;

var BackgroundMusic


function preload(){

  bricks = new Group()

  ballImg = loadImage("./Gizmo sprites/gizmo-5.png")
  bpImg = loadImage("./Gizmo sprites/portal-blue-down.png")
  BackgroundMusic = loadSound("./Music/Puzzle.mp3")

}

function setup() {
  createCanvas(900,600);

  ball = createSprite(450,500,10,10)
  ball.addImage(ballImg)
  ball.scale=0.2

  paddle = createSprite(450,590,100,10)
  paddle.shapeColor="lightblue"

  bp = createSprite(450,350,10,10)
  bp.addImage(bpImg)
  bp.scale=0.2

  floor = createSprite(450,600,900,1)

  edges = createEdgeSprites()

  BackgroundMusic.loop()
  BackgroundMusic.setVolume(0.2)

}






function draw() 
{
  background(51);

  textSize(20);
  text("Score:"+score,40,25);
  text("Lives:"+lives,40,45);

  if(gameState===SERVE){
    bp.visible=false
    text("Press Space to start", 380,300)
    ball.velocityX =0
    ball.velocityY =0
    ball.x = 450;
    ball.y = 500;

    if(keyDown("SPACE")){

      ball.velocityX=6
      ball.velocityY=10

      if(gameState===SERVE){
        ball.velocityY = -7
    ball.velocityX = -7
      gameState=PLAY
      }

  }
  }


  if(gameState===PLAY){

    bp.visible=false

    paddle.x = World.mouseX

  if(paddle.x<50){
    paddle.x = 50
  }

  if(paddle.x>850){
    paddle.x=850
  }

  ball.bounceOff(edges)
  ball.bounceOff(paddle)
  ball.bounceOff(bricks, brickHit)

  if(!bricks[0]){
    ball.velocityX = 0
    ball.velocityY = 0
    text("your decent", 350,200)
  }

  if(score==350){
    bp.visible=true
  }
  if(ball.isTouching(bp)){
    window.location="Cliff-Hanger.html"
  }

  if(ball.isTouching(floor)){
    lifeover()
  }

}

if(gameState===END){
    text("trash",380,250)
    ball.remove()
  }
  

createBrickRow(65,"red")
createBrickRow(65+29,"orange")
createBrickRow(65+29+29,"yellow")
createBrickRow(65+29+29+29,"green")
createBrickRow(65+29+29+29+29,"blue")
createBrickRow(65+29+29+29+29+29,"purple")


  drawSprites()
  
}

function createBrickRow(y, color){
  for(c=0; c<14;c++){
    var brick = createSprite(65+54*c,y,50,25)
    brick.shapeColor = color;
    bricks.add(brick)
  }
}


function brickHit(ball, brick){
  brick.remove();
  score = score+5
}

function lifeover(){
  lives = lives - 1;
  if(lives>=1){
    gameState=SERVE
  }
  else{
    gameState=END
  }
}

//breakout close (core mechanics)
//mouse to control the paddle, click to start
/*var paddle, ball, wallTop, wallBottom, wallLeft, wallRight;
var bricks;
var MAX_SPEED = 9;
var WALL_THICKNESS = 30;
var BRICK_W = 80;
var BRICK_H = 40;
var BRICK_MARGIN = 4;
var ROWS = 4;
var COLUMNS = 8;
var colors = ["red","orange","green", "yellow"];

var hitSound;

var gameState = "initial"
var lives = 3


function preload(){
  hitSound = loadSound("./Music/Puzzle.mp3")
  brick_hit = loadSound("./Music/Puzzle.mp3")
}

function setup() {
  createCanvas(800, 600);
  paddle = createSprite(width/2, height-50, 120, 10);
  paddle.immovable = true;
  wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallTop.immovable = true;
  wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
  wallBottom.immovable = true;
  wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallLeft.immovable = true;
  wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
  wallRight.immovable = true;
  bricks = new Group();
  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 80;
  for(var r = 0; r<ROWS; r++)
    for(var c = 0; c<COLUMNS; c++) {
      var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.shapeColor = colors[r];
      bricks.add(brick);
      brick.immovable = true;
    }
  //the easiest way to avoid pesky multiple collision is to
  //have the ball bigger than the bricks
  ball = createSprite(width/2, height-200, 20, 20);
  ball.maxSpeed = MAX_SPEED;
  ball.shapeColor = 'white';
  paddle.shapeColor = color(0, 0, 255);
}
function draw() {
  background('black');
  
  if(gameState === "win"){
    textSize(32);
    fill("green");
    text('Congratulations you won the game !!!', 110, height/2);
  }
  
  
    if(gameState == "serve" || gameState === "initial"){
     textSize(32);
    fill("green");
    text("Click to break the bricks", width/2-150, height / 2 +100);
    ball.velocity.x =0;
    ball.velocity.y = 0;
    ball.position.x = width/2;
    ball.position.y = height/2;
    paddle.position.x = width/2
     
    
  }
  
  
  if(gameState === "end"){
    textSize(32);
    fill("green");
    text("Game Over !!!", width/2-100, height / 2 +100);
    ball.remove()
  }
  
  
  if(gameState=== "start"){
    paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);
    
    
     
    if(bricks.length === 0){
      gameState = "win"
    }
    
    
    
    ball.bounce(wallTop);
    ball.bounce(wallLeft);
    ball.bounce(wallRight);
    
     if(ball.bounce(wallBottom)){
      this.lifeover()
    };
    
    if(ball.bounce(paddle))
    {
      hitSound.play()

      var swing = (ball.position.x-paddle.position.x)/3;
      ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
       hitSound.setVolume(1);
    }
    ball.bounce(bricks, brickHit);
  }
  drawSprites();
  
}

function mousePressed() {
  if(ball.velocity.x == 0 && ball.velocity.y == 0){
    ball.setSpeed(MAX_SPEED, random(90-10, 90+10));
    gameState = "start"
}}


function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gameState = "serve";
  }
  else {
    gameState = "end";
    
  }
}

function brickHit(ball, brick) {
  brick.remove();
  brick_hit.play();
}*/
