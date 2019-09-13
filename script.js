function addLetter(letter) {
    var letters = document.getElementsByClassName("letter");
    if (letters.length === 30) {
        var hiddenletters = document.getElementsByClassName("letter_hidden");
        hiddenletters[0].parentElement.insertBefore(letters[29], hiddenletters[0]);
        letters[29].style.block = none;
        letters[29].className = "letter_hidden"
    }
    letters[0].parentElement.insertBefore(letter, letters[0])
}

const pairs = new Map([["END", new Map([["START", 1.0]])],
    ["START", new Map([["шарлотта", 0.072], ["ее", 0.072], ["он", 0.072], ["для", 0.072], ["патрик", 0.072], ["там", 0.072], ["после", 0.072], ["детишки", 0.072], ["соседи", 0.072], ["семья", 0.072], ["фанатичный", 0.072], ["дело", 0.072], ["зная", 0.072], ["увидев", 0.072]])],
    ["шарлотта", new Map([["бронте", 1.0]])],
    ["бронте", new Map([["родилась", 0.2], ["ирландец", 0.2], ["изучил", 0.2], ["не", 0.2], ["бросил", 0.2]])],
    ["родилась", new Map([["в", 1.0]])],
    ["в", new Map([["1816 г", 0.2], ["семье", 0.2], ["йоркшире", 0.2], ["британии", 0.2], ["огонь", 0.2]])],
    ["1816 г", new Map([["в", 1.0]])],
    ["семье", new Map([["сельского", 1.0]])],
    ["сельского", new Map([["священника", 1.0]])],
    ["священника", new Map([["в", 1.0]])],
    ["йоркшире", new Map([["END", 1.0]])],
    ["ее", new Map([["отец", 1.0]])],
    ["отец", new Map([["Патрик", 1.0]])],
    ["патрик", new Map([["бронте", 1.0]])],
    ["ирландец", new Map([["был", 1.0]])],
    ["был", new Map([["смолоду", 0.5], ["один", 0.5]])],
    ["смолоду", new Map([["простым", 1.0]])],
    ["простым", new Map([["ткачом", 1.0]])],
    ["ткачом", new Map([["END", 1.0]])],
    ["он", new Map([["обладал", 0.5], ["отвергал", 0.5]])],
    ["обладал", new Map([["редкими", 1.0]])],
    ["редкими", new Map([["способностями", 1.0]])],
    ["способностями", new Map([["и", 1.0]])],
    ["и", new Map([["трудолюбием", 0.25], ["родились", 0.25], ["сын", 0.25], ["суровый", 0.25]])],
    ["трудолюбием", new Map([["мечтал", 1.0]])],
    ["мечтал", new Map([["учиться", 1.0]])],
    ["учиться", new Map([["END", 1.0]])],
    ["для", new Map([["простого", 1.0]])],
    ["простого", new Map([["человека", 1.0]])],
    ["человека", new Map([["решившего", 1.0]])],
    ["решившего", new Map([["овладеть", 1.0]])],
    ["овладеть", new Map([["знаниями", 1.0]])],
    ["знаниями", new Map([["в", 1.0]])],
    ["британии", new Map([["того", 1.0]])],
    ["того", new Map([["времнени", 1.0]])],
    ["времени", new Map([["был", 1.0]])],
    ["один", new Map([["путь", 1.0]])],
    ["путь", new Map([["стать", 1.0]])],
    ["стать", new Map([["священником", 1.0]])],
    ["священником", new Map([["END", 1.0]])],
    ["изучил", new Map([["богословие", 1.0]])],
    ["богословие", new Map([["женился", 1.0]])],
    ["женился", new Map([["получил", 1.0]])],
    ["получил", new Map([["церковный", 1.0]])],
    ["приход", new Map([["на", 1.0]])],
    ["на", new Map([["севере", 0.334], ["попечении", 0.334], ["милостыню", 0.334]])],
    ["севере", new Map([["англии", 1.0]])],
    ["англии", new Map([["возле", 1.0]])],
    ["возле", new Map([["промышленного", 1.0]])],
    ["промышленного", new Map([["города", 1.0]])],
    ["города", new Map([["лидса", 1.0]])],
    ["лидса", new Map([["END", 1.0]])],
    ["там", new Map([["и", 1.0]])],
    ["родились", new Map([["его", 1.0]])],
    ["его", new Map([["дети", 1.0]])],
    ["дети", new Map([["пять", 1.0]])],
    ["пять", new Map([["дочерей", 1.0]])],
    ["дочерей", new Map([["и", 1.0]])],
    ["сын", new Map([["END", 1.0]])],
    ["После", new Map([["рождения", 1.0]])],
    ["рождения", new Map([["младшей", 1.0]])],
    ["младшей", new Map([["анны", 1.0]])],
    ["анны", new Map([["умерла", 1.0]])],
    ["умерла", new Map([["мать", 1.0]])],
    ["мать", new Map([["END", 1.0]])],
    ["детишки", new Map([["остались", 1.0]])],
    ["остались", new Map([["на", 1.0]])],
    ["попечении", new Map([["старой", 1.0]])],
    ["старой", new Map([["служанки", 1.0]])],
    ["служанки", new Map([["END", 1.0]])],
    ["соседи", new Map([["не", 0.5], ["купили", 0.5]])],
    ["не", new Map([["могли", 0.5], ["принимал", 0.5]])],
    ["могли", new Map([["без", 1.0]])],
    ["без", new Map([["слез", 1.0]])],
    ["смотреть", new Map([["как", 1.0]])],
    ["как", new Map([["они", 1.0]])],
    ["они", new Map([["гуляют", 1.0]])],
    ["гуляют", new Map([["по", 1.0]])],
    ["по", new Map([["окрестным", 1.0]])],
    ["окрестным", new Map([["вересковым", 1.0]])],
    ["вересковым", new Map([["полям", 1.0]])],
    ["полям", new Map([["держась", 1.0]])],
    ["держась", new Map([["за", 1.0]])],
    ["за", new Map([["руки", 1.0]])],
    ["руки", new Map([["попарно", 1.0]])],
    ["попарно", new Map([["под", 1.0]])],
    ["под", new Map([["присмотром", 1.0]])],
    ["присмотром", new Map([["старшей", 1.0]])],
    ["старшей", new Map([["десятилетней", 1.0]])],
    ["десятилетней", new Map([["END", 1.0]])],
    ["семья", new Map([["была", 1.0]])],
    ["была", new Map([["очень", 1.0]])],
    ["очень", new Map([["бедна", 1.0]])],
    ["бедна", new Map([["но", 1.0]])],
    ["но", new Map([["патрик", 1.0]])],
    ["принимал", new Map([["ни", 1.0]])],
    ["ни", new Map([["от", 1.0]])],
    ["от", new Map([["кого", 1.0]])],
    ["кого", new Map([["помощи", 1.0]])],
    ["помощи", new Map([["END", 1.0]])],
    ["фанатичный", new Map([["и", 1.0]])],
    ["суровый", new Map([["он", 1.0]])],
    ["отвергал", new Map([["подарки", 1.0]])],
    ["подарки", new Map([["похожие", 1.0]])],
    ["похожие", new Map([["на", 1.0]])],
    ["милостыню", new Map([["END", 1.0]])],
    ["дело", new Map([["доходило", 1.0]])],
    ["доходило", new Map([["до", 1.0]])],
    ["до", new Map([["курьезов", 1.0]])],
    ["курьезов", new Map([["END", 1.0]])],
    ["зная", new Map([["что", 1.0]])],
    ["что", new Map([["у", 1.0]])],
    ["у", new Map([["детей", 1.0]])],
    ["детей", new Map([["нет", 1.0]])],
    ["нет", new Map([["крепкой", 1.0]])],
    ["крепкой", new Map([["обуви", 1.0]])],
    ["обуви", new Map([["богатые", 1.0]])],
    ["богатые", new Map([["соседи", 1.0]])],
    ["купили", new Map([["им", 1.0]])],
    ["им", new Map([["башмаки", 1.0]])],
    ["башмаки", new Map([["END", 1.0]])],
    ["увидев", new Map([["перед", 1.0]])],
    ["перед", new Map([["камином", 1.0]])],
    ["камином", new Map([["шесть", 1.0]])],
    ["шесть", new Map([["пар", 1.0]])],
    ["пар", new Map([["новых", 1.0]])],
    ["новых", new Map([["башмачков", 1.0]])],
    ["башмачков", new Map([["патрик", 1.0]])],
    ["бросил", new Map([["их", 1.0]])],
    ["их", new Map([["в", 1.0]])],
    ["огонь", new Map([["END", 1.0]])]]);

function generateText() {
    let i = 0;
    let s = "";
    let current = "START";
    while (i < 4) {
        let k = Math.random();
        let pair = pairs.get(current);
        let sum = 0;
        let next = "END";
        for (let [key, value] of pair.entries()) {
            if (k < value + sum) {
                next = key;
                break;
            }
            sum += value;
        }
        if (next === "END") {
            s += ". ";
            i++;
        } else if (current === "START") {
            s += next;
        } else {
            s += " " + next;
        }
    }
    return s
}

function getFirstSentence(text) {
    let s = "";
    let i = 0;
    while (text[i] !== '.') {
        s += text[i];
        i++
    }
    return s
}

function generateLetter() {
    let firstletter = document.getElementsByClassName("letters")[0].firstChild;
    let letter = firstletter.cloneNode(true);
    let text = letter.children[6];
    text.innerHTML = generateText();
    let theme = letter.children[4].firstChild;
    theme.innerHTML = getFirstSentence(text.innerHTML);
    return letter
}

function deleteLetters() {
    let letters = document.getElementsByClassName("letters");
    let letter = letters[0].children;
    let i = 0;
    while (i < letter.length) {
        let check = letter[i].getElementsByTagName("input");
        if (check.length > 0) {
            if (check[0].checked) {
                letters[0].removeChild(letter[i])
            } else {
                i++;
            }
        } else {
            i++;
        }
    }
}

let actions = document.getElementsByClassName("action");
let remove;
for (let i = 0; i < actions.length; i++) {
    let childr = actions[i].childNodes;
    let has = false;
    if (childr !== undefined) {
        for (let j = 0; j < childr.length; j++) {
            if (childr[j].classList.contains("action__remove")) {
                has = true
            }
        }
    }
    if (has) {
        remove = actions[i];
        break
    }
}
remove.addEventListener("click", deleteLetters);