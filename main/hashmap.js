export { HashMap };
import { LinkedList } from "./linked-list.js";

class HashMap {
	constructor(capacity = 16) {
		this.buckets = new Array(capacity);
		for (let i = 0; i < capacity; i++) {
			this.buckets[i] = new LinkedList();
		}
	}

	loadFactor = 0.75;

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
		}

		return hashCode;
	}
	set(key, value) {
		const index = this.hash(key);

		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		} else {
			const bucket = this.buckets[index];
			const nodeIndex = bucket.find(key);
			if (nodeIndex !== null) {
				bucket.at(nodeIndex).value = value;
				console.log("UPDATED NODE");
			} else {
				bucket.prepend(key, value);
				console.log("ADDED NODE");
			}
		}

		if (this.length() > this.buckets.length * this.loadFactor) {
			this.growMap();
		}
	}
	get(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		} else {
			const bucket = this.buckets[index];
			const nodeIndex = bucket.find(key);
			if (nodeIndex !== null) {
				return bucket.at(nodeIndex).value;
			} else {
				return null;
			}
		}
	}
	has(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		} else {
			const bucket = this.buckets[index];
			return bucket.contains(key);
		}
	}
	remove(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error("Trying to access index out of bounds");
		} else {
			const bucket = this.buckets[index];
			const nodeIndex = bucket.find(key);
			if (nodeIndex !== null) {
				bucket.removeAt(nodeIndex);
				return true;
			} else {
				return false;
			}
		}
	}
	length() {
		let amount = 0;
		this.buckets.forEach((bucket) => {
			amount += bucket.length;
		});
		return amount;
	}
	clear() {
		this.buckets.forEach((bucket) => {
			bucket.removeAll();
		});
	}
	keys() {
		const keyArray = [];
		this.buckets.forEach((bucket) => {
			if (bucket.length > 0) {
				bucket.getAll().forEach((node) => {
					keyArray.push(node.key);
				});
			}
		});
		return keyArray;
	}
	values() {
		const valueArray = [];
		this.buckets.forEach((bucket) => {
			if (bucket.length > 0) {
				bucket.getAll().forEach((node) => {
					valueArray.push(node.value);
				});
			}
		});
		return valueArray;
	}
	entries() {
		const entryArray = [];
		this.buckets.forEach((bucket) => {
			if (bucket.length > 0) {
				bucket.getAll().forEach((node) => {
					entryArray.push([node.key, node.value]);
				});
			}
		});
		return entryArray;
	}
	growMap() {
		const newBuckets = new Array(this.buckets.length * 2);
		for (let i = 0; i < newBuckets.length; i++) {
			newBuckets[i] = new LinkedList();
		}
		const entries = this.entries();
		this.buckets = newBuckets;
		entries.forEach((entry) => {
			this.set(entry[0], entry[1]);
		});
	}
}
