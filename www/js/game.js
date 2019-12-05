const canvas = document.getElementById("map");
let ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/map.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 16;

let score = 0;

let food = {
x: Math.floor((Math.random() * 60))* box,
y: Math.floor((Math.random() * 40))* box
};

let snake = [];
snake[0] = {
  x:30*box,
  y:20*box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event){
  if(event.keyCode == 37 && dir != "right")
    dir = "left";
    else if(event.keyCode == 38 && dir != "down")
    dir = "up";
    else if(event.keyCode == 39 && dir != "left")
    dir = "right";
    else if(event.keyCode == 40 && dir != "up")
    dir = "down";
}

function eatTail(head, arr){
  for(let i = 0; i < arr.length; i++){
    if(head.x == arr[i].x && head.y == arr[i].y)
    clearInterval(game);
  }
}

function drawGame(){
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++){
    ctx.fillStyle = i == 0 ? "red" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "blue";
  ctx.font = "24px Arial";
  ctx.fillText(score,5 * box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y){
    score++;
    food = {
    x: Math.floor((Math.random() * 30))* box,
    y: Math.floor((Math.random() * 20))* box,
    };
  }else
    snake.pop();

  if(snakeX <0 || snakeX >960 || snakeY <0 || snakeY >640)
  clearInterval(game);
  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up")snakeY -= box;
  if(dir == "down")snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 50);
