module.exports = {
	all: function(req, res) {
		res.send(JSON.stringify(this.db.takeLast(30)));
	},

	byId: function(req, res) {
		const id = req.params.id;
		const letter = this.db.update(id, letter => {
			const newLetter = letter;
			newLetter.read = true;
			return newLetter;
		});

		res.send(JSON.stringify(letter))
	}
}