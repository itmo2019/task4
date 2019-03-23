const minWordsInLetter = 100;
const maxWordsInLetter = 200;
const minWordsInSentence = 2;
const maxWordsInSentence = 15;
const messagesPerPage = 5;
const pixelsPerSecond = 5;
const rightPosition = 500;

/*
Монотонно неуменьшающееся время системы, логические часы.
Каждое получение сообщения увеличивает его.
 */
let lamportClock = 0;
let messages = new Set();

function getRandomFromRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

let messagesTimeout = getRandomFromRange(60000 * 5, 60000 * 10);

window.onload = function () {
  setTimeout(newLetterArrivedEvent, messagesTimeout);
};

function markOrUnmarkAll() {
  let mainCheckbox = document.getElementById("checkbox_all").checked;
  for (let message of messages) {
    getMessageCheckboxById(message.getId()).checked = mainCheckbox;
  }
}

function newLetterArrivedEvent() {
  newMail();
  setTimeout(newLetterArrivedEvent, messagesTimeout)
}

function removeAllSelection(checkbox) {
  if (!checkbox.checked) {
    document.getElementById("checkbox_all").checked = false;
  }
}

function closeMessage() {
  document.getElementById("letter_opened").style.display = "none";
}

let possibleSenders = ["Пётр Аркадиевич Столыпин", "Председатель Совета министров Российской империи",
  "Министр внутренних дел Российской империи", "статс-секретарь Его Императорского Величества", "Яндекс.Столыпин"];

function openFullMessage(event, body) {
  document.getElementById("letter_opened").style.display = "block";
  document.getElementById("letter-content").innerText = body;
}

function createFullMessageShortcut(body) {
  let shortcut = document.createElement("a");
  shortcut.classList.add("mailbox-content__message-open-link");
  shortcut.addEventListener("click", x => openFullMessage(x, body));
  return shortcut;
}

function createReceiveDate() {
  let receiveDate = document.createElement("time");
  receiveDate.innerText = "22 фев.";
  receiveDate.classList.add("mailbox-content__message-receive-date");
  return receiveDate;
}

function createSenderPic() {
  let senderPicture = document.createElement("img");
  senderPicture.classList.add("mailbox-content__message-sender-picture");
  senderPicture.setAttribute("alt", "Пётр Аркадиевич Столыпин");
  senderPicture.setAttribute("src", "../resources/stolipin.png");
  return senderPicture
}

function createChooserBox(id) {
  let chooserBox = document.createElement("div");
  chooserBox.classList.add("mailbox-content__message-checkbox");
  let chooserBoxId = "message-checkbox_" + id;
  let chooserBoxImpl = document.createElement("input");
  chooserBoxImpl.classList.add("checkbox");
  chooserBoxImpl.setAttribute("type", "checkbox");
  chooserBoxImpl.id = chooserBoxId;
  chooserBoxImpl.checked = document.getElementById("checkbox_all").checked;
  chooserBox.appendChild(chooserBoxImpl);
  let chooserBoxLabel = document.createElement("label");
  chooserBoxLabel.classList.add("checkbox__label");
  chooserBoxLabel.setAttribute("for", chooserBoxId);
  chooserBox.addEventListener("click", removeAllSelection);
  chooserBox.appendChild(chooserBoxLabel);
  return chooserBox
}

function createSender() {
  let sender = document.createElement("span");
  sender.classList.add("mailbox-content__message-author");
  sender.innerText = possibleSenders[getRandomFromRange(0, possibleSenders.length - 1)];
  return sender
}

function createUnreadPoint() {
  let unreadPoint = document.createElement("div");
  unreadPoint.classList.add("mailbox-content__message-not-read-marker");
  return unreadPoint
}

function createMessageText(text) {
  let messageText = document.createElement("div");
  messageText.classList.add("mailbox-content__message-body");
  messageText.innerText = text;
  return messageText
}

function createMessage(id, messageBody) {
  let element = document.createElement("div");
  element.classList.add("mailbox-content__message");
  element.id = "message_" + id;

  element.appendChild(createChooserBox(id));

  element.appendChild(createSenderPic());

  let sender = createSender();
  sender .id = "message-author_" + id;
  element.appendChild(sender);

  let unreadPoint = createUnreadPoint();
  unreadPoint.id = "message-read_" + id;
  element.appendChild(unreadPoint);

  let messageText = createMessageText(messageBody);
  messageText.id = "message-body_" + id;
  element.appendChild(messageText);

  element.appendChild(createReceiveDate());

  element.appendChild(createFullMessageShortcut(messageBody));

  let pos = rightPosition;
  element.style.left = pos + 'px';
  let messagesHolder = document.getElementById("messages-wrapper");
  messagesHolder.insertBefore(element, messagesHolder.firstChild);

  let intervalId = setInterval(moveElementFromRightToLeft, 5);
  function moveElementFromRightToLeft() {
    if (pos === 0) {
      clearInterval(intervalId);
    } else {
      pos -= pixelsPerSecond;
      element.style.left = pos + 'px';
    }
  }
}

function getMessageCheckboxById(messageId) {
  return document.getElementById("message-checkbox_" + messageId)
}

function getMessageById(messageId) {
  return document.getElementById("message_" + messageId)
}

function Letter(id) {
  this.getId = () => {
    return id;
  };
  this.setId = (newId) => {
    this.id = newId;
  };
  this.id = id;
  let body = generateLetter();
  createMessage(id, body);
  getMessageCheckboxById(this.id).checked = document.getElementById("checkbox_all").checked;
}

function newMail() {
  lamportClock++;
  let message = new Letter(lamportClock);
  messages.add(message);
  if (messages.size > messagesPerPage) {
    getMessageById(Array.from(messages)[messages.size - messagesPerPage - 1].getId()).style.display = "none";
  }
}

function removeLetters() {
  let notRemovedMessages = new Set();
  let removedMessages = [];
  for (let message of messages) {
    let checkbox = getMessageCheckboxById(message.getId());
    if (checkbox.checked) {
      removedMessages.push(getMessageById(message.getId()));
    } else {
      notRemovedMessages.add(message);
    }
  }

  let letterPosition = 0;
  function moveElementFromLeftToRight() {
    if (letterPosition === rightPosition) {
      clearInterval(intervalId);
      for (let i = 0; i < removedMessages.length; i++) {
        document.getElementById("messages-wrapper").removeChild(removedMessages[i])
      }
    } else {
      letterPosition += pixelsPerSecond;
      for (let i = 0; i < removedMessages.length; i++) {
        removedMessages[i].style.left = letterPosition + 'px';
      }
    }
  }
  let intervalId = setInterval(moveElementFromLeftToRight, 1);

  function addNewMessages() {
    messages = notRemovedMessages;
    let messagesAsArray = Array.from(messages);
    for (let i = messages.size - 1; i >= Math.max(0, messages.size - messagesPerPage); i--) {
      getMessageById(messagesAsArray[i].getId()).style.display = "block"
    }
  }
  setTimeout(addNewMessages, 2000 / pixelsPerSecond);
}

let citations = ['Им', 'нужны', 'великие', 'потрясения', 'нам', 'нужна', 'великая', 'Россия', 'Родина', 'требует', 'себе', 'служения', 'настолько', 'жертвенно', 'чистого', 'что', 'малейшая', 'мысль', 'о', 'личной', 'выгоде', 'омрачает', 'душу', 'и', 'парализует', 'работу', 'Каждое', 'утро', 'когда', 'я', 'просыпаюсь', 'и', 'творю', 'молитву', 'я', 'смотрю', 'на', 'предстоящий', 'день', 'как', 'на', 'последний', 'в', 'жизни', 'и', 'готовлюсь', 'выполнить', 'все', 'свои', 'обязанности', 'уже', 'устремляя', 'взор', 'в', 'вечность', 'А', 'вечером', 'когда', 'я', 'опять', 'возвращаюсь', 'в', 'свою', 'комнату', 'то', 'говорю', 'себе', 'что', 'должен', 'благодарить', 'Бога', 'за', 'лишний', 'дарованный', 'мне', 'в', 'жизни', 'день', 'Это', 'единственное', 'следствие', 'моего', 'постоянного', 'сознания', 'близости', 'смерти', 'как', 'расплата', 'за', 'свои', 'убеждения', 'И', 'порой', 'я', 'ясно', 'чувствую', 'что', 'должен', 'наступить', 'день', 'когда', 'замысел', 'убийцы', 'наконец', 'удастся', 'На', 'очереди', 'главная', 'наша', 'задача', 'укрепить', 'низы', 'В', 'них', 'вся', 'сила', 'страны', 'Их', 'более', 'миллионов', 'и', 'будут', 'здоровы', 'и', 'крепки', 'корни', 'у', 'государства', 'поверьте', 'и', 'слова', 'Русского', 'Правительства', 'совсем', 'иначе', 'зазвучат', 'перед', 'Европой', 'и', 'перед', 'целым', 'миром', 'Дружная', 'общая', 'основанная', 'на', 'взаимном', 'доверии', 'работа', 'вот', 'девиз', 'для', 'нас', 'всех', 'Русских', 'Дайте', 'Государству', 'лет', 'покоя', 'внутреннего', 'и', 'внешнего', 'и', 'вы', 'не', 'узнаете', 'нынешней', 'ииВерховная', 'власть', 'является', 'хранительницей', 'идеи', 'русского', 'государства', 'она', 'олицетворяет', 'собой', 'е', 'силу', 'и', 'цельность', 'и', 'если', 'быть', 'России', 'то', 'лишь', 'при', 'усилии', 'всех', 'сынов', 'е', 'охранять', 'оберегать', 'эту', 'Власть', 'сковавшую', 'Россию', 'и', 'оберегающую', 'е', 'от', 'распада', 'Самодержавие', 'московских', 'Царей', 'не', 'походит', 'на', 'самодержавие', 'Петра', 'точно', 'так', 'же', 'как', 'и', 'самодержавие', 'Петра', 'не', 'походит', 'на', 'самодержавие', 'Екатерины', 'Второй', 'и', 'Царя', 'Освободителя', 'Ведь', 'русское', 'государство', 'росло', 'развивалось', 'из', 'своих', 'собственных', 'русских', 'корней', 'и', 'вместе', 'с', 'ним', 'конечно', 'видоизменялась', 'и', 'развивалась', 'и', 'Верховная', 'Царская', 'Власть', 'Нельзя', 'к', 'нашим', 'русским', 'корням', 'к', 'нашему', 'русскому', 'стволу', 'прикреплять', 'какойто', 'чужой', 'чужестранный', 'цветок', 'Пусть', 'расцветет', 'наш', 'родной', 'русский', 'цвет', 'пусть', 'он', 'расцветет', 'и', 'развернется', 'под', 'влиянием', 'взаимодействия', 'Верховной', 'Власти', 'и', 'дарованного', 'Ею', 'нового', 'представительного', 'строя', 'Правительство', 'должно', 'избегать', 'лишних', 'слов', 'но', 'есть', 'слова', 'выражающие', 'чувства', 'от', 'которых', 'в', 'течение', 'столетий', 'усиленно', 'бились', 'сердца', 'русских', 'людей', 'Эти', 'чувства', 'эти', 'слова', 'должны', 'быть', 'запечатлены', 'в', 'мыслях', 'и', 'отражаться', 'в', 'делах', 'правителей', 'Слова', 'эти', 'неуклонная', 'приверженность', 'к', 'русским', 'историческим', 'началам', 'в', 'противовес', 'беспочвенному', 'социализму', 'Это', 'желание', 'это', 'страстное', 'желание', 'обновить', 'просветить', 'и', 'возвеличить', 'родину', 'в', 'противность', 'тем', 'людям', 'которые', 'хотят', 'её', 'распада'];

function letterReady(letter, expectedCount) {
  return letter.split(' ').length >= expectedCount;
}

function chooseWeighted(arr, weights) {
  let prefixSums = [];
  var sum = weights[0];
  prefixSums.push(sum);
  for (i = 1; i < weights.length; i++) {
    sum += weights[i];
    prefixSums.push(sum);
  }
  let randomNum = getRandomFromRange(0, sum);
  for (i = 0; i < prefixSums.length; i++) {
    if (randomNum < prefixSums[i]) {
      return arr[i];
    }
  }
  return arr[prefixSums.length - 1];
}

function addCommas(words) {
  let index = 0;
  while (index < words.length - 2) {
    words[index] += ',';
    index += getRandomFromRange(2, 15);
  }
}

function generateWords() {
  let result = [];
  let count = getRandomFromRange(minWordsInSentence, maxWordsInSentence);
  for (let i = 0; i < count; i++) {
    result.push(citations[getRandomFromRange(0, citations.length - 1)]);
  }
  return result;
}

function generateSentence() {
  let words = generateWords();
  addCommas(words);
  const punctuationSigns = [".", "!", "?", "...", ";"];
  const weights = [4, 2, 2, 1, 1];
  words[words.length - 1] += chooseWeighted(punctuationSigns, weights);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1, words[0].length);
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toLowerCase() + words[i].slice(1, words[i].length);
  }
  let result = '';
  for (let i = 0; i < words.length; i++) {
    result += words[i] + ' ';
  }
  return result;
}

function generateLetter() {
  let count = getRandomFromRange(minWordsInLetter, maxWordsInLetter);
  let letter = '';
  while (!letterReady(letter, count)) {
    letter += generateSentence();
  }
  return letter;
}