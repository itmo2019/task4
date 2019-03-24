let messagesContainer = document.getElementsByClassName('messages-box');
let messagesBox = document.getElementsByClassName('messages-box')[0];
let hiddenBox = document.getElementsByClassName('hidden-box')[0];
let hiddenBoxContent = document.getElementsByClassName('hidden-box__content')[0];
let localStorage = new Map();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

setTimeout(newMail, getRandomArbitrary(10, 10 * 60 * 1000));

function newMail() {
    let newGeneratedMessage = document.createElement('div');
    newGeneratedMessage.className = 'message';
    let newMessage = generateMessage(newGeneratedMessage);
    newMessage.onclick = function () {
        openMessage(this, event);
    };
    messagesContainer[0].insertBefore(newMessage, messagesContainer[0].firstChild);
    let animationDuration = 1500;
    let fps = animationDuration / 30;
    animate(newMessage, fps, animationDuration, false);
    setTimeout(newMail, getRandomArbitrary(5 * 60 * 1000, 10 * 60 * 1000))
}

function generateMessage(message) {
    let id = new Date().getTime();
    message.id = id;

    [theme, text] = getRandomThemeAndText();
    localStorage.set(id.toString(), text);

    message.appendChild(generateInput());
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateSenderLogo());
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateSenderDiv());
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateUnreadCircle());
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateThemeDiv(theme));
    message.appendChild(document.createTextNode("\n"));
    message.appendChild(generateDateDiv());

    console.log(message.outerHTML);

    return message;
}

function addMessage() {
    let newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage = generateMessage(newMessage);
    newMessage.onclick = function () {
        openMessage(this, event);
    };
    messagesContainer[0].insertBefore(newMessage, messagesContainer[0].firstChild);
    let animationDuration = 1000;
    let fps = animationDuration / 30;
    animate(newMessage, fps, animationDuration, false);
}

function animate(el, fps, animationDuration, isRemove) {
    var startTime = performance.now();
    requestAnimationFrame(function animate(curTime) {
        var timePassed = curTime - startTime;
        if (timePassed > animationDuration) timePassed = animationDuration;

        function draw(timePassed) {
            var shift = (timePassed / fps);
            el.style.height = isRemove ? (30 - shift) + 'px' : shift + 'px';
            el.style.opacity = isRemove ? 1 - shift / 30 : shift / 30;
        }

        draw(timePassed);
        if (timePassed < animationDuration) {
            requestAnimationFrame(animate);
        }
    });
    if (isRemove) {
        el.style.paddingTop = '0px';
        el.style.paddingBottom = '0px';
        setTimeout(function () {
            el.parentNode.removeChild(el);
        }, animationDuration);
    }
}

function removeElement(el) {
    let animationDuration = 1000;
    let fps = animationDuration / 30;
    animate(el, fps, animationDuration, true);
}

function openMessage(messageOuter, messageInner) {
    let message = localStorage.get(messageOuter.id);
    if (messageInner.target.className !== 'message__checkbox') {
        hiddenBoxContent.innerHTML = message;
        messagesBox.style.display = "none";
        hiddenBox.style.display = "block";
        console.log(message);
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
    console.log(formattedDate);
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

function generateSenderDiv() {
    let senderDiv = document.createElement('div');
    senderDiv.className = 'message__sender';
    senderDiv.innerText = getRandomSender() + " ";
    return senderDiv;
}

function generateSenderLogo() {
    let senderLogoDiv = document.createElement('img');
    senderLogoDiv.className = 'message__ya-img';
    senderLogoDiv.src = 'resources/ya-default.png';
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
            removeElement(message);
        }
    }
}

function selectAllMessages() {
    let isCheckedAll = document.querySelector('#select-all-checkbox').checked;
    console.log(isCheckedAll);
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
