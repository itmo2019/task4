let newLetterString = '<li class="message new-message">\n' +
    '<div class="checkbox message__checkbox">\n' +
    '<label>\n' +
    '<input type="checkbox" class="checkbox__input">\n' +
    '<span class="checkbox__custom"></span>\n' +
    '</label>\n' +
    '</div>\n' +
    '<label for="open-message" onclick="openMessage(this)">\n' +
    '<span class="message__content">\n' +
    '<span class="message__sender">\n' +
    '<img id="message-picture" class="message__sender-picture" src="images/yandex-logo.png" width="30" height="30">\n' +
    '<span id="sender-name" class="message__sender-name message__sender-name_not-read">Яндекс</span>\n' +
    '</span>\n' +
    '<span class="is-read-mark message__is-read-mark is-read-mark_not-read"></span>\n\n' +
    '<span class="message__text">\n' +
    '<span id="message-text" class="message__text-inner message__text-inner_not-read">\n' +
    'Новое сообщение!\n' +
    '</span>\n' +
    '</span>\n' +
    '<span class="message__date"><time id="message-time" datetime="08-06">6 июл</time></span>\n' +
    '</span>\n' +
    '</label>\n' +
    '</li>\n';

function openMessage(label) {
    document.getElementById("full-message-img")
        .setAttribute("src", label.getElementsByClassName("message__sender-picture")[0].getAttribute("src"));
    document.getElementById("full-message-sender").innerText =
        label.getElementsByClassName("message__sender-name")[0].innerHTML;
    document.getElementById("full-message-text").innerText =
        label.getElementsByClassName("message__text-inner")[0].innerHTML;
    document.getElementById("full-message-date").innerText =
        label.getElementsByTagName("time")[0].innerHTML;
}

const min = 10;
const max = 600000;
/* Returns result in ms */
function getRandomInterval() {
    return Math.floor(Math.random() * Math.floor(min + max) - min);
}

async function sleep (interval) {
    return new Promise((resolve) => setTimeout(resolve, interval));
}

async function getMail() {
    await sleep(getRandomInterval());
    newMail();
    while (true) {
        await sleep(getRandomInterval() + max);
        newMail();
    }
}

(async function () {
    let result = await getMail();
})();

function deleteMessages() {
    let messages = document.getElementsByClassName("message");
    for (let message of messages) {
        if (message.getElementsByClassName("checkbox__input")[0].checked === true) {
            message.className += " delete-message";
            setTimeout( function() {
                message.remove();
            }, 500);
        }
    }
}

let deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener('click', deleteMessages);

function checkAllMessages() {
    let checkAll = document.getElementById("check-all");
    let messages = document.getElementsByClassName("message");
    for (let message of messages) {
        message.getElementsByClassName("checkbox__input")[0].checked = checkAll.checked;
    }
}

let checkAll = document.getElementById("check-all");
checkAll.addEventListener('click', checkAllMessages);

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

function newMail() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const endpointRandom =
        'https://en.wikipedia.org/w/api.php?action=query&list=random&utf8=&format=json&rnlimit=1&rnnamespace=0&prop=info';
    const endpointPage =
        'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text|images|links&pageid=';
    const imagePath =
        'https://commons.wikimedia.org/wiki/Special:FilePath/';

    let newLetterNode = new DOMParser().parseFromString(newLetterString, "text/html");

    fetch(proxyUrl + endpointRandom)
        .then(response => response.json())
        .then(data => {
            let id = data['query']['random'][0].id;
            return fetch(proxyUrl + endpointPage + id);
        })
        .then(response => response.json())
        .then(data => {
            newLetterNode.getElementById("sender-name").innerText = data['parse']['title'];
            newLetterNode.getElementById("message-text").innerText = parseText(data['parse']['text']['*']);
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes();
            let messageTime = newLetterNode.getElementById("message-time");
            messageTime.innerText = time;
            messageTime.setAttribute("datetime", time);
            if (data['parse']['images'].length > 0) {
                newLetterNode.getElementById("message-picture").setAttribute("src", imagePath + data['parse']['images'][0]);
            }
            let messagesList = document.getElementById("message-list");
            messagesList.insertBefore(newLetterNode.body.firstChild, messagesList.firstChild);
        })
        .catch(() => console.log('An error occurred'));
}
