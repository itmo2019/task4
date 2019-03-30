let messagesContainer = document.getElementsByClassName('messages-box');
let messagesBox = document.getElementsByClassName('messages-box')[0];
let hiddenBox = document.getElementsByClassName('hidden-box')[0];
let hiddenBoxContent = document.getElementsByClassName('hidden-box__content')[0];
let localMessagesStorage = new Map();
let maxMessagePerPage = 30;
let timeMessageInterval = 5 * 60 * 1000;
let maxMessageInterval = 10 * 60 * 1000;
let wasNormalInterval = true;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

setTimeout(newMail, getRandomArbitrary(10, maxMessageInterval));

function getTimeForMessage() {
    let randomTime = getRandomArbitrary(10, maxMessageInterval);
    if (wasNormalInterval) {
        if (randomTime < timeMessageInterval) {
            wasNormalInterval = false;
        }
    } else {
        randomTime = getRandomArbitrary(timeMessageInterval, maxMessageInterval)
        wasNormalInterval = true;
    }
    console.log(randomTime / 1000);
    console.log(new Date().getTime() / 1000);
    return randomTime;
}

async function newMail() {
    let timeForMessage = getTimeForMessage();
    let newGeneratedMessage = document.createElement('div');
    newGeneratedMessage.className = 'message';
    let newMessage = await generateMessage(newGeneratedMessage);
    newMessage.onclick = function () {
        openMessage(this, event);
    };
    newMessage.classList.add("add-message-animation");
    messagesContainer[0].insertBefore(newMessage, messagesContainer[0].firstChild);
    newMessage.addEventListener("animationend", () => {
        newMessage.classList.remove("add-message-animation");
    });
    setTimeout(newMail, timeForMessage);
}

async function generateMessage(message) {
    if (localMessagesStorage.size >= maxMessagePerPage) {
        let lastMessageOnPageId = Array.from(localMessagesStorage.keys())[localMessagesStorage.size - maxMessagePerPage];
        document.getElementById(lastMessageOnPageId).style.display = "none";
    }
    let id = new Date().getTime();
    message.id = id;

    let senderName = getRandomSender();
    let [theme, text] = await getRandomThemeAndText();
    localMessagesStorage.set(id.toString(), text);

    message.appendChild(generateInput());
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateSenderLogo(senderName[0]));
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateSenderDiv(senderName));
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateUnreadCircle());
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateThemeDiv(theme));
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateDateDiv());

    return message;
}

async function addMessage() {
    let newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage = await generateMessage(newMessage);
    newMessage.onclick = function () {
        openMessage(this, event);
    };
    newMessage.classList.add("add-message-animation");
    messagesContainer[0].insertBefore(newMessage, messagesContainer[0].firstChild);
    newMessage.addEventListener("animationend", () => {
        newMessage.classList.remove("add-message-animation");
    });
}

function removeElement(el) {
    let removedElementId = el.id;
    el.classList.add("delete-message-animation");
    el.addEventListener("animationend", () => {
        el.remove();
    });
    localMessagesStorage.delete(removedElementId);
}

function openMessage(messageOuter, messageInner) {
    let message = localMessagesStorage.get(messageOuter.id);
    if (messageInner.target.className !== 'message__checkbox') {
        hiddenBoxContent.innerHTML = message;
        messagesBox.style.display = "none";
        hiddenBox.style.display = "block";
    }
}

function closeMessage() {
    messagesBox.style.display = "block";
    hiddenBox.style.display = "none"
}

function generateDateDiv() {
    let today = new Date();
    let options = {month: 'long', day: 'numeric'};
    let formattedDate = today.toLocaleDateString("ru-RU", options);
    let date = document.createElement('div');
    date.className = 'message__date';
    date.innerText = formattedDate;
    return date;
}

function generateThemeDiv(theme) {
    let themeDiv = document.createElement('div');
    themeDiv.className = 'message__theme';
    themeDiv.innerText = theme;
    return themeDiv;
}

function generateSenderDiv(senderName) {
    let senderDiv = document.createElement('div');
    senderDiv.className = 'message__sender';
    senderDiv.innerText = senderName + " ";
    return senderDiv;
}

function generateSenderLogo(firstSenderChar) {
    let senderLogoDiv = document.createElement('div');
    senderLogoDiv.classList.add('sender-img');
    senderLogoDiv.classList.add('message__sender-img');
    senderLogoDiv.textContent = firstSenderChar;
    return senderLogoDiv;
}

function generateInput() {
    let input = document.createElement('input');
    input.className = 'message__checkbox';
    input.type = 'checkbox';
    return input;
}

function generateUnreadCircle() {
    let unreadCircle = document.createElement('span');
    unreadCircle.className = 'message__unread-circle';
    return unreadCircle;
}


function deleteMessages() {
    let checkboxes = document.body.querySelectorAll('.message__checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let message = checkboxes[i].parentElement;
            if (message.style.display !== "none") {
                removeElement(message);
            }
        }
    }
    document.querySelector('#select-all-checkbox').checked = false;
    showHiddenMessages();
}

function showHiddenMessages() {
    let keysArray = Array.from(localMessagesStorage.keys());
    let storageSize = localMessagesStorage.size;
    for (let i = Math.max(0, storageSize - maxMessagePerPage); i < storageSize; i++) {
        document.getElementById(keysArray[i]).style.display = "block";
    }
}

function selectAllMessages() {
    let isCheckedAll = document.querySelector('#select-all-checkbox').checked;
    let checkboxes = document.body.querySelectorAll('.message__checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        console.log(checkboxes[i].id);
        if (checkboxes[i].id === "show-page-checkbox") continue;
        checkboxes[i].checked = isCheckedAll;
    }
}

document.getElementById('button-add-message').addEventListener("click", addMessage);
document.getElementById('button-remove-message').addEventListener("click", deleteMessages);
document.getElementById('select-all-checkbox').addEventListener("click", selectAllMessages);
