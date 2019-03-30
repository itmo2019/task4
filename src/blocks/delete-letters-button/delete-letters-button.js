import addNewLetter from '../letters/__add-new-letter/__add-new-letter';
import Latch from '../../lib/latch';
import {loadMessages, deleteMessages} from '../../lib/server-api.js';

document.querySelector('.delete-letters-button').onclick = () => {
	sendDeleteRequest();
};

function deleteLocal({ markedIds, unmarkedIds }) {
	const markedLetters = lettersByIds(markedIds);

	const latch = new Latch(markedLetters.length, () => {
		if (unmarkedIds.length == 0) document.querySelector('.actions__checkbox').disabled = true;
		loadOldMessages(unmarkedIds.length);
	});

	return (responseText) => {
		markedLetters.forEach(letter => {
			letter.addEventListener("animationstart", () => {
				const checkbox = letter.querySelector('.letter__checkbox');
				if (checkbox.checked) {
					checkbox.checked = false;
					checkbox.dispatchEvent(new Event('change'));
				}
			});

			letter.addEventListener("animationend", () => {
				letter.remove()
				latch.countDown();
			});
			
			letter.classList.add('letter_deleted');
		});
	}	
}

function sendDeleteRequest() {
	const { markedIds, unmarkedIds } = idsPartition();
	deleteMessages(markedIds, deleteLocal({ markedIds, unmarkedIds }));
}

function loadOldMessages(remainingCnt) {
	loadMessages(function(responseText) {
		let letters = JSON.parse(responseText);
		letters.splice(0, letters.length - remainingCnt).forEach(letter => 
			addNewLetter(letter, false, 'beforeend')
		);
	})
}


function allLetters() {
	return Array.from(document.querySelectorAll('.letter'));
}

function lettersBy(pred) {
	return allLetters().filter(pred);
}

function lettersByIds(ids) {
	return lettersBy(letter => ids.includes(letter.dataset.id));
}

function idsPartition() {
	const res = { markedIds: [], unmarkedIds: [] };
	allLetters().forEach(letter => {
		if (letter.querySelector('.checkbox__real-checkbox').checked) {
			res.markedIds.push(letter.dataset.id);
		} else {
			res.unmarkedIds.push(letter.dataset.id);
		}
	})
	return res;
}