'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gIntervalGhosts;

function createGhost(board) {
    // TODO
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        color: "#" + ((1<<24)*Math.random() | 0).toString(16),
        currCellContent: FOOD
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(moveGhosts, 2000)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }


}
function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff();

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j

    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver();
        return
    } else if (nextCell === PACMAN && gPacman.isSuper) {
        gGhosts.splice(gGhosts.indexOf(ghost), 1);
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost
    // update the model

    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    if(gPacman.isSuper) {
        return `<span style="color:blue">${GHOST}</span>`;
    } else {
        return `<span style="color:${ghost.color}">${GHOST}</span>`;
    }
}

function getGhostByLocation(i, j) {
    for(var n = 0; n < gGhosts.length; n++) {
        var currGhost = gGhosts[n];
        if (currGhost.location.i === i && currGhost.location.j === j) {
            return currGhost;
        }
    }
    return null;
}