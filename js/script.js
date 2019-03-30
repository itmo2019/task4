let phrases = [
    "разнообразный и богатый опыт", "не следует", "значимость этих проблем очевидна", "сфера нашей активности",
    "позволяет оценить", "представляет собой", "интересный эксперимент", "новая модель", "повседневная",
    "практика показывает, что", "структура организации", "одна маленькая строчка", "реторический вопрос",
    "текст продолжил", "свой путь", "непостижимые разновидности", "я совсем один", "так счастлив", "мой друг",
    "вдохнуть в рисунок", "выразить", "прильнув к земле", "не под силу", "после", "сердечным отношение",
    "подумал он", "нерегулярным питанием", "осмелился", "красный", "синий", "вверху", "живота", "с высоты",
    "с чистого листа", "хочешь я", "в глазва", "взгляну в", "твои глаза", "и слова", "припомню все", "и снова повторю",
    "кто тебе сказал", "ну", "кто тебе сказал", "кто придумал", "что тебя", "я", "не", "люблю", "я каждый жест", "каждый",
    "взгляд твой", "в душе берегу", "твой голос", "в серде моем", "звуччит звеня", "нет", "никогда", "я тебя",
    "разлюбить не смогу", "и", "ты люби", "ты всегда", "люби меня", "ты решилва", "все", "что было", "больше не вернешь",
    "сердце пусто", "вместо чувства", "в нем осталась", "ложь", "и казалось", "не осталось", "верного пути",
    "выбор сделан", "ты б хотела", "навсегда", "уйти", "навсегда уйти", "навсегда уйти", "и с чистого листа", "опять",
    "начнешь сначала", "звоню в", "последний раз", "а", "голос мой", "сотри", "и с чистого", "листа", "и снова все",
    "сначала", "закончилась", "про нас", "история любви", "история", "любви", "смелый", "как ветер", "свободный",
    "я делал все", "что душе угодно", "жил для себя", "год за годом", "крутой проявляя нрав", "сколько", "девченок хороших",
    "влюбилось в", "меня", "неосторожно", "всех сосчитать", "невозможно", "попробуй меня исправь", "и одна", "лишь ты",
    "много-много", "лет", "говорила нет", "ты одна", "ты такая", "я тебя знаю", "больше в мире таких", "таких не бывает",
    "все не то", "все не так", "ты мой друг", "я твой враг", "как же так", "все у нас", "с тоюой", "был", "апрель",
    "и в любви", "мы клялись", "но увы", "пролетел", "желтый лист", "по", "бульварам Москвы", "третье сентября", "день",
    "прощания", "день, когда", "горят", "костры рябин", "как костры горят", "обещяния", "день когда", "я совсем один",
    "я календарь", "переверну", "и снова третье сенятбря", "на фото я", "твое взгляну и", "снова тертье сентября",
    "но почему", "но почему", "расстаться все же", "нам пришлось", "но былов все", "у нас", "всерьез", "второго сентября"
];

let names = [
    "Милослав", "Федосий",  "Александр", "Самойло", "Кирьяк", "Фофан", "Аверьян", "Пантелеимон", "Игнат", "Прокопий",
    "Лев", "Лукьян", "Данила", "Филимон", "Акиндин", "Егор", "Панкратий", "Роман", "Абакум", "Мартын", "Еремей", "Гаврило",
    "Андрон", "Нафанаил", "Гаврила", "Федосий", "Прокофий", "Ипатий", "Аврамий", "Артемий", "Вавила", "Харлам", "Давыд",
    "Мордва"
];

let surnames = [
    "Разумовский", "Вревский", "Ромодановский", "Скавронский", "Ржевский", "Урусов", "Хилков", "Татищев", "Нарышкин",
    "Бакаев", "Мещерский", "Херасков", "Шаховской", "Гершфельд", "Рабин", "Менакер", "Фукс", "Оппенгеймер", "Богораз",
    "Вольф", "Краузе", "Беккер", "Арендт", "Вагнер", "Гагин", "Корсак", "Сверчков", "Мухин", "Нигматуллин", "Беклемишев",
    "Великая"
];

let icons = [
    "images/icons/1.png",
    "images/icons/2.png",
    "images/icons/3.jpg",
    "images/icons/4.jpg",
    "images/icons/5.png",
    "images/icons/6.png",
    "images/icons/7.png",
    "images/icons/8.png",
    "images/icons/9.jpg",
    "images/icons/9.png"
];


let letterIdToLetter = new Map();
let array = [];

let count = 4;
let size = 4;

function genText() {
    let minParagraphCount = 1;
    let maxParagraphCount = 5;

    let minSentenceCount = 1;
    let maxSentenceCount = 10;

    let minPhraseCount = 2;
    let maxPhraseCount = 20;

    let paragraphCount = Math.floor(Math.random() * (maxParagraphCount - minParagraphCount) + minParagraphCount);

    let html = "";
    for (let i = 0; i < paragraphCount; i++) {
        html += "<p>";
        let sentenceCount = Math.floor(Math.random() * (maxSentenceCount - minSentenceCount) + minSentenceCount);
        for (let j = 0; j < sentenceCount; j++) {
            let phraseCount = Math.floor(Math.random() * (maxPhraseCount - minPhraseCount) + minPhraseCount);
            for (let k = 0; k < phraseCount; k++) {
                let phrase = phrases[Math.floor(Math.random() * (phrases.length - 1))];
                if (k === 0) {
                    phrase = phrase.charAt(0).toUpperCase() + phrase.substr(1, phrase.length - 1);
                }
                html += phrase + " ";
            }
            html = html.substr(0, html.length - 1);
            html += ". ";
        }
        html += "</p>";
    }
    return html;
}

function myText() {
    return `
        <p>
            Первое мое знакомство с <abbr title=\"HyperText Markup Language\">HTML</abbr>/<abbr 
            title=\"Cascading Style Sheets\">CSS</abbr> случилось еще в школе, на уроках информатики. Полученные на них 
            знания, позволили мне создать простой сайт с версткой на таблицах. Это было около 4 лет назад, после этого 
            я не имел дел с <abbr title=\"HyperText Markup Language\">HTML</abbr>/<abbr 
            title=\"Cascading Style Sheets\">CSS</abbr>, поэтому многое уже не помню и в первую очередь, курс по 
            фронтенду позолит мне вспомнить давно забытое.
        </p>
        <p>
            Во-вторых, этот курс практический, и я ожидаю, что будут различные интересные задания, которые позволят
            <img class="letter__image" src="images/itmo.png" alt="itmo"> проверить полученные знания в 
            <i>\"боевых условиях\"</i>.
        </p>
        <p>
            В-третьих, я ожидаю знакомства с новыми технологиями, такими как <a href="https://reactjs.org/">React</a> и
            <a href="https://redux.js.org">Redux</a>, которые позволят мне создать web-приложение.
        </p>`;
}

function genAuthorName() {
    return surnames[Math.floor(Math.random() * (surnames.length - 1))] + " " + names[Math.floor(Math.random() * (names.length - 1))];
}

function genAuthorImage() {
    return icons[Math.floor(Math.random() * (icons.length - 1))];
}

function addZero(x) {
    if (x < 10) {
        return "0" + x;
    } else {
        return x.toString();
    }
}
let months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

function getHeadDate(date) {
    let month = date.getMonth();
    let day = date.getDate();
    return day + " " + months[month];
}

function getDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return year + "-" + addZero(month) + "-" + addZero(day) + " " + addZero(hours) + ":" + addZero(minutes);
}


function genLetterHeadHtml(id) {
    let firstSentence = letterIdToLetter.get(id);
    firstSentence = firstSentence.substr(3, firstSentence.length - 3);
    let date = new Date();
    let authorImage = genAuthorImage();
    let authorName = genAuthorName();
    let headSentence = firstSentence.split(".")[0];
    let headTagDate = getDate(date);
    let headDate = getHeadDate(date);
    return `
        <label>
            <input class="page__my-input letters__my-checkbox" type="checkbox">
        </label>
        <a href="#" class="letter-head letter-head_unread">
            <img class="letter-head__author-image" src="${authorImage}" alt="author logo">
            <div class="letter-head__author-name">
                <p class="page__my-text">${authorName}</p>
            </div>
            <div class="letter-head__read"></div>
            <div class="letter-head__text">
                <p class="page__my-text">${headSentence}</p>
            </div>
            <div class="letter-head__date">
                <time datetime="${headTagDate}"><p>${headDate}</p></time>
            </div>
        </a>
        <div class=\"page__line\"></div>
        `
}

function addOpenLetterListener(element, id) {
    let letters = Array.from(document.getElementsByClassName("letters"))[0];
    element.addEventListener("click", function () {
            letters.style.display = "none";
            let letter = document.getElementById("main-letter");
            Array.from(letter.children)[0].innerHTML = letterIdToLetter.get(id);
            letter.style.display = "inline-block";
            let letterHead = document.getElementById(id);
            letterHead.children.item(1).className = "letter-head";
        }
    );
}

function newMail() {
    let letters = Array.from(document.getElementsByClassName("letters"))[0];
    let newElement = document.createElement("li");
    newElement.className = "";
    newElement.id = "letter-id-" + count++;
    letterIdToLetter.set(newElement.id, genText());
    newElement.innerHTML = genLetterHeadHtml(newElement.id);
    addOpenLetterListener(newElement.getElementsByClassName("letter-head").item(0), newElement.id);
    letters.insertBefore(newElement, letters.firstChild);

    array.push(newElement.id);
    let elements = Array.from(newElement.children);
    newElement.classList.add("letters__animated-add-line");
    setTimeout(function () {
        newElement.classList.add("letters__animated-add-line_visible");
    }, 0);
    // newElement.classList.add("letters__animated-add-line_visible");
    if (size > 30) {
        for (let i = 0; i < array.length; i++) {
            let element = document.getElementById(array[i]);
            if (element.style.display !== "none") {
                element.style.display = "none";
                break;
            }
        }
    }
}

function closeLetter() {
    let letters = Array.from(document.getElementsByClassName("letters"))[0];
    let letter = document.getElementById("main-letter");
    letter.style.display = "none";
    letters.style.display = "inline-block";
}

function deleteMessage() {
    let letters = Array.from(document.getElementsByClassName("letters"))[0];
    let elements = Array.from(letters.children);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].children[0].children[0].checked) {
            elements[i].className += " letters__animated-delete-line";
            setTimeout( function () {
                letters.removeChild(elements[i]);
                letterIdToLetter.delete(elements[i].id);
                size--;
                array = array.filter(id => document.getElementById(id) != null);
                for (let i = array.length - 1; i >= 0 && size >= 30; i--) {
                    let element = document.getElementById(array[i]);
                    if (element.style.display === "none") {
                        element.style.display = "block";
                        break;
                    }
                }
            }, 2000);
        }
    }
}

function selectAll() {
    let checkbox = Array.from(document.getElementsByClassName("content__my-checkbox"))[0];
    let checkboxes = Array.from(document.getElementsByClassName("letters__my-checkbox"));
    for (let i = 0; i < checkboxes.length && i < 30; i++) {
        checkboxes[i].checked = checkbox.checked;
    }
}

let last = 0;

function rec() {
    newMail();
    const fiveMinute = 300000;
    const maxTime = 600000;
    const minTime = 10;
    let time =  Math.max(fiveMinute - last, Math.floor(Math.random() * (maxTime - minTime) + minTime));
    // console.log(new Date());
    // console.log(time);
    last = time;
    setTimeout(rec, time);
}

function initialize() {
    array.push("letter-id-0", "letter-id-1", "letter-id-2", "letter-id-3");
    letterIdToLetter.set("letter-id-0", genText());
    addOpenLetterListener(document.getElementById("letter-id-0").getElementsByClassName("letter-head").item(0), "letter-id-0");

    letterIdToLetter.set("letter-id-1", genText());
    addOpenLetterListener(document.getElementById("letter-id-1").getElementsByClassName("letter-head").item(0), "letter-id-1");

    letterIdToLetter.set("letter-id-2", genText());
    addOpenLetterListener(document.getElementById("letter-id-2").getElementsByClassName("letter-head").item(0), "letter-id-2");

    letterIdToLetter.set("letter-id-3", myText());
    addOpenLetterListener(document.getElementById("letter-id-3").getElementsByClassName("letter-head").item(0), "letter-id-3");

    const maxTime = 600000;
    const minTime = 10;
    let time = Math.floor(Math.random() * (maxTime - minTime) + minTime);
    // console.log(new Date());
    // console.log(time);
    last = 300000;
    setTimeout(rec, time);

}