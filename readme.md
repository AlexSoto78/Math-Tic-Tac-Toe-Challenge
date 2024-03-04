let board = document.getElementById('board');
let answeredWithinTimeLimit = true;
let currentPlayer = "Player 1";
let currentMathQuestion;

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
        if (durationInSeconds >= 0) {
            updateTimer(durationInSeconds);
            durationInSeconds--;
        } else {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Time Expired!';
            answeredWithinTimeLimit = false;
            switchPlayer();
        }
    }

    countdown();
    timerInterval = setInterval(countdown, 1000);
}

function startGame() {
    const menu = document.getElementsByClassName('main-menu')[0];
    const board = document.getElementsByClassName('container')[0];
    let timer = document.getElementById('timer');

    menu.style.display = 'none';
    board.style.display = 'flex';
    timer.style.display = 'flex';

    const timerDuration = 30; // Set the time limit for each question (in seconds)
    answeredWithinTimeLimit = true;
    startTimer(timerDuration);

    logic();
}

// ------------Math problem-----------
let mathQ = ['What is 1 + 1?', 'What is 2 + 2?', 'What is 3 * 3?'];
let mathA = ['2', '4', '9'];

function logic() {
    currentMathQuestion = getRandom(mathQ, mathA);

    let title = document.getElementById('math-problem-1');
    let title2 = document.getElementById('math-problem-2');

    // forms
    let form1 = document.getElementById('form-1');
    let form2 = document.getElementById('form-2');

    if (currentPlayer === "Player 1") {
        // display math problem for player 1
        title.innerHTML = currentMathQuestion[0];
        title2.style.display = 'none';
        form2.style.display = 'none';
    } else {
        title2.innerHTML = currentMathQuestion[0];
        form2.style.display = 'block';
        title2.style.display = 'block';

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
        startTimer(5); // Start the timer for the next turn
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
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    if (currentPlayer === "Player 1") {
        logic();
    }else{
        logic();
    }
}

function disableCellClick() {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', handleCellClick);
    }
}
