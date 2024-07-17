const arr = []
const map = new Map();

const obj1 = { id: '1', data: 1 };
const obj2 = { id: '2', data: 2 };

arr.push(obj1);
map.set(obj1.id, obj1)

arr.push(obj2);
map.set(obj2.id, obj2)

map.get('2').data = 456
console.log(arr)