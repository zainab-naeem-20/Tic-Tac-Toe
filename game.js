let cells = document.querySelectorAll('.cell');
let titleHearder = document.querySelector("titleHeader");
let xplayerDisplay = document.querySelector('xplayerDisplay');
let oplayerDisplay = document.querySelector('oplayerDisplay');

// Variables

let player = 'X';
let isPauseGame = false;
let isGameStart = false;

// Array Of Win Conditions 
const inputCells =  ['','','',
                     '','','',
                     '','',''];

// Array Of Win Conditions 

const winConditions = [
    [0,1,2] , [3,4,5] , [6,7,8],  // Rows
    [0,3,6] , [1,4,7] , [2,5,8], // columns
    [0,4,6] , [2,4,6]  // Daigonals
];

// Add eventlistner to each cell

cells.forEach((cells, index) => {
    cells.addEventListener('click', ()=> topCell(cells, index));
});

function topCell(cell, index){
   if(cell.textContent == '' && !isPauseGame) {
    isGameStart = true;
    updateCell (cell , index);
    if(!checkWinnwe()) {
        changePlayer();
    }
   }
};

function updateCell(cell,index) {
    cell.textContent =player;
    inputCells[index] = player;
    cell.style.color =' #7f1535';
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X';
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        // Check each winning condition
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a, b, c])
            return true
        }
    }
       // Check for a draw (if all cells are filled)
    if (inputCells.every(cell => cell != '')) {
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Win`
    isPauseGame = true

    // Highlight winning cells
    winningIndices.forEach((index) =>
        cells[index].style.background = '#8d140d'
    )

    restartBtn.style.visibility = 'visible'
}