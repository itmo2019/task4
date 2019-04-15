import request from './http';

const host = 'http://localhost';
const port = 8080;

const Method = {
	GET : 'GET',
	POST : 'POST'
};

function resolve(path) {
	return `${host}:${port}${path}`;
}

function header(name, value) {
	return { name: name, value: value };
}

const Headers = {
	AppJson : header('Content-Type', 'application/json')
};

export function sendMessage(msg, callback) {
	request(
		Method.POST,
		resolve('/send'),
		[Headers.AppJson],
		true,
		callback
	).send(JSON.stringify(msg));
}

export function deleteMessages(ids, callback) {
	request(
		Method.POST, 
		resolve('/delete'),
		[Headers.AppJson],
		true,
		callback
	).send(JSON.stringify(ids));
}

export function loadMessages(callback) {
	request(
		Method.GET,
		resolve('/messages'),
		[Headers.AppJson],
		true,
		callback
	).send();
}

export function getMessage(id, callback) {
	request(
		Method.GET,
		resolve(`/messages/${id}`),
        [Headers.AppJson],
        true,
        callback
    ).send();
}
