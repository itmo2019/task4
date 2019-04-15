const router = require('express').Router();

const sender = require('./sender');
const deleter = require('./deleter');
const messagesLoader = require('./messages');
const Database = require('./database');

const db = new Database();

module.exports = function() {
	router.get('/messages', messagesLoader.all.bind({ db: db }));
	router.get('/messages/:id', messagesLoader.byId.bind({ db: db}));

	const newMsgSock = this.io.of('/new-message');
	sender.addListener(newMessageListener.bind({ socket: newMsgSock}));
	router.post('/send', sender.send);

	deleter.addListener(deleteMessagesListener);
	router.post('/delete', deleter.delete);

	router.get('/*', (req, res) => res.sendStatus(404));

	return router;
}

function newMessageListener(req) {
	let letter = req.body;
	letter = db.insert(letter);
	this.socket.emit('new-message', letter);
}

function deleteMessagesListener(req) {
	req.body.forEach(id => db.delete(id));
}