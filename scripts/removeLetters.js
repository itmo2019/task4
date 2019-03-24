let letterCounter = 0;

function mainCheckBoxClicked(event) {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    for (let i = 0; i < bodyLetters.childElementCount; i++) {
        if (i % 2 === 0) {
            bodyLetters.children[i].children[0].children[0].checked = event.target.checked;
        }
    }
}

function removeCheckedLetters() {
    let letters = document.getElementById("letters");
    let bodyLetters = letters.children[2];
    for (let i = 0; i < bodyLetters.childElementCount; i++) {
        if (i % 2 === 0) {
            if (bodyLetters.children[i].children[0].children[0].checked) {
                bodyLetters.removeChild(bodyLetters.children[i + 1]);
                bodyLetters.removeChild(bodyLetters.children[i]);
                i--;
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
