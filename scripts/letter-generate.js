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
        if (letterStorage.size === 0) {
            return;
        }
        let items = mailsPlaceholder.getElementsByClassName("mail");
        let key = letterStorage.keys()[0];
        let mail = letterStorage[key];
        if (items.length === 0) {
            mailsPlaceholder.appendChild(mail);
        } else {
            let before = items[0];
            mailsPlaceholder.insertBefore(mail, before);
        }
        letterStorage.delete(key);
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

function createClickLabel() {
    let clickBox = document.createElement("div");
    clickBox.className = "mail__on-click-label";
    clickBox.innerHTML = "";
    return clickBox;
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
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    let date = randomDate(new Date(2007, 1, 1), new Date());
    let time = document.createElement("div");
    time.className = "mail__item mail__item-mail__receive-time text_hide-by-size";


    time.innerText = date.toLocaleDateString("ru-RU", {month: 'short', day: 'numeric'});
    return time;
}

function deleteMessage(id) {
    return () => {
        let element = document.getElementById("mail-" + id.toString());
        if (element === null) {
            console.log("can't delete mail-" + id.toString());
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
