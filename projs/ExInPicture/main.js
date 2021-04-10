var gQuests = createQuests();

var gCurrQuestIdx = 0;

var message = document.querySelector('.msg');

function initGame() {
    console.log('Hi!');
    renderQuest();
}


function renderQuest() {
    var currQuest = gQuests[gCurrQuestIdx];

    var elImg = document.querySelector('.game-container img');
    elImg.src = 'img/' + currQuest.id + '.jpg';

    var strHtml = '';
    for (var i = 0; i < currQuest.opts.length; i++) {
        strHtml += `<button onclick="checkAnswer(${i})">${currQuest.opts[i]}</button>`;
    }

    var elBtns = document.querySelector('.btn-container');
    elBtns.innerHTML = strHtml;
}


function checkAnswer(optIdx) {
    var elBtns = document.querySelector('.btn-container');
    var currQuest = gQuests[gCurrQuestIdx];
    if (currQuest.correctOptIndex == optIdx) {
        gCurrQuestIdx ++;
        message.innerText = '';
        if (gCurrQuestIdx < gQuests.length) {
            renderQuest();
        }
    } else {
        message.innerText = 'Oops! wrong answer!';
    }

    if (gCurrQuestIdx == gQuests.length) {
        message.innerText = 'Victorious!';
        elBtns.innerHTML = `<button onclick="restart()">Restart</button>`;
    }
}

function restart() {
    var elBtns = document.querySelector('.btn-container');
    gCurrQuestIdx = 0;
    elBtns.innerHTML = '';
    message.innerText = '';
    renderQuest();
}


function createQuests() {
    return [
        { id: 1, opts: ['Earth', 'Moon'], correctOptIndex: 1 },
        { id: 2, opts: ['Black Hole', 'Planet'], correctOptIndex: 0 },
        { id: 3, opts: ['Sun', 'Ground'], correctOptIndex: 0 },
        { id: 4, opts: ['Snow', 'Galaxy'], correctOptIndex: 1 }
    ];
}