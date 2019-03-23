let oneLetter = '<label>\n' +
    '                    <input type="checkbox" class="check">\n' +
    '                </label>\n' +
    '                <div class="main-block__img-ya">\n' +
    '                    <img src="img/yandex.png" alt="Yandex">\n' +
    '                </div>\n' +
    '                <span class="main-block__mail-from bold-text">Яндекс</span>\n' +
    '                <div class="main-block__mail-not-read"></div>\n' +
    '                <span class="main-block__topic bold-text">Собери свою поту в этот ящик</span>\n' +
    '                <time class="main-block__date" datetime="06.07">6 июл</time>';

function addLetter() {
    let allLetters = document.getElementById('all-letters');
    let newLetter = document.createElement('div');
    newLetter.className = 'animation-insert main-block__letter';
    newLetter.innerHTML = oneLetter;
    allLetters.insertBefore(newLetter, allLetters.childNodes[2]);
    allLetters.classList.add('all-letter-down');
    setTimeout(removeClass, 600, newLetter, 'animation-insert');
    setTimeout(removeClass, 600, allLetters, 'all-letter-down');

}

function removeClass(letter, name) {
    letter.classList.remove(name);
}

function removeWithAnimation(letter) {
    removeClass(letter, 'animation-delete');
    letter.remove();
}

function remove() {
    let checkboxes = document.body.querySelectorAll('.check');
    for (let i = 1; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let letter = checkboxes[i];
            while (!letter.classList.contains('main-block__letter')) {
                letter = letter.parentElement;
            }
            letter.classList.add('animation-delete');
            setTimeout(removeWithAnimation, 600, letter);
        }
    }
}

document.getElementById('get-letter').addEventListener("click", addLetter);
document.getElementById('remove').addEventListener("click", remove);
