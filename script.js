const MONTH = ["янв", "фев", "март", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const FIVE_MIN = 60 * 5 * 1000;

const SENDERS_LIMIT = 6;
const MAIL_CONTENT_TEMPLATE = {
  0: {
    'logo': 'ya-logo.png',
    'sender': 'Команда Яндекс.Спам',
    'title': 'Новый Спам',
    'text': 'Поздравляю!\nВы получили новый спам!\n\nС уважением, команда Яндекс.Спам.'
  },
  1: {
    'logo': 'g-logo.png',
    'sender': 'Gmail team',
    'title': 'Job offer',
    'text': `
    Dear Developer!
    We\'ve seen you implementation of \'Yandex.Mail\' and we really impressed!
    So we decided to offer you a job in gmail.
    Best wishes,
    Google`
  },
  2: {
    'logo': 'apple-logo.png',
    'sender': 'Apple Store',
    'title': 'Встречайте невероятно мощный iMac',
    'text': 'В новом iMac прекрасно всё. Тонкий корпус, великолепный дисплей Retina, более быстрые процессоры и память, потрясающая графика. iMac стал мощнее — во всех отношениях.'
  },
  3: {
    'logo': 'bery-logo.png',
    'sender': 'Беру',
    'title': 'Подарки на 8 марта',
    'text': `Здравствуйте!
      Сезон подарков продолжается. А мы, как обычно, помогаем вам не утонуть в океане товаров. На одной странице собрали всё, что будет приятно получить вашим близким. Тут и бытовая техника, и товары для спорта, и духи, и помады. Осталось только выбрать.`
  },
  4: {
    'logo': 'bery-logo.png',
    'sender': 'Беру',
    'title': 'С Беру Бонусами дешевле',
    'text': `Здравствуйте!

    Мы приготовили для вас лучшие товары со скидкой этой недели:
    капсулы для стирки Tide 3 in 1, -32%
    молочная смесь Nutrilon 3 Premium, -40%
    постельное белье La Noche del Amor, -33%
    портативная акустика Marshall Woburn, -26%
    И не забывайте, что с Беру Бонусами цены будут ещё ниже — их можно применять даже на товары со скидками. Приятных покупок!`
  },
  5: {
    'logo': 'apple-logo.png',
    'sender': 'Apple Store',
    'title': 'iPhone XS и iPhone XS Max уже в продаже.',
    'text': 'Дисплей Super Retina в двух размерах, один из которых стал самым большим в истории iPhone. Ещё более быстрый Face ID. Самый мощный и умный процессор iPhone. Потрясающая двойная камера. И новый уровень защиты от воды.*'
  },
  6: {
    'sender': 'Niyaz Nigmatullin',
    'title': 'Отчисление',
    'text': 'Вынужден сообщить, что вы все отчислены.'
  }
}

var mailsHolder = [];

async function stashOldMail() {
  let mails = await document.getElementsByClassName('mail');
  if (mails.length > 30) {
    let mailToStash = mails[mails.length - 1];
    mailsHolder.push(mailToStash);
    mailToStash.parentElement.removeChild(mailToStash);
  }
}

async function unstashOldMails(unstashCount) {
  let mailBox = await document.getElementById('mails-id');

  let count = Math.min(unstashCount, mailsHolder.length);
  for (var i = 0; i < count; i++) {
    mailBox.appendChild(mailsHolder.pop());
  }
}

function getLocalDate() {
  let date = new Date();
  return date.getDate() + " " + MONTH[date.getMonth()];
}

function markAllMails() {
  let isMarked = document.getElementById('mail-action__chooce_all-id').checked;
  let checkBoxes = document.getElementsByClassName('mail__chooce');
  Array.from(checkBoxes).forEach(element => {
    element.checked = isMarked;
  });
}

function setAllMarkStatus(status) {
  let checkBox = document.getElementById('mail-action__chooce_all-id')
  checkBox.checked = status;
}

function checkMarkAllCheckBox() {
  var isMarked = true;
  let mailCheckBoxes = document.getElementsByClassName('mail__chooce');
  for (var i = 0; i != mailCheckBoxes.length; i++) {
    if (!mailCheckBoxes[i].checked) {
      isMarked = false;
      break;
    }
  }

  setAllMarkStatus(isMarked);
}

function switchMailBoxDisplay(openMailBox) {
  document.getElementById('mails-id').style.display = openMailBox ? 'block' : 'none'
  document.getElementById('mail-article-id').style.display = openMailBox ? 'none' : 'block'
}

function closeMail() {
  switchMailBoxDisplay(true);
}

function openMail(text, eventInfo) {
  if (eventInfo.target.className != 'mail__chooce') {
    document.getElementById('mail-article__text-id').innerHTML =
      "<div>" +
      text.split("\n")
        .filter(s => s !== "")
        .join("<br>")
      + "</div>";
    switchMailBoxDisplay(false);
  }
}

function removeMarkedMails() {
  let checkBoxes = document.getElementsByClassName('mail__chooce');
  let mailsToRemove = Array.from(checkBoxes);

  mailsToRemove.forEach(checkBox => {
    if (checkBox.checked) {
      let mail = findParentById('mail-id', checkBox);
      mail.classList.add("remove-action");
      mail.addEventListener("animationend", () => mail.parentElement.removeChild(mail));
    }
  });

  unstashOldMails(mailsToRemove.length);
  setAllMarkStatus(false);
}

function findParentById(id, currentElement) {
  if (currentElement != null && currentElement.id !== id) {
    return findParentById(id, currentElement.parentElement);
  }
  return currentElement;
}

function enrichMailTemplate(mailContent, contentTemplate) {
  mailContent.getElementById('mail__sender-logo-id').src = "./resources/images/" + contentTemplate['logo'];
  mailContent.getElementById('mail__sender-name-id').textContent = contentTemplate['sender'];
  mailContent.getElementById('mail__title-id').textContent = contentTemplate['title'];
  mailContent.getElementById('mail__time-id').textContent = getLocalDate();
}

function createMail() {
  let mailContent = document.getElementById('mail-template').content;
  let contentTemplate = MAIL_CONTENT_TEMPLATE[getRandomInt(SENDERS_LIMIT)];
  enrichMailTemplate(mailContent, contentTemplate);

  let mails = document.getElementById('mails-id');

  let mail = mailContent.cloneNode(true);
  mail.firstElementChild.classList.add("insert-action");
  mail.firstElementChild.onclick = function () {
    openMail(contentTemplate['text'], event);
  }

  mails.insertBefore(mail, mails.firstChild);
  stashOldMail();
  setAllMarkStatus(false);
}

function getRandomInt(limit) {
  limit = Math.floor(limit);
  return Math.floor(Math.random() * (limit + 1));
}

function spamMail() {
  let currentRandomTimeout = getRandomInt(FIVE_MIN);
  setTimeout(createMail, currentRandomTimeout);
}

setInterval(spamMail, FIVE_MIN);
