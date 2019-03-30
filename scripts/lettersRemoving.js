let letterCounter = 0;

function mainCheckBoxClicked(event) {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    let inputCheckbox = event.target.previousElementSibling;
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
                letterCounter--;
            }
        }
    }

    if (letterCounter === 0) {
        let mainCheckbox = document.getElementById("mainCheckbox");
        if (mainCheckbox.checked) {
            mainCheckbox.checked = false;
        }
    }
}

function removeLastLetter() {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    let lastIndex = bodyLetters.childElementCount - 2;
    bodyLetters.removeChild(bodyLetters.children[lastIndex + 1]);
    bodyLetters.removeChild(bodyLetters.children[lastIndex]);
    letterCounter--;
}
