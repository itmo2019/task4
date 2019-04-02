selectAllMails.addEventListener("change", (event) => {
    selectAll(event.target.checked);
});

deleteButton.addEventListener("click", (event) => {
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
            addAnimationToMail(item);
        });
        letterStorage = letterStorage.slice(Math.min(needMails, letterStorage.length), letterStorage.length);
    }
});
markeButton.addEventListener("click", (event) => {
    let mails = getSelectedMails();
    mails.forEach(item => {
        item.classList.remove("mail_status_not-read");
        item.classList.add("mail_status_read");
    });
});

function newMail() {
    let mailCount = getExistMailCount();
    let element = createLetter(countLetter);
    if (mailCount < 30) {
        insertInPlaceholder(element, mailCount);
    } else {
        letterStorage.push(element);
    }
    countLetter++;
    setTimeout(newMail, 100 + getRandomValue(100, 2 * 100));
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
    
}