const MAX_MESSAGES_ON_PAGE = 6;

function generateContentPreview() {
  return "Not so big content";
}

function generateContent() {
  if (Math.random() > 0.8) {
    return '<div> <img src="https://cs8.pikabu.ru/post_img/big/2016/12/28/1/1482881197192578721.jpg" height=300px> </div> Это котик.';
  } else {
    return "Some text to fullfill the content of the fake message from strange author";
  }
}

function generateDateTime() {
  return "2019-08-06";
}

function generateTheme() {
  return "BIG THEME";
}

function generateAuthor() {
  const letter = 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase();

  return letter.charAt(Math.round(Math.random() * letter.length)) +
         letter.charAt(Math.round(Math.random() * letter.length));
}

function generatorFreeMessageIdFactory(indicies) {
  const free = new Set([0, 1, 2, 3, 4, 5, 6]);
  let cnt = 7;

  indicies.forEach(value => free.delete(value));

  this.generateFreeId = () => {
    const result = free.values().next().value;
    free.delete(result);
    if (free.size === 0) {
      for (let i = cnt; i < cnt + cnt; ++i) {
        free.add(i);
      }
      cnt *= 2;
    }
    return result;
  }

  this.freeId = (id) => {
    free.add(id);
  }
}

class Mail {
  constructor(id, author, theme, content, contentPreview, date) {
    this.id = id;
    this.author = author;
    this.theme = theme;
    this.content = content;
    this.date = date;
    this.contentPreview = contentPreview ? contentPreview : content;
  }

  static getAuthorColor(author) {
    function hashCode(s) {
      return Math.abs(s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0));
    }

    return '#' + (hashCode(author) & 0xFFFFFF).toString(16)
  }
}

const generatorFreeMessageId =  new generatorFreeMessageIdFactory([]);

function throttle(time, callback) {
  let busy = false;
  return () => {
    if (!busy) {
      callback();
      busy = true
      setTimeout(() => busy = false, time + Math.random() * 5000)
    }
  }
}

function getMessageItemsWithPredicate(predicate) {
  return [...document.getElementById('messages-section').childNodes]
    .map(value => {
      if (value.nodeName === 'LABEL'
            && value.getElementsByTagName('div').length !== 0) {
        return value.getElementsByTagName('div')[0];
      }
      return value;
    })
    .filter(value => {
      return value.nodeName === 'DIV' && [...value.classList].includes('message-item')
        && predicate(value);
    });
}

function getCheckedMessageItems() {
  return getMessageItemsWithPredicate((value) =>
    value.getElementsByTagName('input').length !== 0
      && value.getElementsByTagName('input')[0].checked);
}

const mailList = [];

function newMail(mailData) {
  if (typeof mailData === 'undefined') {
    mailData = {};
  }

  const msgLabel = document.createElement('label');
  const msgDiv = document.createElement('div');
  const msgInput = document.createElement('input');
  const msgLogoSpan = document.createElement('span');
  // const msgLogoImg = document.createElement('img');
  const msgThemeP = document.createElement('p');
  const msgUnreadCircleSpan = document.createElement('span');
  const msgContentP = document.createElement('p');
  const msgTime = document.createElement('time');
  const messagesSection = document.getElementById('messages-section')
  const mail = new Mail(generatorFreeMessageId.generateFreeId(),
                        mailData['author'] || generateAuthor(),
                        mailData['theme'] || generateTheme(),
                        mailData['content'] || generateContent(),
                        mailData['contentPreview'] || generateContentPreview(),
                        generateDateTime());

  msgLabel.htmlFor = 'open-message';

  msgDiv.classList.add('message-item');

  msgInput.id = 'select-message' + mail.id;
  msgInput.type = 'checkbox';
  msgInput.classList.add('message-item__checkbox');
  msgInput.classList.add('mail-box__input');
  msgInput.checked = document.getElementById('select-all').checked

  msgLogoSpan.classList.add('message-item__circle');
  msgLogoSpan.style.backgroundColor = Mail.getAuthorColor(mail.author);
  // msgLogoImg.src = "images/message-company-logo.png";
  msgLogoSpan.innerText = mail.author;

  msgThemeP.classList.add('message-item__text_theme');
  msgThemeP.classList.add('bold-text');
  msgThemeP.innerText = mail.theme;

  msgUnreadCircleSpan.classList.add('message-item__unread-circle');

  msgContentP.classList.add('message-item__text_content');
  msgContentP.classList.add('bold-text');
  msgContentP.innerText = mail.contentPreview;

  msgTime.classList.add('message-item__time');
  msgTime.dateTime = mail.date;
  msgTime.innerText = "6 авг"

  // msgLogoSpan.pushChild(msgLogoImg);
  msgDiv.append(msgInput, '\n',
                msgLogoSpan, '\n',
                msgThemeP, '\n',
                msgUnreadCircleSpan, '\n',
                msgContentP, '\n',
                msgTime);

  msgLabel.append(msgDiv);

  msgLabel.addEventListener('click', () => {
    const logo = (msgLogoSpan.outerHTML);

    document.getElementById('content-div').innerHTML = '<div style="display: flex; align-items: center; margin-left: 20px">' +
     logo + '<p style="font-weight: 700; margin-left: 20px">' + mail.theme + '</p>'+ '</div>' + mail.content;
  });

  mailList.push({mail: mail, element : msgLabel});
  if (mailList.length > MAX_MESSAGES_ON_PAGE) {
    removeMessageElelement(mailList[mailList.length - MAX_MESSAGES_ON_PAGE - 1].element, true);
  }

  msgLabel.style.opacity = '0';

  messagesSection.insertBefore(msgLabel, messagesSection.firstChild);
  setTimeout(() => msgLabel.style.opacity = '1', 200);
}

function removeMessageElelement(element, onlyFromHTML = false) {
  element.style.opacity = '0';
  setTimeout(() => {
    element.parentNode.removeChild(element);
    if (!onlyFromHTML) {
      const id = parseInt(element.querySelector('.message-item__checkbox').id.replace('select-message', ''));
      generatorFreeMessageId.freeId(id);
      mailList.splice(mailList.findIndex(value => value.mail.id === id), 1);
      if (mailList.length >= MAX_MESSAGES_ON_PAGE) {
        const msgLabel = mailList[mailList.length - MAX_MESSAGES_ON_PAGE].element;
        msgLabel.style.opacity = '0';
        document.getElementById('messages-section').insertBefore(msgLabel, document.getElementById('messages-section-end'));
        setTimeout(() => msgLabel.style.opacity = '1', 200);
      }
    }
  }, 400);
}

function removeMessage() {
  const stagedItems = getCheckedMessageItems();

  for (const element of stagedItems) {
    removeMessageElelement(element, false);
  }
}

function toggleAllMessaged() {
  const checkboxes = getMessageItemsWithPredicate(() => true);
  checkboxes.forEach(element => {
    element.getElementsByTagName('input')[0].checked = this.checked;
  });
}

const addBtn = document.getElementById('add-message-button');
const delBtn = document.getElementById('delete');
const checkAllBtn = document.getElementById('select-all');

newMail({author: 'AP',
         contentPreview: 'Привет, классный ментор, я Саша. Я очень рад, что смог попасть к вам на курс по frontend разработке надеюсь узнать на нем много нового и полезного, но прежде чем перейти к этому, позвольте немного рассказать про себя',
         content: '<iframe src="essay.html" class="message-content"></iframe>',
         theme: 'Привет миру фронтенда'});

addBtn.addEventListener('click', newMail);
delBtn.addEventListener('click', removeMessage);
checkAllBtn.addEventListener('click', toggleAllMessaged);

const periodicReceiveMessage = throttle(5000 * 60, newMail);

const intervalId = setInterval(() => {
    periodicReceiveMessage();
}, 1000);
