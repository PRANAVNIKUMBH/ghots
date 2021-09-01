var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4
  
  doorsGroup = createGroup()

  climbersGroup = createGroup()

  invisibleBlockGroup = createGroup()

  spookySound.play()
  spookySound.setVolume(0.09)
  

}

function draw() {
  background(0);
  
if(gameState==="play"){
  score = score + Math.round(getFrameRate()/62) 
  if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("space")){
  ghost.velocityY = -3
  }
  ghost.velocityY = ghost.velocityY+0.2
  
  ghost.velocityX = 0
  
  if(keyDown("left")){
  ghost.velocityX = -3
  }
  
  if(keyDown("right")){
    ghost.velocityX = 3
    }
  doors()
  ghost.collide(climbersGroup)
  if(ghost.isTouching(invisibleBlockGroup)||ghost.y > 600  ){
    gameState = "end"
  }

}
drawSprites()

if(gameState==="end"){
ghost.destroy()
tower.destroy()
doorsGroup.destroyEach()
invisibleBlockGroup.destroyEach()
climbersGroup.destroyEach()

spookySound.stop()

textSize(30)
fill("red")

text("GAME OVER",200,300)  


}
fill ("white")
 text('Score = ' +score,450,50) 
  
}

function doors(){
if(frameCount%250===0){
door = createSprite(random(100,500),-40)
door.velocityY = 1
door.addImage(doorImg)

ghost.depth = door.depth+1 

climber = createSprite(door.x, 10   )
climber.velocityY = 1
climber.addImage(climberImg)


invisibleBlock = createSprite(door.x,20,74,10 )
invisibleBlock.velocityY = 1
invisibleBlock.visible = false

doorsGroup.add(door)

climbersGroup.add(climber)

invisibleBlockGroup.add(invisibleBlock)
}
}
