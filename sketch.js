var trex,bg,obstaclesGroup,cloudsGroup,gamestate,gameOver,score, invisibleGround, restart,groundImg,collision,go,r;
var 
trexImg,cloudImg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,bgImg;
var jump,die,score;
function preload(){
  collision=loadImage("trex_collided.png")
  groundImg=loadImage("ground.png")
jump=loadSound("jump.mp3")
score=loadSound("checkPoint.mp3")
die=loadSound("die.mp3")  
trexImg=loadAnimation("Trex1.png","Trex2.png")
cloudImg=loadImage("cloud.png")
bgImg=loadImage("bg.png")
obstacle1=loadImage("ob1.png")
  obstacle2=loadImage("ob2.png")
  obstacle3=loadImage("ob3.png")
  obstacle4=loadImage("ob4.png")
  obstacle5=loadImage("ob5.png")
  obstacle6=loadImage("ob6.png")
  go=loadImage("gameOver.png")
  r=loadImage("replay.png")
}

function setup(){
  createCanvas(800,400)
bg=createSprite(400,200,10,10);
bg.addImage("bg",bgImg)
bg.scale=5.4
bg.x=bg.width/2
//create a trex sprite
trex = createSprite(200,380,20,50);
trex.addAnimation("trex",trexImg);

obstaclesGroup=new Group();
cloudsGroup=new Group();
trex.debug=false;
trex.setCollider("circle",0,0,50);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;
gamestate="play";

gameOver = createSprite(400,200)
    gameOver.addImage("gameOver",go);
  restart = createSprite(400,290);
    restart.addImage("restart",r);
    gameOver.visible=false
    restart.visible=false
    restart.scale=0.2

//create a ground sprite
ground = createSprite(400,380,800,20);
ground.addImage("ground2",groundImg);
ground.x = ground.width /2;

//invisible Ground to support Trex
  invisibleGround = createSprite(400,385,800,5);
invisibleGround.visible = false;


score=0;


//set text
textSize(18);
textFont("Georgia");
}
function draw() {
  //set background to white
  background("white");

  // === / == comparision  and = assignment
  
  if(gamestate==="play"){
     trex.scale=0.3
  //move the ground
  ground.velocityX = -(6+3*score/100);
  bg.velocityX=-(6+3*score/100);
  //scoring
  
  score=score+Math.round(getFrameRate()/24);
    
    
    
  if(score % 100===0 && score>0){
  // score.play();
  }
      if (ground.x < 0){
    ground.x = ground.width/2;
  }
   if (bg.x < 0){
    bg.x = bg.width/2;
  }
   //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 357.5){
    trex.velocityY = -15 ;
    jump.play();
  }
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
   //spawn the clouds
  spawnClouds();
  
  //spawn obstacles
  spawnObstacles();
  
  if (trex.isTouching(obstaclesGroup)){
  gamestate="end";
die.play();
  }
    
  }else if(gamestate==="end"){
    trex.scale=0.7
    ground.velocityX=0
    bg.velocityX=0
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeAnimation("trex",collision);
    gameOver.visible=true
    restart.visible=true
    
  }
  
  if(mousePressedOver(restart)){
    reset()
  }
  drawSprites();
  fill(255)
  textSize(20);
  text("SCORE:"+score,70,50 );
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
 
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,365,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    
    var rand = Math.round (random(1,6));
    switch(rand){
      case  1:obstacle.addImage("obstacle1",obstacle1);
    break;
     case  2:obstacle.addImage("obstacle2",obstacle2);
    break;
     case  3:obstacle.addImage("obstacle3",obstacle3);
    break;
     case  4:obstacle.addImage("obstacle4",obstacle4);
    break;
     case  5:obstacle.addImage("obstacle5",obstacle5);
    break;
     case  6:obstacle.addImage("obstacle6",obstacle6);
    break;
    }
    
    obstaclesGroup.add(obstacle);
    
    //assign scale and lifetime to the obstacle                             
    obstacle.scale = 0.6;
    obstacle.lifetime = 134;
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,320,40,10);
    cloud.y = Math.round(random(40,160));
    cloud.addImage("cloud",cloudImg);
    cloud.scale = 0.2;
    cloud.velocityX = -4;
    cloudsGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function reset(){
  gamestate="play";
  gameOver.visible=false;
  trex.addAnimation("trex",trexImg);
  restart.visible=false;
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  score=0
}
