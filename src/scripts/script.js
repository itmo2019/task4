function checkAll(toolbarCheckbox) {
    let checkboxes = document.querySelectorAll('.message__check');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = toolbarCheckbox.checked;
    }
}

function newMailIncoming() {
    let mails = document.getElementById("messages");
    let mail = document.createElement("div");
    mail.className = "message__create";
    mail.id = "created";
    mail.innerHTML = composer();
    mails.insertBefore(mail, mails.firstChild);
    setTimeout(() => {
        let GC = document.getElementById("created");
        GC.classList.remove("message__create");
        GC.removeAttribute('id');
    }, 600);
}

function deleteMail() {
    let checkboxes = document.querySelectorAll('.message__check');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            let container = checkboxes[i].parentElement.parentElement.parentElement;
            container.classList.add("message__delete");
            setTimeout(() => {
                container.remove();
            }, 500);
        }
    }
}

function randomMailIncoming() {
    setTimeout(newMailIncoming, Math.random() * (600000 - 10) + 10);
    setTimeout(randomMailIncoming, 300000);
}

var messageSubject = ["Fusce tempus justo convallis risus tincidunt suscipit. Nunc venenatis aliquet velit quis lobortis. Duis eget pretium lorem, ac auctor nisl. Proin ac urna id libero vulputate vulputate nec et massa. ",
    "Nullam lobortis, neque id suscipit maximus, turpis leo fermentum massa, vitae mollis elit lectus ultrices dolor. Nunc interdum ligula lorem, in tempor tellus convallis ut. Sed rhoncus cursus sollicitudin. Nunc.",
    "Nullam consectetur egestas nulla ac molestie. Nunc consequat congue turpis, vel maximus sapien elementum id. In tincidunt, diam quis vulputate varius, massa turpis efficitur enim, ut facilisis tortor risus in.",
    "Cras maximus vehicula pretium. In tincidunt justo ac tellus rhoncus accumsan. Suspendisse quis ex tortor. Curabitur imperdiet pellentesque mi vel vulputate. Aliquam sit amet dignissim mauris. Fusce in purus nibh.", "" +
    "Aenean in dui id nisl bibendum aliquam. Curabitur semper, eros in commodo pharetra, lectus nunc sollicitudin nunc, at lobortis mi ex eget justo. Quisque hendrerit, mauris porttitor aliquet semper, massa."];
var messageContact = ["Яндекс.Облако", "Яндекс.Переводчик", "Яндекс.Драйв", "Яндекс.Почта", "Яндекс.Путешествия", "Яндекс.Дзен", "Яндекс.Транспорт",
    "Яндекс.Погода", "Яндекс.Навигатор", "Яндекс.Браузер", "Яндекс.Музыка", "Яндекс.Алиса"];

function randomizeArrayNumber(text) {
    return Math.floor(Math.random() * text.length);
}

function randomizeDate() {
    let monthArray = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    let mailDate = Math.floor(Math.random() * 27) + 1;
    let mailMonth = monthArray[randomizeArrayNumber(monthArray)];
    return mailDate + " " + mailMonth;
}

function composer() {
    var messageSubjectNumber = randomizeArrayNumber(messageSubject);
    var messageContactNumber = randomizeArrayNumber(messageContact);
    return '<div class="message-list__box">\n' +
        '<label>\n' +
        '<input class="message__check" type="checkbox">\n' +
        '</label>\n' +
        '<label for="message-list__cutter">\n' +
        '<img class="message__logo" src="images/message__logo.svg">\n' +
        '<div class="message__contact message__not-read">' + messageContact[messageContactNumber] + '</div>\n' +
        '<div class="message__read-icon"></div>\n' +
        '<div class="message__subject message__not-read">' + messageSubject[messageSubjectNumber] + '</div>\n' +
        '<div class="message__date">' + randomizeDate() + '</div>\n' +
        '</label>\n' +
        '</div>\n' +
        '<hr class="hr">';
}

randomMailIncoming();
