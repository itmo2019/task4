selectAll.addEventListener("change", (event) => {
    let visibleLetters = document.getElementsByClassName("mail");
    Array.from(visibleLetters).forEach((item) => {
        item.children[0].children[0].children[0].checked = event.target.checked;
    });
});

deleteButton.addEventListener("click", (event) => {
    let selectedMails = getSelectedLetters();
    selectedMails.forEach((item) => {
        item.classList.add("delete-animation");
    });
});

markeButton.addEventListener("click", (event) => {
    let selectedMails = getSelectedLetters();
    selectedMails.forEach((item) => {
        item.classList.remove("mail_status_not-read");
        item.classList.add("mail_status_read");
    });
});

setTimeout(newMail, Math.random() * 100);

function newMail() {
    let id = countLetter;
    countLetter++;

    let mail = document.createElement("div");
    mail.className = "mail mail_status_not-read";
    let label = createClickLabel();
    label.addEventListener("click", (event) => {
        mailsPlaceholder.hidden = true;
        textPlaceholder.hidden = false;
    });

    mail.setAttribute("id", "mail-" + id.toString());
    mail.appendChild(createCheckBox());
    mail.appendChild(label);
    mail.appendChild(createLogoFromTemplate());
    mail.appendChild(createFromTemplate());
    mail.appendChild(createMessageFromTemplate());
    mail.appendChild(createDate());

    let items = mailsPlaceholder.getElementsByClassName("mail");

    if (items.length === 0) {
        mailsPlaceholder.appendChild(mail);
    } else if (items.length < 30) {
        let before = items[0];
        mailsPlaceholder.insertBefore(mail, before);
    } else {
        letterStorage[countLetter] = mail;
    }

    mail.addEventListener('animationend', (event) => {
        event.target.remove();
    });

    setTimeout(newMail, 1000 * 60 * 5);

    return mail;
}

function createLogoFromTemplate() {
    let logo = document.createElement("img");
    logo.className = "mail__item mail__item-mail__logo";
    if (Math.random() >= 0.5) {
        logo.setAttribute("src", "//yastatic.net/mail/socialavatars/socialavatars/v4/ya-default.svg");
    } else {
        logo.setAttribute("src", "./images/default.svg");
    }
    return logo;
}

function createFromTemplate() {
    let title = document.createElement("div");
    title.className = "mail__item mail__item-mail__title text_hide-by-size";
    let position = Math.round(Math.random() * (fromTemplate.length));
    title.innerText = fromTemplate[position];
    return title;
}

function createMessageFromTemplate() {
    let message = document.createElement("div");
    message.className = "mail__item mail__item-mail__text-message text_hide-by-size";
    let titlePosition = Math.round(Math.random() * (titlesTemplate.length));
    let innerPosition = Math.round(Math.random() * (innerTemplate.length));
    message.innerText = titlesTemplate[titlePosition] + " " + innerTemplate[innerPosition];
    return message;
}


function getSelectedLetters() {
    let visibleLetters = document.getElementsByClassName("mail");
    return Array.from(visibleLetters).filter(item => item.children[0].children[0].children[0].checked);
}
