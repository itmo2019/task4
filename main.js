clear = function(deletedMessages) {
    deletedMessages.forEach(
    function(currentValue, currentIndex, listObj) {
        currentValue.remove();
    });
}

setActionHandler = function(className, listener) {
    var action = document.querySelector("." + className);
    action.addEventListener("click", listener);
}

var messageSnippet = document.getElementsByClassName("messages-list__message-snippet")[2].cloneNode(true);

setActionHandler("mail-box__delete", 
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

setActionHandler("mail-box__get-message",
    function() {
        var messagesList = document.querySelector('.messages-list');
        var newMessage = messageSnippet.cloneNode(true);
        newMessage.classList.add("message_snippet_start_adding");
        messagesList.insertBefore(newMessage, messagesList.firstChild);
        var triggerAnimation = function() {
            newMessage.classList.add("message_snippet_added");
        };  
        setInterval(triggerAnimation, 0);
    }
);
