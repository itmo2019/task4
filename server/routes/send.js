let listeners = [];

module.exports = {
	addListener: function(listener) {
		listeners.push(listener)
	},

	send: function(req, res) {
		listeners.forEach(listener => listener(req));
		res.send('send');
	}
}