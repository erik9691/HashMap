import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length());
console.log(test.buckets.length);

test.set("moon", "silver");

console.log(test.length());
console.log(test.buckets.length);

console.log(test.get("apple"));
console.log(test.has("grape"));
console.log(test.remove("dog"));
console.log(test.entries());
