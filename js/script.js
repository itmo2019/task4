let names = [
    'Андре', 'Борислав', 'Герасим', 'Вадим', 'Кирилл', 'Ролан', 'Михаил', 'Генрих', 'Василий', 'Всеволод', 'Владимир',
    'Тимур', 'Аристарх', 'Рудольф', 'Клим', 'Эмин', 'Дамир', 'Махмуд', 'Евдоким', 'Трофим', 'Ерофей', 'Джамал', 'Юхим',
    'Вольдемар', 'Максуд', 'Павел', 'Евдоким', 'Соломон', 'Рушан', 'Нильс', 'Витольд', 'Евдоким', 'Назар', 'Арий',
    'Демид', 'Никон', 'Теодор', 'Валерий', 'Иннокентий', 'Гарри', 'Донат', 'Терентий', 'Владлен', 'Адриан', 'Филимон',
    'Петр', 'Рафик', 'Велизар', 'Клавдий', 'Назар'
];

let surnames = [
    'Аслаханов', 'Есиков', 'Якушин', 'Дубровский', 'Ильин', 'Бойдало', 'Чижиков', 'Сусляков', 'Тянников',
    'Андреев', 'Кулаков', 'Куимов', 'Горемыкин', 'Будников', 'Шукшин', 'Жарков', 'Сукачев', 'Рюриков', 'Меликов',
    'Жеглов', 'Буклин', 'Праздников', 'Кожуров', 'Семёнов', 'Грибов', 'Абдулов', 'Грибов', 'Панкин', 'Головаха',
    'Игнаткович', 'Костомаров', 'Осинцев', 'Ржевский', 'Косяк', 'Шишкин', 'Терёшин', 'Гречко', 'Калашник', 'Беломестов',
    'Водолеев', 'Князев', 'Бок', 'Сурков', 'Бондарчюк', 'Юдачёв', 'Делов', 'Волков', 'Крутин', 'Меншиков', 'Ерёмин'
];

months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

let letterIdToText = new Map();
counter = 0;
let domParser = new DOMParser();

function generateRandomInt(from, to) {
    return Math.floor(Math.random()*(to - from) + from)
}

function getRandomElement(array) {
    return array[generateRandomInt(0, array.length)]
}

letterIds = [];
maxLetters = 30;

async function newMail() {
    function generateDate() {
        let date = new Date();
        return date.getDay() + ' ' + months[date.getMonth()]
    }

    async function generateText() {
        let paragraphsCount = generateRandomInt(3, 5);

        let text = await fetch("https://baconipsum.com/api/?type=meat&formaat=json&paras=" + paragraphsCount);
        let paragraphs = await text.json();
        let res = '';
        for (let i = 0; i < paragraphsCount; i++) {
            res += '<p>' + paragraphs[i] + '</p>';
        }
        return res;
    }

    let name = getRandomElement(names);
    let surname = getRandomElement(surnames);
    let authorAbbr = name[0] + surname[0];
    let author = name + ' ' + surname;

    let id = 'letter-id' + counter++;
    let text = await generateText();
    letterIdToText.set(id, text);
    let subject = text.split('.')[0].substr(3);

    let date = generateDate();
    let newLetterCode = `
                    <div id="${id}" class="letter letter__animated-add-letter">
                        <input class="letter__checkbox" type="checkbox">
                        <a href="#" class="menu-buttons__button_default-link">
                            <div class="letter__author-logo">
                                <div class="letter__author-abbr">${authorAbbr}</div>
                            </div>
                            <div class="letter__author bold-text letter__text">${author}</div>
                            <div class="letter__new-letter-flag letter__new-letter-flag_enabled"></div>
                            <div class="letter__subject bold-text letter__text">${subject}</div>
                            <div class="letter__time">${date}</div>
                        </a>
                    </div>
                    `;
    let newLetterNode = domParser.parseFromString(newLetterCode, "text/html").body.firstChild;

    newLetterNode.addEventListener("webkitAnimationEnd", function () {
        newLetterNode.classList.remove('letter__animated-add-letter');
    });

    newLetterNode.querySelector("a").addEventListener("click", function () {
        openLetter(id);
    });

    let letters = document.querySelector(".letters");
    letters.insertBefore(newLetterNode, letters.firstChild);

    letterIds.push(id);
    if (letterIds.length > maxLetters) {
        letters.childNodes[maxLetters].style.display = "none"
    }
}

let newLetterButton = document.querySelector(".menu__new-letter-button");
newLetterButton.addEventListener('click', newMail);

function openLetter(id) {
    let openedLetter = document.querySelector("#opened-letter");
    openedLetter.querySelector(".letter-page__text").innerHTML = letterIdToText.get(id);

    openedLetter.style.display = "inline-block";
    let letters = document.querySelector(".letters");
    letters.style.display = "none";

    let letter = document.getElementById(id);
    letter.querySelector(".letter__author").classList.remove("bold-text");
    letter.querySelector(".letter__subject").classList.remove("bold-text");
    letter.querySelector(".letter__new-letter-flag").classList.remove("letter__new-letter-flag_enabled");
}

function closeLetter() {
    let letters = document.querySelector(".letters");
    letters.style.display = "inline-block";
    let openedLetter = document.querySelector("#opened-letter");
    openedLetter.style.display = "none";
}

function deleteLetter() {
    let letters = document.querySelectorAll(".letter");
    letters.forEach(letter => {
        if (letter.querySelector(".letter__checkbox").checked) {
            letter.classList.add("letter__animated-delete-letter");
            letter.addEventListener("webkitAnimationEnd", function () {
                letter.remove()
            });
        }
    });
    document.querySelector(".content-header__checkbox").checked = false;

    setTimeout(function () {
        letterIds = letterIds.filter(id => document.getElementById(id) != null);
        for (let i = letterIds.length - 1; i >= Math.max(0, letterIds.length - maxLetters); i--) {
            console.log(document.getElementById(letterIds[i]));
            document.getElementById(letterIds[i]).style.display = "inline-block";
        }
    }, 2000);
}

let deleteButton = document.querySelector("#delete-letter-button");
deleteButton.addEventListener('click', deleteLetter);

function selectAll() {
    let checked = document.querySelector(".content-header__checkbox").checked;
    let letters = document.querySelectorAll(".letter");
    letters.forEach(letter => {
        if (letter.style.display !== "none") {
            letter.querySelector(".letter__checkbox").checked = checked;
        }
    });
}

let selectAllCheckbox = document.querySelector(".content-header__checkbox");
selectAllCheckbox.addEventListener('click', selectAll);

let last = 300000;

function recursiveGenerateLetters() {
    newMail();
    let fiveMinute = 300000;
    let maxTime = 600000;
    let minTime = 10;
    let time =  Math.max(fiveMinute - last, generateRandomInt(minTime, maxTime));
    last = time;
    setTimeout(recursiveGenerateLetters, time);
}

setTimeout(recursiveGenerateLetters, 0);
