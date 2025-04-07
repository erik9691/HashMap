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
}

const hashmap = new HashMap(16);

hashmap.set("Jessica", "USA");
hashmap.set("Michael", "Argentina");
hashmap.set("Erik", "France");
