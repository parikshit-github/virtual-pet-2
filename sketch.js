//Create variables here
var dog,saddog,happydog;
var foodObj;
var foodS, foodStock;
var fedTime,lastFed,feed,addFood;

function preload()
{
	//load images here
  saddog = loadImage("dog1.png");
  happydog = loadImage("dog2.png");

}

function setup() {
	createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(saddog);
  dog.scale = 0.15;

  food = createButton("Feed charley :D");
  food.position(690,95);
  food.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
 
  background(46,10,245);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >=12){
    text ("Last Feed: "+lastFed%12+"PM",350,90);
   }
   else{
     text("Last Feed : "+lastFed+"AM",350,30);
   }


  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}


