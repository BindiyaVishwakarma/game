const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

const backgroundMusic = document.getElementById("backgroundMusic");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = '';
let food = spawnFood();
let score = 0;
let highestScore = localStorage.getItem('highestScore') || 0;

const scoreDisplay = document.getElementById('score');
const highestScoreDisplay = document.getElementById('highestScore');

const foodSound = new Audio('audio/food.mp3');
const gameOverSound = new Audio('audio/gameover.mp3');
const moveSound = new Audio('');

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    highestScoreDisplay.textContent = highestScore;
    backgroundMusic.play(); // Start the background music
    game = setInterval(draw, 100);
}

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
        moveSound.play();
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
        moveSound.play();
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
        moveSound.play();
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
        moveSound.play();
    }
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function draw() {
    ctx.fillStyle = 'rgb(139, 211, 172)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.textContent = score;
        foodSound.play();
        food = spawnFood();
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        gameOverSound.play();
        if (score > highestScore) {
            highestScore = score;
            localStorage.setItem('highestScore', highestScore);
        }
        highestScoreDisplay.textContent = highestScore;
        backgroundMusic.pause(); // Stop the background music
        backgroundMusic.currentTime = 0; // Reset the music to the beginning
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'white';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    clearInterval(game);
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = '';
    food = spawnFood();
    score = 0;
    scoreDisplay.textContent = score;
    backgroundMusic.play(); // Restart the background music
    game = setInterval(draw, 100);
}
