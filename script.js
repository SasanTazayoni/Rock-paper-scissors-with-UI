const selectionButtons = document.querySelectorAll('[data-selection]');
const lastColumn = document.querySelector('[data-last-column]');
const playerScore = document.querySelector('[data-player-score]');
const compScore = document.querySelector('[data-computer-score]');
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
let draws = 0;
let playerWins = 0;
let computerWins = 0;

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', () => {
        const selectionName = selectionButton.dataset.selection;
        const playerSelection = SELECTIONS.find(selection => selection.name === selectionName);
        const result = playRound(playerSelection);
        game(result);
    });
});

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const playerWin = determineWinner(playerSelection, computerSelection);
    const computerWin = determineWinner(computerSelection, playerSelection);
    addSelectionResult(computerSelection, computerWin);
    addSelectionResult(playerSelection, playerWin);
    if (playerSelection === computerSelection) {
        return DRAW;
    }
    if (playerWin) {
        incrementScore(playerScore);
        return WIN;
    }
    if (computerWin) {
        incrementScore(compScore);
        return LOSE;
    }
}

function incrementScore(score) {
    score.innerText = parseInt(score.innerText) + 1;
}

function addSelectionResult(selection, winner) {
    const newDiv = document.createElement('div');
    newDiv.innerText = selection.symbol;
    newDiv.classList.add('result');
    if (winner) {
        newDiv.classList.add('winner');
    }
    lastColumn.after(newDiv);
}

function determineWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function computerPlay() {
    return SELECTIONS[Math.floor(Math.random() * SELECTIONS.length)];
}

function game(result) {
    if (result === DRAW) {
        draws++;
        console.log(`Wins: ${playerWins}, Losses: ${computerWins}, Draws: ${draws}`);
    }
    if (result === WIN) {
        playerWins++
        console.log(`Wins: ${playerWins}, Losses: ${computerWins}, Draws: ${draws}`);
    }
    if (result === LOSE) {
        computerWins++;
        console.log(`Wins: ${playerWins}, Losses: ${computerWins}, Draws: ${draws}`);
    }
    if (playerWins === 5) {
        console.log(`Wins: ${playerWins}, Losses: ${computerWins}, Draws: ${draws}`);
        console.log('Nice! You won!');
        setTimeout(() => {
            alert('Game over! You won!');
            startNewGame();
        });
    }
    if (computerWins === 5) {
        console.log(`Wins: ${playerWins}, Losses: ${computerWins}, Draws: ${draws}`);
        console.log('Loser');
        setTimeout(() => {
            alert('Game over! You lose!');
            startNewGame();
        });
    }
}

function startNewGame() {
    const newGame = confirm("Would you like to play again?");
    if (!newGame) {
        window.close();
    } else {
        draws = 0;
        playerWins = 0;
        computerWins = 0;
        console.log('---------------------------------');
        console.log('New game started - scores have been reset');
        resetScoresUI(playerScore, compScore);
    }
}

function resetScoresUI(resetPlayerScore, resetCompScore) {
    resetPlayerScore.innerText = 0;
    resetCompScore.innerText = 0;
    const addedDivs = document.querySelectorAll('.result');
    addedDivs.forEach(div => {
        div.remove();
    });
}