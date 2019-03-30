let listeners = [];

module.exports = {
	addListener: function(listener) {
		listeners.push(listener)
	},

	send: function(req, res) {
		for (let l in listeners) listeners[l](req);
		res.send('send');
	}
}