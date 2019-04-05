const messages = []
const MAX_MESSAGES = 30

const MAX_MESSAGE_TIMEOUT = 600000
const MIN_MESSAGE_TIMEOUT = 10
const MESSAGE_FREQUENCY_TIMEOUT = 300000

var firstMessageTime
var secondMessageTime

window.onload = function () {
	var to = getRandomFromRange(MIN_MESSAGE_TIMEOUT, MAX_MESSAGE_TIMEOUT)
	setTimeout(sendMessage, to)
	document.querySelector('.letters__check_all_checkbox').addEventListener('click', (event) => {
		checkOrUncheckAll()
	})
	document.querySelector('.letters__option_delete').addEventListener('click', (event) => {
		deleteChecked()
	})
	document.querySelector('.letters__option_newmail').addEventListener('click', (event) => {
		newMail(false)
	})
}

function sendMessage() {
	newMail(false)
	var to = getRandomFromRange(MIN_MESSAGE_TIMEOUT, MAX_MESSAGE_TIMEOUT)
	if (firstMessageTime != undefined) {
		to = Math.max(to, MESSAGE_FREQUENCY_TIMEOUT - new Date().getTime() + firstMessageTime)
	}
	firstMessageTime = secondMessageTime
	secondMessageTime = new Date().getTime()
	setTimeout(sendMessage, to)
}

function checkOrUncheckAll() {
	var letters = document.querySelectorAll('.letters__checkbox')
	var all = document.querySelector('.letters__check_all_checkbox')
	for (var i = 0; i < letters.length; i++) {
		var letter = letters[i]
		letter.checked = all.checked
	}
}

function getRandomFromRange(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function uncheckAllCheckbox(elem) {
	if (elem.checked == false) {
		var all = document.querySelector('.letters__check_all_checkbox')
		all.checked = false
	}
}

function deleteChecked() {
	var allLetters = document.querySelectorAll('.letters__checkbox')
	var letters = document.querySelectorAll('.letters__checkbox:checked')
	var all = document.querySelector('.letters__check_all_checkbox')
	all.checked = false
	var toDelete = []
	for (var i = 0; i < letters.length; i++) {
		var letter = letters[i]
		var id = Array.prototype.indexOf.call(allLetters, letter);
		toDelete.push(id)
		letter.checked = false
		letter = letter.closest('.letters__single_letter')
		letter.classList.add('zeroOpacity')
		if (i != 0) {
			letter.addEventListener('transitionend', (event) => {
				event.target.remove()
			})
		} else {
			letter.addEventListener('transitionend', (event) => {
				event.target.remove()
				loadLetters(letters.length)
			})
		}
	}
	toDelete.sort()
	for (var i = toDelete.length - 1; i > -1; i--) {
		messages.splice(toDelete[i], 1)
	}
}

function loadLetters(num) {
	for (var i = num - 1; i > -1; i--) {
		if (messages.length > MAX_MESSAGES - 1 - i) newMail(true, messages[MAX_MESSAGES - 1 - i])
	}
}

function newMail(toEnd, msg) {
	var letters = document.querySelector('.letters__letterbox')
	var newMessage = (msg == undefined ? new Message() : msg)
	var newLetter = generateTemplate()
	fillTemplate(newLetter, newMessage)
	if (!toEnd) {
		messages.unshift(newMessage)
		newLetter.classList.add('zeroOpacity')
		var firstLetter = letters.querySelector('.letters__single_letter')
		letters.prepend(newLetter)
		if (messages.length > MAX_MESSAGES) {
			var letters = document.querySelectorAll('.letters__single_letter')
			letters[MAX_MESSAGES].remove()
		}
		var forceReflow = newLetter.offsetHeight
		newLetter.classList.remove('zeroOpacity')
	} else {
		letters.appendChild(newLetter)
	}
}

function generateTemplate() {
	var newLetter
	if ('content' in document.createElement('template')) {
		var template = document.querySelector('#letter_template')
		newLetter = document.importNode(template.content, true)
		newLetter = newLetter.querySelector('.letters__single_letter')
	} else {
		newLetter = document.createElement("div")
		newLetter.className = "letters__single_letter"
		newLetter.innerHTML = '<div class="letters__letter_element">' + 
								  '<input class="letters__checkbox" type="checkbox">' +
						  	  '</div>' + 
							  '<div class="letters__letter_element">' +
								  '<img class="ya_logo" src="https://yastatic.net/mail/socialavatars/socialavatars/v4/ya-default.svg">' +
							  '</div>' + 
							  '<div class="letters__letter_element letters__letter_header">' +
								  '<a href="#"></a>' +
							  '</div>' +
							  '<div class="letters__letter_element">' +
								  '<div class="bullet_unread"></div>' +
							  '</div>' +
							  '<div class="letters__letter_element letters__letter_header letters__letter_text">' +
								  '<a href="#"><label for="show_article" class="article_label"></label></a>' +
							  '</div>' +
							  '<div class="letters__letter_element letters__letter_date"></div>'
	}
	return newLetter
}

function fillTemplate(newLetter, newMessage) {
	var sender = newLetter.querySelector('.letters__letter_header')
	var theme = newLetter.querySelector('.letters__letter_text')
	if (newMessage.unread) {
		newLetter.classList.add('letters__unread_letter')
	}
	sender.querySelector('a').innerHTML = newMessage.sender
	theme.querySelector('label').innerHTML = newMessage.theme
	newLetter.querySelector('.letters__letter_date').innerHTML = newMessage.date
	newLetter.querySelector('.article_label').addEventListener('click', (event) => {
		removeHighlight(event.target)
		updateArticle(event.target)
	})
	newLetter.querySelector('.letters__checkbox').addEventListener('click', (event) => {
		uncheckAllCheckbox(event.target)
	})
}

function removeHighlight(elem) {
	var allLetters = document.querySelectorAll('.letters__single_letter')
	elem = elem.closest('.letters__single_letter')
	var id = Array.prototype.indexOf.call(allLetters, elem);
	messages[id].unread = false;
	elem.classList.remove('letters__unread_letter')
}

function updateArticle(elem) {
	var allLetters = document.querySelectorAll('.letters__single_letter')
	while (!elem.classList.contains('letters__single_letter')) {
		elem = elem.parentElement
	}
	var id = Array.prototype.indexOf.call(allLetters, elem);
	var msg = messages[id]
	document.querySelector('.article__text').innerHTML = '<p>От: ' + msg.sender + '<br>Сообщение: ' + msg.text + '</p>'
}

class Message {
	constructor(sender, theme, text) {
		this.sender = this.getRandomSender()
		this.theme = this.getRandomTheme()
		this.text = this.theme + ' ' + this.getRandomText()
		this.unread = true
		this.date = new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'})
	}

	getRandomSender() {
		var subjects=['I','You','Bob','John','Sue','Kate','The lizard people']
		return subjects[Math.round(Math.random()*(subjects.length-1))]
	}

	getRandomTheme() {
		return this.getRandomSentence()
	}

	getRandomText() {
		var numSentences = Math.round(Math.random() * 10)
		var res = ""
		for (var i = 0; i < numSentences; i++) res += this.getRandomSentence() + ' '
		return res
	}

	getRandomSentence() { // source: http://pastehtml.com/view/1c0gckz.html
		var subjects=['I','You','Bob','John','Sue','Kate','The lizard people']
		var verbs=['will search for','will get','will find','attained','found','will start interacting with','will accept','accepted']
		var objects=['Billy','an apple','a Triforce','the treasure','a sheet of paper']
		var endings=['.',', right?','.',', like I said.','.',', just like your momma!']
		return subjects[Math.round(Math.random()*(subjects.length-1))]+' '+verbs[Math.round(Math.random()*(verbs.length-1))]+' '
		+objects[Math.round(Math.random()*(objects.length-1))]+endings[Math.round(Math.random()*(endings.length-1))]
	}

}