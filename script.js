let senders = ["Петя", "Вася", "Маша"];
let subjects = ["Привет из России", "Hello from England", "Bonjour de France"];
let texts = ["Привет!", "Hello!", "Bonjour!"];
let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

let anyCheckboxIsActive = false;
let idToHtmlMap = new Map();

window.onload = function () {
    createMessage();
};

function selectCheckbox(checkbox) {
    if (checkbox.checked) {
        if (!anyCheckboxIsActive) {
            let deleteButton = document.getElementById('delete-messages');
            deleteButton.style.cursor = 'pointer';
        }
        anyCheckboxIsActive = true;
    } else {
        let checkboxes = document.getElementsByClassName('select-message-checkbox');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return;
            }
        }
        anyCheckboxIsActive = false;
        let deleteButton = document.getElementById('delete-messages');
        deleteButton.style.cursor = 'text';
    }
}

function selectAll(selectAllCheckbox) {
    let checkboxes = document.getElementsByClassName('select-message-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAllCheckbox.checked;
    }
    anyCheckboxIsActive = selectAllCheckbox.checked;

    let deleteButton = document.getElementById('delete-messages');
    if (!anyCheckboxIsActive) {
        deleteButton.style.cursor = 'text';
    } else {
        deleteButton.style.cursor = 'pointer';
    }
}

function createMessage() {
    let messagesList = document.getElementsByClassName('messages-list')[0];
    let newMessage = document.createElement('div');
    buildNewMessage(newMessage);
    newMessage.style.height = '0';
    messagesList.insertBefore(newMessage, messagesList.children[0]);

    let animationDuration = 1000;
    let height = 22;
    let durationPerPixel = animationDuration / height;

    var startTime = performance.now();
    requestAnimationFrame(function animate(currentTime) {
        var timePassed = currentTime - startTime;
        if (timePassed > animationDuration) timePassed = animationDuration;
        function draw(timePassed) {
            var shift = (timePassed / durationPerPixel);
            newMessage.style.height = shift + 'px';
        }
        draw(timePassed);
        if (timePassed < animationDuration) {
            requestAnimationFrame(animate);
        }
    });
}

function deleteSelectedMessages() {
    let checkboxes = document.getElementsByClassName('select-message-checkbox');
    let messagesList = document.getElementsByClassName('messages-list')[0];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let message = checkboxes[i].parentElement.parentElement;
            if (message.className.includes('labeled-message')) {
                message = message.parentElement;
            }
            messagesList.removeChild(message);
            i--;
        }
    }
    anyCheckboxIsActive = false;
    document.getElementById('check-all').checked = false;
    let deleteButton = document.getElementById('delete-messages');
    deleteButton.style.cursor = 'text';
}

function openMessage(message) {
    let hiddenMessage = document.getElementsByClassName('hidden-message')[0];
    let hiddenMessageContent = document.getElementsByClassName('hidden-message__content')[0];
    let messagesList = document.getElementsByClassName('messages-list')[0];

    let hiddenHtml = idToHtmlMap.get(message.id);

    hiddenMessageContent.innerHTML = '';
    hiddenMessageContent.appendChild(hiddenHtml);

    messagesList.style.display = "none";
    hiddenMessage.style.display = "block";
}

function closeMessage() {
    let hiddenMessage = document.getElementsByClassName('hidden-message')[0];
    let messagesList = document.getElementsByClassName('messages-list')[0];

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

    let leftPart = document.createElement('div');
    leftPart.classList.add('message-info__left-part');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('select-message-checkbox');
    checkbox.classList.add('checkbox');
    checkbox.onclick = function () {
        selectCheckbox(this);
    };
    leftPart.appendChild(checkbox);

    let senderName = senders[Math.floor(Math.random() * senders.length)];

    let senderLogo = document.createElement('div');
    senderLogo.classList.add('message-info__sender-logo');
    senderLogo.textContent = senderName[0];
    leftPart.appendChild(senderLogo);

    let sender = document.createElement('div');
    sender.classList.add('message-info__sender');
    sender.classList.add('bold');
    sender.textContent = senderName;
    leftPart.appendChild(sender);

    let unreadMark = document.createElement('div');
    unreadMark.classList.add('message-info__mark');
    unreadMark.classList.add('unread-mark');
    leftPart.appendChild(unreadMark);

    newMessage.appendChild(leftPart);

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
    date.textContent = day + ' ' + month.substr(0,3);

    dateContainer.appendChild(date);
    newMessage.appendChild(dateContainer);
    newMessage.onclick = function () {
        openMessage(this);
    };
}
