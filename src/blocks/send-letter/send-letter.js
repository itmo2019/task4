import generateLetter from './__letter-generator/__letter-generator';
import {sendMessage} from '../../lib/server-api';

export function newMail() {
	console.log(new Date());
	sendMessage(generateLetter());
}

export function newMailAuto() {
	const interval = 5 * 60 * 1000;

	const doStep = () => {
		const timePoint = Math.floor(Math.random() * interval);
		setTimeout(newMail, timePoint);
	}

	setInterval(doStep, interval)
}
