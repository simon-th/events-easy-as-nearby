const d1 = new Date();
const d2 = new Date();
d2.setDate(d1.getDate() + 7);

console.log(d1.toISOString());
console.log(d2.toISOString());

console.log(d1 < d2);
console.log(d1 > d2);