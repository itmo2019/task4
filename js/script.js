let sentences = [
    'Первый веб-браузер был создан в 1990 году сэром Тимом Бернерс-Ли',
    'Он назывался WorldWideWeb и позже был переименован в Nexus',
    'Но первым распространённым браузером с графическим интерфейсом был NCSA Mosaic',
    'Исходный код этого одного из первых браузеров был открыт, и некоторые другие браузеры взяли его за основу',
    'Netscape выпустила Netscape Navigator под разные операционные системы и добилась заметного успеха, в том числе и коммерческого',
    'Это побудило компанию Microsoft выпустить свой браузер Internet Explorer',
    'В отличие от Netscape, Microsoft сразу выпускала локализованные версии IE',
    'В 1995 году Microsoft выпустила операционную систему Windows 95, в ней не было встроенного браузера',
    'Но через некоторое время в обновление системы (Windows 95 OSR2) он был встроен (Internet Explorer 3)',
    'К тому же Microsoft добавляла в свой браузер несовместимые со стандартами расширения языка HTML',
    'Это можно считать началом войны браузеров, закончившейся монополизацией (более 95 %) рынка браузером от Microsoft',
    'Из-за потери рынка доходы компании Netscape упали, и её приобрела AOL',
    'Исходный код браузера Netscape был выпущен под свободной лицензией MPL (Mozilla Public License)',
    'Название «Mozilla» изначально присутствовало в браузере от Netscape и означало сокращение слов Mosaic+killer',
    'В 1992 году компания Nombas (впоследствии приобретённая Openwave) начала разработку встраиваемого скриптового языка Cmm (Си-минус-минус)',
    'Главным отличием от Си была работа с памятью',
    'В новом языке всё управление памятью осуществлялось автоматически: не было необходимости создавать буферы, объявлять переменные, осуществлять преобразование типов',
    'В остальном языки сильно походили друг на друга: в частности, Cmm поддерживал стандартные функции и операторы Си',
    'Cmm был переименован в ScriptEase, поскольку исходное название звучало слишком негативно, а упоминание в нём Си «отпугивало» людей',
    'На основе этого языка был создан проприетарный продукт CEnvi',
    'В конце ноября 1995 года Nombas разработала версию CEnvi, внедряемую в веб-страницы',
    'Страницы, которые можно было изменять с помощью скриптового языка, получили название Espresso Pages',
    'Ни демонстрировали использование скриптового языка для создания игры, проверки пользовательского ввода в формы и создания анимации',
    'Espresso Pages позиционировались как демоверсия, призванная помочь представить, что случится, если в браузер будет внедрён язык Cmm',
    'Работали они только в 16-битовом Netscape Navigator под управлением Windows'
];

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

function getRandomElement(array) {
    return array[Math.floor(Math.random()*array.length)]
}

letterIds = [];

function addNewLetter() {
    function generateDate() {
        let date = new Date();
        return date.getDay() + ' ' + months[date.getMonth()]
    }

    function generateText() {
        let res = '';

        let paragraphCount = Math.floor(Math.random() * 2 + 2);

        for (let i = 0; i < paragraphCount; i++) {
            res += '<p>';
            let sentenceCount = Math.floor(Math.random() * 19 + 1);

            for (let j = 0; j < sentenceCount; j++) {
                res += getRandomElement(sentences);
                res += '. ';
            }
            res += '</p>'
        }

        return res
    }

    let name = getRandomElement(names);
    let surname = getRandomElement(surnames);
    let authorAbbr = name[0] + surname[0];
    let author = name + ' ' + surname;

    let id = 'letter-id' + counter++;
    let text = generateText();
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

    letterIds.push(id);
    if (letterIds.length > 30) {
        newLetterNode.style.display = "none"
    }
    newLetterNode.addEventListener("webkitAnimationEnd", function () {
        newLetterNode.classList.remove('letter__animated-add-letter');
    });

    newLetterNode.querySelector("a").addEventListener("click", function () {
        openLetter(id);
    });

    let letters = document.querySelector(".letters");
    letters.insertBefore(newLetterNode, letters.firstChild);
}

let newLetterButton = document.querySelector(".menu__new-letter-button");
newLetterButton.addEventListener('click', addNewLetter);

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
            letter.className += " letter__animated-delete-letter";
            letter.addEventListener("webkitAnimationEnd", function () {
                letter.remove()
            });
        }
    });
    document.querySelector(".content-header__checkbox").checked = false;

    setTimeout(function () {
        letterIds = letterIds.filter(id => document.getElementById(id) != null);
        for (let i = 0; i < Math.min(letterIds.length, 30); i++) {
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
    addNewLetter();
    let fiveMinute = 300000;
    let maxTime = 600000;
    let minTime = 10;
    let time =  Math.max(fiveMinute - last, Math.floor(Math.random() * (maxTime - minTime) + minTime));
    last = time;
    setTimeout(recursiveGenerateLetters, time);
}

setTimeout(recursiveGenerateLetters, 0);
