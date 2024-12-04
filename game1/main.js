const canvas = document.getElementById("gameCanvas");
const ctx = canvas .getContext("2d");

const box =20;
let sanke =[{x:9*box ,y : 9 * box}];
let direction='';
let food; SpawnFood;
let score=0;
const foodSound = new Audio('./musice/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');

function changeDirection(event){
    if(event.keycode === 37 && direction ! =='RIGHT')
    {
        direction="LEFT";
        moveSound.play();
    }elseif (Event.keycode === 38 && direction!== "DOWN")
    {
      direction="UP";
      moveSound.play();
    }elseif (Event.keycode === 38 && direction!== "LEFT")
    {
      direction="RIGHT";
      moveSound.play();
    }elseif (Event.keycode === 38 && direction!== "UP")
    {
      direction="LEFT";
      moveSound.play();
    }
}

function SpawnFood(){
    return{
        x: Math.floor(Math.random() * (canvas.width/ box)) * box,
        y: Math.floor (Math.random() * (canvas.height / box)) * box
    }
}
    
