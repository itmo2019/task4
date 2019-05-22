function selectAllButton() {
    var allCheckboxButtons = document.querySelectorAll('.window-letters__input-button');
    var mainCheckboxButton = document.querySelector('.window-letters__input-button');
    for (var i = 1; i < allCheckboxButtons.length; i++) {
        allCheckboxButtons[i].checked = mainCheckboxButton.checked;
    }
}

const senders = ['Mom', 'Dad', 'Cat', 'Dog', 'Apple', 'Teacher', 'Homie', 'Mole', 
    'Hare', 'BB-8', 'Porg', 'Totoro']

const actions = ['runs', 'waits', 'flies', 'sleeps', 'lays', 'jumps', 'sings', 
    'writes', 'reads', 'executes', 'exists', 'builds', 'tests']

const adverbs = ['rapidly', 'at home', 'at school', 'at the university', 'on bed',
    'highly', 'alone', 'sadly', 'today']

const punctuationMarks = ['.', '...', '!', '?', '?!']

function getRandomInt(minRange, maxRange) {
    return Math.trunc(getRandomFromRange(minRange, maxRange));
} 

function genLetterText() {
    var letterLen = getRandomInt(0, 50);
    var answer = '';
    for (var i = 0; i < letterLen; i++) {
        var send = senders[getRandomInt(0, senders.length)];
        var act = actions[getRandomInt(0, actions.length)];
        var adv = adverbs[getRandomInt(0, adverbs.length)];
        var punMark = punctuationMarks[getRandomInt(0, punctuationMarks.length)];
        answer += send + ' ' + act + ' ' + adv + punMark + ' ';
    }
    return answer;
}

function genColor() {
    var n = getRandomInt(0, 255);
    var res = n.toString(16);
    while (res.length < 2) {
        res = '0' + res;
    }
    return res;
}

function newMail() {
    var letters = document.getElementById('window-letters__letters-list_after-first');
    var newLetter = document.createElement('li');
    var sender = senders[getRandomInt(0, senders.length)];
    var letterText = genLetterText();
    var curDate = new Date();
    var letterDate = curDate.getDate() + " " + (curDate.toLocaleString('ru', { month: 'short' }));
    var color = "#" + genColor() + genColor() + genColor();
    // console.log("Color: " + color);
    newLetter.innerHTML = `<label for="window-letters__label_open-art" class="xxx" onclick="showArticle(this)">
                    <ul class="window-letters__letter-innerior">
                    <li class="window-letters__square-for-button window-letters__letter-part">
                        <label>
                            <input type="checkbox" name="CCC" class="window-letters__input-button">
                            <div class="window-letters__select-button"></div>
                        </label>
                    </li>
                    <li class="window-letters__letter-sender_pict_wrap window-letters__letter-part">
                        <div class="window-letters__letter-sender_pict" style="background-color: ${color};">
                           ${sender[0]}
                        </div>
                    </li>
                    <li class="window-letters__letter-sender window-letters__letter-part">
                        ${sender}
                    </li>
                    <li class="window-letters__letter-unread-point window-letters__letter-part">

                    </li>
                    <li class="window-letters__letter-text window-letters__letter-part">
                        ${letterText}
                    </li>
                    <li class="window-letters__letter-date window-letters__letter-part">
                        ${letterDate}
                    </li>
                    <hr class="window-letters__delimiter-line">
                </ul>
                </label>`;
    newLetter.className = "window-letters__letter";
    letters.insertBefore(newLetter, letters.firstChild);
  
    var newArticle = document.createElement('article');
    newArticle.className = "window-letters__article";
    newArticle.innerHTML = `<label for="window-letters__label_open-art" class="window-letters__article-cancel-sign" 
                            onclick="showLetters()">&#9747;</label>\n
                            <div>${letterText}</div>\n`;
    var articles = document.querySelector('.window-letters__letters-list');
    var firstApticle = document.querySelector('.window-letters__article');
    articles.insertBefore(newArticle, firstApticle);
    allLetters = document.querySelectorAll('.window-letters__letter');
    var maxCnt = 30;

    window.setTimeout(function() {
        newLetter.classList.add('window-letters__letter_add');
        if (allLetters.length > maxCnt) {
            allLetters[maxCnt].classList.add('not_show');
        }
    }, 100);
}

function deleteLetters() {
    document.querySelector('.window-letters__input-button').checked = false;
    var allArticles = document.querySelectorAll('.window-letters__article');
    var allLetters = document.querySelectorAll('.window-letters__letter');
    var maxCnt = 30;
    var need = 0;
    for (var i = 0; i < allLetters.length; i++) {
        if (allLetters[i].children[0].children[0].children[0].children[0].children[0].checked) {    
            need++;
            allArticles[i].remove();
            allLetters[i].classList.add('window-letters__letter_delete');
            window.setTimeout(function(allLetters, i, maxCnt) {
                allLetters[i].remove();
            }, 1000, allLetters, i, maxCnt);
        }
    }
    for (var i = maxCnt; i < Math.min(maxCnt + need, allLetters.length); i++) {
        allLetters[i].classList.remove('not_show');
    }
}

function showArticle(elem) {
    if (event.target.className == 'window-letters__input-button' || event.target.className == 'window-letters__select-button') {
        return;
    }
    var allLabels = document.querySelectorAll('.xxx');
    var allArticles = document.querySelectorAll('.window-letters__article');
    document.getElementById('window-letters__letters-list_after-first').classList.add('not_show');
    for (var i = 0; i < allLabels.length; i++) {
        if (allLabels[i] == elem) {
            allArticles[i].style = "display: inline-block;";
        }
    }
}

function showLetters() {
    document.getElementById('window-letters__letters-list_after-first').classList.remove('not_show');
    var allArticles = document.querySelectorAll('.window-letters__article');
    for (var i = 0; i < allArticles.length; i++) {
        allArticles[i].style.display = "none";
    }
}

function getRandomFromRange(minTime, maxTime) {
    return Math.random() * (maxTime - minTime) + minTime;
}

const curMin = 10;
const curMax = 60001;
const fiveMin = 30000;

window.setTimeout(function() {
    var genTime = getRandomFromRange(curMin, curMax);
    window.setTimeout(newMail, genTime);
    var diff = genTime;
    window.setTimeout(function run() {
        var delay = 0;
        var itsTime = false;
        var newMin = 0;
        var newMax = curMax;
        while (!itsTime) {
            var genDelay = getRandomFromRange(newMin, newMax);
            if (genDelay + diff >= fiveMin) {
                itsTime = true;
            } else {
                newMax = Math.max(0, newMax - genDelay);
            }
            delay += genDelay;
        }
        window.setTimeout(newMail, delay);
        diff = delay;
        window.setTimeout(run, 1100);
    }, 100);
}, 100);


