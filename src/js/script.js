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
  return Math.random() * (max - min) + min;
}

function newMessagePerRandomTime() {
  newMail();
  let randomTimeout = getRandomFromRange(minNewMessageTimeout, maxNewMessageTimeout);
  let timeout = Math.max(randomTimeout, newMessageTimeoutMax);
  setTimeout(newMessagePerRandomTime, timeout)
}

function showMessage(content) {
  letter.style.display = "block";
  checkboxAll.disabled = true;
}

function closeMessage() {
  letter.style.display = "none";
  checkboxAll.disabled = false;
}

function Message(id) {
  let element = document.createElement("div");
  this.id = id;

  element.classList.add("inbox__message");
  element.id = "message_" + id.toString();
  element.appendChild(getCheckboxDiv(id));
  element.appendChild(getIconImg());
  element.appendChild(getAuthorSpan(id));
  element.appendChild(getReadDiv(id));
  element.appendChild(getBody());
  element.appendChild(getDateTime());
  element.appendChild(getLink(id));
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

  function getLink(id) {
    let link = document.createElement("a");
    link.classList.add("inbox__message-open-link");
    link.onclick = function () {
      showMessage(id);
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

  function getAuthorSpan(id) {
    let body = document.createElement("span");
    body.classList.add("inbox__message-author");
    body.classList.add("inbox__message_bold");
    body.innerText = "Котик" + id.toString() + " из Яндекса";

    return body
  }

  function getReadDiv(id) {
    let read = document.createElement("div");
    read.classList.add("inbox__message-read");
    read.id = "read_" + id.toString();

    return read
  }

  function getBody() {
    let body = document.createElement("div");
    body.classList.add("inbox__message-body");
    body.classList.add("inbox__message_bold");
    body.innerText = "Ну посмотрим что тут у нас";

    return body
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