let board = document.getElementById('board');
let answeredWithinTimeLimit = true;
let currentPlayer = "Player 1";
let currentMathQuestion;
let winner = false;
function changeBoardColor() {
    let boardColor = document.getElementById('board-color')
    board.style.backgroundColor = boardColor.value;
}

function changeFrameColor() {
    let border = document.getElementById('frame-color');
    const cell = document.getElementsByClassName('cell');

    for (let i = 0; i < cell.length; i++) {
        cell[i].style.borderColor = border.value;
    }
    board.style.borderColor = border.value;
}

function changeXStyling() {
    let color = document.getElementById('x-styling');
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
        let cellContent = cells[i].innerHTML.trim().toUpperCase();

        if (cellContent === 'X') {
            cells[i].style.color = color.value;
        }
    }
}

function changeOStyling() {
    let color = document.getElementById('o');
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
        let cellContent = cells[i].innerHTML.trim().toUpperCase();

        if (cellContent === 'O') {
            cells[i].style.color = color.value;
        }
    }
}

function startTimer(durationInSeconds) {
    let timerDisplay = document.getElementById('timer');

    function updateTimer(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

        timerDisplay.textContent = `${minutes}:${remainingSeconds}`;
    }

    function countdown() {
        let endMessage = document.getElementById('lost');
        if (durationInSeconds >= 0) {
            updateTimer(durationInSeconds);
            durationInSeconds--;
        } else {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Time Expired!';
            answeredWithinTimeLimit = false;
            
        }
    }

    countdown();
    timerInterval = setInterval(countdown, 1000);
}

function mainMenu() {
    const menu = document.getElementsByClassName('main-menu')[0];
    menu.style.display = 'flex';
    const board = document.getElementsByClassName('container')[0];
    board.style.display = 'none';
    let timer = document.getElementById('timer');
    timer.style.display = 'none'; 

    endMessage.innerHTML = "";

}

function startGame() {
    const menu = document.getElementsByClassName('main-menu')[0];
    const board = document.getElementsByClassName('container')[0];
    let timer = document.getElementById('timer');

    menu.style.display = 'none';
    board.style.display = 'flex';
    timer.style.display = 'flex';

    const timerDuration = 30; 
    answeredWithinTimeLimit = true;
    startTimer(timerDuration);
    logic();
}


function logic() {
    // ------------Math problem-----------
    let mathQ = ['What is 1 + 1?', 'What is 2 + 2?', 'What is 3 * 3?'];
    let mathA = ['2', '4', '9'];

    currentMathQuestion = getRandom(mathQ, mathA);
    // math questions display div
    let title = document.getElementById('math-problem-1');
    let title2 = document.getElementById('math-problem-2');

    // forms
    let form1 = document.getElementById('form-1');
    let form2 = document.getElementById('form-2');

    if (currentPlayer === "Player 1") {
        // display math problem for player 1
        title.innerHTML = currentMathQuestion[0];
        form1.style.display = 'flex';
        title.style.display = 'flex';
        // hide math problem for player 2
        title2.style.display = 'none';
        form2.style.display = 'none';
    } else {
        title2.innerHTML = currentMathQuestion[0];
        form2.style.display = 'flex';
        title2.style.display = 'flex';

        form1.style.display = 'none';
        title.style.display = 'none';
    }
}

function checkAnswer(player) {
    const submission = document.getElementById(`answer-${player}`).value;
    let answer = currentMathQuestion[1];

    if (submission === answer && answeredWithinTimeLimit) {
        alert('Correct! You may take your turn now.');

        if (currentPlayer === "Player 1") {
            enableCellClick();
        } else if (currentPlayer === "Player 2") {
            enableCellClick();
        }
    } else {
        alert('Incorrect! Turn skipped.');
        switchPlayer();
    }
}

function getRandom(arrayQ, arrayA) {
    let randomIndex = Math.floor(Math.random() * arrayQ.length);
    return [arrayQ[randomIndex], arrayA[randomIndex]];
}

function enableCellClick() {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleCellClick);
    }
}

function handleCellClick(event) {
    const cell = event.target;

    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer === "Player 1" ? 'X' : 'O';
        disableCellClick();
        switchPlayer();
        checkWinner();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    if (currentPlayer === "Player 1") {
        logic();
    }else{
        logic();
    }
    checkWinner();
}

function disableCellClick() {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', handleCellClick);
    }
}
function checkWinner() {
    const cells = document.getElementsByClassName('cell');
    const boardState = Array.from(cells).map(cell => cell.innerHTML.trim());

    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            boardState[i * 3] === boardState[i * 3 + 1] &&
            boardState[i * 3] === boardState[i * 3 + 2] &&
            boardState[i * 3] !== ''
        ) {
            alert(`${currentPlayer} wins!`);
            winner = true;
            resetGame();
            return;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            boardState[i] === boardState[i + 3] &&
            boardState[i] === boardState[i + 6] &&
            boardState[i] !== ''
        ) {
            alert(`${currentPlayer} wins!`);
            winner = true;
            resetGame();
            return;
        }
    }

    // Check diagonals
    if (
        (boardState[0] === boardState[4] && boardState[0] === boardState[8] && boardState[0] !== '') ||
        (boardState[2] === boardState[4] && boardState[2] === boardState[6] && boardState[2] !== '')
    ) {
        alert(`${currentPlayer} wins!`);
        winner = true;
        resetGame();
        return;
    }

    // Check for a tie
    if (!boardState.includes('')) {
        alert('It\'s a tie!');
        resetGame();
        return;
    }

    function resetGame() {
        const cells = document.getElementsByClassName('cell');
        
        // Clear the board
        Array.from(cells).forEach(cell => {
            cell.innerHTML = '';
        });
    
        // Reset game state
        currentPlayer = 'Player 1';
        answeredWithinTimeLimit = true;
    
        // Start a new round
        mainMenu();
    }
}