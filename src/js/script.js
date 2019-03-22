const approxTime = new Date();
const approxTimeISO = approxTime.toISOString();
const approxTimeShort = approxTime.toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'});

let messagesCount = 4;
let mainPageMessagesCount = 4;
const maxMainPageMessagesCount = 30;

const newMessageTimeoutMax = 1000 * 60 * 5;
const minNewMessageTimeout = 10;
const maxNewMessageTimeout = 1000 * 60 * 10;

window.onload = function () {
  setTimeout(newMessagePerRandomTime, getRandomFromRange(minNewMessageTimeout, maxNewMessageTimeout))
};

function getRandomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function newMessagePerRandomTime() {
  newMail();
  let randomTimeout = getRandomFromRange(minNewMessageTimeout, maxNewMessageTimeout);
  let timeout = Math.max(randomTimeout, newMessageTimeoutMax);
  setTimeout(newMessagePerRandomTime, timeout)
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

function getCheckobxDiv(id) {
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
  body.innerText = "И еще Котик из Яндекса";

  return body
}

function getReadDiv() {
  let read = document.createElement("div");
  read.classList.add("inbox__message-read");

  return read
}

function getBody() {
  let body = document.createElement("div");
  body.classList.add("inbox__message-body");
  body.classList.add("inbox__message_bold");
  body.innerText = "Ну посмотрим что тут у нас";

  return body
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

function removeMessageWithAnimation(messages, messagesToremove) {
  let pos = 0;
  let id = setInterval(moveElementFromLeftToRight, 1);

  function moveElementFromLeftToRight() {
    if (pos === 500) {
      clearInterval(id);
    } else {
      pos += 10;
      for (let i = 0; i < messagesToremove.length; i++) {
        messagesToremove[i].style.left = pos.toString() + 'px';
      }
    }
  }

  let remove_id = setInterval(remove, 50);

  function remove() {
    if (pos === 500) {
      for (let i = 0; i < messagesToremove.length; i++) {
        messages.removeChild(messagesToremove[i])
      }
      clearInterval(remove_id);
    }
  }

}

function newMail() {
  let messages = document.getElementById("messages");
  let newMessage = document.createElement("div");
  newMessage.classList.add("inbox__message");
  messagesCount++;
  mainPageMessagesCount++;
  newMessage.id = "message_" + messagesCount.toString();

  newMessage.appendChild(getCheckobxDiv(messagesCount));
  newMessage.appendChild(getIconImg());
  newMessage.appendChild(getAuthorSpan(messagesCount));
  newMessage.appendChild(getReadDiv());
  newMessage.appendChild(getBody());
  newMessage.appendChild(getDateTime());
  document.getElementById("checkbox_all").checked = false;
  addMessageWithAnimation(messages, newMessage)
}

function checkAllClicked() {
  let checkAllCheckboxes = document.getElementById("checkbox_all");
  for (let i = 1; i <= messagesCount; i++) {
    let checkbox = document.getElementById("checkbox_" + i.toString());
    if (checkbox != null) {
      checkbox.checked = checkAllCheckboxes.checked;
    }
  }
}

function remove_checked() {
  let messagesToRemove = [];
  let messages = document.getElementById("messages");
  for (let i = 1; i <= messagesCount; i++) {
    let checkbox = document.getElementById("checkbox_" + i.toString());
    if (checkbox != null && checkbox.checked) {
      messagesToRemove.push(document.getElementById("message_" + i.toString()));
    }
  }
  removeMessageWithAnimation(messages, messagesToRemove);
  document.getElementById("checkbox_all").checked = false;
  mainPageMessagesCount -= messagesToRemove.length;
}