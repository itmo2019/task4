let listeners = [];

module.exports = {
	addListener: function(listener) {
		listeners.push(listener);
	},

	delete: function(req, res) {
		for (let l in listeners) listeners[l](req);
		res.send('delete');
	}
}

exports.delete = (req, res) => {
	res.send('Delete')
}