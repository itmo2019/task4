let senders = ["Петя", "Вася", "Маша"];
let subjects = ["Привет из России", "Hello from England", "Bonjour de France"];
let texts = ["Привет!", "Hello!", "Bonjour!"];
let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

let anyCheckboxIsActive = false;
let idToHtmlMap = new Map();
let messagesPerPage = 30;
let overflowMessages = [];
let messagesListActualSize = 0;

let timeoutUpper = 10 * 60 * 1000;
let timeoutLower = 5 * 60 * 1000;


window.onload = function () {
    createAndRandom();
};

function selectCheckbox(checkbox) {
    window.event.stopPropagation();

    if (checkbox.checked) {
        if (!anyCheckboxIsActive) {
            let deleteButton = document.getElementById('delete-messages');
            deleteButton.classList.add('cursor-pointer');
        }
        anyCheckboxIsActive = true;
    } else {
        let checkboxes = document.getElementsByClassName('select-message__checkbox');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return;
            }
        }
        anyCheckboxIsActive = false;
        let deleteButton = document.getElementById('delete-messages');
        deleteButton.classList.remove('cursor-pointer');
    }
}

function selectAll(selectAllCheckbox) {
    let checkboxes = document.getElementsByClassName('select-message__checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].parentElement.parentElement.classList.contains('to-delete')) {
            continue;
        }
        checkboxes[i].checked = selectAllCheckbox.checked;
    }
    anyCheckboxIsActive = selectAllCheckbox.checked;

    let deleteButton = document.getElementById('delete-messages');
    if (!anyCheckboxIsActive) {
        deleteButton.classList.remove('cursor-pointer');
    } else {
        deleteButton.classList.add('cursor-pointer');
    }
}

function createAndRandom() {
    newMail();
    newRandomMessage()
}

function newRandomMessage() {
    setTimeout(createAndRandom, Math.random() * (timeoutUpper - timeoutLower) + timeoutLower);
}

function newMail() {
    let messagesList = document.querySelector('.messages-list');
    while (messagesListActualSize >= messagesPerPage) {
        for (let index = messagesList.children.length - 1; index >= 0; index--) {
            let message = messagesList.children[index];
            if (message.classList.contains('to-delete')) {
                continue;
            }
            message.classList.add("to-delete");
            messagesListActualSize--;
            overflowMessages.push(message);
            setTimeout(() => {
                if (message.classList.contains('to-delete')) {
                    messagesList.removeChild(message);
                    message.classList.remove('to-delete');
                }
            }, 1500);
            break;
        }
    }
    let newMessage = document.createElement('div');
    buildNewMessage(newMessage);

    messagesListActualSize++;
    messagesList.insertBefore(newMessage, messagesList.children[0]);

    setTimeout(() => {
        newMessage.classList.remove("to-create");
    }, 50);
}

function deleteSelectedMessages() {
    let checkboxes = document.getElementsByClassName('select-message__checkbox');
    let messagesList = document.querySelector('.messages-list');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let message = checkboxes[i].parentElement.parentElement;
            if (message.classList.contains('to-delete')) {
                continue;
            }

            message.classList.add("to-delete");
            messagesListActualSize--;
            setTimeout(() => {
                messagesList.removeChild(message);
            }, 1500);
            if (overflowMessages.length > 0) {
                let newMessage = overflowMessages.pop();
                if (newMessage.classList.contains('to-delete')) {
                    newMessage.classList.remove('to-delete');
                } else {
                    messagesList.appendChild(newMessage);
                }
                newMessage.classList.add('to-create');
                messagesListActualSize++;
                setTimeout(() => {
                    newMessage.classList.remove("to-create");
                }, 50);
            }
        }
    }
    anyCheckboxIsActive = false;
    document.getElementById('check-all').checked = false;
    let deleteButton = document.getElementById('delete-messages');
    deleteButton.classList.remove('cursor-pointer');
}

function openMessage(message) {
    let hiddenMessage = document.querySelector('.hidden-message');
    let hiddenMessageContent = document.querySelector('.hidden-message__content');
    let messagesList = document.querySelector('.messages-list');

    let hiddenHtml = idToHtmlMap.get(message.id);

    hiddenMessageContent.innerHTML = '';
    hiddenMessageContent.appendChild(hiddenHtml);

    messagesList.style.display = "none";
    hiddenMessage.style.display = "block";
}

function closeMessage() {
    let hiddenMessage = document.querySelector('.hidden-message');
    let messagesList = document.querySelector('.messages-list');

    hiddenMessage.style.display = "none";
    messagesList.style.display = "block";
}

function buildNewMessage(newMessage) {
    let currentDate = new Date();

    let id = currentDate.getTime();
    let hiddenHtml = document.createElement('div');
    hiddenHtml.classList.add('hidden-message__text');
    let langInd = Math.floor(Math.random() * senders.length);
    hiddenHtml.textContent = texts[langInd];

    idToHtmlMap.set(id.toString(), hiddenHtml);

    newMessage.id = id;
    newMessage.classList.add('message');
    newMessage.classList.add('to-create');

    let checkboxLabel = document.createElement('label');
    checkboxLabel.classList.add('select-message__checkbox-label');
    checkboxLabel.setAttribute('for', 'checkbox-' + id);
    checkboxLabel.onclick = function () {
        window.event.stopPropagation();
    };

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('select-message__checkbox');
    checkbox.classList.add('checkbox');
    checkbox.onclick = function () {
        selectCheckbox(this);
    };
    checkbox.setAttribute('id', 'checkbox-' + id);
    checkboxLabel.appendChild(checkbox);
    newMessage.appendChild(checkboxLabel);

    let senderName = senders[Math.floor(Math.random() * senders.length)];

    let senderLogo = document.createElement('div');
    senderLogo.classList.add('message-info__sender-logo');
    senderLogo.textContent = senderName[0];
    newMessage.appendChild(senderLogo);

    let sender = document.createElement('div');
    sender.classList.add('message-info__sender');
    sender.classList.add('bold');
    sender.textContent = senderName;
    newMessage.appendChild(sender);

    let unreadMark = document.createElement('div');
    unreadMark.classList.add('message-info__mark');
    unreadMark.classList.add('unread-mark');
    newMessage.appendChild(unreadMark);

    let subject = document.createElement('div');
    subject.classList.add('message-info__subject');
    subject.classList.add('bold');
    subject.textContent = subjects[langInd];

    newMessage.appendChild(subject);

    let dateContainer = document.createElement('div');
    dateContainer.classList.add('message-info__date-container');

    let monthInd = currentDate.getMonth().toLocaleString('rus');
    month = months[monthInd];
    let day = currentDate.getDate();

    let date = document.createElement('div');
    date.classList.add('date-container__date');
    date.textContent = day + ' ' + month.substr(0, 3);

    dateContainer.appendChild(date);
    newMessage.appendChild(dateContainer);
    newMessage.onclick = function () {
        openMessage(this);
    };
}
