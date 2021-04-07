'use strict'
const PACMAN = '🐞';

var gPacman;
var gIsOnSuperFood = false;
var gDidEatSuperfood = false;

function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false,
        direction: 0
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    } else if (nextCell === GHOST && gPacman.isSuper) {
        var ghost = getGhostByLocation(nextLocation.i, nextLocation.j);
        gGhosts.splice(gGhosts.indexOf(ghost), 1);
    }
    if (nextCell === FOOD) {
        updateScore(1);
    }
    if (nextCell === CHERRY) {
        updateScore(10);
    }

    // Eat the cell
    // update the model
    if (gIsOnSuperFood && gDidEatSuperfood) {
        gBoard[gPacman.location.i][gPacman.location.j] = SUPERFOOD
        // update the DOM
        renderCell(gPacman.location, SUPERFOOD)
        gIsOnSuperFood = false;
    }
    else {
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
        renderCell(gPacman.location, EMPTY)
    }

    if (nextCell === SUPERFOOD) {
        gIsOnSuperFood = true;
        
        if (!gPacman.isSuper) {
            gPacman.isSuper = true;
            setTimeout(function() {
                gPacman.isSuper = false;
            }, 5000);
            gDidEatSuperfood = false;
        }
        else {
            gDidEatSuperfood = true;
        }
    }

    // Move the pacman
    // update the model
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    var elPacman = `<div style="transform: rotate(${gPacman.direction}deg)">${PACMAN}`;
    // update the DOM
    renderCell(gPacman.location, elPacman);

    // Check win
    checkWin();
}


function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.direction = 0;
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.direction = 180;
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.direction = 270;
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.direction = 90;
            break;
        default: return null
    }
    return nextLocation;
}