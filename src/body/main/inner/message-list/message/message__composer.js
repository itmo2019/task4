let messageContact = ["Яндекс.Облако", "Яндекс.Переводчик", "Яндекс.Драйв", "Яндекс.Почта", "Яндекс.Путешествия", "Яндекс.Дзен", "Яндекс.Транспорт",
    "Яндекс.Погода", "Яндекс.Навигатор", "Яндекс.Браузер", "Яндекс.Музыка", "Яндекс.Алиса"];

function randomizeArrayNumber(text) {
    return Math.floor(Math.random() * text.length);
}

function randomizeNumber(from, to) {
    return Math.floor(Math.random() * (to + 1 - from)) + from
}

function randomizeDate() {
    let monthArray = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    let mailDate = randomizeNumber(1, 28);
    let mailMonth = monthArray[randomizeArrayNumber(monthArray)];
    return mailDate + " " + mailMonth;
}

async function randomizeText() {
    let requestText = await fetch("https://baconipsum.com/api/?type=meat&paras=" + randomizeNumber(3, 5));
    let resultText = await requestText.json();
    return resultText[0];
}

async function composeMail() {
    let template = document.querySelector('#message__template');
    template.content.querySelector(".message__logo").setAttribute('src',
        "body/main/inner/message-list/message/message__logo-" + randomizeNumber(0, 3) + ".png");
    template.content.querySelector(".message__contact").textContent = messageContact[randomizeArrayNumber(messageContact)];
    template.content.querySelector(".message__subject").textContent = await randomizeText();
    template.content.querySelector(".message__date").textContent = randomizeDate();
    return document.importNode(template.content, true);
}