clear = function(deletedMessages) {
    deletedMessages.forEach(
    function(currentValue, currentIndex, listObj) {
        currentValue.remove();
    });
}

var deleteAction = document.getElementsByClassName("mail-box__delete")[0];
deleteAction.addEventListener("click",
    function() {
        var selectedMessages = document.querySelectorAll(".message-snippet__message-tick:checked");
        selectedMessages.forEach(
            function(currentValue, currentIndex, listObj) {
                currentValue.parentNode.classList.add("messages-list__message-snippet_deleted");
            });
        var deletedMessages = document.querySelectorAll(".messages-list__message-snippet_deleted");
        setInterval(clear, 500, deletedMessages);
    }
);

var messageSnippet = document.getElementsByClassName("messages-list__message-snippet")[2].cloneNode(true);

var getMessageAction = document.getElementsByClassName("mail-box__get-message")[0];
getMessageAction.addEventListener("click",
    function() {
        var messagesList = document.getElementsByClassName('messages-list')[0];
        var newMessage = messageSnippet.cloneNode(true);
        messagesList.insertBefore(newMessage, messagesList.firstChild);
        newMessage.classList.add("message_snippet_added");
    }
);
