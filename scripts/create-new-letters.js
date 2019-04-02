createNewLetter.addEventListener("click", addLetter);
mailsPlaceholder.addEventListener('click', deleteMessage);


function addLetter() {
    let mailCount = getExistMailCount();
    let element = createLetter(countLetter);
    insertInPlaceholder(element, mailCount);
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

function deleteMessage(event) {
    if (event.target === undefined || event.target.getAttribute("data-delete") === null) {
        return;
    }
    let mail = findMail(event.target);
    if (mail === null) {
        return;
    }
    deleteMail(mail);
}


function deleteMail(mail) {
    mail.classList.add("delete-animation");
    mail.addEventListener('transitionend', (event1) => {
        event1.target.remove();
    });
}
