let board = document.getElementById('board');
let answeredWithinTimeLimit = true;
let currentPlayer = "Player 1";
let currentMathQuestion;
let winner = false;
let player = "";

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

function mainMenu() {
    const menu = document.getElementsByClassName('main-menu')[0];
    menu.style.display = 'flex';
    const board = document.getElementsByClassName('container')[0];
    board.style.display = 'none';
}

function startGame() {
    const menu = document.getElementsByClassName('main-menu')[0];
    const board = document.getElementsByClassName('container')[0];

    menu.style.display = 'none';
    board.style.display = 'flex';

    answeredWithinTimeLimit = true;
    logic();
}

function logic() {
    // ------------Math problem-----------
    let mathQ = ['What is 1 + 1?', 'What is 2 + 2?', 'What is 3 * 3?'];
    let mathA = ['2', '4', '9'];

    currentMathQuestion = getRandom(mathQ, mathA);
    let title = document.getElementById('math-problem-1');
    let title2 = document.getElementById('math-problem-2');

    let submit1 = document.getElementById('submit-1');
    let submit2 = document.getElementById('submit-2');
    let form1 = document.getElementById('form-1');
    let form2 = document.getElementById('form-2');

    if (currentPlayer === "Player 1") {
        title.innerHTML = currentMathQuestion[0];
        form1.style.display = 'flex';
        title.style.display = 'flex';
        submit1.style.display = 'flex';

        title2.style.display = 'none';
        form2.style.display = 'none';
        submit2.style.display = 'none';
    } else {
        title2.innerHTML = currentMathQuestion[0];
        submit2.style.display = 'flex';
        form2.style.display = 'flex';
        title2.style.display = 'flex';

        form1.style.display = 'none';
        title.style.display = 'none';
        submit1.style.display = 'none';
    }
}

function checkAnswer(player) {
    const submission = document.getElementById(`answer-${player}`).value;
    let answer = currentMathQuestion[1];

    if (submission === answer && answeredWithinTimeLimit) {
        Swal.fire({
            title: 'Correct!',
            text: 'You may take your turn now.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            if (currentPlayer === "Player 1" || currentPlayer === "Player 2") {
                enableCellClick();
            }
        });
    } else {
        Swal.fire({
            title: 'Incorrect!',
            text: 'Turn skipped.',
            icon: 'error',
            confirmButtonText: 'OK',
        }).then(switchPlayer);
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

    if (cell && cell.innerHTML === '') {
        cell.innerHTML = currentPlayer === "Player 1" ? 'X' : 'O';
        player = currentPlayer;
        disableCellClick();
        switchPlayer();
        checkWinner();
    }
}

function switchPlayer() {
    checkWinner();

    if (!winner) {
        currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
        logic();
    }
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

    for (let i = 0; i < 3; i++) {
        if (
            boardState[i * 3] === boardState[i * 3 + 1] &&
            boardState[i * 3] === boardState[i * 3 + 2] &&
            boardState[i * 3] !== ''
        ) {
            showWinnerAlert(`${player} wins!`);
            winner = true;
            return;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (
            boardState[i] === boardState[i + 3] &&
            boardState[i] === boardState[i + 6] &&
            boardState[i] !== ''
        ) {
            showWinnerAlert(`${player} wins!`);
            winner = true;
            return;
        }
    }

    if (
        (boardState[0] === boardState[4] && boardState[0] === boardState[8] && boardState[0] !== '') ||
        (boardState[2] === boardState[4] && boardState[2] === boardState[6] && boardState[2] !== '')
    ) {
        showWinnerAlert(`${player} wins!`);
        winner = true;
        return;
    }

    if (!boardState.includes('')) {
        showTieAlert('It\'s a tie!');
        winner = false;
        return;
    }

    function showWinnerAlert(message) {
        Swal.fire({
            title: 'Winner!',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'winner-popup',
            },
        }).then(resetGame);
    }

    function showTieAlert(message) {
        Swal.fire({
            title: 'It\'s a Tie!',
            text: message,
            icon: 'info',
            confirmButtonText: 'OK',
        }).then(resetGame);
    }
}

function resetGame() {
    const cells = document.getElementsByClassName('cell');

    Array.from(cells).forEach(cell => {
        cell.innerHTML = '';
    });

    currentPlayer = 'Player 1';
    answeredWithinTimeLimit = true;

    mainMenu();
}

document.querySelector('.title').addEventListener('click', resetAndStartNewGame);

function resetAndStartNewGame() {
    winner = false;
    resetGame();
    startGame();
}
