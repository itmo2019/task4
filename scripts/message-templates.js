let senders = ['Championat.com', 'Sportbox', 'Матч ТВ', 'Eurosport'];

let themes = ['Победа сборной России над cборной Казахстана', 'Никита Кучеров бьёт рекорды', 'Ставки на матч Голландия-Германия', 'Джеймс Харден всё ближе к MVP'];

let texts = ['Сборная Россия одеражала победу со счётом 0-4 над сборной Казахстан',
    'Нападающий клуба НХЛ Таймпа-Бэй близок уже набрал 120 очков в регулярном чемпионате и близок к рекорду Могильного(127 очков)',
    'Букмекеры отдают небольшое предпочтение хозяевам поля, коэффициент на победу которых равен 2,40, тогда как успех гостей оценивается в 2,75, а ничья — в 3,30.',
    'Игрок клуба Хьюстон Рокетс уже второй раз в сезоне набрал 61 очко и продолжает лидировать в списке снайперов НБА'];


function getRandomSender() {
    return senders[getRandomIndex(senders.length)];
}

function getRandomThemeAndText() {
    let index = getRandomIndex(themes.length);
    return [themes[index], texts[index]];
}

function getRandomIndex(arraySize) {
    return Math.floor(Math.random() * arraySize);
}