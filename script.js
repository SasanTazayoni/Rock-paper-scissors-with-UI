const selectionButtons = document.querySelectorAll('[data-selection]');
const playerScore = document.querySelector('[data-player-score]');
const compScore = document.querySelector('[data-computer-score]');
const lastColumn = document.querySelector('[data-last-column]');
const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('[data-modal-content]');
const modalBtn = document.querySelector('[data-modal-btn]');
const overlay = document.querySelector('[data-overlay]');
const SELECTIONS = [
    {
        name: 'rock',
        symbol: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        symbol: '🖐',
        beats: 'rock'
    },
    {
        name: 'scissors',
        symbol: '✌️',
        beats: 'paper'
    }
];
const WIN = 'WIN';
const LOSE = 'LOSE';
const DRAW = 'DRAW';
let wins = 0;
let losses = 0;
let draws = 0;

function getComputerChoice() {
    const computerSelection = SELECTIONS[Math.floor(Math.random() * SELECTIONS.length)];
    return computerSelection;
}

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', () => {
        const selectionName = selectionButton.dataset.selection;
        const playerSelection = SELECTIONS.find(selection => selection.name === selectionName);
        computerSelection = getComputerChoice();
        const result = playRound(computerSelection, playerSelection);
        game(result);
    });
});

function playRound(computerSelection, playerSelection) {
    const playerWin = determineWinner(playerSelection, computerSelection);
    const computerWin = determineWinner(computerSelection, playerSelection);
    updateUI(computerSelection, computerWin);
    updateUI(playerSelection, playerWin);
    if (playerWin) {
        return WIN;
    } else if (computerWin) {
        return LOSE;
    } else {
        return DRAW;
    }
}

function determineWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function updateUI(selection, winner) {
    const newDiv = document.createElement('div');
    newDiv.innerText = selection.symbol;
    newDiv.classList.add('result');
    if (winner) {
        newDiv.classList.add('winner');
    }
    lastColumn.after(newDiv);
}

function incrementScore(score) {
    score.innerText = parseInt(score.innerText) + 1;
}

function game(gameResult) {
    if (gameResult === WIN) {
        wins++;
        incrementScore(playerScore);
        console.log(`Wins: ${wins}, Losses: ${losses}, Draws: ${draws}`);
        console.log('--------------------------');
    } else if (gameResult === LOSE) {
        losses++;
        incrementScore(compScore);
        console.log(`Wins: ${wins}, Losses: ${losses}, Draws: ${draws}`);
        console.log('--------------------------');
    } else {
        draws++;
        console.log(`Wins: ${wins}, Losses: ${losses}, Draws: ${draws}`);
        console.log('--------------------------');
    }
    if (gameOver()) {
        openModal();
        appendMessage();
    }
}

function gameOver() {
    return wins === 5 || losses === 5;
}

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function appendMessage() {
    return wins > losses 
    ? (modalContent.textContent = 'Nice! You won!')
    : (modalContent.textContent = 'You lost... try again');
}

modalBtn.addEventListener('click', startNewGame)

function startNewGame() {
        wins = 0;
        losses = 0;
        draws = 0;
        resetUI(playerScore, compScore);
        console.log('New game started - scores have been reset');
        console.log('---------------------------------------------------');
        modal.classList.remove('active');
        overlay.classList.remove('active');
}

function resetUI(resetPlayerScore, resetCompScore) {
    resetPlayerScore.innerText = 0;
    resetCompScore.innerText = 0;
    const addedDivs = document.querySelectorAll('.result');
    addedDivs.forEach(div => {
        div.remove();
    });
}