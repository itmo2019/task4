let messageSubject = ["Fusce tempus justo convallis risus tincidunt suscipit. Nunc venenatis aliquet velit quis lobortis. Duis eget pretium lorem, ac auctor nisl. Proin ac urna id libero vulputate vulputate nec et massa. ",
    "Nullam lobortis, neque id suscipit maximus, turpis leo fermentum massa, vitae mollis elit lectus ultrices dolor. Nunc interdum ligula lorem, in tempor tellus convallis ut. Sed rhoncus cursus sollicitudin. Nunc.",
    "Nullam consectetur egestas nulla ac molestie. Nunc consequat congue turpis, vel maximus sapien elementum id. In tincidunt, diam quis vulputate varius, massa turpis efficitur enim, ut facilisis tortor risus in.",
    "Cras maximus vehicula pretium. In tincidunt justo ac tellus rhoncus accumsan. Suspendisse quis ex tortor. Curabitur imperdiet pellentesque mi vel vulputate. Aliquam sit amet dignissim mauris. Fusce in purus nibh.", "" +
    "Aenean in dui id nisl bibendum aliquam. Curabitur semper, eros in commodo pharetra, lectus nunc sollicitudin nunc, at lobortis mi ex eget justo. Quisque hendrerit, mauris porttitor aliquet semper, massa."];
let messageContact = ["Яндекс.Облако", "Яндекс.Переводчик", "Яндекс.Драйв", "Яндекс.Почта", "Яндекс.Путешествия", "Яндекс.Дзен", "Яндекс.Транспорт",
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
    let messageSubjectNumber = randomizeArrayNumber(messageSubject);
    let messageContactNumber = randomizeArrayNumber(messageContact);
    return '<div class="message message_not-read" id="message__id">\n' +
        '<label>\n' +
        '<input class="checkbox checkbox_message" type="checkbox">\n' +
        '</label>\n' +
        '<label for="message-list__cutter">\n' +
        '<img class="message__logo" src="body/main/inner/message-list/message/message__logo.svg">\n' +
        '<div class="message__contact">' + messageContact[messageContactNumber] + '</div>\n' +
        '<div class="message__read-icon"></div>\n' +
        '<div class="message__subject">' + messageSubject[messageSubjectNumber] + '</div>\n' +
        '<div class="message__date">' + randomizeDate() + '</div>\n' +
        '</label>\n' +
        '</div>\n' +
        '<hr class="hr">';
}