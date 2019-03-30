let mailTemplate = 
    `<input type="checkbox" class="mail__check">
    <img class="mail__sender-logo">
    <div class="mail__sender-name mail__sender-name_unread"></div>
    <div class="mail__mark mail__mark_unread"></div>
    <div class="mail__title mail__title_unread"></div>
    <div class="mail__date"></div>`;

let senders = ['Meduza', 'ZNAK', 'Радио Свобода', 'Новая Газета', 'газета.ru', 'Известия'];
let keyWords = ['президент', 'России', 'Владимир', 'Путин', 
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
let punctMarks = ['.', ',', '!', '?', ':', ';']

function randRange(lowBound, uppBound) {
    return Math.round(Math.random() * ((uppBound - 1) - lowBound) + lowBound);
}

function randUpBound(uppBound) {
    return randRange(0, uppBound)
}

function newMail() {
    let mails = document.getElementById('mail-box');
    let mail = genMail();
    mails.insertBefore(mail, mails.firstChild);
}

let cnt = 1;

function genMail() {
    let mail = document.createElement('div');
    mail.className = 'mail';
    let id = 'mail_' + cnt;
    mail.id = id;
    mail.innerHTML = mailTemplate;
    let sender = senders[randUpBound(senders.length)];
    mail.querySelector('.mail__sender-logo').src = '../images/' + sender + '-logo.png';
    mail.querySelector('.mail__sender-name').textContent += sender;
    //mail.querySelector('.mail__text').textContent += genText();
    genText();
    setTimeout(function() {
         mail.classList.add('show');
    }, 10);
    mail.addEventListener('click', () => help(id))
    return mail;
}

function help(id) {
    //document.getElementById(id).querySelector('.mail__text').style.display = 'block';
}
 
let minTextWordsNum = 30;
let maxTextWordsNum = 50;
let minDistPunctMarks = 3;
let maxDistPunctMarks = 7;

function genText() {
    let size = randRange(minTextWordsNum, maxTextWordsNum);
    let text = '';
    let cnt = 0;
    let next = randRange(minDistPunctMarks, maxDistPunctMarks);
    let nextIsUpperCase = true;
    for (let i = 0; i < size; i++) {
        let word = keyWords[randUpBound(keyWords.length)];
        if (nextIsUpperCase) {
            word = word[0].toUpperCase() + word.slice(1);
            nextIsUpperCase = false;
        }
        text += word;
        cnt++;
        if (cnt == next) {
            let punctMark = punctMarks[randUpBound(punctMarks.length)];
            text += punctMark;
            cnt = 0;
            next = randRange(minDistPunctMarks, maxDistPunctMarks);
            if (punctMark == '.' || punctMark == '?' || punctMark == '!') {
                nextIsUpperCase = true;
            }
        }
        if (i == size - 1) {
            if (!punctMarks.some(pm => pm == text[text.length - 1])) {
                text += '.'
            }
        } else {
            text += ' ';
        }
    }
    return text;
}

function remove() {
    let checkboxs = document.getElementsByClassName('mail__check');
    for (let i = checkboxs.length - 1; i >= 0; i--) {
        if (checkboxs[i].checked) {
            let mail = checkboxs[i].parentNode;
            mail.classList.add('mail_will-be-removed');
            mail.addEventListener('animationend', (ev) => ev.target.remove());
        }
    }
}

function checkAll() {
    let checkboxs = document.getElementsByClassName('mail__check');
    for (let i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = document.getElementById('actions__check').checked;
    }
}

document.getElementById('menu__receive').addEventListener('click', newMail);
document.getElementById('actions__remove').addEventListener('click', remove);
document.getElementById('actions__check').addEventListener('change', checkAll);
//setInterval(newMail, nextDouble(2000, 2000));