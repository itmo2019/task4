module.exports = class Database {
	constructor() {
		this.elems = [];
		this.counter = 0;
	}

	insert(letter) {
		letter.id = (this.counter++).toString();
		letter.read = false;

		this.elems.push(letter);
		return letter;
	}

	delete(id) {
		const pos = this.elems.findIndex(elem => elem.id === id);
		this.elems.splice(pos, 1);
	}

	find(id) {
		for (let i in this.elems) {
			if (id === this.elems[i].id) {
				return this.elems[i];
			}
		}
	}

	update(id, upd) {
		for (let i in this.elems) {
			if (id === this.elems[i].id) {
				this.elems[i] = upd(this.elems[i]);
				return this.elems[i];
			}
		}
	}

	takeLast(n) {
		return this.elems.slice(Math.max(0, this.elems.length - n));
	}
}