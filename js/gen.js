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
    return "Очень новое сообщение";
}

function getText() {
    return "Очень новое сообщение";
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

Mail.prototype.toHTML = function() {
    return `<label for="mailbox__trigger">
                <div class="mailbox__mail ${this.old?"":"mail__new"}" state="hidden" id="${this.id}">
                    <label class="checkbox">
                        <input type="checkbox" class="checkbox__input"/>
                        <span class="checkbox__span"></span>
                    </label>
                    <div class="mailbox__mail-element mail__pic">
                        <img class="pic__img" src=${this.img}></img>
                    </div>
                    <div class="mailbox__mail-element mail__author">
                        ${this.author}
                    </div>
                    <div class="mailbox__mail-element mail__dot"></div>
                    <div class="mailbox__mail-element mail__title">
                        ${this.title}
                    </div>
                    <time class="mailbox__mail-element mail__time">
                        ${this.date}
                    </time>
                </div>
            </label>`;
}
