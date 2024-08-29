const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'Draw';
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(board.children).indexOf(cell);

    if (boardState[index] || !isGameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Add class for animation

    const winner = checkWin();
    if (winner) {
        isGameActive = false;
        if (winner === 'Draw') {
            statusText.textContent = 'التعادل!';
        } else {
            statusText.textContent = `اللاعب ${winner} فاز!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `اللاعب ${currentPlayer} دوره!`;
    }
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = 'اللاعب X يبدأ!';
    Array.from(board.children).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Remove classes for reset
    });
}

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
