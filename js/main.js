var count = 0;
var countLetterOnPage = 0;
var authors = ['рядовой', 'боец', 'прапор', 'яндекс', 'Зенон', 'Зураб', 'Зигмут', 'Жигер', 'Платон', 'Орландо', 'разработчик'];
var verbs = ['написал', 'проверил', 'удалил', 'призвал', 'высказал', 'закрыл', 'заметил', 'вспомнил', 'посмотрел', 'организовал', 'передал',];
var nouns = ['двигатель', 'ресторан', 'художник', 'эксперт', 'попытку', 'дедлайн', 'полосу', 'редактор', 'программист',]
var adjectives = ['жизненный', 'идеальный', 'прямой', 'обратной', 'постоянный', 'великолепный', 'рядовой', 'почетный', 'исключительный'];

function selectAllLetter() {
    elements = document.querySelectorAll('.check');
    main = elements[0];
    for (let i = 1; i < elements.length; i++) {
        elements[i].checked = main.checked;
    }
}


function getCurrentDate() {
    let date = new Date();
    currentDay = date.getDay();
    month = {
        1: 'янв',
        2: 'фев',
        3: 'мар',
        4: 'апр',
        5: 'май',
        6: 'июн',
        7: 'июл',
        8: 'авг',
        9: 'сен',
        10: 'окт',
        11: 'ноя',
        12: 'дек',
    };
    return String(date.getDay()) + ' ' + String(month[date.getMonth()]);
}


function addLetter() {
    let letter = randomTextGenerator();
    let templateLetter =    '<div class="mail__shortcut-info">' +
                            '<input type="checkbox" class="check">\n' +
                            '<div class="mail__logo-yandex">\n' + 
                            '<img src="img/2-layers.png" alt="Yandex"></div>\n' +
                            '<div class="mail__message-type mail__message_bold">'+
                            letter[0] + ' ' + count +
                            '</div>\n' +
                            '<div class="mail__marker-letter"></div>\n' +
                            '<div class="mail__letter mail__message_bold">'+
                            letter[1] + 
                            '</div>\n' +
                            '<div class="mail__latter-date">' + 
                            getCurrentDate() +
                            '</div>\n' +
                            '</div>'+
                            '<div class="mail__random-letter">' + 
                            '<div class="mail__close-letter" data-close-letter="close">Назад</div><br>'+
                            letter[1] + 
                            '</div>';
    count++;
    elements = document.getElementsByClassName('mail__conatainer')[0];
    letter = document.createElement('div');
    letter.classList.add('mail__message', 'clearfix','animation-letter');
    letter.setAttribute('data-method-click', 'positive');    
    letter.innerHTML = templateLetter; 
    elements.insertBefore(letter, elements.childNodes[1]);
    letter.addEventListener('animationend', _deleteClass);
    countLetterOnPage++;
    checkCountLetter();
    let messages = document.querySelectorAll('.mail__message');    
}


function randomTextGenerator() {
    let name = authors[randomInteger(0, (authors.length)-1)];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let randomText = 'Привет, ' + name + " " + count +'!<br>' +
                     authors[randomInteger(0, (authors.length)-1)] + ' ' + verbs[randomInteger(0, (verbs.length)-1)] + ' ' + adjectives[randomInteger(0, (adjectives.length)-1)] + ' ' + nouns[randomInteger(0, (nouns.length)-1)] + '.';
    return [name, randomText];
}


function _deleteClass() {
    this.classList.remove('animation-letter');
}


function _deleteLetter() {
    this.parentElement.remove();
}


function deleteLetters() {
    elements = document.body.querySelectorAll('.check');
    for (let i = 1; i < elements.length; i++) {
        if (elements[i].checked) {
            let elm = elements[i].parentElement;
            elm.classList.add('animation-letter');
            elm.addEventListener('animationend', _deleteLetter)            
            countLetterOnPage--;
            checkCountLetter();
        }
    }
    elements[0].checked = false;
}


function randomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);;
}


function randomLetterGenerator() {
    randomTime = randomInteger(10, 300000);
    addLetter();
    console.log(randomTime);
    setTimeout(randomLetterGenerator, 300000+randomTime);
}

        
function _displayNone(obj) {
    obj.style.display = 'none';
}        


function _displayBlock(obj) {
    obj.style.display = 'block';
}


function onContainerClick(e) {
    let event = e || window.event, 
    target = event.CurrentTarget || event.srcElement;
    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
        
    } else if (target.classList.contains('mail__conatainer')) {
         
    } else if (target.dataset.closeLetter === 'close') {
        _displayNone(target.parentElement);
         while (!target.classList.contains('mail__conatainer')) {
            if (target.classList.contains('mail__message')) {
                break;    
            }
            target = target.parentElement;
            checkCountLetter();
        }   
        _displayBlock(target.querySelector('.mail__shortcut-info'));
    }
    else {
       while (!target.classList.contains('mail__conatainer')) {
            if (target.dataset.methodClick == 'positive') {
                break;    
            }
            target = target.parentElement;
        }   
        _displayNone(target.querySelector('.mail__shortcut-info'));
        _displayBlock(target.querySelector('.mail__random-letter'));
        hideAllLettersExpectThis(target);
    }    
}


function hideAllLettersExpectThis(letter) {
    obj = document.querySelectorAll('.mail__message');
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] !== letter) {
            obj[i].style.display = 'none';
        }    
    }
}


function checkCountLetter() {
    let messages = document.querySelectorAll('.mail__message');
    if (countLetterOnPage > 29) {
        for (let i = 30; i < messages.length; i++) {
            messages[i].style.display = 'none';
            messages[i].firstChild.querySelector('.check').checked = false;
        }
    } else {
        for (let i = 0; i < messages.length; i++) {
            messages[i].style.display = 'block';
        }
    }
}


var myEventAdd = new CustomEvent("customAddLetters");
var myElement = document.body;
myElement.addEventListener("customAddLetters", randomLetterGenerator);
myElement.dispatchEvent(myEventAdd);

document.querySelector('.mail__conatainer').addEventListener('click', onContainerClick);
document.getElementById('addElement').addEventListener("click", addLetter);
document.getElementById('check-all').addEventListener('click', selectAllLetter);
document.getElementById('delete-letter').addEventListener("click", deleteLetters);