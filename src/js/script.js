const approxTime = new Date();
const approxTimeISO = approxTime.toISOString();
const approxTimeShort = approxTime.toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'});

const maxMainPageMessagesCount = 5;
let messagesCount = 1;
const messages = new Set();
let letter = null;
let letter_content = null;
let checkboxAll = null;

const newMessageTimeoutMax = minutesToMillis(5);
const minNewMessageTimeout = 10;
const maxNewMessageTimeout = minutesToMillis(10);

window.onload = function () {
  setTimeout(newMessagePerRandomTime, getRandomFromRange(minNewMessageTimeout, maxNewMessageTimeout));
  messages.add(new Message(1));
  letter = document.getElementById("letter");
  letter_content = document.getElementById("letter-content");
  checkboxAll = document.getElementById("checkbox_all");
};

function minutesToMillis(minutes) {
  return 1000 * 60 * minutes
}

function getRandomFromRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function newMessagePerRandomTime() {
  newMail();
  let randomTimeout = getRandomFromRange(minNewMessageTimeout, maxNewMessageTimeout);
  let timeout = Math.max(randomTimeout, newMessageTimeoutMax);
  setTimeout(newMessagePerRandomTime, timeout)
}

function showMessage(message) {
  letter.style.display = "block";
  checkboxAll.disabled = true;
  letter_content.innerText = message;
}

function closeMessage() {
  letter.style.display = "none";
  checkboxAll.disabled = false;
}

function Message(id) {
  let element = document.createElement("div");
  this.id = id;
  this.body = generateMessage();
  element.classList.add("inbox__message");
  element.id = "message_" + id.toString();
  element.appendChild(getCheckboxDiv(id));
  element.appendChild(getIconImg());
  element.appendChild(getAuthorSpan());
  element.appendChild(getReadDiv(id));
  element.appendChild(getBody(this.body));
  element.appendChild(getDateTime());
  element.appendChild(getLink(this.body));
  let messagesDiv = document.getElementById("messages");
  addMessageWithAnimation(messagesDiv, element);

  this.getRead = function () {
    return document.getElementById("read_" + this.id.toString())
  };

  this.getCheckbox = function () {
    return document.getElementById("checkbox_" + this.id.toString())
  };

  this.getElement = function () {
    return document.getElementById("message_" + this.id.toString())
  };

  function getLink(body) {
    let link = document.createElement("a");
    link.classList.add("inbox__message-open-link");
    link.onclick = function () {
      showMessage(body);
    };
    return link
  }

  function getDateTime() {
    let date = document.createElement("time");
    date.classList.add("inbox__message-date");
    date.setAttribute("datetime", approxTimeISO);
    date.innerText = approxTimeShort;

    return date;
  }

  function getIconImg() {
    let icon = document.createElement("img");
    icon.classList.add("inbox__message-icon");
    icon.setAttribute("src", "img/ya-default.svg");

    return icon
  }

  function getCheckboxDiv(id) {
    let messageCheckbox = document.createElement("div");
    messageCheckbox.classList.add("inbox__message-checkbox");

    let checkboxId = "checkbox_" + id.toString();

    let messageCheckboxInput = document.createElement("input");
    messageCheckboxInput.classList.add("checkbox");
    messageCheckboxInput.setAttribute("type", "checkbox");
    messageCheckboxInput.id = checkboxId;

    let messageCheckboxLabel = document.createElement("label");
    messageCheckboxLabel.classList.add("checkbox__label");
    messageCheckboxLabel.setAttribute("for", checkboxId);

    messageCheckbox.appendChild(messageCheckboxInput);
    messageCheckbox.appendChild(messageCheckboxLabel);

    return messageCheckbox
  }

  function getAuthorSpan() {
    let body = document.createElement("span");
    body.classList.add("inbox__message-author");
    body.classList.add("inbox__message_bold");
    body.innerText = "Котик #" + getRandomFromRange(1, 1000) + " из Яндекса";

    return body
  }

  function getReadDiv(id) {
    let read = document.createElement("div");
    read.classList.add("inbox__message-read");
    read.id = "read_" + id.toString();

    return read
  }

  function getBody(text) {
    let body = document.createElement("div");
    body.classList.add("inbox__message-body");
    body.classList.add("inbox__message_bold");
    body.innerText = text;

    return body
  }

  function generateMessage() {
    return new LoremIpsum().paragraph(20, 60);
  }
}

function addMessageWithAnimation(messages, newMessage) {
  let pos = 500;
  newMessage.style.left = pos + 'px';
  messages.insertBefore(newMessage, messages.firstChild);

  let id = setInterval(moveElementFromRightToLeft, 5);

  function moveElementFromRightToLeft() {
    if (pos === 0) {
      clearInterval(id);
    } else {
      pos -= 10;
      newMessage.style.left = pos.toString() + 'px';
    }
  }
}

function removeMessageWithAnimation(messages, messagesToRemove) {
  let pos = 0;
  let id = setInterval(moveElementFromLeftToRight, 1);

  function moveElementFromLeftToRight() {
    if (pos === 500) {
      clearInterval(id);
    } else {
      pos += 10;
      for (let i = 0; i < messagesToRemove.length; i++) {
        messagesToRemove[i].style.left = pos.toString() + 'px';
      }
    }
  }

  let remove_id = setInterval(remove, 50);

  function remove() {
    if (pos === 500) {
      for (let i = 0; i < messagesToRemove.length; i++) {
        messages.removeChild(messagesToRemove[i])
      }
      clearInterval(remove_id);
    }
  }

}

function newMail() {
  messagesCount++;
  let message = new Message(messagesCount);
  messages.add(message);
  document.getElementById("checkbox_all").checked = false;
  if (messages.size > maxMainPageMessagesCount) {
    Array.from(messages)[messages.size - maxMainPageMessagesCount - 1].getElement().style.display = "none";
  }
}

function checkAllClicked() {
  if (letter.style.display === "block") {
    return;
  }
  let checkAllCheckboxes = document.getElementById("checkbox_all");
  for (let message of messages) {
    let checkbox = message.getCheckbox();
    if (message.getElement().style.display !== "none") {
      checkbox.checked = checkAllCheckboxes.checked;
    }
  }
}

function removeChecked() {
  if (letter.style.display === "block") {
    return;
  }
  let messagesToRemove = [];
  let messagesDiv = document.getElementById("messages");
  for (let message of messages) {
    let checkbox = message.getCheckbox();
    if (checkbox.checked) {
      messagesToRemove.push(message);
    }
  }
  removeMessageWithAnimation(messagesDiv, messagesToRemove.map(function (it) {
    return it.getElement()
  }));
  document.getElementById("checkbox_all").checked = false;
  for (let message of messagesToRemove) {
    messages.delete(message);
  }
  let messagesAsArray = Array.from(messages);
  for (let i = messages.size - 1; i >= Math.max(0, messages.size - maxMainPageMessagesCount); i--) {
    messagesAsArray[i].getElement().style.display = "block"
  }
}

// was taken from https://github.com/jsilvermist/lorem-ipsum-js
class LoremIpsum {

  constructor() {
    /**
     * Possible words
     *
     * @type {Array}
     */
    this._words = [ 'a', 'ac', 'accumsan', 'ad', 'adipiscing', 'aenean', 'aenean', 'aliquam', 'aliquam', 'aliquet', 'amet', 'ante', 'aptent', 'arcu', 'at', 'auctor', 'augue', 'bibendum', 'blandit', 'class', 'commodo', 'condimentum', 'congue', 'consectetur', 'consequat', 'conubia', 'convallis', 'cras', 'cubilia', 'curabitur', 'curabitur', 'curae', 'cursus', 'dapibus', 'diam', 'dictum', 'dictumst', 'dolor', 'donec', 'donec', 'dui', 'duis', 'egestas', 'eget', 'eleifend', 'elementum', 'elit', 'enim', 'erat', 'eros', 'est', 'et', 'etiam', 'etiam', 'eu', 'euismod', 'facilisis', 'fames', 'faucibus', 'felis', 'fermentum', 'feugiat', 'fringilla', 'fusce', 'gravida', 'habitant', 'habitasse', 'hac', 'hendrerit', 'himenaeos', 'iaculis', 'id', 'imperdiet', 'in', 'inceptos', 'integer', 'interdum', 'ipsum', 'justo', 'lacinia', 'lacus', 'laoreet', 'lectus', 'leo', 'libero', 'ligula', 'litora', 'lobortis', 'lorem', 'luctus', 'maecenas', 'magna', 'malesuada', 'massa', 'mattis', 'mauris', 'metus', 'mi', 'molestie', 'mollis', 'morbi', 'nam', 'nec', 'neque', 'netus', 'nibh', 'nisi', 'nisl', 'non', 'nostra', 'nulla', 'nullam', 'nunc', 'odio', 'orci', 'ornare', 'pellentesque', 'per', 'pharetra', 'phasellus', 'placerat', 'platea', 'porta', 'porttitor', 'posuere', 'potenti', 'praesent', 'pretium', 'primis', 'proin', 'pulvinar', 'purus', 'quam', 'quis', 'quisque', 'quisque', 'rhoncus', 'risus', 'rutrum', 'sagittis', 'sapien', 'scelerisque', 'sed', 'sem', 'semper', 'senectus', 'sit', 'sociosqu', 'sodales', 'sollicitudin', 'suscipit', 'suspendisse', 'taciti', 'tellus', 'tempor', 'tempus', 'tincidunt', 'torquent', 'tortor', 'tristique', 'turpis', 'ullamcorper', 'ultrices', 'ultricies', 'urna', 'ut', 'ut', 'varius', 'vehicula', 'vel', 'velit', 'venenatis', 'vestibulum', 'vitae', 'vivamus', 'viverra', 'volutpat', 'vulputate' ];
  }

  /**
   * Get random number
   *
   * @param  {Number} x
   * @param  {Number} y
   * @return {Number}
   */
  _random(x, y) {
    const rnd = (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
    return Math.round(Math.abs(rnd) * x + y);
  }

  /**
   * Get random number between min and max
   *
   * @param  {Number} min (optional) lower result limit
   * @param  {Number} max (optional) upper result limit
   * @return {Number}     random number
   */
  _count(min, max) {
    let result;
    if (min && max) result = Math.floor(Math.random() * (max - min + 1) + min);
    else if (min) result = min;
    else if (max) result = max;
    else result = this._random(8, 2);

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
    const count = this._count(min, max);

    // get random words
    while (result.length < count) {
      const pos = Math.floor(Math.random() * this._words.length);
      const rnd = this._words[pos];

      // do not allow same word twice in a row
      if (result.length && result[result.length - 1] === rnd) {
        continue;
      }

      result.push(rnd);
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
    let index = this._random(6, 2);
    while (index < words.length - 2) {
      words[index] += ',';
      index += this._random(6, 2);
    }

    // append puctation on end
    const punct = '...!?'
    words[words.length - 1] += punct.charAt(Math.floor(Math.random() * punct.length));

    // uppercase first letter
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    return words.join(' ');
  }

  /**
   * Generate paragraph
   *
   * @param  {Number} min (optional) minimal words count
   * @param  {Number} max (optional) maximal words count
   * @return {String}     paragraph
   */
  paragraph(min, max) {
    if (!min && !max) {
      min = 20;
      max = 60;
    }

    const count = this._count(min, max);
    let result = '';

    // append sentences until limit is reached
    while (result.slice(0, -1).split(' ').length < count) {
      result += this.sentence() + ' ';
    }
    result = result.slice(0, -1);

    // remove words
    if (result.split(' ').length > count) {
      const punct = result.slice(-1);
      result = result.split(' ').slice(0, count).join(' ');
      result = result.replace(/,$/, '');
      result += punct;
    }

    return result;
  }

}