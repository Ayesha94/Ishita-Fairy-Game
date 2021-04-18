const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var energy = 100;
var randNum, randNum2, randNum3;
var healthyObjectGroup, unhealthyObjectGroup, fireballGroup, fairyBallGroup;

function preload() {
    backgroundImg = loadImage("images/back.jpg");
    fairyImg = loadImage("images/fairyImage1.png");
    appleImg = loadImage("images/apple.png");
    orangeImg = loadImage("images/orange.png");
    burgerImg = loadImage("images/burger.png");
    fairyballsImg = loadImage("images/fairy balls.png");
    fireballsImg = loadImage("images/fire ball.png");
    girlImg = loadImage("images/girl.png");
    boyImg = loadImage("images/boy.png");
    sodaImg = loadImage("images/soda.png");
    strawImg = loadImage("images/straw.png");
    frenchfriesImg = loadImage("images/frenchfries.png");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;

    fairy = createSprite(displayWidth/2,50);
    fairy.addImage(fairyImg);
    fairy.scale=0.3;
   // fairy.velocityX=2;
    fairy.setCollider("rectangle",0,0,1100,1100)

    girl = createSprite(200,height-150);
    girl.addImage(girlImg);
    girl.scale = 0.4;

    edges = createEdgeSprites();

    //Healthy objects group
    healthyObjectGroup=createGroup();
    //Unhealthy Objects group
    unhealthyObjectGroup=createGroup();
    //fireball group
    fireballGroup=createGroup();
    //fairyBall group
    fairyBallGroup=createGroup();

}

function draw(){

    background(backgroundImg);
    Engine.update(engine);
    
    if(frameCount % 70 === 0){
    fairy.x = Math.round(random(50,width-50));
    }

    if(fairy.isTouching(edges)){
    fairy.bounceOff(edges);
    }
    
    if(keyDown("right")){
        girl.x+=10;
    }
    if(keyDown("left")){
        girl.x-=10;
    }
    
    fill("red");
    textSize(50);
    text("Energy :"+energy,width-350,50);

    girl.bounceOff(edges);
    
    createObject();
    //healthy-> energy level shud increase by 50
    //fairyball->100
    if(girl.isTouching(healthyObjectGroup)){
        increaseEnergy();
        healthyObject.destroy();
    }
    
    drawSprites();
}

function createObject(){
    if(frameCount % 70 === 0){

        randNum=Math.round(random(1,4));
        console.log(randNum)
        //healthy object will be created
        if(randNum === 1){

            healthyObject = createSprite(fairy.x,fairy.y);
            healthyObject.velocityY=3;
            healthyObject.scale=0.1;

            healthyObjectGroup.add(healthyObject);
            healthyObjectGroup.setLifetimeEach(300);
            //healthy object can be apple(1)/orange(2)/strawberry(3)/fireball(4/5)
            var randNum2 = Math.round(random(1,3));
            switch(randNum2){
                
                case 1 : healthyObject.addImage(appleImg);
                break;
                case 2 : healthyObject.addImage(orangeImg);         
                break;
                case 3 : healthyObject.addImage(strawImg);
                            healthyObject.scale = 0.3;
                break;
               
            }
        }

        //unhealthy oject will be created in randNum value is 2
        if(randNum===2){
            unhealthyObject = createSprite(fairy.x,fairy.y);
            unhealthyObject.velocityY=3;
            unhealthyObject.scale=0.1;

            unhealthyObjectGroup.add(unhealthyObject);
            unhealthyObjectGroup.setLifetimeEach(300);
            randNum3=Math.round(random(1,3));
            switch(randNum3){
                case 1 : unhealthyObject.addImage(sodaImg);
                break;
                case 2 : unhealthyObject.addImage(burgerImg);
                break;
                case 3 : unhealthyObject.addImage(frenchfriesImg);
                break;
            }
        }
        //fireball
        if(randNum===3){
            fireball=createSprite(fairy.x, fairy.y);
            fireball.velocityY=3;
            fireball.scale=0.1;
            fireball.addImage(fireballsImg);
            fireballGroup.add(fireball);
            fireballGroup.setLifetimeEach(300);
        }
        //fairyBall->energy level will inc by 100 
        if(randNum===4){
            fairyBall=createSprite(fairy.x, fairy.y);
            fairyBall.velocityY=3;
            fairyBall.scale=0.1;
            fairyBall.addImage(fairyballsImg);
            fairyBallGroup.add(fairyBall);
            fairyBallGroup.setLifetimeEach(300);
        }
        

    }
}
//to increase energy when the girl will eat healthy food
function increaseEnergy(){
    energy+=50;
}

function decreaseEnergy(){
    energy-=50;
}