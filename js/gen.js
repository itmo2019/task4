function sendRequest(link) {
    var xhttp = new XMLHttpRequest();
    var res = "";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            res = this.responseText;
        }
     };
    xhttp.open("GET", link, false);
    xhttp.send();
    return res;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getAuthor() {
    // Cat names
    var names = ['Барсик', 'Боня', 'Бакс', 'Алекс', 'Бади', 'Амур', 'Абуссель', 'Баксик', 'Кузя', 'Персик', 'Абрек', 'Абрикос', 'Тимоша', 'Авалон', 'Саймон', 'Бурбузяка Жабс', 'Марсик', 'Абу', 'Маркиз', 'Аадон', 'Дымок', 'Лаки', 'Сёма', 'Симба', 'Абрамович', 'Пушок', 'Айс', 'Бося', 'Кекс', 'Басик', 'Алмаз', 'Макс', 'Гарфилд', 'Феликс', 'Том', 'Тиша', 'Тишка', 'Цезарь', 'Мася', 'Абакан', 'Лакки', 'Васька', 'Марсель', 'Адольф', 'Вася', 'Бабасик', 'Зевс', 'Вольт', 'Лео', 'Адидас', 'Зефир', 'Максик', 'Вайс', 'Барс', 'Кокос', 'Рыжик', 'Мартин', 'Айс-Крим', 'Томас', 'Филя', 'Нафаня', 'Дарсик', 'Марс', 'Валера', 'Абориген', 'Тошка', 'Базиль', 'Сосисыч', 'Абрико', 'Масик', 'Абус', 'Абсент', 'Умка', 'Жужа', 'Веня', 'Каспер', 'Грей', 'Живчик', 'Убийца мышей', 'Глюк', 'Патрик', 'Оптимус Прайм', 'Виски', 'Акакий', 'Симка', 'Тёма', 'Баффи', 'Аватар', 'Гаврик', 'Жан батист Гренуй', 'Ганс', 'Вегас', 'Гаврюша', 'Авдон', 'Вин Дизель', 'Вафлик', 'Бонни', 'Снежок', 'Люцифер', 'Базилио', 'Тима', 'Байрон'];
    return names[getRandomInt(0, names.length)];
}

function getCurrentTime() {
    return new Date().getTime();
}

function getDate() {
    var date = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    return months[monthIndex] + " " + day;
}

function getImg() {
    return `https://thiscatdoesnotexist.com/?${getCurrentTime()}`;
}

function getTitle() {
    return sendRequest("https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=0&format=text");
}

function getText() {
    return sendRequest("https://baconipsum.com/api/?type=all-meat&paragraphs=5&start-with-lorem=1&format=text");
}

function generateMail() {
    return new Mail(getImg(), getAuthor(), getTitle(), getDate(), getText());
}

var mailCnt = 0;

function Mail(img, author, title, date, text, old) {
    this.img = img;
    this.author = author;
    this.title = title;
    this.date = date;
    this.text = text;
    this.old = old;
    this.id = mailCnt++;
}

Mail.prototype.toNode = function() {
    var mailTemplate = document.getElementById("mailbox__mail-template");
    var mailNode = mailTemplate.content.cloneNode(true);
    
    if (!this.old) {
        mailNode.querySelector(".mailbox__mail").classList.add("mail__new");
    }
    mailNode.querySelector(".mailbox__mail").setAttribute("id", this.id);
    mailNode.querySelector(".pic__img").setAttribute("src", this.img);
    mailNode.querySelector(".mail__author").innerHTML = this.author;
    mailNode.querySelector(".mail__title").innerHTML = this.title;
    mailNode.querySelector(".mail__time").innerHTML = this.date;
    
    return mailNode;
}
