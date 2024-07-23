const { makeAutoObservable } = require('mobx');

class Store {
  constructor() {
    makeAutoObservable(this);
  }
  map = new Map();
  selected = null;
  setSelected(el) {
    this.selected = el;
  }
  append(el) {
    this.map.set(el.id, el);
    this.setSelected(el);
    console.log(this.selected === el);
    console.log(this.map.get(el.id) === el);
    console.log(this.map.get(el.id) === this.selected);
  }
}

const el = { id: 'a', data: 123 };

const store = new Store();
store.append(el);
