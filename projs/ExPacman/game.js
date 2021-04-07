'use strict'
const WALL = '🌴'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🍇';
const CHERRY = '🍒';


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

var gInterval;

function init() {
    gBoard = buildBoard()
    console.log(gBoard)
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    document.querySelector('.modal').innerHTML = '';
    gGame.score = 0;
    updateScore(0);
    if (!gInterval) {
        gInterval = setInterval(spawnCherry, 15000);
    }
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) ||
            (i === 1 && j === SIZE - 2) ||
            (i === SIZE - 2 && j === 1) ||
            (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPERFOOD;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    var elModal = document.querySelector('.modal');
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null
    // TODO
    elModal.innerHTML = `<button onClick="init()">Play again`;
    if (gInterval) {
        clearInterval(gInterval);
        gInterval = null;
    }
}

function didWin() {
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j] == FOOD) return false;
        }
    }
    return true;
}

function checkWin() {
    var elModal = document.querySelector('.modal');
    if(didWin()) {
        elModal.innerHTML = `<p class="victory">VICTORIOUS!!!`;
        elModal.innerHTML += `<button onClick="init()">Play again`;

        clearInterval(gIntervalGhosts);
        gIntervalGhosts = null;

        clearInterval(gInterval);
        gInterval = null;
    }
}

function spawnCherry() {
    if(!gGame){
        return;
    }
    var emptyCells = [];
    var chosenLocation;
    var chosenCell;
    for(var i = 1; i < gBoard.length - 1; i++) {
        for(var j = 1; j < gBoard[0].length - 1; j++) {
            if(gBoard[i][j] === EMPTY) {
                emptyCells.push({
                    i: i,
                    j: j
                });
            }
        }
    }
    chosenLocation = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (chosenLocation) {
        gBoard[chosenLocation.i][chosenLocation.j] = CHERRY;
        // update the DOM
        renderCell(chosenLocation, CHERRY);
    }
}