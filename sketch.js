

let snakeLength = 1;
let headX = 1;
let headY = 1;
let snake = [[headX,headY]];
let xv = 0;
let yv = 0;

let foodX = 5;
let foodY = 5;

let screenWidth = 400;
let screenHeight = 400
let gridWidth = 20;
let gridHeight = 20;
let tileWidth = screenWidth/gridWidth;
let tileHeight = screenHeight/gridHeight;



function setup() {
  createCanvas(400, 400);
  frameRate(10);
}

function draw() {
  background(220);
  
  //move the snake
  headX += xv;
  headY += yv;
  
  //add new head location to snake array
  snake.push([headX, headY]);
  
  //check if snake has eaten the food
  if (headX == foodX && headY == foodY){
    snakeLength++;
    let foodGood = false;
    while (!foodGood){
      foodX = int(random(gridWidth));
      foodY = int(random(gridHeight));
      
      //check if food is in snake
      foodGood = true;
      for (let i = 0; i < snake.length; i++){
        if (snake[i][0] == foodX && snake[i][1] == foodY){
          foodGood = false;
        }
      }
    }
    
  }
  
  
  
  //check if the snake has collided with itself
  for (let i = 0; i < snake.length-1; i++){ //dont check last element as it is the head
    if (snake[i][0] == headX && snake[i][1] == headY){
      //kill the player
      snakeLength = 1;
      headX = 1;
      headY = 1;
      snake = [[headX,headY]];
      xv = 0;
      yv = 0;
    }
  }
  
  //remove last segment if snake is too long
  if (snake.length > snakeLength){
    snake.splice(0,1);
  }
  
  //check if player is off screen
  if (headX < 0 || headX >= gridWidth || headY < 0 || headY >= gridHeight){
    //kill the player
    snakeLength = 1;
    headX = 1;
    headY = 1;
    snake = [[headX,headY]];
    xv = 0;
    yv = 0;
  }
  
  //draw the food
  fill(255,0,0);
  rect(foodX*tileWidth, foodY*tileHeight, tileWidth, tileHeight);
  
  //draw the snake
  for (let i = 0; i <  snake.length; i++){
    fill(0,0,255);
    rect(snake[i][0]*tileWidth, snake[i][1]*tileHeight, tileWidth, tileHeight);
  }
  
}

//detect key presses
function keyPressed(){
  if (key == "d"){
    xv = 1;
    yv = 0;
  } else if (key == "a"){
    xv = -1;
    yv = 0;
  } else if (key == "w"){
    xv = 0;
    yv = -1;
  } else if (key == "s"){
    xv = 0;
    yv = 1;
  } 
}