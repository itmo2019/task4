const nouns = ["bird", "clock", "boy", "plastic", "duck", "teacher", "old lady", "professor", "hamster", "dog"]
const verbs = ["kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"]
const adjectives = ["beautiful", "lazy", "professional", "lovely", "dumb", "rough", "soft", "hot", "vibrating", "slimy"]
const adverbs = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "shockingly", "calmly", "passionately"]
const preposition = ["down", "into", "up", "on", "upon", "below", "above", "through", "across", "towards"]
const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
const MINUTE = 60000

function Letter (sender, text, date) {
    this.sender = sender
    this.text = text
	this.date = date
}

Letter.prototype.nextId = 0

Letter.prototype.createElement = function() {
	let el = document.getElementById("letter-template").content.cloneNode(true)
	let letterItself = el.querySelector('.letter')
	letterItself.classList.add('letter_new')
	let label = el.querySelector(".letter__label")
    label.dataset = Letter.nextId++
	label.addEventListener("click", () => {
        document.getElementById("letter-theme").textContent = this.sender
        document.getElementById("letter-text").textContent = this.text
    });
    el.querySelector(".letter__from").textContent = this.sender
    el.querySelector(".letter__date").textContent = this.date
    el.querySelector(".letter__text").textContent = this.text
    return el
}

function randomSender() {
	return nouns[Math.floor(Math.random() * 10)]
}

function randomSentence() {
    let rand1 = Math.floor(Math.random() * 10)
    let rand2 = Math.floor(Math.random() * 10)
    let rand3 = Math.floor(Math.random() * 10)
    let rand4 = Math.floor(Math.random() * 10)
    let rand5 = Math.floor(Math.random() * 10)
    let rand6 = Math.floor(Math.random() * 10)
    let s = "The " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + verbs[rand4] + " because some " + nouns[rand1] + " " + adverbs[rand1] + " " + verbs[rand1] + " " + preposition[rand1] + " a " + adjectives[rand2] + " " + nouns[rand5] + " which, became a " + adjectives[rand3] + ", " + adjectives[rand4] + " " + nouns[rand6] + "."
	return s
}

function randomDate() {
	return (Math.floor(Math.random() * 28) + 1) + " " + months[Math.floor(Math.random() * 12)] + ".";
}

function randomLetter() {
	return new Letter(randomSender(), randomSentence(), randomDate())
}

function newMail() {
	 let letterList = document.getElementById("letter-list");
	 let letter = randomLetter()
	 letterList.insertBefore(letter.createElement(), document.getElementById("special-letter").nextSibling)
	 if(letterList.childElementCount > 32) {
		letterList.lastElementChild.remove()
	 }
}

function onMasterCheckboxChanged() {
    let master = document.getElementById("checkbox-master");
    let newStatus = master.checked;
    let checkboxes = document.getElementsByClassName("letter__shadow-checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes.item(i).checked = newStatus;
    }
}

function deleteCheckedLetters() {
    let list = document.getElementsByClassName("letter__shadow-checkbox")
	for(let i = 0; i < list.length; i++) {
		let box = list.item(i)
		if(box.checked) {
			let letter = box.parentElement
			letter.addEventListener("animationend", function () {
                letter.remove();
            }, false);
            letter.classList.add("letter_removed");
		}
	}
    document.getElementById("checkbox-master").checked = false;
}

window.onload = () => {
	setTimeout(newMail, 1000)
	setInterval(() => {
		setTimeout(newMail, (10 * MINUTE) * Math.random() + 10)
	}, 5 * MINUTE)
}