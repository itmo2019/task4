import {getMessage} from '../../../lib/server-api';

export default function addNewLetter(letter, withAnimation, position) {
    document.querySelector('.letters__list').insertAdjacentElement(position, createNewLetterElement(letter, withAnimation));

    document.querySelector('.actions__checkbox').disabled = false;

    const letters = Array.from(document.querySelectorAll('.letter'));
    for (let i = 30; i < letters.length; i++) letters[i].remove();
};

function createNewLetterElement(letterContent, withAnimation) {
    var letter = createLetterFromTemplate(letterContent);

    if (withAnimation) triggerAnimation(letter);

    return letter;
}

function createLetterFromTemplate(letter) {
    const template = document.getElementById('new-letter-template');
    const letterElement = document.importNode(template.content, true).firstElementChild;
    
    letterElement.dataset.id = letter.id;
    letterElement.querySelector('.profile-name').textContent = letter.user.name;
    letterElement.querySelector('.content-preview').textContent = letter.content.subject;

    const profileImageStyle = generateProfileImageStyle(letter.user);
    const profileImageElement = letterElement.querySelector('.profile-image');
    profileImageElement.textContent = profileImageStyle.text;
    profileImageElement.setAttribute("style", profileImageStyle.style);

    const date = new Date(letter.date);
    const dateElement = letterElement.querySelector('.date');
    dateElement.textContent = getRuDate(date);
    dateElement.setAttribute("datetime", getDatetime(date));

    if (letter.read === false) letterElement.classList.add('letter_unread');

    addListeners(letterElement);

    return letterElement;
}

function addListeners(letter) {
    addCheckboxListener(letter);
    addLinkListener(letter);
}

function addCheckboxListener(letter) {
    letter.querySelector('.letter__checkbox').addEventListener('click', event => event.stopPropagation());
    letter.querySelector('.checkbox__checkbox-view').addEventListener('click', event => event.stopPropagation())

    letter.querySelector('.letter__checkbox').addEventListener('change', event => {
        Array.from(document.querySelectorAll('.actions__button')).forEach(button => {
            const atLeastOneChecked = Array
                .from(document.querySelectorAll('.letter__checkbox'))
                .some(checkbox => checkbox.checked);

            if (atLeastOneChecked) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }

            if (!event.target.checked) {
                document.querySelector('.actions__checkbox').checked = false;
            }
        })

        letter.classList.toggle('letter_active');
    });
}

function addLinkListener(letter) {
    const link = letter.querySelector('.letter__link');
    link.onclick = () => {
        getMessage(letter.dataset.id, function(responseText) {
            showContent(JSON.parse(responseText));
        });
    };
}

function showContent(content) {
    console.log(content)
    const messageContent = createMessageContent(content);
    const lettersList = document.querySelector('.letters__list');

    disableCheckboxes();

    lettersList.style.display = 'none';
    lettersList.insertAdjacentElement('afterend', messageContent);
}

function disableCheckboxes() {
    Array.from(document.querySelectorAll('.letter__checkbox')).forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        }
    });

    document.querySelector('.actions__checkbox').disabled = true;
}

function createMessageContent(content) {
    const template = document.getElementById('message-content-template');
    const contentElement = document.importNode(template.content, true).firstElementChild;
    
    contentElement.querySelector('.message-content__subject').textContent = content.content.subject;
    contentElement.querySelector('.message-content__profile-name').textContent = content.user.name;
    contentElement.querySelector('.message-content__content').textContent = content.content.message;

    const profileImageStyle = generateProfileImageStyle(content.user);
    const profileImageElement = contentElement.querySelector('.message-content__profile-image');
    profileImageElement.textContent = profileImageStyle.text;
    profileImageElement.setAttribute("style", profileImageStyle.style);

    const date = new Date(content.date);
    const dateElement = contentElement.querySelector('.message-content__date');
    dateElement.textContent = getRuDate(date);
    dateElement.setAttribute("datetime", getDatetime(date));

    return contentElement;    
}

function triggerAnimation(letter) {
    letter.addEventListener("animationend", function() {
        letter.classList.remove('letter_new');
        letter.removeEventListener("animationend", this);
    });

    letter.classList.add('letter_new');
}

function generateProfileImageStyle(user) {
    if (user.imageUrl) {
        return {
            style: `background-image: url('${user.imageUrl}');`,
            text: ''
        }
    } else {
        const nameParts = user.name.split(/\s+/).filter(s => s.length > 0);

        const text = (
            nameParts.length == 0 ? ""  : 
            nameParts.length == 1 ? nameParts[0][0] : 
            (nameParts[0][0] + nameParts[1][0])
        ).toUpperCase();
        
        return {
            style: `background-color: rgb(${randomColor().join(', ')});`,
            text: text
        }
    }    
}

function randomColor() {
    const hsvToRGB = (h, s, v) => {
        let h1 = Math.floor(h * 6),
            f = h * 6 - h1,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s);

        let rgb = 
            h1 < 1 ? [v, t, p] :
            h1 < 2 ? [q, v, p] :
            h1 < 3 ? [p, v, t] :
            h1 < 4 ? [p, q, v] :
            h1 < 5 ? [t, p, v] :
            /*else*/ [v, p, q];

        return rgb.map(c => Math.floor(c * 256));
    }

    return hsvToRGB(Math.random(), 0.4, 0.85);
}


function getDatetime(date) {
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
}

function getRuDate(date) {
    return new Intl.DateTimeFormat('ru', {day: 'numeric', month: 'short'}).format(date);
}