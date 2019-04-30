let emailsList = document.querySelector(".emails-list");
let newPage = document.querySelector(".new-page");
let newPageContent = document.querySelector(".new-page-content");
let deleteMessageButton = document.getElementById("delete-message");
let messages = new Map();
let allCheck = document.querySelector('.content-menu__check');
let isCheckedAll = false;
let isEmailOpen = false;
let id = 2;
let lastMessageTime = Math.floor(Math.random() * 599990 + 10);

deleteMessageButton.addEventListener("click", deleteMessage);

function newMail() {
    addMessage();
    let from = lastMessageTime < 300000 ? 300000 - lastMessageTime : 10;
    lastMessageTime = Math.floor(Math.random() * (600000 - from) + from);
    setTimeout(newMail, lastMessageTime);
}

setTimeout(newMail, lastMessageTime);

function addMessage() {
    if (messages.size >= 30) {
        let messageToHide = Array.from(messages.keys())[messages.size - 30];
        document.getElementById(messageToHide).style.display = "none";
    }

    let newMessage = document.createElement("li");
    newMessage.className = "emails-list__element emails-list__element_highlighted";
    newMessage = getNewMessage(newMessage);
    newMessage.classList.add("emails-list__element_new-start");
    newMessage.onclick = function () {
        openMessage(this, event);
    };

    emailsList.insertBefore(newMessage, emailsList.firstChild);

    setTimeout(function () {
        newMessage.classList.add("emails-list__element_new-finish");
    }, 1);
}

function getNewMessage(newMessage) {
    newMessage.id = id;

    let rnd = Math.floor(Math.random() * (logoMap.length - 1));
    newMessage.appendChild(genInput(id));
    newMessage.appendChild(genLabelForInput(id));
    newMessage.appendChild(genLogo(rnd));
    newMessage.appendChild(genTitle(rnd));
    newMessage.appendChild(genReadIndicator());
    newMessage.appendChild(genPreview());
    newMessage.appendChild(genDate());

    messages.set(id.toString(), genEmail());
    id++;
    return newMessage;
}

function openMessage(messageElem, clickedElem) {
    while (newPageContent.children.length !== 1) {
        newPageContent.removeChild(newPageContent.lastElementChild);
    }

    let message = messages.get(messageElem.id);

    if (!clickedElem.target.classList.contains("content-menu__check") && !clickedElem.target.classList.contains("check-view")) {
        let messageContent = createElementFromHTML(message);
        for (let i = 0; i < messageContent.length; i++) {
            messageContent[i].className = 'new-page-content__text';
            newPageContent.appendChild(messageContent[i]);
        }

        emailsList.style.display = "none";
        newPage.style.display = "block";
        isEmailOpen = true;

        messageElem.classList.remove("emails-list__element_highlighted");
        messageElem.querySelector(".emails-list__read-circle-indicator").classList.remove("emails-list__read-circle-indicator_not-read");
    }
}

function closeNewPage() {
    emailsList.style.display = "block";
    newPage.style.display = "none";
    isEmailOpen = false;
}

function deleteMessage() {
    if (isEmailOpen) {
        return;
    }

    uncheckAllChecker();

    let checks = document.body.querySelectorAll(".content-menu__check");

    for (let i = 1; i < checks.length; i++) {
        let check = checks[i];
        if (check.checked) {
            while (!check.classList.contains("emails-list__element")) {
                check = check.parentElement;
            }

            check.classList.add("emails-list__element_del");

            messages.delete(check.id);

            setTimeout(function () {
                check.remove();
            }, 1300);
        }
    }

    let keys = Array.from(messages.keys());
    for (let i = Math.max(0, messages.size - 30); i < messages.size; i++) {
        document.getElementById(keys[i]).style.display = "block";
    }
}

function selectAll() {
    if (isEmailOpen) {
        return;
    }

    isCheckedAll = allCheck.checked;

    let checks = document.body.querySelectorAll('.content-menu__check');

    for (let i = 1; i < Math.min(checks.length, 31); i++) {
        checks[i].checked = !isCheckedAll;
    }
}

function uncheckAllChecker() {
    isCheckedAll = false;
    allCheck.checked = false;
}

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.children;
}