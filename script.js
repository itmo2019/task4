const messages = []
const MAX_MESSAGES = 30

const MAX_MESSAGE_TIMEOUT = 600000
const MIN_MESSAGE_TIMEOUT = 10

window.onload = function () {
	var to = getRandomFromRange(MIN_MESSAGE_TIMEOUT, MAX_MESSAGE_TIMEOUT)
	setTimeout(sendMessage, to)
}

function sendMessage() {
	newMail(false)
	var to = getRandomFromRange(MIN_MESSAGE_TIMEOUT, MAX_MESSAGE_TIMEOUT)
	to = Math.max(to, 300000)
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
	var newMessage
	if (msg == undefined) {
		newMessage = new Message()
	} else {
		newMessage = msg
	}
	if (!toEnd) {
		messages.unshift(newMessage)
	}
	var newLetter = undefined
	if ('content' in document.createElement('template')) {
		var template = document.querySelector('#letter_template')
		newLetter = document.importNode(template.content, true)
		newLetter = newLetter.querySelector('.letters__single_letter')
		var sender = newLetter.querySelector('.letters__letter_header')
		var theme = newLetter.querySelector('.letters__letter_text')
		if (!newMessage.unread) {
			sender.classList.remove('letters__highlighted')
			theme.classList.remove('letters__highlighted')
			var bullet = newLetter.querySelector('.bullet_unread')
			bullet.classList.remove('bullet_unread')
			bullet.classList.add('empty')
		}
		sender.querySelector('a').innerHTML = newMessage.sender
		theme.querySelector('label').innerHTML = newMessage.theme
		newLetter.querySelector('.letters__letter_date').innerHTML = newMessage.date
	} else {
		newLetter.className = "letters__single_letter"
		newLetter.innerHTML = '<div class="letters__letter_element">' + 
								  '<input class="letters__checkbox" type="checkbox" onclick="uncheckAllCheckbox(this)">' +
						  	  '</div>' + 
							  '<div class="letters__letter_element">' +
								  '<img class="ya_logo" src="https://yastatic.net/mail/socialavatars/socialavatars/v4/ya-default.svg">' +
							  '</div>' + 
							  '<div class="letters__letter_element letters__letter_header' + ((newMessage.unread) ? ' letters__highlighted' : '') + '">' +
								  '<a href="#">' + newMessage.sender + '</a>' +
							  '</div>' +
							  '<div class="letters__letter_element">' +
								  '<div class="' + ((newMessage.unread) ? 'bullet_unread' : ' empty') + '"></div>' +
							  '</div>' +
							  '<div class="letters__letter_element letters__letter_header letters__letter_text' + ((newMessage.unread) ? ' letters__highlighted' : '') + '">' +
								  '<a href="#"><label for="show_article" onclick="removeHighlight(this); updateArticle(this)">' + newMessage.theme + '</label></a>' +
							  '</div>' +
							  '<div class="letters__letter_element letters__letter_date">' + newMessage.date + '</div>'
	}
	if (!toEnd) {
		newLetter.classList.add('zeroOpacity')
		var firstLetter = letters.querySelector('.letters__single_letter')
		letters.insertBefore(newLetter, letters.childNodes[Array.prototype.indexOf.call(letters.childNodes, firstLetter)])
		if (messages.length > MAX_MESSAGES) {
			var letters = document.querySelectorAll('.letters__single_letter')
			letters[MAX_MESSAGES].remove()
		}
		var hack = newLetter.offsetHeight
		newLetter.classList.remove('zeroOpacity')
	} else {
		letters.appendChild(newLetter)
	}
}

function removeHighlight(elem) {
	var allLetters = document.querySelectorAll('.letters__single_letter')
	while (!elem.classList.contains('letters__single_letter')) {
		elem = elem.parentElement
	}
	var id = Array.prototype.indexOf.call(allLetters, elem);
	messages[id].unread = false;
	var highlighted = elem.querySelectorAll('.letters__highlighted')
	for (var i = 0; i < highlighted.length; i++) {
		highlighted[i].classList.remove('letters__highlighted')
	}
	var bullet = elem.querySelector('.bullet_unread')
	if (bullet != undefined) {
		bullet.classList.remove('bullet_unread')
		bullet.classList.add('empty')
	}
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