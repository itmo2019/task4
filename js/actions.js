const LETTERS_ON_PAGE = 30;

let count = 0;
let companies = ['ebay', 'facebook', 'live', 'yandex', 'live', 'reddit', 'twitter', 'youtube'];
let topic = ["Внимание!", "Добро пожаловать!", "Обновление", "Получите приз!", "Восстановление аккаунта",
    "Ищем сотрудников", "Спасибо за отзыв"];
let hello = ["Здравствуйте!", "Добрый день!", "Привет!", "Приветствую!", "Салют!"];
let word1 = ["Я", "Меня зовут", "Это"];
let firstName = ["Виталий", "Андрей", "Владимир", "Алексей", "Артём", "Антон"];
let secondName = ["Соболев", "Чиркин", "Борисов", "Орехов", "Гаврилов", "Иванов", "Сергеев", "Онегин"];
let phrase1 = ["Так вышло, что", "Нам стало известно, что", "Сообщаем вам, что",
    "Как вы могли заметить,", "С сегоднящнего дня"];
let nouns1 = ["эксперт", "редактор", "программист", "рабочий"];
let verbs = ["взломал", "проверил", "удалил", "исправил", "закрыл", "заметил",
    "пометил", "пересмотрел", "передал"];
let nouns2 = ["счет", "аккаунт", "пароль", "кабинет"];
let adjectives = ["идеальный", "прямой", "обратный", "наш",
    "постоянный", "великолепный", "исключительный", "личный", "ваш"];
let isOpen = false;

function randomInt(min, max) {
    return Math.floor((max - min) * Math.random() + min);
}

function randFromList(list) {
    return list[randomInt(0, list.length)];
}

function randomDate(date) {
    let m = randomInt(1, 12);
    let day = randomInt(1, 30);
    if (m === 2) day = Math.min(28, day);
    let month = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    date.dateTime = day + '.' + m;
    date.textContent = String(day) + ' ' + String(month[m - 1]);
}


function generateText(letter, sender) {
    letter.querySelector("p").textContent =
        randFromList(hello)
        + ' ' + randFromList(word1)
        + ' ' + randFromList(firstName)
        + ' ' + randFromList(secondName)
        + ', глава компании ' + sender.toUpperCase()
        + '.'
    ;
    letter.querySelectorAll("p")[1].textContent =
        randFromList(phrase1)
        + ' ' + randFromList(adjectives)
        + ' ' + randFromList(nouns1)
        + ' ' + randFromList(verbs)
        + ' ' + randFromList(adjectives)
        + ' ' + randFromList(nouns2) + '.'
    ;

}

function createLetter() {
    let letter = document.createElement('li');
    letter.className = 'main-block__letter animation-insert';
    letter.setAttribute('data-method-click', 'clicked');
    let clone = document.getElementById("template-letter").content.cloneNode(true);
    let sender = randFromList(companies);
    clone.querySelector("img").src = 'img/icons/' + sender + '.png';
    clone.querySelector('.main-block__mail-from').textContent = sender.toUpperCase();
    clone.querySelector('.main-block__topic').textContent = randFromList(topic);
    randomDate(clone.querySelector("time"));
    generateText(clone.querySelector(".main-block__letter-content"), sender);
    letter.append(clone);
    return letter;
}

function hideLetters(letters) {
    for (let i = LETTERS_ON_PAGE - 1; i < letters.length; i++) {
        letters[i].style.display = 'none';
        letters[i].querySelector('.check').checked = false;
    }
}

function addLetter() {
    count++;
    console.log('add:' + count);
    document.querySelector('.check').checked = false;
    let allLetters = document.getElementById('all-letters');
    if (count > LETTERS_ON_PAGE) {
        hideLetters(allLetters.querySelectorAll("li"));
    }
    let newLetter = createLetter();
    allLetters.insertBefore(newLetter, allLetters.querySelectorAll("li")[0]);
    if (!isOpen)
        allLetters.classList.add('all-letter-down');
    newLetter.addEventListener("webkitAnimationEnd", function () {
        removeClass(newLetter, 'animation-insert');
    });
    allLetters.addEventListener("webkitAnimationEnd", function () {
        removeClass(allLetters, 'all-letter-down');
    });
}

function removeClass(letter, name) {
    letter.classList.remove(name);
}

function checkVisibility() {
    let letters = document.getElementById('all-letters').querySelectorAll("li");
    for (let i = 0; i < Math.min(letters.length, LETTERS_ON_PAGE); i++) {
        letters[i].style.display = 'block';
    }
}

function removeLetters() {
    if (isOpen) return;
    console.log('remove:' + count);
    document.body.querySelector('.check').checked = false;
    let letters = document.getElementById('all-letters').querySelectorAll("li");
    letters.forEach(letter => {
        if (letter.querySelector(".check").checked) {
            letter.classList.add('animation-delete');
            letter.addEventListener("webkitAnimationEnd", function () {
                removeClass(letter, 'animation-delete');
                count--;
                letter.remove();
                checkVisibility();
            });
        }
    });
}

function selectAll() {
    if (isOpen) return;
    let checkboxes = document.body.querySelectorAll('.check');
    let isChecked = checkboxes[0].checked;
    for (let i = 1; i < Math.min(checkboxes.length, LETTERS_ON_PAGE + 1); i++) {
        checkboxes[i].checked = isChecked;
    }
}

function getRandomLetter() {
    let t = randomInt(10, 300000) + 300000;
    addLetter();
    console.log(t);
    setTimeout(getRandomLetter, t);
}

function _displayNone(obj) {
    obj.style.display = 'none';
}

function _displayBlock(obj) {
    obj.style.display = 'block';
}

function openLetter(event) {
    let target = event.target;
    console.log(target);
    if (target.tagName !== 'INPUT' && target.type !== 'checkbox'
        && !target.classList.contains('main-block__all-letters')) {
        if (target.dataset.closeLetter === 'close') {
            while (!target.classList.contains('main-block__letter')) {
                target = target.parentElement;
            }
            isOpen = false;
            _displayNone(target.querySelector('.main-block__letter-content'));
            _displayBlock(target.querySelector("div"));
        } else { //open
            while (!target.classList.contains('main-block__letter')) {
                target = target.parentElement;
            }
            isOpen = true;
            _displayNone(target.querySelector("div"));
            _displayBlock(target.querySelector('.main-block__letter-content'));
        }
    }
    console.log(target);
}

let Event = new CustomEvent('customAdd', getRandomLetter);
let Elem = document.body;
Elem.addEventListener('customAdd', getRandomLetter);
Elem.dispatchEvent(Event);

document.getElementById('all-letters').addEventListener('click', openLetter);
document.getElementById('get-letter').addEventListener('click', addLetter);
document.getElementById('remove').addEventListener('click', removeLetters);
document.querySelector('.check').addEventListener('click', selectAll);