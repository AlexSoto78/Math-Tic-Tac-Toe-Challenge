let currentPlayer = "Player 1";
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

    enableCellClick();
    updateTurnMessagesVisibility(); // Set initial visibility
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
        switchPlayer();
    }
}

function switchPlayer() {
    checkWinner();

    if (!winner) {
        currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
        updateTurnMessagesVisibility();
    }
}

function updateTurnMessagesVisibility() {
    const player1TurnMessage = document.getElementById('player-1-turn-message');
    const player2TurnMessage = document.getElementById('player-2-turn-message');

    if (currentPlayer === 'Player 1') {
        player1TurnMessage.style.display = 'block';
        player2TurnMessage.style.display = 'none';
    } else {
        player1TurnMessage.style.display = 'none';
        player2TurnMessage.style.display = 'block';
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
}

document.querySelector('.title').addEventListener('click', resetAndStartNewGame);

function resetAndStartNewGame() {
    winner = false;
    resetGame();
    startGame();
}

// Initial setup
startGame();