const minTimeFrequencyAppearance = minutesToMillis(0.1);
const maxTimeWindow = minutesToMillis(0.2);
const maxLettersOnPage = 5;

let stack = [];
let letterCounterOnPage = 0;

function minutesToMillis(minutes) {
    return 1000 * 60 * minutes
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let timerId = setTimeout(function newLetter() {
    getNewLetter();
    timerId = setTimeout(newLetter, minTimeFrequencyAppearance
        + getRandomArbitrary(0, maxTimeWindow - minTimeFrequencyAppearance));
}, 1000);

function checkAll() {
    let checkAllBox = document.querySelector('#check-all-letters');
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    checkBoxes.forEach(
        checkBox => {
            checkBox.checked = checkAllBox.checked;
        }
    );
}

function uncheckAllChecker(currentCheckBox) {
    if (!currentCheckBox.checked) {
        document.getElementById('check-all-letters').checked = false;
    }
}

function getReadLetter(currentReadableLetter) {
    currentReadableLetter.classList.remove('is-read_not-read');
    currentReadableLetter.classList.add('is-read');
    let needRemoveClassNode = currentReadableLetter.querySelector('.is-read-mark_not-read');
    needRemoveClassNode.classList.remove('is-read-mark_not-read');
}

function removeLetters() {
    let openedLetters = document.body.querySelectorAll('.letter-body_opened');
    for (let i = 0; i < openedLetters.length; i++) {
        if (!openedLetters[i].classList.contains('letter-body_non-displayed')) {
            return
        }
    }
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    for (let i = 1; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            let checkedLetter = checkBoxes[i];
            while (!checkedLetter.classList.contains('letters-section__letter-wrapper')) {
                checkedLetter = checkedLetter.parentNode;
            }
            checkedLetter.classList.add('letters-section__delete-letter');
            checkedLetter.addEventListener('animationend', () => {
                checkedLetter.parentNode.removeChild(checkedLetter);
            });
            letterCounterOnPage--;
        }
    }
    if (checkBoxes[0].checked) {
        checkBoxes[0].checked = false;
    }
    setTimeout( function () {
        while (letterCounterOnPage < maxLettersOnPage && stack.length > 0) {
            let lettersSection = document.querySelector('.letters-section');
            let newLetter = stack.pop();
            newLetter.classList.add('letters-section__add-letter_with_delay');
            lettersSection.appendChild(newLetter);
            newLetter.addEventListener('animationend', () => {
                newLetter.classList.remove('letters-section__add-letter_with_delay');
            });
            letterCounterOnPage++;

        }
    }, 700);

}

function hideOtherLetters(currentReadableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentReadableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.add('letter-body_non-displayed');
        } else {
            letterSection[i].querySelector('.letter-body_opened').classList.remove('letter-body_non-displayed');
            letterSection[i].querySelector('.letter-body_covered').classList.add('letter-body_non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.add('letter-body_non-displayed');
        }
    }
}

function showOtherLetters(currentClosableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentClosableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.remove('letter-body_non-displayed');
        } else {
            letterSection[i].querySelector('.letter-body_opened').classList.add('letter-body_non-displayed');
            letterSection[i].querySelector('.letter-body_covered').classList.remove('letter-body_non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.remove('letter-body_non-displayed');
        }
    }
}