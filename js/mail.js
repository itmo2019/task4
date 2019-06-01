let ind = 123;
let letterNumber = 3;

const maxNumber = 30;
const minTimeout = 10;
const maxTimeout = 10 * 60 * 1000;
const delay = 5 * 60 * 1000;


const queue = [];

window.onload = function () {

    setTimeout(autoMail, getRandomInt(minTimeout, maxTimeout));

    document.getElementById("write-button")
        .addEventListener("click", newMail);
    document.getElementById("checkbox-that-rules")
        .addEventListener("click", selectAll);
    document.getElementById("delete")
        .addEventListener("click", deleteLetters);
};

function autoMail() {
    newMail();
    const timeout = getRandomInt(delay, maxTimeout);
    setTimeout(autoMail, timeout);
}

function newMail() {
    queue.push(getLetter(ind++));
    if (letterNumber < maxNumber) {
        addLetters();
    }
}

function addLetters() {
    const mails = document.querySelector(".letters");
    let ins;
    if (mails.children.length === 0) {
        ins = null;
    } else {
        ins = mails.firstChild;
    }
    while (queue.length > 0 && letterNumber < maxNumber) {
        letterNumber++;
        const letter = queue.shift();
        mails.insertBefore(letter, ins);
        const magic = letter.offsetHeight;
        letter.classList.add("letter_showed");
        ins = letter;
    }
}

function getLetter(i) {
    const template = document.importNode(document.getElementById("letter__template"), true);
    const letter = template.content.querySelector(".latter");
    const id = "letter_open_" + i;
    letter.querySelector("#letter_open_").setAttribute("id", id);
    letter.querySelectorAll('label[for="letter_open_"]').forEach(
        (it) => it.setAttribute("for", id)
    );
    const sender = senders[getRandomInt(0, senders.length)];
    letter.querySelector(".letter__mail-sender").innerText = sender;
    letter.querySelector(".letter__sender-ico").innerText = sender[0];
    letter.querySelector(".letter__receive-time").innerText = getDate();
    letter.querySelector(".letter__message-title").innerText = themes[getRandomInt(0, themes.length)];
    letter.querySelector(".letter__message-text").innerText = getMessage();

    return letter;
}

function selectAll() {
    let bigCheckbox = document.getElementById("checkbox-that-rules");

    const letters = document.querySelector(".letters");
    let selectAll = bigCheckbox.checked;

    Array.from(letters.getElementsByClassName("mail__checkbox")).forEach(
        (elem) => elem.checked = selectAll
    );
}

function deleteLetters() {
    const letters = document.querySelector(".letters");

    const checked = Array.from(letters.getElementsByClassName("mail__checkbox"))
        .filter((it) => it.checked)
        .map((it) => it.parentElement.parentElement);
    checked.forEach((it) => {
        it.classList.add("letter_removed");
    });
    let selectAllCheckBox = document.getElementById("checkbox-that-rules");
    selectAllCheckBox.checked = false;

    function tmp() {
        checked.forEach((it) => {
            letters.removeChild(it);
        });
        letters.removeEventListener("transitionend", tmp);
    }

    letters.addEventListener("transitionend", tmp);

    letterNumber -= checked.length;
    addLetters();

}

const month = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

const senders = ["Удивительные факты", "Настоящие новости", "Правдивые рассказы"];

const themes = ["Ты не поверишь", "Этого никто не мог предскозать", "Это действительно случилось"];

function getMessage() {
    return "123e";
}

function getDate() {
    let temp = new Date();
    return temp.getDate() + ' ' + month[temp.getMonth()];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}