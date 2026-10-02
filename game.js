let cells = document.querySelectorAll('.cell');
let titleHeader = document.querySelector('#titleHeader');
let xplayerDisplay = document.querySelector('#xplayerDisplay');
let oplayerDisplay = document.querySelector('#oplayerDisplay');
let restartBtn = document.querySelector('#restartBtn');

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
    [0, 1, 2] , [3, 4, 5] , [6, 7, 8],  // Rows
    [0, 3, 6] , [1, 4, 7] , [2, 5, 8], // columns
    [0, 4, 8] , [2, 4, 6] // Diagonals
];

// Add eventlistner to each cell

cells.forEach((cells, index) => {
    cells.addEventListener('click', ()=> topCell(cells, index));
});

function topCell(cell, index){
   if(cell.textContent == '' && !isPauseGame) {
    isGameStart = true;
    updateCell (cell , index);
    if(!checkWinner()) {
        changePlayer();
        randomPick();
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

function randomPick() {
    
    isPauseGame = true

    setTimeout(() => {
        let randomIndex
        do {
            // Pick a random index
            randomIndex = Math.floor(Math.random() * inputCells.length)
        } while (
           
            inputCells[randomIndex] != ''
        )

        // Update the cell with Computer move
        updateCell(cells[randomIndex], randomIndex, player)
       
        if (!checkWinner()) {
            changePlayer()
            
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    }, 1000)
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

function declareDraw() {
    titleHeader.textContent = 'Draw!'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer) {
   
    if (!isGameStart) {
        
        player = selectedPlayer
        if (player == 'X') {
          
            xplayerDisplay.classList.add('player-active')
            oplayerDisplay.classList.remove('player-active')
        } else {
           
            xplayerDisplay.classList.remove('player-active')
            oplayerDisplay.classList.add('player-active')
        }
    }
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Choose'
});
