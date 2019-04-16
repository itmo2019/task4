function openMessage(label) {
    document.getElementById("full-message-img")
        .setAttribute("src", label.querySelector(".message__sender-picture").getAttribute("src"));
    document.getElementById("full-message-sender").innerText =
        label.querySelector(".message__sender-name").innerHTML;
    document.getElementById("full-message-text").innerText =
        label.querySelector(".message__text-inner").innerHTML;
    document.getElementById("full-message-date").innerText =
        label.querySelector("time").innerHTML;
}

const minDelay = 10;
/* 10 mins */
const maxDelay = 600000;
/* 5 mins */
const interval = maxDelay / 2;

/* Returns result in ms */
function getRandomTimeout(min, max) {
    return Math.floor(min + Math.random() * Math.floor(max - min));
}

async function getMail() {
    await newMail();
    await new Promise((resolve) => {
        setTimeout(async () => {
            await getMail();
            resolve();
        }, getRandomTimeout(interval, maxDelay));
    });
}

function deleteMessages() {
    let messages = document.getElementsByClassName("message");
    for (let message of messages) {
        if (message.querySelector(".check__input").checked === true) {
            message.classList.add("delete-message");
            message.addEventListener('animationend', () => {
                message.remove();
            });
        }
    }
}

function checkAllMessages() {
    let checkAll = document.getElementById("check-all");
    let messages = document.getElementsByClassName("message");
    for (let message of messages) {
        message.querySelector(".check__input").checked = checkAll.checked;
    }
}

/* remove tags and line breaks */
function parseText(text) {
    let div = document.createElement("div");
    div.innerHTML = text;
    let cleanText = div.innerText.replace(/\r?\n|\r/g, "");
    let ind = cleanText.indexOf("References[edit]");
    if (ind > 0) {
        cleanText = cleanText.substring(0, ind);
    }
    return cleanText;
}

async function newMail() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const endpointRandom =
        'https://en.wikipedia.org/w/api.php?action=query&list=random&utf8=&format=json&rnlimit=1&rnnamespace=0&prop=info';
    const endpointPage =
        'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text|images|links&pageid=';
    const imagePath =
        'https://commons.wikimedia.org/wiki/Special:FilePath/';

    let template = document.getElementById("new-message-template");
    let newLetterNode = document.importNode(template.content, true);

    let randomPageIdRaw = await fetch(proxyUrl + endpointRandom);
    let randomPageId = await randomPageIdRaw.json();
    let id = randomPageId['query']['random'][0].id;
    let randomPageRaw = await fetch(proxyUrl + endpointPage + id);
    let randomPage = await randomPageRaw.json();

    newLetterNode.getElementById("sender-name").innerText = randomPage['parse']['title'];
    newLetterNode.getElementById("message-text").innerText = parseText(randomPage['parse']['text']['*']);
    let today = new Date();
    let minutes = today.getMinutes();
    let minsPrefix = Math.floor(minutes / 10) === 0 ? "0" : "";
    let time = today.getHours() + ":" + minsPrefix + minutes;
    let messageTime = newLetterNode.getElementById("message-time");
    messageTime.innerText = time;
    messageTime.setAttribute("datetime", time);
    if (randomPage['parse']['images'].length > 0) {
        newLetterNode.getElementById("message-picture").setAttribute("src", imagePath + randomPage['parse']['images'][0]);
    }
    let label = newLetterNode.getElementById("open-message-label");
    label.addEventListener('click', () => {openMessage(label)});

    let messagesList = document.getElementById("message-list");
    messagesList.insertBefore(newLetterNode, messagesList.firstChild);
}

async function main() {
    await new Promise((resolve) => {
        setTimeout(async () => {
            await getMail();
            resolve();
        }, getRandomTimeout(minDelay, maxDelay));
    });
}

main().catch(console.log);

let deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener('click', deleteMessages);

let checkAll = document.getElementById("check-all");
checkAll.addEventListener('click', checkAllMessages);

let messages = document.getElementsByClassName("message");
for (let message of messages) {
    let label = message.querySelector(".open-message-label");
    label.addEventListener('click', () => {openMessage(label)})
}
