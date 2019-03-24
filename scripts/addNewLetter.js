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
    let nameThemeBody = createLetter();
    let bodyLetters = letters.children[2];
    let letter = createElementFromHTML(letterHTML);
    letter.children[1].children[1].innerHTML = "От кого: " + nameThemeBody[0];
    letter.children[3].children[0].innerHTML = "Тема: " + nameThemeBody[1];
    letter.children[3].children[1].innerHTML = nameThemeBody[2];
    bodyLetters.insertAdjacentElement("beforeend", letter);
    bodyLetters.insertAdjacentHTML("beforeend", lineHTML);
    letterCounter++;
}

function openContentLetter(event) {
    let letter = event.target.parentNode;
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    let contentLetter = createElementFromHTML(contentLetterHTML);
    console.log(contentLetter);
    contentLetter.children[1].children[1].innerHTML = letter.children[1].children[1].innerHTML;
    contentLetter.children[1].children[0].innerHTML = letter.children[3].children[0].innerHTML;
    contentLetter.children[3].innerHTML = letter.children[3].children[1].innerHTML;
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

const letterHTML = "<div class='letter'>\n" +
    "                <label>\n" +
    "                    <input type='checkbox'>\n" +
    "                </label>\n" +
    "                <div class='sender-info-container' onclick='openContentLetter(event)'>\n" +
    "                    <div class='sender-info-container__photo'></div>\n" +
    "                    <div class='sender-info-container__author'></div>\n" +
    "                </div>\n" +
    "                <div class='readed'></div>\n" +
    "                <div class='letter-info-container' onclick='openContentLetter(event)'>\n" +
    "                    <div class='letter-info-container__theme'></div>\n" +
    "                    <div class='letter-info-container__begin-of-letter'></div>\n" +
    "                    <div class='letter-info-container__data'>\n" +
    "                        <time datetime='2019-03-01'>03.03.2019</time>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n";

const lineHTML = "<div class='line'></div>";

const contentLetterHTML = "<div class='content-letter'>\n" +
    "            <div class='content-letter__close' onclick='closeContentLetter()'></div>\n" +
    "            <header class='content-letter__header'>\n" +
    "                <div class='content-letter__header__theme'></div>\n" +
    "                <div class='content-letter__header__author'></div>\n" +
    "            </header>\n" +
    "            <div class='line'></div>\n" +
    "            <div class='content-letter__body'></div>\n" +
    "        </div>";