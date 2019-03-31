const letterLineTemplate = 
    `<input type="checkbox" class="letter-line__check">
    <img class="letter-line__sender-logo">
    <div class="letter-line__sender-name letter-line__sender-name_unread"></div>
    <div class="letter-line__mark letter-line__mark_unread"></div>
    <div class="letter-line__title letter-line__title_unread"></div>
    <time class="letter-line__date"></time>
    <div class="letter-line__click-area"></div>`;

const senders = ['Meduza', 'ZNAK', 'Радио Свобода', 'Новая Газета', 'газета.ru', 'Известия'];
const keyWords = ['президент', 'России', 'Владимир', 'Путин', 
'подписал', 'закон', 'предусматривающий', 'блокировку', 
'недостоверных', 'новостей', 'а', 'также', 'материалов', 
'оскорбляющих', 'общество', 'государственные', 'символы', 
'и', 'институты', 'власти', 'РФ', 'законопроект', 'о', 
'суверенном', 'интернете', 'принят', 'в', 'первом', 'чтении', 
'против', 'него', 'выступили', 'все', 'фракции', 'кроме', 'Единой', 
'России', 'Госдума', 'окончательно', 'приняла', 'закон', 
'правительства', 'о', 'повышении', 'ставки', 'НДС', 'с', '1', 
'января', '2019', 'года', 'до', '20%', 'с', 'нынешних', '18%', 
'продукты', 'и', 'важные', 'социальные', 'товары', 'не', 'подорожают', 
'и', 'баланс', 'интересов', 'бизнеса', 'граждан', 'и', 'государства', 
'соблюден', 'отметили', 'в', 'Госдуме', 'c', '1', 'января', 'вступает', 
'в', 'силу', 'закон', 'в', 'соответствии', 'с', 'которым', 
'пенсионный', 'возраст', 'в', 'России', 'увеличится', 'до', '65', 
'лет', 'для', 'мужчин', 'и', '60', ' для', 'женщин', 'реформа', 
'будет', 'проходить', 'поэтапно', 'и', 'должна', 'завершиться', 'в', 
'2028', 'году', 'для', 'досрочного', 'выхода', 'на', 'пенсию', 
'мужчинам', 'нужно', 'будет', 'накопить', '42', 'года', 'пенсионного', 
'стажа', 'женщинам', '37', 'лет', 'тем', 'не', 'менее', 'уровень', 
'бедности', 'сохраняется', 'высоким', '193', 'миллион', 'человек', 'то',
'есть', '13%', 'населения', 'имеют', 'доход', 'ниже', 'прожиточного', 'минимума'];
const punctMarks = ['.', '.', '.', '.', ',', ',', ',', ',', '!', '?', ':', ';']
const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'сен', 'окт', 'ноя', 'дек'];

const imgPath = '../images/';
const imgMaskEnd = '-logo.png';
const minTextWordsNum = 70;
const maxTextWordsNum = 200;
const minDistPunctMarks = 5;
const maxDistPunctMarks = 10;
const letterTimeDist = 300000;
const minNewLetterTime = 10;
const maxNewLetterTime = 600000;
const maxLettersNumberOnPage = 30;

let curNumOfLettersOnPage = 0;
let hiddenLetters = [];
let shortLastLetterTimeDist = false;

function randRange(lowBound, uppBound) {
    return Math.round(Math.random() * (uppBound - lowBound) + lowBound);
}

function randUpBoundEx(uppBound) {
    return randRange(0, uppBound - 1);
}

function genText() {
    let wordsNum = randRange(minTextWordsNum, maxTextWordsNum);
    let text = '';
    let curWordsNumNoPM = 0;
    let wordsNumForNextPM = randRange(minDistPunctMarks, maxDistPunctMarks);
    let nextWordIsUpperCase = true;
    for (let i = 0; i < wordsNum; i++) {
        let word = keyWords[randUpBoundEx(keyWords.length)];
        if (nextWordIsUpperCase) {
            word = word[0].toUpperCase() + word.slice(1);
            nextWordIsUpperCase = false;
        }

        text += word;
        curWordsNumNoPM++;

        if (curWordsNumNoPM == wordsNumForNextPM && i != wordsNum - 1) {
            let punctMark = punctMarks[randUpBoundEx(punctMarks.length)];
            if (punctMark == '.' || punctMark == '?' || punctMark == '!') {
                nextWordIsUpperCase = true;
            }

            text += punctMark;
            curWordsNumNoPM = 0;
            wordsNumForNextPM = randRange(minDistPunctMarks, maxDistPunctMarks);
        }

        if (i < wordsNum - 1) {
            text += ' ';
        } else {
            text += '.'
        }
    }
    return text;
}

function showEntryBoard(text) {
    document.getElementById('letter-line-box').style.display = 'none';
    document.getElementById('letter-entry-board').style.display = 'block';
    document.getElementById('letter-entry-board__text').textContent = text;
}

function closeEntryBoard() {
    document.getElementById('letter-line-box').style.display = 'block';
    document.getElementById('letter-entry-board').style.display = 'none';
}

function genLetter() {
    let text = genText();
    let sender = senders[randUpBoundEx(senders.length)];
    let date = new Date();

    let letterLine = document.createElement('div');
    letterLine.className = 'letter-line';
    letterLine.innerHTML = letterLineTemplate;
    letterLine.querySelector('.letter-line__sender-logo').src = imgPath + sender + imgMaskEnd;
    letterLine.querySelector('.letter-line__sender-name').textContent = sender;
    letterLine.querySelector('.letter-line__title').textContent = text;
    letterLine.querySelector('.letter-line__date').textContent = date.getDate() + ' ' + months[date.getMonth()];
    letterLine.querySelector('.letter-line__click-area').addEventListener('click', () => showEntryBoard(text));
    setTimeout(function() {
         letterLine.classList.add('show');
    }, 10);
    return letterLine;
}

function remove() {
    let checkboxes = document.getElementsByClassName('letter-line__check');
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            let letterLine = checkboxes[i].parentNode;
            letterLine.classList.add('letter-line_will-be-removed');
            letterLine.addEventListener('animationend', (ev) => ev.target.remove());
            curNumOfLettersOnPage--;
        }
    }
    setTimeout(function() {
        let letterBox = document.getElementById('letter-line-box');
        while (hiddenLetters.length > 0 && curNumOfLettersOnPage < maxLettersNumberOnPage) {
            letterBox.append(hiddenLetters.pop());
            curNumOfLettersOnPage++;
        }
    }, 1500);
}

function checkAll() {
    let checkStatus = document.getElementById('actions__check').checked;
    let checkboxes = document.getElementsByClassName('letter-line__check');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkStatus;
    }
}

function letterArrival() {
    newMail();
    let nextTimeDist;
    if (shortLastLetterTimeDist) {
        nextTimeDist = randRange(letterTimeDist, maxNewLetterTime);
        shortLastLetterTimeDist = false;
    } else {
        nextTimeDist = randRange(minNewLetterTime, maxNewLetterTime);
        if (nextTimeDist < letterTimeDist) {
            shortLastLetterTimeDist = true;
        }
    }
    setTimeout(letterArrival, nextTimeDist);
}

function newMail() {
    let letter = genLetter();
    let letterBox = document.getElementById('letter-line-box');
    if (curNumOfLettersOnPage >= maxLettersNumberOnPage) {
        hiddenLetters.push(letterBox.lastChild);
        letterBox.removeChild(letterBox.lastChild);
    } else {
        curNumOfLettersOnPage++;
    }
    letterBox.insertBefore(letter, letterBox.firstChild);
}

//document.getElementById('menu__receive').addEventListener('click', newLetter);
document.getElementById('actions__remove').addEventListener('click', remove);
document.getElementById('actions__check').addEventListener('change', checkAll);
document.getElementById('letter-entry-board__close-icon').addEventListener('click', () => closeEntryBoard());

setTimeout(letterArrival, randRange(minNewLetterTime, maxNewLetterTime));