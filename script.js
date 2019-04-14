let SEC = 1000;
let MINUTE = 60 * SEC;

setTimeout(newMail, 1000);
setInterval(function () {
    setTimeout(newMail, Math.random() * (10 * MINUTE) + 10);
}, 5 * MINUTE);

//setInterval(newMail, 3000);
//setTimeout(newMail, 1000);
//setTimeout(newMail, 2000);
//setTimeout(newMail, 3000);

var letters = [];
var letterTexts = [];
var letterThemes = [];
var nextLetterId = 3;

function createMail(from = "Яндекс.Почта", theme = "Тестовое письмо", date = "6 июл.") {
    var letter = document.getElementById("letter-template").content.cloneNode(true);
    letter.querySelector(".letter__label").setAttribute("id", "letter" + nextLetterId);
    letter.querySelector(".letter__img").setAttribute("src", "https://thispersondoesnotexist.com/image?randomSeed=" + nextLetterId);
    letter.querySelector(".letter__from").innerHTML = from;
    letter.querySelector(".letter__date").innerHTML = date;
    letter.querySelector(".letter__theme").innerHTML = theme;
    nextLetterId++;
    return letter;
}

function changeCheckboxesStatus() {
    let mainCheckbox = document.getElementById("main-checkbox");
    let newStatus = mainCheckbox.checked;
    let checkboxes = document.getElementsByClassName("letter__checkbox");
    for (var i = 0; i < checkboxes.length && i < 30; i++) {
        checkboxes.item(i).checked = newStatus;
    }
}


function setRandomText(id) {
    $.getJSON('https://baconipsum.com/api/?callback=?',
        {'type': 'meat-and-filler', 'start-with-lorem': '3', 'paras': '4'},
        function (respponse) {
            if (respponse && respponse.length > 0) {
                for (var i = 0; i < respponse.length; i++)
                    letterTexts[id] += '<p>' + respponse[i] + '</p>';
            }
            letterThemes[id] = respponse[3];
            document.getElementById("letter" + id).children[4].innerHTML = respponse[2];
        });
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
    var date = (Math.floor(Math.random() * 29)) + " " + months[Math.floor(Math.random() * 11)] + ".";
    let curLetterId = nextLetterId;
    letterTexts[curLetterId] = "";
    letterThemes[curLetterId] = "";
    setRandomText(curLetterId);
    var theme = "...";
    mailsList.insertBefore(createMail(from, theme, date), mailsList.querySelector("#dog-letter").nextSibling);
    document.getElementById("letter" + curLetterId).addEventListener("click", function () {
        document.getElementById("letter-theme").innerHTML = letterThemes[curLetterId];
        document.getElementById("letter-text").innerHTML = letterTexts[curLetterId];
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