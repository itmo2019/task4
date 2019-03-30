let timerId = setTimeout(function newMail() {
    let fiveMin = 5 * 60 * 1000;
    let rndNum = Math.floor(Math.random() * 5 * 60 * 1000);
    addNewLetter();
    timerId = setTimeout(newMail, fiveMin + rndNum);
}, 1000);

function addNewLetter() {
    if (letterCounter === 30) {
        removeLastLetter();
    }
    let letters = document.getElementById("letters");
    let nameThemeContent = letterCreation();
    let bodyLetters = letters.children[2];
    let letter = createElementFromHTML(letterHTML);
    letter.children[2].innerHTML = nameThemeContent[0];
    letter.children[4].innerHTML = nameThemeContent[1];
    letter.children[5].innerHTML = nameThemeContent[2];
    bodyLetters.insertAdjacentElement("beforeend", letter);
    bodyLetters.insertAdjacentHTML("beforeend", lineHTML);
    letterCounter++;
}

function openContentLetter(event) {
    let letter = event.target;
    letter.style.animation = 'none';
    console.log(letter);
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    let contentLetter = createElementFromHTML(contentLetterHTML);
    console.log(contentLetter);
    contentLetter.children[1].children[1].innerHTML = letter.children[2].innerHTML;
    contentLetter.children[1].children[0].innerHTML = letter.children[4].innerHTML;
    contentLetter.children[3].innerHTML = letter.children[5].innerHTML;
    bodyLetters.style.display = 'none';
    bodyLetters.insertAdjacentElement("afterend", contentLetter);
}

function closeContentLetter() {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    letters.removeChild(letters.children[3]);
    bodyLetters.style.display = "block";
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

const letterHTML =
    "<div class='mail-body__letters-window__body__letter' onclick='openContentLetter(event)'>\n" +
    "    <label class='check'>\n" +
    "        <input class='check__input' type='checkbox'>\n" +
    "        <span class='check__box'></span>\n" +
    "    </label>\n" +
    "    <div class='mail-body__letters-window__body__letter__photo'></div>\n" +
    "    <div class='mail-body__letters-window__body__letter__author'></div>\n" +
    "    <div class='mail-body__letters-window__body__letter__readed'></div>\n" +
    "    <div class='mail-body__letters-window__body__letter__theme'></div>\n" +
    "    <div class='mail-body__letters-window__body__letter__content'></div>\n" +
    "    <div class='mail-body__letters-window__body__letter__data'>\n" +
    "        <time datetime='2019-03-01'>3 мар</time>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class='line'></div>";

const lineHTML = "<div class='line'></div>";

const contentLetterHTML =
    "<div class='content-letter'>\n" +
    "    <div class='content-letter__close' onclick='closeContentLetter()'></div>\n" +
    "    <header class='content-letter__header'>\n" +
    "        <div class='content-letter__header__theme'></div>\n" +
    "        <div class='content-letter__header__author'></div>\n" +
    "    </header>\n" +
    "    <div class='line'></div>\n" +
    "    <div class='content-letter__body'></div>\n" +
    "</div>";