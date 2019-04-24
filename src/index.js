const mailHtml = '                <section class="mail _bottom-separator-view">\n' +
    '                            <div class="chose mail__elem mail__elem_view">\n' +
    '                                <input class="mail__checkbox" type="checkbox">\n' +
    '                            </div>\n' +
    '                            <a href="#popup-essay" class="simple-link_view">\n' +
    '                                <div class="mail__sender-logo mail__ivanov-logo_view"><p class="ii">И</p></div>\n' +
    '                                <div class="mail__author mail__author_view">\n' +
    '                                    <p class="ivan-ivanov ivan-ivanov_view _message_view">Иван Иванов</p>\n' +
    '                                </div>\n' +
    '                                <div class="read-status read-status_view read-status_not-read"></div>\n' +
    '                                <div class="mail__message-body mail__message-body_view">\n' +
    '                                    <p class="ivan-body ivan-body_view _message_view text-overflow_behaviour">Съешь же ещё этих мягких французских булок, да выпей чаю</p>\n' +
    '                                </div>\n' +
    '                                <div class="message-date message-date_view">\n' +
    '                                    <p class="date date_view _message_view">6 июл</p>\n' +
    '                                </div>\n' +
    '                            </a>\n' +
    '                        </section>'

function chooseAll(checkbox) {
    let checkboxes = document.getElementsByClassName("mail__checkbox");
    for (let i = 0; i < checkboxes.length; ++i) {
        checkboxes[i].checked = checkbox.checked;
    }
    
}

function deleteChosen() {
    let checkboxes = document.getElementsByClassName("mail__checkbox");
    let checkboxesLength = checkboxes.length;
    while(checkboxesLength--) {
        if (checkboxes[checkboxesLength].checked) {
            let childToDelete = checkboxes[checkboxesLength].parentElement.parentElement.parentElement;
            childToDelete.className = " will-be-removed";
            childToDelete.addEventListener('transitionend', function () {
                this.remove();
            });
        }
    }
    document.getElementById("checkbox").checked = false;
}


function addNewMail() {
    let timeInterval = generateRandomTime(10, 10  * 1000);
    setTimeout(function () {
        let newItem = document.createElement("li");
        newItem.innerHTML = mailHtml;
        let list = document.querySelector(".mail-list");
        list.insertBefore(newItem, list.childNodes[0]);
        setTimeout(function() {
            newItem.classList.add("mail-list__elem", "mail-list__elem_view");
            console.log(newItem.className)
        }, 10);
    }, timeInterval)

}


function generateRandomTime(leftBorder, rightBorder) {
    return Math.random() * (rightBorder - leftBorder) + leftBorder
}

setInterval(addNewMail, 5   *  1000);