var gScale;
var gCurrNum;
var gTime;
var gTimeContainer = document.querySelector(".time-container");
var gInterval;

var gOriginalBoard;
var gGameBoard;

init();

function init() {
    gScale = 5;
    gCurrNum = 1;
    gTime = 0;
    
    document.querySelector('.play-again').style.display = "none";
    gOriginalBoard = createGameBoard(gScale);
    gGameBoard = shuffleArray(gOriginalBoard);
    
    render(gGameBoard);
};

function createGameBoard(scale) {
    var gameBoard = [];
    for (var i = 0; i < gScale * gScale; i++) {
        gameBoard.push({
            val: i + 1,
            isClicked: false
        });
    }
    return gameBoard;
}

function shuffleArray(arr) {
    var clonedArr = [...arr];
    return clonedArr.sort((a, b) => 0.5 - Math.random());
}

function render(board) {
    renderBoard(board);
    gTimeContainer.innerText = gTime;
}

function renderBoard(board) {
    var elTable = document.querySelector(".table-container");
    var htmlTable = `<table>`;
    for (var i = 0; i < gScale; i++) {
        htmlTable += `<tr>`;
        for (var j = 0; j < gScale; j++) {
            htmlTable += `<td>`;
            var currCell = board[i * gScale + j];
            // if is clicked, draw different color
            if (currCell.isClicked) {
                htmlTable += `<button class="clicked" onclick="cellClicked(${currCell.val})">${currCell.val}`;
            } else {
                htmlTable += `<button onclick="cellClicked(${currCell.val})">${currCell.val}`;
            }
        }
    }
    elTable.innerHTML = htmlTable;
}

function cellClicked(value) {
    var cell = gOriginalBoard[value - 1];
    if (cell.val == gCurrNum) {
        if (gCurrNum == 1) {
            gInterval = setInterval(onInterval, 1000);
        }
        cell.isClicked = true;
        gCurrNum++;
        render(gGameBoard, gScale);
    }
    if (didGameEnd()) {
        gameOver();
    }
}

function onInterval() {
    gTime++;
    gTimeContainer.innerText = gTime;
}

function didGameEnd() {
    return gGameBoard.every(function (currCell) {
        return currCell.isClicked;
    });
}

function gameOver() {
    document.querySelector('.play-again').style.display = "block";
    stopTimer();
}

function playAgain() {
    init();
}

function stopTimer() {
    clearInterval(gInterval);
}