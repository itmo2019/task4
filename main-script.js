let messageBox;
let hiddenCat;
let hiddenCatText;

window.onload = function() {
    messageBox = document.querySelector(".message-box__list");
    hiddenCat = document.querySelector(".kitten-page");
    hiddenCatText = document.querySelector(".manul-text");
    start();
};

function start() {
    setInterval(newMail, 10000);
}

function setLetter(letter, eventOnLetter){
    if(eventOnLetter.target.type !== "checkbox") {
        let content = texts[parseInt(letter.id)];
        messageBox.style.display = "none";
        hiddenCat.style.display = "block";
        hiddenCatText.innerHTML = content;
        setToRead(letter)
    }
}
function setToRead(letter) {
    let leftSide = letter.firstElementChild;
    let rightSide = letter.lastElementChild;
    let readName = leftSide.lastElementChild;
    readName.classList.remove("unread-name");
    readName.classList.add("read-name");
    let toDelete = rightSide.getElementsByClassName("unread-marker")[0];
    toDelete.remove();
    let read = rightSide.firstElementChild;
    read.classList.remove("unread");
    read.classList.add("read");
}

function closePage() {
    console.log(messageBox);
    console.log(hiddenCat);
    messageBox.style.display = "table";
    hiddenCat.style.display = "none";
}

let listOfLetters = [];

function deleteSelectedChecks() {
    let checks = document.querySelectorAll(".checkbox");
    if(checks[0].checked) {
        deleteAll(checks);
        checks[0].checked = false;
    } else {
        let counter = 0;
        for(let i = 1; i < checks.length; i++) {
            if(checks[i].checked) {
                let checkParent = checks[i];
                while(!checkParent.classList.contains("message-box__element")) {
                    checkParent = checkParent.parentElement;
                }
                deleteSingleLetter(checkParent);
                counter++;
            }
        }
        setTimeout(function() {
            console.log(counter);
            console.log(listOfLetters.length);
            console.log(listOfLetters[0]);
            console.log(listOfLetters[0].firstElementChild.firstElementChild);
            while(listOfLetters.length > 0 && counter !== 0) {
                let list = document.querySelector(".message-box__list");
                let letterToGetBack = listOfLetters.pop();
                let toAdd = document.createElement('li');
                toAdd.classList.add("message-box__element");
                toAdd.innerHTML = letterToGetBack.innerHTML;
                toAdd.classList.add("message-box__list-add");
                toAdd.addEventListener("animationend", () => {
                    toAdd.classList.remove("message-box__list-add");
                });
                list.appendChild(toAdd);
                counter--;
            }
        }, 1000);

    }
}

function deleteSingleLetter(toDelete) {
    toDelete.classList.add("message-box__list-delete");
    toDelete.addEventListener("animationend", () => {
        toDelete.remove();
    });
}

function deleteAll(checks) {
    for(let i = 1; i < checks.length; i++) {
        let checkParent = checks[i];
        while(!checkParent.classList.contains("message-box__element")) {
            checkParent = checkParent.parentNode;
        }
        deleteSingleLetter(checkParent);
        listOfLetters = [];
    }
}

function addNewMessage() {
    let list = document.querySelector(".message-box__list");
    let node = document.createElement('li');
    node.className = "message-box__element";
    node.innerHTML = templateLetter;
    node.id = "" + Math.round(Math.random() * (texts.length - 1));
    node.onclick = () => {
        setLetter(node, event);
    };
    node.classList.add("message-box__list-add");
    list.insertBefore(node, list.firstElementChild);
    node.addEventListener("animationend", () => {
        node.classList.remove("message-box__list-add");
    });
}

function newMail() {
    let letter = generateLetter();
    let viewedLetters = document.querySelectorAll(".message-box__element");
    if(viewedLetters.length >= 10) {
        let movedLetter = viewedLetters[9];
        listOfLetters.push(movedLetter);
        deleteSingleLetter(movedLetter);
    }
    let ul = document.querySelector(".message-box__list");
    letter.classList.add("message-box__list-add");
    ul.insertBefore(letter, ul.firstElementChild);
    letter.addEventListener("animationend", () => {
        letter.classList.remove("message-box__list-add");
    });
}

function generateLetter() {
    let leftSide = generateLeftSide();
    let rightSide = generateRightSide();
    let commonDiv = document.createElement('li');
    commonDiv.classList.add("message-box__element");
    commonDiv.appendChild(leftSide);
    commonDiv.appendChild(rightSide);
    commonDiv.id = "" + Math.round(Math.random() * (texts.length - 1));
    commonDiv.onclick = () => {
        setLetter(commonDiv, event);
    };
    return commonDiv;
}

function generateLeftSide() {
    let common = document.createElement('div');
    common.className = "message-box__element-left-side";
    let checkbox = document.createElement('input');
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    let yaimg = document.createElement('img');
    yaimg.src = "yaimg.png";
    yaimg.className = "img2";
    let title = document.createElement('div');
    title.classList.add("unread-name");
    title.innerText = names[Math.round(Math.random() * (names.length - 1))];
    common.appendChild(checkbox);
    common.appendChild(yaimg);
    common.appendChild(title);
    return common;
}

function generateRightSide() {
    let common = document.createElement('div');
    common.className = "message-box__element-right-side";
    let circle = document.createElement('div');
    circle.classList.add("unread-marker");
    let date = document.createElement('div');
    date.innerText = (Math.round(Math.random() * 30) + 1) + " " + month[Math.round(Math.random() * 11)];
    date.classList.add("date");
    let titleRead = document.createElement('div');
    titleRead.classList.add("unread");
    titleRead.innerText = phrases[Math.round(Math.random() * (phrases.length - 1))];
    common.appendChild(circle);
    common.appendChild(titleRead);
    common.appendChild(date);
    return common;
}
