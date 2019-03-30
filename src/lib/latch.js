export default class Latch {

	constructor(count, callback) {
		this.curCount = count;
		this.callback = callback;
	}

	countDown() {
		this.curCount--;
		if (this.curCount === 0) {
			this.callback();
		}
	}
}