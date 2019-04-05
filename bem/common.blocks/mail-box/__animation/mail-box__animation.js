// import { LoremIpsum } from '/task4/node_modules/@jsilvermist/lorem-ipsum-js/src/lorem-ipsum.js';

/**
 * LoremIpsum
 *
 * @class
 */
class LoremIpsum {
  constructor() {
    /**
     * Possible words
     *
     * @type {Array}
     */
    this.wordsList = [
      'a',
      'ac',
      'accumsan',
      'ad',
      'adipiscing',
      'aenean',
      'aenean',
      'aliquam',
      'aliquam',
      'aliquet',
      'amet',
      'ante',
      'aptent',
      'arcu',
      'at',
      'auctor',
      'augue',
      'bibendum',
      'blandit',
      'class',
      'commodo',
      'condimentum',
      'congue',
      'consectetur',
      'consequat',
      'conubia',
      'convallis',
      'cras',
      'cubilia',
      'curabitur',
      'curabitur',
      'curae',
      'cursus',
      'dapibus',
      'diam',
      'dictum',
      'dictumst',
      'dolor',
      'donec',
      'donec',
      'dui',
      'duis',
      'egestas',
      'eget',
      'eleifend',
      'elementum',
      'elit',
      'enim',
      'erat',
      'eros',
      'est',
      'et',
      'etiam',
      'etiam',
      'eu',
      'euismod',
      'facilisis',
      'fames',
      'faucibus',
      'felis',
      'fermentum',
      'feugiat',
      'fringilla',
      'fusce',
      'gravida',
      'habitant',
      'habitasse',
      'hac',
      'hendrerit',
      'himenaeos',
      'iaculis',
      'id',
      'imperdiet',
      'in',
      'inceptos',
      'integer',
      'interdum',
      'ipsum',
      'justo',
      'lacinia',
      'lacus',
      'laoreet',
      'lectus',
      'leo',
      'libero',
      'ligula',
      'litora',
      'lobortis',
      'lorem',
      'luctus',
      'maecenas',
      'magna',
      'malesuada',
      'massa',
      'mattis',
      'mauris',
      'metus',
      'mi',
      'molestie',
      'mollis',
      'morbi',
      'nam',
      'nec',
      'neque',
      'netus',
      'nibh',
      'nisi',
      'nisl',
      'non',
      'nostra',
      'nulla',
      'nullam',
      'nunc',
      'odio',
      'orci',
      'ornare',
      'pellentesque',
      'per',
      'pharetra',
      'phasellus',
      'placerat',
      'platea',
      'porta',
      'porttitor',
      'posuere',
      'potenti',
      'praesent',
      'pretium',
      'primis',
      'proin',
      'pulvinar',
      'purus',
      'quam',
      'quis',
      'quisque',
      'quisque',
      'rhoncus',
      'risus',
      'rutrum',
      'sagittis',
      'sapien',
      'scelerisque',
      'sed',
      'sem',
      'semper',
      'senectus',
      'sit',
      'sociosqu',
      'sodales',
      'sollicitudin',
      'suscipit',
      'suspendisse',
      'taciti',
      'tellus',
      'tempor',
      'tempus',
      'tincidunt',
      'torquent',
      'tortor',
      'tristique',
      'turpis',
      'ullamcorper',
      'ultrices',
      'ultricies',
      'urna',
      'ut',
      'ut',
      'varius',
      'vehicula',
      'vel',
      'velit',
      'venenatis',
      'vestibulum',
      'vitae',
      'vivamus',
      'viverra',
      'volutpat',
      'vulputate'
    ];
  }

  /**
   * Get random number
   *
   * @param  {Number} x
   * @param  {Number} y
   * @return {Number}
   */
  static random(x, y) {
    const rnd = Math.random() * 2 - 1 + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
    return Math.round(Math.abs(rnd) * x + y);
  }

  /**
   * Get random number between min and max
   *
   * @param  {Number} min (optional) lower result limit
   * @param  {Number} max (optional) upper result limit
   * @return {Number}     random number
   */
  static count(min, max) {
    let result;
    if (min && max) result = Math.floor(Math.random() * (max - min + 1) + min);
    else if (min) result = min;
    else if (max) result = max;
    else result = LoremIpsum.random(8, 2);

    return result;
  }

  /**
   * Get random words
   *
   * @param  {Number} min (optional) minimal words count
   * @param  {Number} max (optional) maximal words count
   * @return {Object}     array of random words
   */
  words(min, max) {
    const result = [];
    const count = LoremIpsum.count(min, max);

    // get random words
    while (result.length < count) {
      const pos = Math.floor(Math.random() * this.wordsList.length);
      const rnd = this.wordsList[pos];

      // do not allow same word twice in a row
      if (result.length === 0 || result[result.length - 1] !== rnd) {
        result.push(rnd);
      }
    }

    return result;
  }

  /**
   * Generate sentence
   *
   * @param  {Number} min (optional) minimal words count
   * @param  {Number} max (optional) maximal words count
   * @return {String}     sentence
   */
  sentence(min, max) {
    const words = this.words(min, max);

    // add comma(s) to sentence
    let index = LoremIpsum.random(6, 2);
    while (index < words.length - 2) {
      words[index] += ',';
      index += LoremIpsum.random(6, 2);
    }

    // append puctation on end
    const punct = '...!?';
    words[words.length - 1] += punct.charAt(Math.floor(Math.random() * punct.length));

    // uppercase first letter
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    return words.join(' ');
  }

  /**
   * Generate paragraph
   *
   * @param  {Number} maybeMin (optional) minimal words count
   * @param  {Number} maybeMax (optional) maximal words count
   * @return {String}     paragraph
   */
  paragraph(maybeMin, maybeMax) {
    let min = maybeMin;
    let max = maybeMax;
    if (!min && !max) {
      min = 20;
      max = 60;
    }

    const count = LoremIpsum.count(min, max);
    let result = '';

    // append sentences until limit is reached
    while (result.slice(0, -1).split(' ').length < count) {
      result += `${this.sentence()} `;
    }
    result = result.slice(0, -1);

    // remove words
    if (result.split(' ').length > count) {
      const punct = result.slice(-1);
      result = result
        .split(' ')
        .slice(0, count)
        .join(' ');
      result = result.replace(/,$/, '');
      result += punct;
    }

    return result;
  }
}

const lorem = new LoremIpsum();
const messageStack = [];
const MAX_LETTERS_NUMBER = 20;

const snippetTemplate =
  '<label>\n' +
  '    <input class="checkbox message__checkbox" type="checkbox">\n' +
  '</label>\n' +
  '<img class="message__avatar" src="img/yandex-logo.png" alt="Я">\n' +
  '<div class="message__sender">\n' +
  '    <span class="message__text message_unread">\n' +
  '        Яндекс.Паспорт\n' +
  '    </span>\n' +
  '</div>\n' +
  '<div class="message__unread-dot message_unread"></div>\n' +
  '<div class="message__topic">\n' +
  '    <span class="message__text message_unread">\n' +
  '        Доступ к аккаунту восстановлен\n' +
  '    </span>\n' +
  '</div>\n' +
  '<div class="message__date">\n' +
  '    <span class="message__text message_unread">\n' +
  '        6 авг\n' +
  '    </span>\n' +
  '</div>';

function generateName() {
  return lorem.words(1, 3).join(' ');
}

function generateTopic() {
  return lorem.sentence(1, 10);
}

function generateHTMLText() {
  const text = document.createElement('div');
  text.className = 'full-message__text';
  const parNumbers = LoremIpsum.random(4, 10);
  let i;
  for (i = 0; i < parNumbers; i++) {
    const paragraph = document.createElement('p');
    paragraph.innerText = lorem.paragraph(5, 40);
    text.appendChild(paragraph);
  }
  return text;
}

function getTime() {
  return new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).toString();
}

function closeText(button) {
  const fullMessage = button.parentNode;
  fullMessage.style.display = 'none';
  const messages = document.getElementsByClassName('message');
  for (const message of messages) {
    message.style.display = 'block';
  }
}

function getCloseButton() {
  const button = document.createElement('img');
  button.className = 'full-message__close-button';
  button.src = 'img/close.png';
  button.addEventListener('click', () => closeText(button));
  return button;
}

function readMessage(snippet) {
  const messages = document.getElementsByClassName('message');
  for (const mes of messages) {
    mes.style.display = 'none';
  }

  const elems = Array.from(snippet.getElementsByClassName('message_unread'));
  for (const el of elems) {
    el.classList.remove('message_unread');
  }
}

function generateFullMessage() {
  const wrapper = document.createElement('div');
  wrapper.className = 'full-message';
  wrapper.appendChild(getCloseButton());
  wrapper.appendChild(generateHTMLText());
  return wrapper;
}

function generateMessage() {
  const newMessage = document.createElement('li');
  newMessage.className = 'message fade-out message_unread';
  newMessage.innerHTML = snippetTemplate;
  const texts = newMessage.getElementsByClassName('message__text');
  texts[0].textContent = generateName();
  texts[1].textContent = generateTopic();
  texts[2].textContent = getTime();
  return newMessage;
}

function addNewMessage() {
  const mailBox = document.querySelector('.mail-box');
  const newMessage = generateMessage();

  const visibleMessages = mailBox.getElementsByClassName('message');
  const fullMessages = mailBox.getElementsByClassName('full-message');
  if (visibleMessages.length === MAX_LETTERS_NUMBER) {
    const n = MAX_LETTERS_NUMBER;

    const snippet = visibleMessages[n - 1];
    const full = fullMessages[n - 1];

    messageStack.push({ snippet, full });

    visibleMessages[n - 1].remove();
    fullMessages[n - 1].remove();
  }

  const fullMessage = generateFullMessage();

  if (mailBox.firstChild != null) {
    mailBox.insertBefore(fullMessage, mailBox.firstChild);
  } else {
    mailBox.appendChild(fullMessage);
  }

  mailBox.insertBefore(newMessage, mailBox.firstChild);

  const texts = newMessage.getElementsByClassName('message__text');
  for (const text of texts) {
    text.addEventListener('click', () => {
      readMessage(newMessage);
      fullMessage.style.display = 'block';
    });
  }
  return newMessage;
}

function setNewMessageListener() {
  const button = document.body.getElementsByClassName('actions__item')[1];
  button.addEventListener('click', () => {
    const m = addNewMessage();
    setTimeout(() => {
      m.classList.remove('fade-out');
    }, 0);
  });
}

function addRandomly() {
  const minTimeout = 5 * 60;
  const maxTimeout = 10 * 60;

  const timeout = Math.floor(Math.random() * (maxTimeout - minTimeout + 1) + minTimeout);
  const m = addNewMessage();
  setTimeout(() => {
    m.classList.remove('fade-out');
  }, 0);
  setTimeout(addRandomly, timeout * 1000);
}

function removeMessage(message) {
  message.classList.add('fade-out');
}

function addOldMessages(numRemoved) {
  const mailBox = document.querySelector('.mail-box');
  const need = Math.min(numRemoved, messageStack.length);
  let i;
  for (i = 0; i < need; i++) {
    const pair = messageStack.pop();
    mailBox.appendChild(pair.snippet);
    mailBox.appendChild(pair.full);
  }
}

function removeMessages() {
  const messages = document.body.getElementsByClassName('message');
  const remMessages = Array.prototype.filter.call(messages, elem => {
    return elem.querySelector('.message__checkbox').checked;
  });
  remMessages.forEach(message => {
    removeMessage(message);
    setTimeout(() => message.parentNode.removeChild(message), 1000);
  });

  setTimeout(() => addOldMessages(remMessages.length), 1000);
}

function setRemoveListener() {
  const removeButton = document.body.getElementsByClassName('actions__item')[3];
  removeButton.addEventListener('click', () => removeMessages());
}

setNewMessageListener();
setRemoveListener();
setTimeout(addRandomly, Math.floor(Math.random() * (10 * 60 * 1000 - 10 + 1) + 10));
