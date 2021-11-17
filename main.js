const gameGrid = document.querySelector('.grid');
const startButton = document.getElementById('start-btn');
let scoreDisplay = document.getElementById('player-score');
let squares = [];
let snake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let interval = 1000;
const speed = 0.90;
let timerId = 0;

function createGrid() {
    for (let i = 0; i < (width * width); i++) {
        // create element
        const square = document.createElement('div');

        // add styling to element
        square.classList.add('square');

        // temp, add numbers to grid
        // square.textContent = i;

        // add element (div) to gameBoard
        gameGrid.appendChild(square);

        // add element (div) to squares array
        squares.push(square);
    }
}

createGrid(); 

snake.forEach(index => squares[index].classList.add('snake'));

startButton.addEventListener('click', startGame);

function startGame() {
    // hide button
    startButton.style.display = 'none';
    
    // reset snake
    snake.forEach(index => squares[index].classList.remove('snake'));
    snake = [2, 1, 0];
    snake.forEach(index => squares[index].classList.add('snake'));

    // reset apple
    squares[appleIndex].classList.remove('apple');
    generateApples();
    
    // reset game
    clearInterval(timerId);
    interval = 1000;
    timerId = setInterval(move, interval);
    direction = 1;
    score = 0;
    scoreDisplay.textContent = score;
}

function move() {
    // wall logic
    if (
        // bottom wall
        ( snake[0] + width >= (width * width) && direction === width ) ||
        // top wall
        ( snake[0] - width < 0 && direction === -width ) ||
        // left wall
        ( snake[0] % width === 0 && direction === -1 ) ||
        // right wall
        ( snake[0] % width === (width - 1) && direction === 1 ) ||
        // snake turns on itself
        ( squares[snake[0] + direction].classList.contains('snake') )
    ) {
        // show button
        startButton.style.display = 'initial';
        
        // stop game
        return clearInterval(timerId);
    }
    
    // remove last element from snake array
    const tail = snake.pop();

    // remove styling from last element
    squares[tail].classList.remove('snake');

    // add square in direction of movement
    snake.unshift(snake[0] + direction);

    // eating apple
    if ( squares[snake[0]].classList.contains('apple') ) {
        // remove apple
        squares[snake[0]].classList.remove('apple');

        // add length to snake
        squares[tail].classList.add('snake');
        snake.push(tail);

        // add new apple
        generateApples();
        
        // add to score
        score += 1;
        scoreDisplay.textContent = score;

        // speed up snake
        clearInterval(timerId);
        interval = interval * speed;
        timerId = setInterval(move, interval);
    }

    // add styling snake
    squares[snake[0]].classList.add('snake');
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));

    squares[appleIndex].classList.add('apple')
}

document.addEventListener('keydown', control);

function control(event) {
    switch (event.key) {
        case "Down": // IE and Edge
        case "ArrowDown":
            direction = +width;
            break;
        case "Up": // IE and Edge
        case "ArrowUp":
            direction = -width;
            break;
        case "Left": // IE and Edge
        case "ArrowLeft":
            direction = -1;
            break;
        case "Right": // IE and Edge
        case "ArrowRight":
            direction = 1;
            break;
        default:
            return;
    }
}