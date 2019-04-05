let timerId = setTimeout(function newMail() {
    let fiveMin = 5 * 60 * 1000;
    let rndNum = Math.floor(Math.random() * 5 * 60 * 1000);
    addNewLetter();
    timerId = setTimeout(newMail, fiveMin + rndNum);
}, 1000);

let letterCounterOnPage = 0;
const maxLettersOnPage = 30;
let stack = [];


function addNewLetter() {
    let letters = document.getElementById("letters");
    let authorThemeContent = letterCreation();
    let bodyLetters = letters.children[2];
    let letter = document.querySelector('#letterHTML');
    letter.content.querySelector('.mail-body__letters-window__body__letter__author').textContent = authorThemeContent[0];
    letter.content.querySelector('.mail-body__letters-window__body__letter__theme').textContent = authorThemeContent[1];
    letter.content.querySelector('.mail-body__letters-window__body__letter__content').textContent = authorThemeContent[2];
    let letterClone = document.importNode(letter.content, true);
    if (letterCounterOnPage >= maxLettersOnPage) {
        stack.push(letterClone);
        return;
    }
    bodyLetters.appendChild(letterClone);
    letterCounterOnPage++;
}

function openContentLetter(event) {
    let letter = event.target;
    if (!letter.type) {
        return;
    }
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    let contentLetter = document.querySelector('#contentLetterHTML');
    contentLetter.content.querySelector('.content-letter__header__author').textContent =
        letter.querySelector('.mail-body__letters-window__body__letter__author').textContent;
    contentLetter.content.querySelector('.content-letter__header__theme').textContent =
        letter.querySelector('.mail-body__letters-window__body__letter__theme').textContent;
    contentLetter.content.querySelector('.content-letter__body').textContent =
        letter.querySelector('.mail-body__letters-window__body__letter__content').textContent;
    bodyLetters.style.display = 'none';
    let cloneContentLetter = document.importNode(contentLetter.content, true);
    letters.insertBefore(cloneContentLetter, bodyLetters);
}

function closeContentLetter() {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[3];
    letters.removeChild(letters.children[2]);
    bodyLetters.style.display = "block";
}