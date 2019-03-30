function checkAll(toolbarCheckbox) {
    let checkboxes = document.querySelectorAll('.checkbox_message');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = toolbarCheckbox.checked;
    }
}

function newMailIncoming() {
    let mails = document.getElementById("messages");
    let mail = document.createElement("section");
    mail.innerHTML = composer();
    mails.insertBefore(mail, mails.firstChild);
    let GC = document.getElementById("message__id");
    setTimeout(() => {
        GC.classList.add("message_show")
    }, 20);
    setTimeout(() => {
        GC.removeAttribute('id');
    }, 500);
}

function deleteMail() {
    let checkboxes = document.querySelectorAll('.checkbox_message');
    for (let i = 0; i < checkboxes.length; i++) {
        if ((checkboxes[i].checked === true) && (i < 30)) {
            let container = checkboxes[i].parentElement.parentElement;
            container.classList.remove("message_show");
            setTimeout(() => {
                container.parentElement.remove();
            }, 500);
        }
    }
}

function randomMailIncoming() {
    let randomTimer = Math.random() * (300000 - 10) + 10;
    setTimeout(newMailIncoming, randomTimer);
    setTimeout(randomMailIncoming, 300000 - randomTimer);
}

randomMailIncoming();
