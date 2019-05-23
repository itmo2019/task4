const minTimeFrequencyAppearance = minutesToMillis(5);
const maxTimeWindow = minutesToMillis(10);
const maxLettersOnPage = 30;

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

let checkAllBox = document.querySelector('#check-all-letters');

function checkAll() {
    let checkBoxes = document.body.querySelectorAll('.check-letter_visually-hidden');
    checkBoxes.forEach(
        checkBox => {
            checkBox.checked = checkAllBox.checked;
        }
    );
}

function uncheckAllChecker(currentCheckBox) {
    if (!currentCheckBox.checked) {
        checkAllBox.checked = false;
    }
}

function getReadLetter(currentReadableLetter) {
    currentReadableLetter.classList.remove('covered-letter_not-read');
    currentReadableLetter.classList.add('covered-letter');
    let needRemoveClassNode = currentReadableLetter.querySelector('.is-read-mark_not-read');
    needRemoveClassNode.classList.remove('is-read-mark_not-read');
    needRemoveClassNode.classList.add('is-read-mark');
}

function removeLetters() {
    let openedLetters = document.body.querySelectorAll('.opened-letter');
    for (let i = 0; i < openedLetters.length; i++) {
        if (!openedLetters[i].classList.contains('non-displayed')) {
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
            checkedLetter.classList.add('letters-section_delete-letter-animation');
            checkedLetter.addEventListener('animationend', () => {
                checkedLetter.parentNode.removeChild(checkedLetter);
            });
            letterCounterOnPage--;
        }
    }
    if (checkAllBox.checked) {
        checkAllBox.checked = false;
    }
    setTimeout( function () {
        while (letterCounterOnPage < maxLettersOnPage && stack.length > 0) {
            let lettersSection = document.querySelector('.letters-section');
            let newLetter = stack.pop();
            newLetter.classList.add('letters-section_add-letter-animation');
            lettersSection.appendChild(newLetter);
            newLetter.addEventListener('animationend', () => {
                newLetter.classList.remove('letters-section_add-letter-animation');
            });
            letterCounterOnPage++;

        }
    }, 550);

}

function hideOtherLetters(currentReadableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentReadableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.add('non-displayed');
        } else {
            letterSection[i].querySelector('.opened-letter').classList.remove('non-displayed');
            letterSection[i].querySelector('.covered-letter').classList.add('non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.add('non-displayed');
        }
    }
}

function showOtherLetters(currentClosableLetter) {
    let letterSection = document.body.querySelectorAll('.letters-section__letter-wrapper');
    let wrapperCurLetter = currentClosableLetter.parentNode.parentNode;
    for (let i = 0; i < letterSection.length; i++) {
        if (letterSection[i] !== wrapperCurLetter) {
            letterSection[i].classList.remove('non-displayed');
        } else {
            letterSection[i].querySelector('.opened-letter').classList.add('non-displayed');
            letterSection[i].querySelector('.covered-letter').classList.remove('non-displayed');
            letterSection[i].querySelector('.mail-box__hr-line').classList.remove('non-displayed');
        }
    }
}