
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

function preload()
{
	treeImg = loadImage("Assets/tree.png");
	boyImg = loadImage("Assets/boy.png");
}

function setup() {
	createCanvas(1200, 700);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ground = new Ground(600, height, 1200, 10);
	
	boy = createSprite(200, 620);
	boy.addImage(boyImg);
	boy.scale = 0.1;

	tree = createSprite(1000, 410);
	tree.addImage(treeImg);
	tree.scale = 0.5;

	mango1 = new Mango(848, 286, 40);
	mango2 = new Mango(868, 256, 40);
	mango3 = new Mango(900, 240, 40);
	mango4 = new Mango(923, 248, 40);

	stone = new Stone(148, 563, 40);
	slingShot = new SlingShot(stone.body, {x: 148, y: 563});
	

	

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(66);

 
  
  drawSprites();
  Engine.update(engine);
  ground.display();
  
  text(mouseX + ", " + mouseY, mouseX, mouseY);

  stone.display();
  slingShot.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();

  detectColl(stone, mango1);
  detectColl(stone, mango2);
  detectColl(stone, mango3);
  detectColl(stone, mango4);
}

function mouseDragged(){
    
        Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingShot.fly();
    
}

function keyPressed(){
    if(keyCode === 32){
    slingShot.attach(stone.body);
    }
}

function detectColl(stoneeee, mangoooo) {
	mangoBodyPosition = mangoooo.body.position;
	stoneBodyPosition = stoneeee.body.position;
	
	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
	if (distance <= mangoooo.r + stoneeee.r) {
		Matter.Body.setStatic(mangoooo.body, false);
	}
}





