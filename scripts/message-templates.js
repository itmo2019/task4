let senders = ['Championat.com', 'Sportbox', 'Матч ТВ', 'Eurosport'];

function getRandomSender() {
    return senders[getRandomIndex(senders.length)];
}

async function getRandomThemeAndText() {
    let responseText = await fetch("https://baconipsum.com/api/?type=meat-and-filler");
    let responseTheme = await fetch("https://baconipsum.com/api/?type=meat-and-filler&sentences=1");
    let dataText = await responseText.json();
    let dataTheme = await responseTheme.json();
    return [dataTheme[0], dataText[0]];
}

function getRandomIndex(arraySize) {
    return Math.floor(Math.random() * arraySize);
}