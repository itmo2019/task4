function mainCheckBoxClicked() {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    let inputCheckbox = document.getElementById("mainCheckbox");
    for (let i = 0; i < bodyLetters.childElementCount; i++) {
        if (i % 2 === 0) {
            bodyLetters.children[i].children[0].children[0].checked = !inputCheckbox.checked;
        }
    }
}

function removeCheckedLetters() {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    for (let i = 0; i < bodyLetters.childElementCount; i++) {
        if (i % 2 === 0) {
            if (bodyLetters.children[i].children[0].children[0].checked) {
                bodyLetters.children[i + 1].classList.add('start-transition');
                bodyLetters.children[i].classList.add('start-transition');
                bodyLetters.children[i + 1].addEventListener('transitionend', function () {
                    bodyLetters.removeChild(this);
                });
                bodyLetters.children[i].addEventListener('transitionend', function () {
                    bodyLetters.removeChild(this);
                });
                letterCounterOnPage--;
            }
        }
    }
    if (letterCounterOnPage < maxLettersOnPage) {
        while (letterCounterOnPage < maxLettersOnPage && stack.length > 0) {
            bodyLetters.insertAdjacentElement("beforeend", stack.pop());
            bodyLetters.insertAdjacentHTML("beforeend", lineHTML);
            letterCounterOnPage++;
        }
    }
    document.getElementById("mainCheckbox").checked = false;
}
