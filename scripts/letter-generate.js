selectAllMails.addEventListener("change", (event) => {
    selectAll(event.target.checked);
});

deleteButton.addEventListener("click", () => {
    let mails = getSelectedMails();
    mails.forEach(item => deleteMail(item));
    selectAllMails.checked = false;
    let mailCount = getExistMailCount();
    let existMail = mailCount - mails.length;
    let needMails = 30 - existMail;
    if (needMails > 0) {
        let mails = letterStorage.slice(0, Math.min(needMails, letterStorage.length));
        mails.forEach((item, index) => {
            insertInPlaceholder(item, existMail + index);
            item.offsetHeight;
            item.classList.add("create-animation");
        });
        letterStorage = letterStorage.slice(Math.min(needMails, letterStorage.length), letterStorage.length);
    }
});
markeButton.addEventListener("click", () => {
    let mails = getSelectedMails();
    mails.forEach(item => {
        item.classList.remove("mail_status_not-read");
        item.classList.add("mail_status_read");
    });
});

function newMail() {
    addLetter();
    setTimeout(newMail, 5 * 1000 * 60 + getRandomValue(10, 1000 * 5));
}


setTimeout(newMail, getRandomValue(30, 500));


function getSelectedMails() {
    let tmp = document.querySelectorAll("[data-checkbox-select]");
    let checkBox = Array.from(tmp).filter(item => item.checked);
    return checkBox.map(item => findMail(item)).filter(item => item !== null);
}

function selectAll(value) {
    let checkBox = document.querySelectorAll("[data-checkbox-select]");
    Array.from(checkBox).forEach(item => item.checked = value);
}


function setRandomValues(mail) {
    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    let img = mail.querySelector("[data-query-img]");
    let title = mail.querySelector("[data-query-title]");
    let message = mail.querySelector("[data-query-text-message]");
    let time = mail.querySelector("[data-query-receive-time]");
    img.setAttribute("src", (() => {
        if (Math.random() >= 0.5) {
            return "//yastatic.net/mail/socialavatars/socialavatars/v4/ya-default.svg";
        } else {
            return "./images/default.svg";
        }
    })());
    title.innerHTML = fromTemplate[getRandomValue(0, fromTemplate.length - 1)];
    message.innerHTML = titlesTemplate[getRandomValue(0, titlesTemplate.length - 1)] + " " + innerTemplate[getRandomValue(0, innerTemplate.length - 1)];
    time.innerHTML = randomDate(new Date(2007, 1, 1), new Date()).toLocaleDateString("ru-RU", {
        month: 'short',
        day: 'numeric'
    });

}