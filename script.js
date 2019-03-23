let messageTemplate = '      <div class="message-info__left-part">\n' +
    '                        <input type="checkbox" class="select-message-checkbox checkbox" onclick="selectCheckbox(this)">\n' +
    '                        <div class="message-info__sender-logo">Я</div>\n' +
    '                        <div class="message-info__sender bold">Команда Яндекс.Почты</div>\n' +
    '                        <div class="message-info__mark unread-mark"></div>\n' +
    '                    </div>\n' +
    '                    <div class="message-info__subject bold">Как читать почту с мобильного</div>\n' +
    '                    <div class="message-info__date-container">\n' +
    '                        <div class="date-container__date">6 июл</div>\n' +
    '                    </div>';

let anyCheckboxIsActive = false;

function selectCheckbox(checkbox) {
    if (checkbox.checked) {
        if (!anyCheckboxIsActive) {
            let deleteButton = document.getElementById('delete-messages');
            deleteButton.style.cursor = 'pointer';
        }
        anyCheckboxIsActive = true;
    } else {
        let checkboxes = document.getElementsByClassName('select-message-checkbox');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return;
            }
        }
        anyCheckboxIsActive = false;
        let deleteButton = document.getElementById('delete-messages');
        deleteButton.style.cursor = 'text';
    }
}

function selectAll(selectAllCheckbox) {
    let checkboxes = document.getElementsByClassName('select-message-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAllCheckbox.checked;
    }
    anyCheckboxIsActive = selectAllCheckbox.checked;

    let deleteButton = document.getElementById('delete-messages');
    if (!anyCheckboxIsActive) {
        deleteButton.style.cursor = 'text';
    } else {
        deleteButton.style.cursor = 'pointer';
    }
}

function createMessage() {
    let messagesList = document.getElementsByClassName('messages-list')[0];
    let newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.innerHTML = messageTemplate;
    newMessage.style.height = '0';
    messagesList.insertBefore(newMessage, messagesList.children[0]);

    let animationDuration = 1000;
    let height = 22;
    let durationPerPixel = animationDuration / height;

    var startTime = performance.now();
    requestAnimationFrame(function animate(currentTime) {
        var timePassed = currentTime - startTime;
        if (timePassed > animationDuration) timePassed = animationDuration;
        function draw(timePassed) {
            var shift = (timePassed / durationPerPixel);
            newMessage.style.height = shift + 'px';
        }
        draw(timePassed);
        if (timePassed < animationDuration) {
            requestAnimationFrame(animate);
        }
    });
}

function deleteSelectedMessages() {
    let checkboxes = document.getElementsByClassName('select-message-checkbox');
    let messagesList = document.getElementsByClassName('messages-list')[0];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let message = checkboxes[i].parentElement.parentElement;
            if (message.className.includes('labeled-message')) {
                message = message.parentElement;
            }
            messagesList.removeChild(message);
            i--;
        }
    }
    anyCheckboxIsActive = false;
    document.getElementById('check-all').checked = false;
    let deleteButton = document.getElementById('delete-messages');
    deleteButton.style.cursor = 'text';
}
