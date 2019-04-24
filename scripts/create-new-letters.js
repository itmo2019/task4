createNewLetter.addEventListener("click", addLetter);
mailsPlaceholder.addEventListener('click', showInnerMessage);
closeButtonInnerMail.addEventListener('click', hidePlaceholders);

function addLetter() {
    let mailCount = getExistMailCount();
    let element = createLetter(countLetter);
    setRandomValues(element);
    if (mailCount < 30) {
        insertInPlaceholder(element, mailCount);
    } else {
        letterStorage.push(element);
    }
    countLetter++;
}

function createLetter(id) {
    let template = document.querySelector("#mail-template");
    let innerDiv = document.importNode(template.content.querySelector("div"), true);
    let titleDiv = innerDiv.querySelector(".mail__title");
    innerDiv.setAttribute("id", "mail-" + id.toString());
    titleDiv.innerText += id.toString();
    return innerDiv;
}

function showInnerMessage(event) {
    if (event.target === undefined || event.target.getAttribute("data-delete") === null) {
        return;
    }
    let mail = findMail(event.target);
    if (mail === null) {
        return;
    }
    console.log(mail);
    let texts = mail.getElementsByClassName("mail__text-message");
    if (texts === undefined || texts.length !== 1) {
        return;
    }
    setFullText(texts[0].innerText);
    hidePlaceholders();
}

function hidePlaceholders() {
    mailsPlaceholder.hidden = !mailsPlaceholder.hidden;
    mailInnerPalceholder.hidden = !mailInnerPalceholder.hidden;
}

function deleteMail(mail) {
    mail.classList.add("delete-animation");
    mail.addEventListener('transitionend', (event1) => {
        event1.target.remove();
    });
}

function setFullText(text) {
    var mailFullContent = document.getElementById("mail-full-content");
    console.log(text);
    console.log(mailFullContent);
    mailFullContent.innerText = text;
}