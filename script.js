let SEC = 1000;
let MINUTE = 60 * SEC;

setInterval(newMail, 3000);
/*newMail();
setInterval(function () {
    setTimeout(newMail, Math.random() * (10 * MINUTE) + 10);
}, 5 * MINUTE);*/

var letters = [];

var nextLetterId = 3;

function createMail(from = "Яндекс.Почта", theme = "Тестовое письмо", date = "6 июл.") {
    var mail = document.createElement("section");
    mail.setAttribute("class", "letter letter-creation-animation");
    mail.innerHTML =
        "            <input type=\"checkbox\" class=\"letter__checkbox hidden-checkbox\">\n" +
        "            <span class=\"decorative-checkbox letter__decorative-checkbox\"></span>\n" +
        "            <label class=\"letter__label\" for=\"check-label\" id=\"letter" + nextLetterId + "\">" +
        "            <img class=\"letter__img\" src=\"images/ya.jpg\">\n" +
        "            <h2 class=\"letter__from bold hide-overflow\">" + from + "</h2>\n" +
        "            <div class=\"letter__read-status unchecked\"></div>\n" +
        "            <p class=\"letter__date hide-overflow\">" + date + "</p>\n" +
        "            <h3 class=\"letter__theme bold hide-overflow\">" + theme + "</h3>\n" +
        "            <div class=\"line letter__line\"></div>\n" +
        "            </label>";
    nextLetterId++;
    return mail;
}

function changeCheckboxesStatus() {
    let mainCheckbox = document.getElementById("main-checkbox");
    let newStatus = mainCheckbox.checked;
    let checkboxes = document.getElementsByClassName("letter__checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes.item(i).checked = newStatus;
    }
}

let months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
let lastNames = ["Александр", "Марк", "Георгий", "Артемий"
    , "Дмитрий", "Константин", "Давид", "Эмиль"
    , "Максим", "Тимур", "Платон", "Назар"
    , "Сергей", "Олег", "Анатолий", "Савва"
    , "Андрей", "Ярослав", "Григорий", "Ян"
    , "Алексей", "Антон", "Демид", "Рустам"
    , "Артём", "Николай", "Данила", "Игнат"
    , "Илья", "Глеб", "Станислав", "Влад"];

let first_names = ["Иванов", "Смирнов", "Кузнецов", "Попов", "Васильев", "Петров", "Соколов", "Михайлов", "Новиков",
    "Фёдоров", "Морозов", "Волков", "Алексеев", "Лебедев", "Семёнов", "Егоров", "Павлов", "Козлов", "Степанов",
    "Николаев", "Орлов", "Андреев", "Макаров", "Никитин", "Захаров"];

function newMail() {
    var mailsList = document.getElementById("letters-list");
    var from = first_names[Math.floor(Math.random() * (first_names.length - 1))]
        + " "
        + lastNames[Math.floor(Math.random() * (lastNames.length - 1))];
    var theme = "theme";
    var date = (Math.floor(Math.random() * 29)) + " " + months[Math.floor(Math.random() * 11)] + ".";
    var text = "text";
    mailsList.insertBefore(createMail(from, theme, date), mailsList.firstChild.nextSibling.nextSibling);
    document.getElementById("letter" + (nextLetterId - 1)).addEventListener("click", function () {
        document.getElementById("letter-theme").innerHTML = theme;
        document.getElementById("letter-text").innerHTML = text;
    });
}

function deleteCheckedLetters() {
    let checkboxes = document.getElementsByClassName("letter__checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes.item(i);
        if (checkbox.checked) {
            let letter = checkbox.parentElement;
            letter.addEventListener("animationend", function () {
                letter.remove();
            }, false);
            letter.classList.add("letter-deletion-animation");
        }
    }
    document.getElementById("main-checkbox").checked = false;
}