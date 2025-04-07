export { LinkedList };

class LinkedList {
	constructor() {}

	headNode = null;
	tailNode = null;
	length = 0;

	append(key, value) {
		const newNode = new Node(key, value);

		if (this.headNode === null) {
			this.headNode = newNode;
			this.tailNode = newNode;
		} else {
			this.tailNode.nextNode = newNode;
			this.tailNode = newNode;
		}

		this.length += 1;
	}
	prepend(key, value) {
		const newNode = new Node(key, value);

		if (this.headNode === null) {
			this.headNode = newNode;
			this.tailNode = newNode;
		} else {
			newNode.nextNode = this.headNode;
			this.headNode = newNode;
		}

		this.length += 1;
	}
	size() {
		return this.length;
	}
	head() {
		return this.headNode;
	}
	tail() {
		return this.tailNode;
	}
	at(index) {
		if (index < 0) {
			throw new Error("ERROR index must be 0 or higher");
		} else if (index + 1 > this.length) {
			throw new Error("ERROR index can't be larger than list");
		} else if (index === 0) {
			return this.headNode;
		} else if (index + 1 === this.length) {
			return this.tailNode;
		} else {
			let currentNode = this.headNode;
			for (let i = 0; i < index; i++) {
				currentNode = currentNode.nextNode;
			}
			return currentNode;
		}
	}
	pop() {
		if (this.length === 1) {
			this.headNode = null;
			this.tailNode = null;
			this.length -= 1;
		} else if (this.length === 0) {
			throw new Error("Can't pop an empty list");
		} else {
			const secondToLastNode = this.at(this.length - 2);
			secondToLastNode.nextNode = null;
			this.tailNode = secondToLastNode;
			this.length -= 1;
		}
	}
	contains(key) {
		let currentNode = this.headNode;
		for (let i = 0; i < this.length; i++) {
			if (currentNode.key === key) {
				return true;
			}
			currentNode = currentNode.nextNode;
		}
		return false;
	}
	find(key) {
		let currentNode = this.headNode;
		for (let i = 0; i < this.length; i++) {
			if (currentNode.key === key) {
				return i;
			}
			currentNode = currentNode.nextNode;
		}
		return null;
	}
	toString() {
		let outputString = "";
		let currentNode = this.headNode;
		for (let i = 0; i < this.length; i++) {
			outputString += `( ${currentNode.key} ) -> `;
			currentNode = currentNode.nextNode;
		}
		outputString += "null";
		return outputString;
	}
	/*
	insertAt(value, index) {
		if (index < 0) {
			throw new Error("ERROR index must be 0 or higher");
		} else if (index + 1 > this.length) {
			throw new Error("ERROR index can't be larger than list");
		} else if (index === 0) {
			this.prepend(value);
		} else if (index + 1 === this.length) {
			this.append(value);
		} else {
			const newNode = new Node(value);
			const previousNode = this.at(index - 1);
			const nextNode = previousNode.nextNode;

			previousNode.nextNode = newNode;
			newNode.nextNode = nextNode;

			this.length += 1;
		}
	}
		*/
	removeAt(index) {
		if (index < 0) {
			throw new Error("ERROR index must be 0 or higher");
		} else if (index + 1 > this.length) {
			throw new Error("ERROR index can't be larger than list");
		} else if (index === 0) {
			if (this.length === 1) {
				this.headNode = null;
				this.tailNode = null;
			} else {
				const nextNode = this.at(index + 1);
				this.headNode = nextNode;
			}
			this.length -= 1;
		} else if (index + 1 === this.length) {
			this.pop();
		} else {
			const previousNode = this.at(index - 1);
			const nextNode = previousNode.nextNode.nextNode;

			previousNode.nextNode = nextNode;

			this.length -= 1;
		}
	}
}

class Node {
	key = null;
	value = null;
	nextNode = null;

	constructor(key, value) {
		this.key = key;
		this.value = value;
	}
}
