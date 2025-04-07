import { LinkedList } from "./linked-list.js";

class HashMap {
	constructor(capacity) {
		this.buckets = new Array(capacity);
		for (let i = 0; i < capacity; i++) {
			this.buckets[i] = new LinkedList();
		}
	}

	loadFactor = 0.8;

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
	}
}

const hashmap = new HashMap(16);

//console.log(hashmap.hash("jessica"));
hashmap.set("jessica", "USA");
console.log(hashmap.buckets[12]);
hashmap.set("jessica", "Canada");
console.log(hashmap.buckets[12]);
