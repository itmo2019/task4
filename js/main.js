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

var count = 0;

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
    
//    letter.setAttribute('onclick', 'openMessage(this)');
    
    letter.innerHTML = templateLetter;    
    delayDeleteClass(letter);
    elements.insertBefore(letter, elements.childNodes[1]);
    
    
}

function openMessage(obj) {
    hideAllLettersExpectThis(obj);
}


function delay(f, ms) {
  return function() {
    let savedThis = this;
    let savedArgs = arguments;

    setTimeout(function() {
      f.apply(savedThis, savedArgs);
    }, ms);
  };
}




var authors = ['рядовой', 'боец', 'прапор', 'яндекс', 'Зенон', 'Зураб', 'Зигмут', 'Жигер', 'Платон', 'Орландо', 'разработчик'];
var verbs = ['написал', 'проверил', 'удалил', 'призвал', 'высказал', 'закрыл', 'заметил', 'вспомнил', 'посмотрел', 'организовал', 'передал',];
var nouns = ['двигатель', 'ресторан', 'художник', 'эксперт', 'попытку', 'дедлайн', 'полосу', 'редактор', 'программист',]
var adjectives = ['жизненный', 'идеальный', 'прямой', 'обратной', 'постоянный', 'великолепный', 'рядовой', 'почетный', 'исключительный'];


function randomTextGenerator() {
    let name = authors[randomInteger(0, (authors.length)-1)];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    console.log((authors.length)-1);
    let randomText = 'Привет, ' + name + '!<br>' +
                     authors[randomInteger(0, (authors.length)-1)] + ' ' + verbs[randomInteger(0, (verbs.length)-1)] + ' ' + adjectives[randomInteger(0, (adjectives.length)-1)] + ' ' + nouns[randomInteger(0, (nouns.length)-1)] + '.';
    console.log(randomText);
    return [name, randomText];
}





function _deleteClass(obj) {
    obj.classList.remove('animation-letter');
}


function _deleteLetter(letter) {
    letter.parentElement.remove();
}


var delayDeleteLetter = delay(_deleteLetter, 500);
var delayDeleteClass = delay(_deleteClass, 500);

function deleteLetters() {
    elements = document.body.querySelectorAll('.check');
    for (let i = 1; i < elements.length; i++) {
        if (elements[i].checked) {  
            elements[i].parentElement.classList.add('animation-letter');
            delayDeleteLetter(elements[i].parentElement);            
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






//Доделать
document.querySelector('.mail__conatainer').addEventListener('click', onContainerClick);

        
        
function onContainerClick(e) {
    var event = e || window.event, 
    target = event.CurrentTarget || event.srcElement;
    
    if (target.dataset.methodClick == 'positive') {
        target.style.position = 'absolut';
        target.querySelector('.mail__shortcut-info').style.display = 'none';
        target.querySelector('.mail__random-letter').style.display = 'block';
        hideAllLettersExpectThis(target);
    } else if (target.dataset.closeLetter == 'close') {
        
        showAllLetters(target.parentElement);
    }
    
//    console.log(target);
    
}


function hideAllLettersExpectThis(letter) {
    obj = document.querySelectorAll('.mail__message');
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] !== letter) {
            obj[i].style.display = 'none';
        }    
    }
}


function showAllLetters(letter) {
    obj = document.querySelectorAll('.mail__message');
    mail_letter = letter.parentElement;
    mail_letter.querySelector('.mail__shortcut-info').style.display = 'block';
    mail_letter.querySelector('.mail__random-letter').style.display = 'none';
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] === letter.parentElement){
            continue;
        }
        obj[i].style.display = 'block';
    }   
    
}














function comebackOnListLetters(el) {
    console.log(1);
    
//    this.parentElement.display = 'none';
//    showAllLetters();
}





function countLetters() {
    let messages = document.querySelectorAll('.mail__message');
    if (messages.length > 30) {
        for (let i = 31; i < messages.length; i++) {
            messages[i].style.display = 'none';
        }
    } else {
        for (let i = 0; i < messages.length; i++) {
            messages[i].style.display = 'block';
        }
    }
    console.log(messages.length);
    setTimeout(countLetters, 500);
}




var myEventCheckCountLetter = new CustomEvent("customCheckCountLetters");
var myElement = document.body;
myElement.addEventListener("customCheckCountLetters", countLetters);
//myElement.dispatchEvent(myEventCheckCountLetter);




var myEventAdd = new CustomEvent("customAddLetters");
var myElement = document.body;
myElement.addEventListener("customAddLetters", randomLetterGenerator);
myElement.dispatchEvent(myEventAdd);

//document.querySelector('.mail__close-letter').addEventListener("click", comebackOnListLetters);

document.getElementById('addElement').addEventListener("click", addLetter);
document.getElementById('check-all').addEventListener('click', selectAllLetter);
document.getElementById('delete-letter').addEventListener("click", deleteLetters);