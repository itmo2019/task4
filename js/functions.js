const MIN_TIMER_ADD_MAIL = 300000;
const MAX_TIMER_ADD_MAIL = 600001;
const MAX_MAIL_LIST_SIZE = 30;

let curPage = 1;

function selectAll() {
    var checkboxes = document.body.querySelectorAll('.check__input'),
        checkAll = checkboxes[0],
        size = Math.min(checkboxes.length, curPage * MAX_MAIL_LIST_SIZE + 1);
    for (var i = 1 + (curPage - 1) * MAX_MAIL_LIST_SIZE; i < size; i++) {
        checkboxes[i].checked = checkAll.checked;
    }

}

function _selectMain(checkbox) {
    if (!checkbox.checked) {
        document.body.querySelector('.check__input').checked = false;
    }
}

function selectLetter(event) {
    if (!event.target.matches('.check__input')) return;
    _selectMain(event.target);
}

function LetterGenerator() {
    var defaultLetter =
            `<ul class="letter__line">
                 <li class="letter__item check">
                     <label><input class="check__input" type="checkbox">
                     <span class="check__box"></span>
                 </label></li>
                 <li class="letter__item letter__author"></li>
                 <li class="letter__item letter__author-name"></li>
                 <li class="letter__item letter__read-mark letter__read-mark_unread"></li>
                 <li class="letter__item letter__topic"></li>
                 <li class="letter__item letter__date"></li>
             </ul>
             <a class="letter__open-letter"></a>
             <hr class="letter-box__hr">`,

        months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
        nounWords = ['собака', 'кошка', 'казимаки', 'казинаки', 'пивасик', 'Чебурашка', 'крокодил Гена',
            'Шапокляк', 'устрица', 'человечек', 'Чика Чика'],
        verbWords = ['сделал', 'съел', 'упал', 'изучил', 'погладил', 'узнал', 'обидел', 'зацепил',
            'обманул', 'ударил'],
        sign = ['.', '?', '!', '!?'],
        separators = ['a', 'но', 'однако', 'даже', 'хотя', 'к сожалению'],
        authorLogoNames = {
            'Володя Путин': 'putin',
            'Ярослав Балашов': 'ya',
            'Королева of England': 'england-queen',
            'UberProductionTV': 'uber',
        },
        topicNames = ['В Яндексе разработан новый мем', 'Город охватила страшная эпидемия',
            'Обновление генератора писем', 'Случайный прохожий спас маленькую девочку',
            'Новинка! OldSpice - мужик вдвойне, когда на коне'],

        SENTENCE_COUNT_MIN = 5,
        SENTENCE_COUNT_MAX = 10,
        WORD_COUNT_MIN = 5,
        WORD_COUNT_MAX = 10;

    function _getAuthorName() {
        var authorNames = Object.keys(authorLogoNames);
        return authorNames[_getInt(0, authorNames.length)]
    }

    function _getAuthorLogoImg(authorName) {
        var authorLogoImg = document.createElement('img'),
            authorLogoName = authorLogoNames[authorName];
        authorLogoImg.className = 'letter__author_has-logo';
        authorLogoImg.src = `images/authors-logo/${authorLogoName}-logo.png`;
        authorLogoImg.alt = authorLogoName;
        return authorLogoImg
    }

    function _getAuthorLogoDiv(authorName) {
        var authorLogoDiv = document.createElement('div');
        authorLogoDiv.className = 'letter__author_no-logo';
        authorLogoDiv.textContent = authorName[0];
        return authorLogoDiv;
    }

    function _getAuthorLogo(authorName) {
        if (authorLogoNames[authorName] === undefined) {
            return _getAuthorLogoDiv(authorName)
        } else {
            return _getAuthorLogoImg(authorName)
        }
    }

    function _getDate() {
        return _getInt(1, 29) + ' ' + months[_getInt(0, 12)];
    }

    function _getSign() {
        return sign[_getInt(0, sign.length)]
    }

    function _getSeparator() {
        return separators[_getInt(0, separators.length)];
    }

    function _getWord(type) {
        if (type === 1) {
            return nounWords[_getInt(0, nounWords.length)];
        } else {
            return verbWords[_getInt(0, verbWords.length)];
        }
    }

    function _getFirstWord(type) {
        var str = _getWord(type);
        return str[0].toUpperCase() + str.slice(1);
    }

    function _getSentence() {
        var wordCount = _getInt(WORD_COUNT_MIN, WORD_COUNT_MAX),
            res = _getFirstWord(1) + ' ',
            type = 0;
        while (wordCount-- > 0) {
            res += _getWord(type);
            if (wordCount !== 0) {
                if (type === 0) {
                    res += ', ' + _getSeparator() + ' ';
                } else {
                    res += ' ';
                }
            }
            type = 1 - type;
        }
        return res + _getSign();
    }

    function _getLetterBody() {
        var sentenceCount = _getInt(SENTENCE_COUNT_MIN, SENTENCE_COUNT_MAX),
            res = '';
        while (sentenceCount-- > 0) {
            res += _getSentence();
            res += ' ';
        }
        var letterBody = document.createElement('div');
        letterBody.className = 'letter__body';
        letterBody.textContent = res;
        return letterBody;
    }

    function _getTopicName() {
        return document.createTextNode(topicNames[_getInt(0, topicNames.length)]);
    }

    this.getLetter = function () {
        var letter = document.createElement('li'),
            authorName = _getAuthorName();
        letter.className = 'letter letter-box__letter letter_unread';
        letter.innerHTML = defaultLetter;
        letter.querySelector('.letter__author-name').textContent = authorName;
        letter.querySelector('.letter__author').appendChild(_getAuthorLogo(authorName));
        letter.querySelector('.letter__date').textContent = _getDate();
        letter.querySelector('.letter__topic').appendChild(_getTopicName());
        letter.querySelector('.letter__topic').appendChild(_getLetterBody());
        return letter;
    };
}

var letterGenerator = new LetterGenerator();

function newMail() {
    var letters = document.getElementById('letter-box__letters'),
        newLetter = letterGenerator.getLetter(),
        mails = letters.children;
    if (curPage * MAX_MAIL_LIST_SIZE <= mails.length) {
        mails[curPage * MAX_MAIL_LIST_SIZE - 1].hidden = true;
    }

    letters.insertBefore(newLetter, letters.firstChild);
    document.body.querySelector('.check__input').checked = false;
    animateAddingLetter(newLetter)
}

function _doActionWithLetters(action) {
    let checkboxes = document.body.querySelectorAll('.check__input');
    var last = Math.min(checkboxes.length - 1, curPage * MAX_MAIL_LIST_SIZE);
    for (var i = last; i >= 0; i--) {
        if (checkboxes[i].checked) {
            action(checkboxes[i].closest('.letter'), ++last);
        }
    }
}

function _removeLetter(letter) {
    letter.remove();
}

function _removeAnimateLetter(letter, newLetterIndex) {
    let mails = document.getElementById('letter-box__letters').children;
    if (newLetterIndex < mails.length) {
        mails[newLetterIndex].hidden = false;
    }

    var time = 300;
    var startShift = 42;
    var fps = time / startShift;
    letter.style.zIndex = '0';
    animate(
        timePassed => {
            var shift = (timePassed / fps);
            letter.style.height = `${startShift - shift}px`;
            letter.style.top = `${-shift}px`;
        },
        time,
        () => {
            _removeLetter(letter);
        }
    );
}

function animateAddingLetter(newLetter) {
    var time = 300;
    var startShift = 42;
    var fps = time / startShift;
    newLetter.style.height = '0';
    newLetter.style.top = `${-startShift}px`;
    animate(
        (timePassed) => {
            var shift = (timePassed / fps);
            newLetter.style.height = `${shift}px`;
            newLetter.style.top = `${-startShift + shift}px`;
        },
        time
    );
}

function animate(draw, duration, complete) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        } else {
            complete();
        }
    });
}

function removeLetters() {
    _doActionWithLetters(_removeAnimateLetter);
    setTimeout(() => {
        document.body.querySelector('.check__input').checked = false;
    }, 700)
}

function _removeClass(letter, className) {
    let notReadObjs = letter.getElementsByClassName(className);
    while (notReadObjs.length > 0) {
        notReadObjs[0].classList.remove(className);
    }
}

function _markReadLetter(letter) {
    letter.classList.remove('letter_unread');
    _removeClass(letter, 'letter__read-mark_unread');
}

function markReadLetters() {
    _doActionWithLetters(_markReadLetter);
}

function _getInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

setTimeout(function run() {
    newMail();
    var timer = _getInt(MIN_TIMER_ADD_MAIL, MAX_TIMER_ADD_MAIL);
    setTimeout(run, timer)
}, _getInt(10, MAX_TIMER_ADD_MAIL));

function openLetterBody(letter) {
    var letterDialog = document.querySelector('.letter-dialog');
    var letterBody = letter.querySelector('.letter__body');

    letterDialog.querySelector('.letter-dialog__content').innerHTML = letterBody.textContent;
    letterDialog.style.zIndex = '2';
    _markReadLetter(letter);
}

function openLetter(event) {
    if (!event.target.matches('.letter__open-letter')) return;
    openLetterBody(event.target.closest('.letter'));
}

function closeLetter(event) {
    var letterDialog = event.target.closest('.letter-dialog');
    letterDialog.style.zIndex = '0';
}

function addBaseEventMail() {
    document.getElementById('letter-box__letters').addEventListener('click', openLetter);
    document.body.querySelector('.letter-dialog__exit').addEventListener('click', closeLetter);

    document.getElementById('get-letter').addEventListener("click", newMail);
    document.getElementById('remove-letter').addEventListener("click", removeLetters);
    document.getElementById('spam-letter').addEventListener("click", removeLetters);
    document.getElementById('mark-read-letter').addEventListener("click", markReadLetters);
    document.getElementById('letter-box__letters').addEventListener('click', selectLetter);
    document.body.querySelector('.check__input').addEventListener('click', selectAll);
}

window.onload = function () {
    addBaseEventMail();
};
