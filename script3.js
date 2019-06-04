let hiddenLetter = document.getElementsByClassName("letter__hidden")[0];
let button_add = document.getElementsByClassName('menu__button_add')[0];
button_add.addEventListener("click", () => {
    let letters = document.getElementsByClassName('letter');
    let newLetter = hiddenLetter.cloneNode(true);
    document.getElementsByClassName("letters")[0].insertBefore(newLetter, hiddenLetter);
    newLetter.setAttribute("data-state", "showed");
    newLetter.addEventListener('transitionend', () => {
        newLetter.removeAttribute("data-state")
    });
});
let button_delete = document.getElementsByClassName('menu__button_delete')[0];
button_delete.addEventListener("click", () => {let letters = document.getElementsByClassName('letter');
    if (letters.length <= 2) {
        window.alert("We have only undeletable letter");
    }
    let deleteLetter = letters[letters.length - 1];
    deleteLetter.setAttribute("data-state", "deleted");
    deleteLetter.addEventListener("animationend", () => {deleteLetter.remove()});
})