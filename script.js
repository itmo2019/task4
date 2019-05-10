let authors = ["Антон", "Саша", "Алексей"];
let subject = ["Путешествие", "Стажировка", "Виза"];
let text = ["Когда планируема дата вашего приезда ?", "Где вы собираетесь оставаться ?", "Ты опоздал с дедлайном"];
let dates = ["1 янв", "2 фев", "3 март", "4 апр", "5 авг"];

let messageTexts = new Map();
let minTime = 10;
let maxTime = 1000 * 60 * 10 - minTime;

function allMessagesSelect() {
    let checkboxes = document.getElementsByClassName('message__message-select');
    for (let i = 0; i < checkboxes.length; ++i) {
        if (checkboxes[i].checked) {
            checkboxes[i].checked = false;
        } else {
            checkboxes[i].checked = true;
        }
    }
}

function setMessageListActive() {
    let lst = document.querySelector('.content-messages__message-list');
    lst.classList.remove('page_visibility_hide');
}

function getText(event, id) {
    putTextContent(document, '.content-messages__body-text', messageTexts.get(id.toString()))

    let lst = document.querySelector('.content-messages__message-list');
    lst.classList.add('page_visibility_hide');
}

function buildMessage() {
    let id = (new Date()).getTime();

    messageTexts.set(id.toString(), text[Math.floor(Math.random() * text.length)]);

    let cln = document.importNode(document.querySelector('#message-template').content, true);
    let newMessage = cln.querySelector('.message');
    newMessage.classList.add('create_animation');
    newMessage.id = id;

    messageLabel = newMessage.querySelector('.message-open');
    messageLabel.setAttribute('for', 'message-select1');
    messageLabel.addEventListener('click', function(event) {
        getText(event, id);
    }, false);

    putTextContent(newMessage, '.message__author-name', authors[Math.floor(Math.random() * authors.length)]);
    putTextContent(newMessage, '.message__message-subject', subject[Math.floor(Math.random() * subject.length)]);
    putTextContent(newMessage, '.message__message-receive-time', dates[Math.floor(Math.random() * dates.length)]);
    
    return newMessage;
}

function putTextContent(doc, name, value) {
    messagePart = doc.querySelector(name);
    messagePart.textContent = value; 
}

function createMessage() {
    let list = document.querySelector('.content-messages__message-list');
    if (list.getElementsByTagName("li").length >= 30) {
        let button = document.querySelector('.page__message-creator');
        button.disabled = true;
        return;
    }
    let newMessage = buildMessage();
    list.insertBefore(newMessage, list.children[0]);
    setTimeout(() => {
        newMessage.classList.remove('create_animation');
    }, 1000);
}

function deleteSelected() {
    let selectAllCheckbox = document.querySelector('.ya-mail__select-all-check');
    selectAllCheckbox.checked = false;
    let button = document.querySelector('.page__message-creator');
    button.disabled = false;
    let checkboxes = document.getElementsByClassName('message__message-select');
    let list = document.querySelector('.content-messages__message-list');
    for (let i = 0; i < checkboxes.length; ++i) {
        if (checkboxes[i].checked) {
            let curMessage = checkboxes[i].parentElement;
            curMessage.classList.add('delete_animation');
            setTimeout(() => {
                list.removeChild(curMessage);
            }, 2000);
        }
    }
}

window.onload = function() {
    newMailTime();
}

function newMailTime() {
    createMessage();
    setNextRand();
}

function setNextRand() {
    setTimeout(newMailTime, Math.random() * maxTime + minTime);
}