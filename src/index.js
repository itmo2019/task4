import {newMail, newMailAuto} from './blocks/send-letter/send-letter';
import './blocks/letters/letters';
import './blocks/actions/__checkbox/__checkbox';
import addNewLetter from './blocks/letters/__add-new-letter/__add-new-letter';
import * as http from './lib/http';
import {loadMessages} from './lib/server-api';

window.newMail = newMail;
window.newMailAuto = newMailAuto;

newMailAuto();

loadMessages(function(responseText) {
	JSON.parse(responseText).forEach(letter => addNewLetter(letter, false, 'afterbegin'));
});