const map = new Map();
const obj = [
  { id: '1', data: 1 },
  { id: '2', data: 2 },
];

obj.forEach((item) => map.set(item.id, item));

const item = map.get('1');
item.data = 3;
console.log(obj[0] === item);
