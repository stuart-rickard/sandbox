// slow but sturdy

class MyLinkedList {
  constructor() {
    this.head = 0; // zero when nothing in list
    this.length = 0;
    this.pointerCounter = 10000;
  }

  nextPointer(pointer) {
    return [this[pointer].next, pointer];
  }

  nextPointer() {
    this.pointerCounter++;
    return this.pointerCounter;
  }
}

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  // find pointer at index
  if (index >= this.length || index < 0 || !Number.isInteger(index)) return -1;

  let lookAhead = this.head;
  for (let i = 0; i < index; i++) {
    lookAhead = this[lookAhead].next;
  }
  return this[lookAhead].value;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  // create new pointer and value/next pair
  let newPoint = this.nextPointer();
  let newPair = {
    value: val,
    next: this.head,
  };
  this[newPoint] = newPair;
  // update head
  this.head = newPoint;
  // update length
  this.length++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  // create new pointer and value/next pair
  let newPoint = this.nextPointer();
  let newPair = {
    value: val,
    next: 0, // because this pair is the new tail
  };
  this[newPoint] = newPair;

  // update tail
  let lookAhead = this.head;
  let lastPointer = -1;
  while (lookAhead != 0) {
    lastPointer = lookAhead;
    lookAhead = this[lookAhead].next;
  }
  if (lastPointer != -1) {
    this[lastPointer].next = newPoint;
  } else {
    this.head = newPoint;
  }

  // update length
  this.length++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  // find pointers before and at index
  if (index > this.length) {
    console.log("addAt not valid", index);
    return;
  }

  if (index == this.length) {
    console.log("equal to length", index, val);
    this.addAtTail(val);
    return;
  }

  let lookAhead = this.head;
  let lastPointer = -1;
  for (let i = 0; i < index; i++) {
    lastPointer = lookAhead;
    lookAhead = this[lookAhead].next;
  }

  // create new pointer and value/next pair
  let newPoint = this.nextPointer();
  let newPair = {
    value: val,
    next: lookAhead,
  };
  this[newPoint] = newPair;

  // update the item before the new one
  if (lastPointer != -1) {
    this[lastPointer].next = newPoint;
  } else {
    this.head = newPoint;
  }

  // update length
  this.length++;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  // find pointers before and at index
  if (index >= this.length) return;

  let lookAhead = this.head;
  let lastPointer = -1;
  for (let i = 0; i < index; i++) {
    lastPointer = lookAhead;
    lookAhead = this[lookAhead].next;
  }

  // update the item before the deleted one
  if (lastPointer != -1) {
    this[lastPointer].next = this[lookAhead].next;
  } else {
    this.head = this[lookAhead].next;
  }

  // remove item from this
  delete this[lookAhead];

  // update length
  this.length--;
};

obj = new MyLinkedList();
obj.addAtHead(300);
obj.addAtHead(200);
obj.addAtHead(100);
console.log(obj);
console.log("-----------");
console.log(obj.get(0));
console.log(obj.get(1));
console.log(obj.get(2));
console.log(obj.get(3));
console.log(obj.get(-1));
console.log("-----------");
obj.addAtTail(400);
console.log(obj);
console.log("-----------");
obj.addAtIndex(2, 250);
console.log(obj);
console.log("-----------");
obj.deleteAtIndex(3);
obj.deleteAtIndex(0);
console.log(obj);
