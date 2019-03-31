const MAX_MESSAGES = 30;

var messagesListNode = document.querySelector(".messages-list");
var messageSnippetNode = document.querySelector(".messages-list__message-snippet").cloneNode(true);
var articleContentNode = document.querySelector(".article__content");

function httpGETRequest(url) {
    var xmlHttp = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    try {
        var cnt = 0;
        do {
            xmlHttp.open("GET", proxyurl + url, false);
            xmlHttp.send(null);
            cnt++;
        } while(cnt < 10 && xmlHttp.status != 200);
        if (xmlHttp.status != 200) {
            return null;
        }
    } catch (e) {
        return null;
    }
    return xmlHttp.responseText;
}

function generateMessage() {
    var newMessage = new Object();
    var response = httpGETRequest("https://ru.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions&prop=extracts&exintro&explaintext&grnlimit=1");
    if (response == null) {
        newMessage.topic = "Доступ к аккаунту восстановлен";
        newMessage.content = "Поздравляем! Доступ к вашему аккаунту был успешно восстановлен.";
        return newMessage;
    }
    response = JSON.parse(response);
    var article = response.query.pages[Object.keys(response.query.pages)[0]];
    newMessage.topic = article.title;
    newMessage.content = article.extract;
    return newMessage;
}


function newMail() {
    var newMessageObj = getNewMessage();
    newMessageObj.node.querySelector(".message-clickable-area").addEventListener("click", messageClickAction);
    messages.push(newMessageObj);
    newMessageObj.node.classList.add("message_snippet_start_adding");
    messagesListNode.insertBefore(newMessageObj.node, messagesListNode.firstElementChild);
    if (messages.length > MAX_MESSAGES) {
        messagesListNode.lastElementChild.remove();
    }
    var triggerAnimation = function() {
        newMessageObj.node.classList.add("message_snippet_added");
    }; 
    setTimeout(triggerAnimation, 0);
}

function getMachineTime(time) {
    var format = function (n) {
        return (n < 10 ? "0" + n : "" + n);
    }
    return time.getFullYear() + "-" + format(time.getMonth() + 1) + "-" + format(time.getDate());
}

function getNewMessage() {
    messageObj = generateMessage();
    var newMessageNode = messageSnippetNode.cloneNode(true);
    var now = new Date();
    avatars = ["google.png", "fb.png", "insta.png", "idea.png", "twitter.png", "ya-default.svg"];
    names = ["Google", "Facebook", "Instagram", "IntelliJ Idea", "Twitter", "Яндекс"];
    var senderIdx = Math.floor(Math.random()*avatars.length);
    newMessageNode.querySelector(".message-snippet__avatar").setAttribute("src", "static/avatars/" + avatars[senderIdx]);
    newMessageNode.querySelector(".message-snippet__sender-name").innerHTML = names[senderIdx];
    newMessageNode.querySelector(".message-snippet__message-topic").innerHTML = messageObj.topic;
    months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сент", "окт", "ноя", "дек"];
    date = newMessageNode.querySelector(".message-snippet__message-time");
    date.innerHTML = now.getDate() + " " + months[now.getMonth()];
    date.setAttribute("datetime", getMachineTime(now));
    messageObj.node = newMessageNode;
    return messageObj;
}

function getChildIndex(node) {
    if (node.tagName.toLowerCase() != "li") {
        return null;
    }
    var p = node.parentNode;
    if (p == null) {
        console.log(node);
    }
    var idx = p.childElementCount - 1;
    while (node.nextElementSibling != null) {
        node = node.nextElementSibling;
        idx--;
    }
    return idx;
}

function setActionHandler(className, listener) {
    var triggers = document.querySelectorAll("." + className);
    triggers.forEach(
        function(cur) {
            cur.addEventListener("click", listener);
        }
    );
}

function messageClickAction() {
    const idx = getChildIndex(this.parentNode);
    articleContentNode.innerHTML = messages[messages.length - 1 - idx].content;
}

var messages = [];

document.querySelectorAll(".messages-list__message-snippet").forEach(function(cur) {
    messageObj = new Object();
    messageObj.node = cur;
    messageObj.topic = "Доступ к аккаунту восстановлен";
    messageObj.content = "Поздравляем! Доступ к вашему аккаунту был успешно восстановлен.";
    messages.push(messageObj);
});

setActionHandler("mail-box__select-all",
    function() {
        isChecked = document.querySelector(".mail-box__select-all input").checked;
        var messageTicks = document.querySelectorAll(".message-snippet__message-tick");
        messageTicks.forEach(
            function(cur) {
                cur.checked = isChecked;
            }
        );
    }
);

setActionHandler("mail-box__delete",
    function() {
        var selectedMessages = document.querySelectorAll(".message-snippet__message-tick:checked");
        const startSize = messages.length;
        const deletingCnt = selectedMessages.length;
        if (deletingCnt == 0) {
            return;
        }
        selectedMessages.forEach(
            function(currentValue, currentIndex, listObj) {
                currentValue.parentNode.classList.add("messages-list__message-snippet_deleted");
            });
        var deletedMessages = document.querySelectorAll(".messages-list__message-snippet_deleted");
        setTimeout(
            function(deletedMessages) {
                deletedMessages.forEach(
                    function(cur) {
                        idx = getChildIndex(cur);   
                        messages.splice(messages.length - 1 - idx, 1);
                        cur.remove();
                    });
            }, 
            500, deletedMessages);  
        if (startSize > MAX_MESSAGES) {
            var cur = startSize - 1 - MAX_MESSAGES;
            for (var i = 0; i < deletingCnt && cur >= 0; i++, cur--) {
                messagesListNode.appendChild(messages[cur].node);
            }
        }
        document.querySelector(".mail-box__select-all input").checked = false;
    }
);

setActionHandler("message-clickable-area", messageClickAction);

setInterval(newMail, 60 * 1000 * (5 + Math.floor(Math.random()*5)));