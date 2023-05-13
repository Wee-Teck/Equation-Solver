class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length == 0;
  }

  getSize() {
    return this.length;
  }

  /**
   * - takes in a value
   * - assigns it as the tail of the list
   */
  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.lengh++;
    return this;
  }

  /**
   * - removes tail of the list
   */
  pop() {
    if (!this.head) return undefined;
    const current = this.head;
    const newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.lengh === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  /**
   * - removes the head from the list
   */
  shift() {
    if (!this.head) return undefined;
    var currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }

  /**
   * - takes in a value as parameter
   * - assigns given value as head of linkedList
   */
  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    }
    node.next = this.head;
    this.head = node;
    this.length++;
    return this;
  }

  /**
   * - takes in an index as parameter
   * - returns value of the node at index
   */
  get(index) {
    if (index < 0 || index >= this.length) return null;
    const counter = 0;
    const current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }

  /**
   * - takes in an index and value
   * - modifies the node value at the given index in the linked list
   */
  set(index, val) {
    const node = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  /**
   * - takes in an index and value
   * - inserts the value at the given index in the linked list
   */
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);

    const node = new Node(val);
    const prev = this.get(index - 1);
    const temp = prev.next;
    prev.next = node;
    node.next = temp;
    this.length++;
    return true;
  }

  /**
   * - takes in an index
   * - removes node at the given index in the linked list
   */
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const prevNode = this.get(index - 1);
    const removed = prevNode.next;
    prevNode.next = removed.next;
    this.length--;
    return removed;
  }

  /**
   * - reverses the list and all pointers
   * - head becomes the tail and tail becomes the head
   */
  reverse() {
    const node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    const prev = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }

  print() {
    if (this.isEmpty()) {
      console.log("List is empty!");
    } else {
      var curr = this.head; // current pointer starts at head
      var listValues = "";

      while (curr != null) {
        listValues += `${curr.value} `; // add value of node to values list
        curr = curr.next; // point current pointer to next node
      }
      console.log(listValues);
    }
  }
}

const list = new LinkedList();
console.log('list if empty', list.isEmpty());
console.log('list size', list.getSize());

list.insert(0, 10);
list.print();