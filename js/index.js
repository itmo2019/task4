let children = [];

let ctx = undefined;
const senders = ["Полиция мемов", "Яндекс.Такси", "ГоСуслуги"];
const themes = ["Запощен недопустимый мем", "До Краснодара за 55000P", "Ваша справка готова"];
const dates = ["31 тра", "29 сич", "15 лис"];


function addLetter(sender, unread, theme, date) {
    let before;
    const inbox = document.getElementById("inbox");
    const letter =
        x("div", "letter", () => {
            if (unread) {
                ctx.className += " letter_unread";
            }
            //ctx.style.setProperty("display", "none");
            children.push(x("label", "checkbox", () => {
                children.push(x("input", "checkbox__input", () => {
                    ctx.setAttribute("type", "checkbox");
                }));
            }));
            children.push(x("a", "mail-link", () => {
                ctx.attributes["href"] = "#";
                children.push(x("div", "letter__sender-icon", () => {
                    children.push(x("span", "letter__single-letter", () => sender[0]));
                }));
                children.push(x("p", "letter__sender-name single-line", () => sender));
                children.push(x("div", "letter__read-box"));
                children.push(x("p", "single-line letter__preview", () => theme));
                children.push(x("div", "letter__date gray-text", () => {
                    children.push(x("p", "single-line", () => date));
                }));
            }))
        });
    if (inbox.childNodes.length === 0) {
        before = null;
    } else {
        before = inbox.childNodes.values().next().value;
    }
    letter.style.setProperty("animation", "add_animation 0.5s");
    letter.style.setProperty("animation-fill-mode", "forwards");
    inbox.insertBefore(letter, before)
}

function deleteSelectedLetters() {
    const checked = [].filter
        .call(document.getElementsByClassName("checkbox__input"), (elem) => elem.checked)
        .filter((it) => it.id !== "checkbox_all")
        .map((doc) => parentWithClass(doc, "letter"));
    checked.forEach((parent) => {
        parent.style.setProperty("animation", "delete_animation 0.5s");
        parent.style.setProperty("animation-fill-mode", "forwards");
    });
    const inbox = document.getElementById("inbox");
    setTimeout(() => checked.forEach((elem) => inbox.removeChild(elem)), 2000)
}

function parentWithClass(element, className) {
    if (element.className.startsWith(className)) {
        return element
    } else {
        return parentWithClass(element.parentElement, className)
    }
}

function selectAll() {
    const checkBox = document.getElementById("checkbox_all");
    if (checkBox.checked) {
        [].forEach.call(document.getElementsByClassName("checkbox__input"), (elem) => { elem.checked = true })
    }
}

function addRandomLetter() {
    const date = new Date();
    const senderIndex = date.getMilliseconds() % 3;
    addLetter(senders[senderIndex], date.getSeconds() % 2 === 0, themes[senderIndex], dates[senderIndex])
}

function x(tag, style, builder) {
    const element = document.createElement(tag);
    const oldCtx = ctx;
    const oldChildren = children;
    children = [];
    ctx = element;
    element.className = style;
    if (builder !== undefined) {
        const ret = builder();
        if (ret !== undefined) {
            element.innerText = ret
        }
    }
    children.forEach((child) => element.appendChild(child));
    ctx = oldCtx;
    children = oldChildren;
    return element
}

const addNewLetterDebounced = debounce(addRandomLetter, 5 * 60 * 1000);
function addNewLetterRepeated() {
    addNewLetterDebounced();
    setTimeout(addNewLetterRepeated, new Date().getMilliseconds() % (60 * 1000))
}

addNewLetterRepeated();

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}