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
                     '','','']

// Array Of Win Conditions 

const winConditions = [
    [0,1,2] , [3,4,5] , [6,7,8]  // Rows
    [0,3,6] , [1,4,7] , [2,5,8]  // columns
    [0,4,6] , [2,4,6]  // Daigonals
]

// Add eventlistner to each cell
