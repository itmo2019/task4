const router = require('express').Router();

const messagesLoader = require('./messages');
const Database = require('./database');

const db = new Database();

module.exports = function() {
	router.get('/messages', messagesLoader.all.bind({ db: db }));
	router.get('/messages/:id', messagesLoader.byId.bind({ db: db}));

	router.post('/send', receiveMessage(this.io.of('/new-message')));
	router.post('/delete', deleteMessages);

	router.get('/*', (req, res) => res.sendStatus(404));

	return router;
}

function receiveMessage(socket) {
	return (req, res) => {
		let letter = req.body;
		letter = db.insert(letter);
		socket.emit('new-message', letter);
		res.send();
	}
}

function deleteMessages(req, res) {
	req.body.forEach(id => db.delete(id));
	res.send();
}