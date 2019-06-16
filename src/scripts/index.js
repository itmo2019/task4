const root = document.getElementById('mail');

const LETTER_ON_PAGE = 15;

let last_id = -1;
let letters_num = 0;

let store = [];

function newMail() {
    let mail = new Letter();
    last_id += 1;
    mail.id = "" + last_id;

    fetch('https://randomuser.me/api/')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            mail.sender = new Sender(
                capitalize(data.results[0].name.first) + ' ' + capitalize(data.results[0].name.last),
                data.results[0].email,
                data.results[0].picture.large
            )
            return fetch('https://api.adviceslip.com/advice');
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            mail.data = data.slip.advice;
            mail.topic = mail.data;
            store.push(mail);
            addItem(mail);
        });
}

global.newMail = newMail;

function addItem(data) {
    let item = generateLetter(data);
    item.classList.add('letter_new');
    if (letters_num === LETTER_ON_PAGE) {
        root.lastChild.remove();
        letters_num -= 1;
    }
    letters_num += 1;
    root.insertAdjacentElement('afterbegin', item);
    setTimeout(function () {
        item.classList.remove('letter_new');
    }, 50);
}


function capitalize(st) {
    return st.charAt(0).toUpperCase() + st.slice(1);
}


class Sender {
    constructor(name, email, avatar) {
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }
}

class Letter {
    constructor(id, sender, topic, message, date, unread) {
        this.id = id;
        this.sender = sender;
        this.topic = topic;
        this.message = message;

        if (!date) {
            let today = new Date();

            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = String(today.getFullYear() % 100).padStart(2, '0');

            this.date = dd + '.' + mm + '.' + yyyy;
        } else {
            this.date = date;
        }

        this.unread = unread ? unread : true;
    }
}

const template = document.getElementById('tmpl');

function generateLetter(letter) {
    let item = template.content.firstChild.cloneNode(true);
    if (letter.unread) {
        item.classList.add('letter_unread');
    }

    let id = "msg" + letter.id;
    item.querySelector(".checkbox").id = "check" + letter.id;
    item.querySelector(".letter__message-label").id = id;
    item.querySelector(".message__close-box-wrapper").htmlFor = id;
    item.querySelector(".letter__opening-label").htmlFor = id;

    item.querySelector(".message__inner").innerHTML = letter.data;
    item.querySelector(".icon__char").innerText = letter.sender.name[0].toUpperCase();
    if (letter.sender.avatar) {
        item.querySelector(".icon__image").style = `background-image: url(${letter.sender.avatar});`
    }
    item.querySelector(".letter__sender").innerText = letter.sender.name;
    item.querySelector(".letter__topic").innerHTML = letter.topic;
    item.querySelector(".letter__date").innerText = letter.date;

    return item;
}


function prepareMail() {
    fetch('/data/mail.json')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            store = data;
            console.log(store);
            for (l of store) {
                last_id = Math.max(last_id, parseInt(l.id, 10));
            }
            console.log(data);
            letters_num = Math.min(store.length, LETTER_ON_PAGE);
            root.append(...(store.slice(Math.max(0, store.length - LETTER_ON_PAGE), store.length).map(generateLetter).reverse()));
            newMail();
        });
}

prepareMail();

document.getElementById('open-incoming').addEventListener("click", newMail);
const remove_button = document.getElementById('remove-button');

remove_button.addEventListener("click", function () {
    const checked = Array.from(root.querySelectorAll(".checkbox")).filter(c => c.checked);
    const checked_id = new Set(checked.map(e => e.id.slice(5)));
    store = store.filter(letter => !checked_id.has(letter.id));
    for (c of checked) {
        let parent = c.parentNode.parentNode.parentNode;
        parent.classList.add('letter_removed');
        letters_num -= 1;
        setTimeout(function () {
            parent.remove();
            if (store.length > letters_num && letters_num < LETTER_ON_PAGE) {
                letters_num += 1;
                root.insertAdjacentElement('beforeend', generateLetter(store[store.length - letters_num]));
            }
        }, 350);
    }
    setTimeout(function () {
        checkall.checked = false;
    }, 350);
});


document.getElementById('checkall').addEventListener("click", () =>
    root.querySelectorAll(".checkbox").forEach(l => l.checked = checkall.checked)
);


let prevTime = 0;
function timeoutRecieve() {
    setTimeout(function () {
        newMail();
        timeoutRecieve();
    }, Math.trunc((Math.random() + 1) * 5 * 60 * 1000));
}
