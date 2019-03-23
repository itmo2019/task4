let cnt = 2;
let letterTemplate = '<input type="checkbox" class="letter__check">'
    + '<img class="letter__sender-logo" src="../images/yandex-logo.png">'
    + '<div class="letter__sender-name letter__sender-name_unread">Преподы по фронту</div>'
    + '<div class="letter__mark letter__mark_unread"></div>'
    + '<div class="letter__title letter__title_unread"></div>'
    + '<div class="letter__date">6 июл</div>';

// document.getElementById("menu__receive").addEventListener("click", receiveLetter);
document.getElementById("actions__remove").addEventListener("click", remove);
document.getElementById("actions__check").addEventListener("change", checkAll);

function receiveLetter() {
    let letters = document.getElementById("letter-box");
    let letter = document.createElement("div");
    letter.className = "letter";
    let id = "letter_" + cnt;
    setTimeout(function() {
        letter.classList.add("show");
    }, 10);
    letter.setAttribute("id", id);
    letter.innerHTML = letterTemplate;
    letter.querySelector(".letter__title").textContent += "Обновление: по фронту лутануло долг " + cnt + " КТ-шников";
    letters.insertBefore(letter, letters.firstChild);
    cnt++;
}

function nextDouble(min, max) {
    return Math.random() * (max - min) + min;
}

function remove() {
    let checkboxs = document.getElementsByClassName("letter__check");
    for (let i = checkboxs.length - 1; i >= 0; i--) {
        if (checkboxs[i].checked) {
            let letter = checkboxs[i].parentNode;
            letter.classList.add("will_be_removed");
            letter.addEventListener("animationend", (ev) => ev.target.remove());
        }
    }
}

function checkAll() {
    let checkboxs = document.getElementsByClassName("letter__check");
    for (let i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = !checkboxs[i].checked;
    }
}

setInterval(receiveLetter, nextDouble(1000, 10000));