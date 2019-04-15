const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./server/routes');
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router.bind({ io : io })());

http.listen(8080, () => {
	console.log(`Please, open http://localhost:8080 in your browser.`);
});