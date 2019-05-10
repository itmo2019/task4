const MAX_MSGS = 30;

const MIN_SENTENCES = 2;
const MAX_SENTENCES = 10;

const FIRST_MSG_MIN_TIMEOUT = 10;
const MIN_TIMEOUT = 5 * 60 * 1000;
const MAX_TIMEOUT = 10 * 60 * 1000;

function randFromRange(from, to) {
    return Math.random() * (to - from) + from;
}

function randInt(to) { // 0..to-1
    return Math.floor(Math.random() * to)
}

function randIntFromRange(from, to) { // from..to
    return randInt(to - from + 1) + from;
}

function randArrayElem(arr) {
    return arr[randInt(arr.length)];
}

function getRandomLetter() {
    const authorTable = [
        ["Иван", "Пётр", "Александр", "Кирилл", "Алексей"],
        ["Иванов", "Петров", "Сидоров", "Козлов"]
    ];
    const contentTable = [
        ["Товарищи,", "С другой стороны", "Равным образом", "Не следует, однако, забывать, что",
         "Таким образом", "Повседневная практика показывает, что"],

        ["реализация намеценных плановых заданий", "рамки и место обучения кадров",
         "постоянный количественный рост и сфера нашей активности", "сложившаяся структура организации",
         "новая модель организационной деятельности", "дальнейшее развитие различных форм деятельности"],

        ["играет важную роль в формировании", "требуют от нас анализа", "требуют определения и уточнения",
         "способствует поднготовке и реализации", "обеспецивает широкому кругу специалистов участие в формировании",
         "позволяет выполнить важные задания по разработке"],

        ["существенных финансовых и административных условий.", "дальнейших направлений развития.", "системы массового участия.",
         "позиций, занимаемых участниками в отношении поставленных задач.", "новых предложений.", "направлений прогрессивного развития."]
    ];

    const letter = new Object();
    letter.author = randArrayElem(authorTable[0]) + ' ' + randArrayElem(authorTable[1]);
    
    const sentCnt = randIntFromRange(MIN_SENTENCES, MAX_SENTENCES);
    letter.content = "";
    for (let i = 0; i < sentCnt; i++) {
        let curSentence = "";
        for (let j = 0; j < contentTable.length; j++) {
            curSentence += randArrayElem(contentTable[j]) + " ";
        }
        letter.content += curSentence;
        if (i == 0) {
            letter.topic = curSentence;
        }
    }

    letter.date = new Date();
    return letter;
}

function markAsRead(message) {
    const unreadMarker = message.querySelector(".message__unread-marker");
    if (unreadMarker) {
        message.removeChild(unreadMarker);
        message.querySelector(".message__author").classList.remove("message__author_unread");
        message.querySelector(".message__title").classList.remove("message__title_unread");
    }
}

let checkedMessages = 0;

function checkMsg(msg) {
    if (checkedMessages == 0) {
        setControlButtonsState(true);
    }
    msg.querySelector(".message__base-checkbox").checked = true;
    checkedMessages++;
}

function uncheckMsg(msg) {
    checkedMessages--;
    if (checkedMessages == 0) {
        setControlButtonsState(false);
    }
    msg.querySelector(".message__base-checkbox").checked = false;
    document.querySelector(".messages-container__message-controls > label > .message__base-checkbox").checked = false;
}

function delCheckedMessages() {
    Array.from(document.querySelector(".messages").children).forEach((msg) => {
        if (msg.querySelector(".message__base-checkbox").checked) {
            onDeleteMessage(msg);
            uncheckMsg(msg);
        }
    });
}

function markAsReadCheckedMessages() {
    Array.from(document.querySelector(".messages").children).forEach((msg) => {
        if (msg.querySelector(".message__base-checkbox").checked) {
            markAsRead(msg);
            uncheckMsg(msg);
        }
    });
}

function doGroupMessagesAction(e) {
    if (e.target.classList.contains("del-message-button")) {
        delCheckedMessages();
    } else if (e.target.classList.contains("mark-as-read-button")) {
        markAsReadCheckedMessages();
    } else {
        console.log("There is no actioin bound with this button");
    }
    e.stopPropagation();
}

function setControlButtonsState(isActive) {
    messageControls = document.querySelector(".messages-container__message-controls");
    Array.from(messageControls.getElementsByClassName("message-controls__item")).forEach((elem) => {
        if (isActive) {
            elem.classList.add("message-controls__item_active");
            elem.addEventListener("click", doGroupMessagesAction);
        } else {
            elem.classList.remove("message-controls__item_active");
            elem.removeEventListener("click", doGroupMessagesAction);
        }
    });
}

function newMail() {
    const letter = getRandomLetter();
    const dateStr = letter.date.toLocaleDateString("ru-RU", { month: 'short', day: 'numeric' });
    const message = document.createElement("section");
    message.className = "messages__message insert-anim";
    message.innerHTML =
        '<label>' +
        '    <input type="checkbox" class="message__base-checkbox">' +
        '    <div class="checkbox-container">' +
        '        <div class="checkbox message__checkbox"></div>' +
        '    </div>' +
        '</label>' +
        '<a href="#" title="' + letter.author + '">' +
        '    <div class="message__author-img">' + letter.author[0].toUpperCase() + '</div>' +
        '</a>' +
        '<a href="#" title="example@yandex.ru" class="message__author message__author_unread">' + letter.author + '</a>' +
        '<a href="#" title="Отметить как прочитанное" class="message__unread-marker" />' +
        '<a href="#" title="' + letter.topic + '" class="message__title message__title_unread">' + letter.topic + '</a>' +
        '<a href="#" title="Получено ' + dateStr + '">' +
        '   <time datetime="' + letter.date.toISOString().slice(0, 10) + '" class="message__date">' + dateStr + '</time>' +
        '</a>' +
        '<div class="message__content">' + letter.content + '</div>';
    message.querySelector(".checkbox-container").addEventListener("click", (e) => {
        e.stopPropagation();
    });
    message.querySelector(".message__base-checkbox").addEventListener("click", (e) => {
        if (message.querySelector(".message__base-checkbox").checked) {
            checkMsg(message);
        } else {
            uncheckMsg(message);
        }
        e.stopPropagation();
    });
    message.querySelector(".message__unread-marker").addEventListener("click", (e) => {
        markAsRead(message);
        e.stopPropagation();
    });
    const content = message.querySelector(".message__content");
    message.addEventListener("click", () => {
        const container = document.querySelector(".message-content");
        container.replaceChild(content, container.querySelector(".message__content"));
        container.hidden = false;
        document.querySelector(".messages").hidden = true;
        markAsRead(message);
    });
    if (document.querySelector(".messages-container__message-controls > label > .message__base-checkbox").checked) {
        checkMsg(message);
    }

    const messages = document.querySelector(".messages");
    messages.insertBefore(message, messages.firstChild);
    if (messages.children.length > MAX_MSGS) {
        messages.children[MAX_MSGS].style.display = 'none';
    }
    setTimeout(() => {
        message.classList.remove("insert-anim");
    }, 500);
}

function onDeleteMessage(msg) {
    if (msg !== undefined && !msg.classList.contains("start-del-anim")) {
        msg.classList.add("start-del-anim");
        setTimeout(() => {
            msg.remove();
            const messages = Array.from(document.querySelector(".messages").children);
            if (messages.length >= MAX_MSGS) {
                messages[MAX_MSGS - 1].style.display = 'block';
            }
        }, 500);
    }
}

function onCloseMessageContent() {
    document.querySelector(".message-content").hidden = true;
    document.querySelector(".messages").hidden = false;
}

function selectAllCheckboxController() {
    const messages = Array.from(document.querySelector(".messages").children);
    if (document.querySelector(".messages-container__message-controls > label > .message__base-checkbox").checked) {
        messages.forEach((msg) => {
            if (msg.querySelector(".message__base-checkbox").checked == false) {
                checkMsg(msg);
            }
        });
    } else {
        messages.forEach((msg) => {
            if (msg.querySelector(".message__base-checkbox").checked) {
                uncheckMsg(msg);
            }
        });
    }
}

function setTimer(isFirstMsg) {
    setTimeout(() => {
        newMail();
        setTimer(false);
    }, randFromRange((isFirstMsg ? FIRST_MSG_MIN_TIMEOUT : MIN_TIMEOUT), MAX_TIMEOUT));
}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".menu__message-action-button").addEventListener("click", newMail);
    document.querySelector(".message-content__close-icon").addEventListener("click", onCloseMessageContent);
    document.querySelector(".messages-container__message-controls > label > .message__base-checkbox")
        .addEventListener("click", selectAllCheckboxController);
    setTimer(true);
});