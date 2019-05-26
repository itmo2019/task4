let names = [
    'Фотин', 'Евтихий', 'Азарий', 'Фетис', 'Полиевкт', 'Борислав', 'Кассиан', 'Юст', 'Мартьян', 'Капитон', 'Никандр', 'Эрнест',
    'Петроний', 'Иезекииль', 'Харитон', 'Севастиан', 'Орест', 'Вит', 'Василий', 'Гордей', 'Максим', 'Павлин', 'Захар',
    'Владилен', 'Наум', 'Алипий', 'Меркурий', 'Феоктист', 'Овдоким', 'Феофил'
];

let surnames = [
    'Чашников', 'Березников', 'Руликовский', 'Ляпишев', 'Оффенберг', 'Шипов', 'Арнаутов', 'Машковцев', 'Столыпин',
    'Шереметьев', 'Яворский', 'Рындин', 'Лонгинов', 'Ададуров', 'Нечаев', 'Габаев', 'Маткевич', 'Маковский', 'Юрасовский',
    'Ващенко', 'Кобылин', 'Карандеев', 'Золотарёв', 'Голицын', 'Игнатьев', 'Байчуров', 'Бурдуков', 'Болтенков', 'Михеев', 'Храпов'
];

months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

function generateRandomCount(from, to) {
    return Math.floor(Math.random() * (to - from) + from)
}

let previous = 300000;
let minTime = 10;
let maxTime = 600000;
let interval = 300000;
let counter = 0;
let maxAmountLetters = 30;

function generateNewLetter() {
    newMail();
    let time = Math.max(interval - previous, generateRandomCount(minTime, maxTime));
    previous = time;
    setTimeout(generateNewLetter, time);
}

setTimeout(generateNewLetter, 0);

let invisibleLetters = [];
let lettersContent = new Map();

function takeRandomObj(list) {
    return list[generateRandomCount(0, list.length)]
}

async function generateContent() {
    let amountBlocks = generateRandomCount(3, 10);
    let content = await fetch("https://baconipsum.com/api/?type=meat&formaat=json&paras=" + amountBlocks);
    let fullContent = await content.json();
    let ans = '';
    for (let i = 0; i < amountBlocks; i++) {
        ans += '<p>' + fullContent[i] + '</p>';
    }
    return ans;
}

async function newMail() {
    let text = await generateContent();

    let id = counter++;
    let name = takeRandomObj(names);
    let surname = takeRandomObj(surnames);
    let author = name + ' ' + surname;
    let content = text.split('.')[0].substr(3);
    let date = new Date();
    date = date.getDate() + ' ' + months[date.getMonth()];

    lettersContent.set(id, text);

    let newLetter = `<div id="${id}" class="letter__animated-add-letter letter"> 
                            <input class="main-part__checkbox" type=checkbox> 
                            <a class="main-part__del-line" href=#> 
                                <img class="letter__y-logo" src=images/logo.jpg> 
                                <span class="letter__text-sender-letter letter_is-bold">${author}</span> 
                                <div class="letter__mark-new-letter"></div> 
                                <span class="letter__text-letter letter_is-bold">${content}</span> 
                                <span class="letter__data">${date}</span> 
                            </a> 
                     </div>`;

    let newNode = new DOMParser().parseFromString(newLetter, "text/html");

    newNode.addEventListener("webkitAnimationEnd", function () {
        newNode.classList.remove('letter__animated-add-letter');
    });

    newNode.querySelector("a").addEventListener("click", function () {
        openLetter(id);
    });

    let letters = document.querySelector(".mem");
    letters.insertBefore(newNode.body.firstChild, letters.firstChild);

    invisibleLetters.push(id);
    if (invisibleLetters.length > maxAmountLetters) {
        letters.childNodes[maxAmountLetters].style.display = "none";
    }
}

function openLetter(id) {
    let contentLetter = document.querySelector(".content");
    contentLetter.querySelector(".content__text-letter").innerHTML = lettersContent.get(id);
    contentLetter.style.display = "inline-block";

    let letters = document.querySelector(".mem");
    letters.style.display = "none";

    let letter = document.getElementById(id);
    letter.querySelector(".letter__text-sender-letter").classList.remove("letter_is-bold");
    letter.querySelector(".letter__text-letter").classList.remove("letter_is-bold");
    letter.querySelector(".letter__mark-new-letter").classList.add("letter__mark-no-letter");
    letter.querySelector(".letter__mark-new-letter").classList.remove("letter__mark-new-letter");
}

function closeLetter() {
    let letters = document.querySelector(".mem");
    letters.style.display = "inline";
    let closeContent = document.querySelector(".content");
    closeContent.style.display = "none";
}

function delOld() {
    let letters = document.querySelectorAll(".letter");
    letters.forEach(elem => {
        if (elem.querySelector(".main-part__checkbox").checked) {
            elem.className += " letter__animated-delete-letter";
            elem.addEventListener("webkitAnimationEnd", function () {
                elem.remove();
            });
        }
    });
    let checkBoxLetter = document.querySelector(".main-title");
    checkBoxLetter.querySelector(".main-part__checkbox").checked = false;

    setTimeout(function () {
        invisibleLetters = invisibleLetters.filter(id => document.getElementById(id) != null);
        for (let i = invisibleLetters.length - 1; i >= Math.max(0, invisibleLetters.length - maxAmountLetters); i--) {
            if (document.getElementById(invisibleLetters[i]).style.display !== "inline-block") {
                document.getElementById(invisibleLetters[i]).style.display = "inline-block"
            }
        }
    }, 1500);
}

function selectAll() {
    let checkBoxLetter = document.querySelector(".main-title");
    let letters = document.querySelectorAll(".letter");
    let isCheck = checkBoxLetter.querySelector(".main-part__checkbox").checked;
    letters.forEach(elem => {
        if (elem.style.display !== "none") elem.querySelector(".main-part__checkbox").checked = isCheck;
    })
}

let useButtonAdd = document.getElementsByClassName("left-menu__button")[0];
useButtonAdd.addEventListener('click', newMail);

let useButtonDel = document.getElementsByClassName("main-title__text-title")[1];
useButtonDel.addEventListener('click', delOld);