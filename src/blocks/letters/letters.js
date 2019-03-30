import addNewLetter from './__add-new-letter/__add-new-letter';
import '../delete-letters-button/delete-letters-button';

const newMsgSock = io.connect('/new-message');
newMsgSock.on('connect', function () {
	newMsgSock.on('new-message', function(msg) {
		addNewLetter(msg, true, 'afterbegin');
	})
});
