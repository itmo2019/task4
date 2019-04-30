let logoMap = [["Yandex", "yandex.png"],
    ["Twitter", "twitter.png"],
    ["Skype", "skype.png"],
    ["LinkedIn", "linkedin.png"],
    ["Flickr", "flickr.png"],
    ["Facebook", "facebook.png"],
    ["Behance", "behance.png"]];

let month = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
let xhr = new XMLHttpRequest();
let out;

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getFishText(type, number) {
    let params = '&type=' + type + '&format=html' + '&number=' + number;

    xhr.open('GET', 'https://fish-text.ru/get?' + params, false);

    xhr.onload = function () {
        out = this.responseText;
    };

    xhr.send();
}

function genInput(id) {
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'content-menu__check';
    input.id = 'input' + id;
    return input;
}

function genLabelForInput(id) {
    let label = document.createElement('label');
    label.htmlFor = 'input' + id;
    label.className = 'check-view emails-list__check-view';
    label.onclick = 'uncheckAllChecker()';
    return label;
}

function genLogo(i) {
    let logo = document.createElement('div');
    logo.className = 'emails-list__logo';
    logo.style.background = 'url("logos/' + logoMap[i][1] + '") center / 100% auto no-repeat';
    return logo;
}

function genTitle(i) {
    let title = document.createElement('span');
    title.className = 'emails-list__title';
    title.innerText = logoMap[i][0];
    return title;
}

function genReadIndicator() {
    let indicator = document.createElement('div');
    indicator.className = 'emails-list__read-circle-indicator emails-list__read-circle-indicator_not-read';
    return indicator;
}

function genPreview() {
    let preview = document.createElement('span');
    preview.className = 'emails-list__preview';
    getFishText('title', 1);
    preview.innerText = out.substr(4, out.length - 9);
    return preview;
}

function genDate() {
    let date = document.createElement('span');
    date.className = 'emails-list__date';
    let generatedDate = randomDate(new Date(2012, 0, 1), new Date());
    date.innerText = generatedDate.getDate() + ' ' + month[generatedDate.getMonth()];
    return date;
}

function genEmail() {
    getFishText('paragraph', Math.floor(Math.random() * 10));
    return out;
}