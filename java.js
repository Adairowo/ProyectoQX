let snake = [];
let food = {};
let score = 0;
let direction = 'right';
let gameOver = false;

const gameBoard = document.querySelector('.game-board');
const scoreBoard = document.querySelector('#score');
const gameOverScreen = document.createElement('div'); // Crear un elemento para el mensaje de "Game Over"
gameOverScreen.className = 'game-over-screen';
document.body.appendChild(gameOverScreen); // Añadirlo al cuerpo del documento

function initGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    score = 0;
    direction = 'right';
    gameOver = false;
    renderGame();
    gameOverScreen.style.display = 'none'; // Ocultar la pantalla de "Game Over"
}

function generateFood() {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return { x, y };
}

function renderGame() {
    gameBoard.innerHTML = '';
    snake.forEach((segment) => {
        const snakeElement = document.createElement('div');
        snakeElement.className = 'snake';
        snakeElement.style.gridColumn = segment.x + 1;
        snakeElement.style.gridRow = segment.y + 1;
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.className = 'food';
    foodElement.style.gridColumn = food.x + 1;
    foodElement.style.gridRow = food.y + 1;
    gameBoard.appendChild(foodElement);

    scoreBoard.textContent = `Score: ${score}`;
}

function updateGame() {
    if (gameOver) return;

    switch (direction) {
        case 'right':
            snake.push({ x: snake[snake.length - 1].x + 1, y: snake[snake.length - 1].y });
            break;
        case 'left':
            snake.push({ x: snake[snake.length - 1].x - 1, y: snake[snake.length - 1].y });
            break;
        case 'up':
            snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y - 1 });
            break;
        case 'down':
            snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y + 1 });
            break;
    }

    if (snake[snake.length - 1].x === food.x && snake[snake.length - 1].y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.shift();
    }

    // Verificar si la serpiente se sale de los bordes
    if (snake[snake.length - 1].x < 0 || snake[snake.length - 1].x >= 20 || snake[snake.length - 1].y < 0 || snake[snake.length - 1].y >= 20) {
        gameOver = true;
        gameOverScreen.style.display = 'flex'; // Mostrar la pantalla de "Game Over"
        gameOverScreen.textContent = `Game Over! Score: ${score} - Press any key to restart`; // Mensaje de fin de juego
    }

    renderGame();
}

document.addEventListener('keydown', (event) => {
    if (gameOver) {
        initGame(); // Reiniciar el juego al presionar cualquier tecla
        return;
    }

    switch (event.key) {
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right'; // Prevenir que la serpiente se mueva en dirección opuesta
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
    }
});

initGame(); // Inicializar el juego al cargar
setInterval(updateGame, 100); // Actualizar el juego cada 100 ms