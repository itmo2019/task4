const newMessageTimeoutMax = minutesToMillis(5);
const minNewMessageTimeout = 10;
const maxNewMessageTimeout = minutesToMillis(10);

var letterCounter = 5;
let lastTimeout = randomInteger(minNewMessageTimeout, maxNewMessageTimeout);

function newMail() {
    const mails = document.getElementById("letters");
    const letter = generateLetter();

    let before;
    if (mails.childNodes.length === 0) {
        before = null;
    } else {
        before = mails.childNodes.values().next().value;
    }
    mails.insertBefore(letter, before);

    setTimeout(() => setCreateTransition(letter), 10);
}

window.onload = function () {
    setTimeout(newMessagePerRandomTime, lastTimeout);

    let sendBtn = document.querySelector(".ya-big-button");
    sendBtn.addEventListener("click", () => newMail());

     let removeBtn = document.querySelector("#remove-btn");
    removeBtn.addEventListener("click", () => removeLetters());

     let selectAllBtn = document.querySelector("#select-all");
    selectAllBtn.addEventListener("click", () => selectAll());
};

function newMessagePerRandomTime() {
    newMail();
    let randomTimeout = randomInteger(minNewMessageTimeout, maxNewMessageTimeout);
    let timeout = Math.max(randomTimeout, newMessageTimeoutMax);
    setTimeout(newMessagePerRandomTime, (newMessageTimeoutMax - lastTimeout) + timeout);
    lastTimeout = timeout;
}

function removeLetters() {
    const mails = document.getElementById("letters");

    const checked = []
        .filter
        .call(mails.getElementsByClassName("ya-checkbox"), (elem) => elem.checked)
        .map((doc) => doc.parentElement.parentElement);

    setTimeout(() => markAsRemoved(checked), 10);

    let selectAllCheckBox = document.getElementById("select-all");
    selectAllCheckBox.checked = false;

    mails.addEventListener("transitionend", () => checked.forEach((elem) => mails.removeChild(elem)))
}

function generateLetter() {
    let year = getYear();
    let sender = getSender();
    let avatar = getAvatar();

    let letter = buildLetter(avatar, sender, getTitle(year), getDate());

    let letterMessage = letter.querySelector(".letter_message_text");

    loadFactAboutYear(year, letterMessage);

    return letter;
}

function buildLetter(avatar, sender, title, date) {
    let letter = getLetterTemplate(letterCounter++);

    setText(letter, ".letters__mail_sender", sender);
    setText(letter, ".letters__mail_message-title", title);
    setText(letter, ".letters__mail_receive-time", date);

    let avatarImg = letter.querySelector(".letters__mail_user-avatar");
    avatarImg.setAttribute("src", avatar);

    return letter;
}

function getLetterTemplate(letterNumber) {
    let template = document.querySelector('#letter_template');
    let letterMail = document.importNode(template.content.querySelector(".letters_mail"), true);

    let letterId = "letter_open" + letterNumber;

    letterMail.querySelector("#letter_open_").setAttribute("id", letterId);
    letterMail.querySelectorAll('label[for="letter_open_"]')
        .forEach((elem) => elem.setAttribute("for", letterId));

    return letterMail;
}

function setText(letter, className, text) {
    let field = letter.querySelector(className);
    field.innerText = text
}

function setCreateTransition(letter) {
    return letter.className += " letters_mail_show";
}

function markAsRemoved(checked) {
    checked.forEach((parent) => {
        parent.className += " letters_mail_will_be_removed";
    })
}

function loadFactAboutYear(year, msg) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://numbersapi.com/${year}/year`, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                msg.innerText = xhr.responseText;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

function getYear() {
    return randomInteger(100, 2019)
}

const month = ['янв', 'фев', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

function getDate() {
    let temp = new Date();
    return temp.getDate() + ' ' + month[temp.getMonth()];
}

const senders = ["Антоша", "Брат моего брата", "Врач без пациентов", "Вспыльчивый человек", "Гайка № 6", "Гайка №9", "Numeric Master"];

function getSender() {
    return senders[randomInteger(0, senders.length - 1)]
}

const avatars = ["img/anonymous.svg", "img/munch.png", "img/magritte.png"];

function getAvatar() {
    return avatars[randomInteger(0, avatars.length - 1)]
}

function getTitle(year) {
    switch (randomInteger(0, 2)) {
        case 0: return `В ${year} нужно всего лишь...`;
        case 1: return `А ты знал что в ${year} году...`;
        case 2: return `Раз в ${year} происходит...`;
    }
}

function selectAll() {
    let selectAllCheckBox = document.getElementById("select-all");

    const mails = document.getElementById("letters");
    let selectAll = selectAllCheckBox.checked;

    [].filter.call(mails.getElementsByClassName("ya-checkbox"), (elem) => elem.checked = selectAll)
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function minutesToMillis(minutes) {
    return 1000 * 60 * minutes
}