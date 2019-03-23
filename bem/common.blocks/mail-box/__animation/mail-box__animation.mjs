import { LoremIpsum } from '/task4/node_modules/@jsilvermist/lorem-ipsum-js/src/lorem-ipsum.js';

const lorem = new LoremIpsum();
export const messageSet = new Set();
export const MAX_LETTERS_NUMBER = 5;

const snippetTemplate =
    '    <label>\n' +
    '        <input class="checkbox message__checkbox" type="checkbox">\n' +
    '    </label>\n' +
    '    <img class="message__avatar" src="img/yandex-logo.png" alt="Я">\n' +
    '    <div class="message__sender">\n' +
    '        <span class="message__text message_unread">\n' +
    '            Яндекс.Паспорт\n' +
    '        </span>\n' +
    '    </div>\n' +
    '    <div class="message__unread-dot message_unread"></div>\n' +
    '    <div class="message__topic">\n' +
    '        <span class="message__text message_unread">\n' +
    '            Доступ к аккаунту восстановлен\n' +
    '        </span>\n' +
    '    </div>\n' +
    '    <div class="message__date">\n' +
    '        <span class="message__text message_unread">\n' +
    '            6 авг\n' +
    '        </span>\n' +
    '    </div>';

setNewMessageListener();
setRemoveListener();
setTimeout(addRandomly, Math.floor(Math.random() * (10 * 60 * 1000 - 10 + 1) + 10));

function generateName() {
    return lorem.words(1, 3).join(" ");
}

function generateTopic() {
    return lorem.sentence(1, 10);
}

function generateHTMLText() {
    const text = document.createElement('div');
    text.className = 'full-message__text';
    const par_numbers = lorem._random(4, 10);
    let i;
    for (i = 0; i < par_numbers; i++) {
        const paragraph = document.createElement('p');
        paragraph.innerText = lorem.paragraph(5, 40);
        text.appendChild(paragraph);
    }
    return text;
}

function getTime() {
    return new Date()
        .toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'})
        .toString();
}

function getCloseButton() {
    const button = document.createElement('img');
    button.className = 'full-message__close-button';
    button.addEventListener('click', () => closeText(button));
    return button;
}

function closeText(button) {
    const fullMessage = button.parentNode;
    fullMessage.style.display = 'none';
    let messages = document.getElementsByClassName('message');
    for (const message of messages) {
        message.style.display = 'block';
    }
}

function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

function readMessage(snippet, curMessage) {
    let messages = document.getElementsByClassName('message');
    for (const mes of messages) {
        mes.style.display = 'none';
    }

    const elems = Array.from(snippet.getElementsByClassName("message_unread"));
    for (const el of elems) {
        console.log(el);
        el.classList.remove("message_unread");
    }
    curMessage.style.display = 'block';
}

function generateFullMessage() {
    const wrapper = document.createElement('div');
    wrapper.className = 'full-message';
    wrapper.appendChild(getCloseButton());
    wrapper.appendChild(generateHTMLText());
    return wrapper;
}


function generateMessage() {
    const newMessage = document.createElement('li');
    newMessage.className = 'message message_unread';
    newMessage.innerHTML = snippetTemplate;
    const texts = newMessage.getElementsByClassName('message__text');
    texts[0].textContent = generateName();
    texts[1].textContent = generateTopic();
    texts[2].textContent = getTime();
    return newMessage;
}

function setNewMessageListener() {
    let button = document.body
        .getElementsByClassName('actions__item')[1];
    button
        .addEventListener('click', () => addNewMessage());


}

function addRandomly() {
    const minTimeout = 5 * 60;
    const maxTimeout = 10 * 60;

    const timeout = Math.floor(Math.random() * (maxTimeout - minTimeout + 1) + minTimeout);
    addNewMessage();
    setTimeout(addRandomly,  timeout * 1000);
}

function addNewMessage() {
    let mailBox = document.getElementsByClassName('mail-box')[0];
    const newMessage = generateMessage();

    const visibleMessages = mailBox.getElementsByClassName('message');
    if (visibleMessages.length === MAX_LETTERS_NUMBER) {
        messageSet.add(mailBox.lastChild);
        mailBox.removeChild(mailBox.lastChild);
        messageSet.add(mailBox.lastChild);
        mailBox.removeChild(mailBox.lastChild);
    }

    if(mailBox.firstChild != null) {
        mailBox.insertBefore(newMessage, mailBox.firstChild);
    } else {
        mailBox.appendChild(newMessage);
    }

    const fullMessage = generateFullMessage();

    mailBox.insertAdjacentElement("afterbegin", fullMessage);

    const texts = newMessage.getElementsByClassName('message__text');
    for (const text of texts){
        text.addEventListener('click', () => readMessage(newMessage, fullMessage));
    }
}

function setRemoveListener() {
    let remove_button = document.body
        .getElementsByClassName('actions__item')[3];
    remove_button
        .addEventListener('click', () => removeMessages());
}

function removeMessage(message) {
    let id = setInterval(disappearing, 5);
    let duration = 100.0;
    let k = 0;
    let stepOpacity = 1.0/duration;
    function disappearing() {
        if (k === duration) {
            clearInterval(id);
        } else {
            k++;
            message.style.opacity = (1.0 - k * stepOpacity).toString();
        }
    }
}

function removeMessages() {
    let messages = document.body.getElementsByClassName('message');
    let rem_messages = Array.prototype.filter.call(messages,
        elem => {
            return elem.getElementsByClassName('message__checkbox')[0].checked
        });
    rem_messages.forEach(message => {
        removeMessage(message);
        setTimeout(() => message.parentNode.removeChild(message), 500);
    });

    addOldMessages();
}

function addOldMessages() {
    let mailBox = document.getElementsByClassName('mail-box')[0];
    const visibleMessages = mailBox.getElementsByClassName('message');

    const iter = messageSet.values();
    const need = Math.min(MAX_LETTERS_NUMBER - visibleMessages.length, messageSet.size / 2);
    let i;
    console.log(need);

    let toRemove = [];
    for (i = 0; i < need; i++){
        const snippet = iter.next().value;
        const full_message = iter.next().value;

        toRemove.push(snippet);
        toRemove.push(full_message);

        mailBox.appendChild(snippet);
        mailBox.appendChild(full_message);
    }

    for (const rem of toRemove){
        messageSet.remove(rem);
    }
}