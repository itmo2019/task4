import generateText from '../__text-generator/__text-generator';

class Letter {
	constructor(user, content, date) {
		this.user = user;
		this.content = content;
		this.date = date;
	}
}

class Content {
	constructor(subject, message) {
		this.subject = subject;
		this.message = message;
	}
}

class User {
	constructor(name, imageUrl) {
		this.name = name;
		this.imageUrl = imageUrl;
	}
}

export default function generateLetter() {
	return new Letter(
			randomUser(),
			new Content(
				generateText(1, 1),
				generateText(randomInt(4, 5), randomInt(5, 10))
			),
			new Date()
	);
}

function randomUser() {
	return defaultUsers[randomInt(0, defaultUsers.length)];
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const defaultUsers = [
	new User('Яндекс.Паспорт', '/img/ya.svg'),
	new User('Команда Яндекс.Почты', '/img/ya.svg'),
	new User('Ivan Ivanov', '/img/profile-image_ivan-ivanov.png'),
	new User('Вася Петров', null),
	new User('verycoolusername777', null)
];