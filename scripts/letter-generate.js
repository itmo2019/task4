var countLetter = 1;
let createNewLetter = document.getElementById("add-new-letter");
let mailsPlaceholder = document.getElementById("mails-placeholder");


createNewLetter.addEventListener("click", addLetter);
document.addEventListener("DOMContentLoaded", addLetter);

function addLetter() {
    let items = mailsPlaceholder.getElementsByClassName("mail");
    let element = createLetter(countLetter);
    if (items.length === 0) {
        mailsPlaceholder.appendChild(element);
    } else {
        let before = mailsPlaceholder.getElementsByClassName("mail")[0];
        mailsPlaceholder.insertBefore(element, before);
    }
    element.addEventListener('click', deleteMessage(countLetter));
    element.addEventListener('animationend', (event) => {
        event.target.remove();
    });
    countLetter++;
}

function createLetter(id) {
    let mail = document.createElement("div");
    mail.className = "mail mail_status_not-read";
    mail.setAttribute("id", "mail-" + id.toString());
    mail.appendChild(createCheckBox());
    mail.appendChild(createLogo());
    mail.appendChild(createTitle(id));
    mail.appendChild(createMessage());
    mail.appendChild(createDate());
    return mail;
}

function createCheckBox() {
    let checkBox = document.createElement("div");
    checkBox.className = "mail__item mail__item-mail__select";
    checkBox.innerHTML =
        '                    <label class=\"mails-checkbox\">\n' +
        '                        <input class=\"mails-checkbox__checkbox\" type=\"checkbox\">\n' +
        '                        <span class=\"mails-checkbox__alternative-drawing\"></span>\n' +
        '                    </label>\n';
    return checkBox;
}

function createLogo() {
    let logo = document.createElement("img");
    logo.className = "mail__item mail__item-mail__logo";
    logo.setAttribute("src", "//yastatic.net/mail/socialavatars/socialavatars/v4/ya-default.svg");
    return logo;
}

function createTitle(id) {
    let title = document.createElement("div");
    title.className = "mail__item mail__item-mail__title text_hide-by-size";
    title.innerText = "всем привей!" + id.toString();
    return title;
}

function createMessage() {
    let message = document.createElement("div");
    message.className = "mail__item mail__item-mail__text-message text_hide-by-size";
    message.innerText = " как дела???";
    return message;
}

function createDate() {
    let time = document.createElement("div");
    time.className = "mail__item mail__item-mail__receive-time text_hide-by-size";
    time.innerText = "6 янв";
    return time;
}

function deleteMessage(item) {
    return () => {
        let element = document.getElementById("mail-" + item.toString());
        if (element === null) {
            console.log("can't delete mail-" + item.toString());
            return;
        }
        element.classList.add("delete-animation");
    };
}

function dfs(item) {
    let array = [item];
    let child = item.children;
    Array.from(child).forEach((child) => {
        dfs(child).forEach((v) => {
            array.push(v);
        });
    });
    return array;
}
