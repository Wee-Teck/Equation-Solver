export default class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  // Add element to top of stack
  push(element) {
    this.items[this.count] = element;
    console.log(`${element} added to ${this.count}`);
    this.count++;
    return this.count - 1;
  }

  // Return and remove top element in stack
  // Return null if stack is empty
  pop() {
    if (this.count == 0) return null;
    let deleteItem = this.items[this.count - 1];
    this.count--;
    console.log(`${deleteItem} removed`);
    return deleteItem;
  }

  // Check top element in stack w/o removing it
  peek() {
    console.log(`Top element is ${this.items[this.count - 1]}`);
    return this.items[this.count - 1];
  }

  // Check if stack is empty
  isEmpty() {
    console.log(this.count == 0 ? "Stack is empty" : "Stack is NOT empty");
    return this.count == 0;
  }

  // Check size of stack
  size() {
    console.log(`${this.count} elements in stack`);
    return this.count;
  }

  // Print elements in stack
  print() {
    let str = "";
    for (let i = 0; i < this.count; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }

  // Clear stack
  clear() {
    this.items = [];
    this.count = 0;
    console.log(`Stack cleared..`);
    return this.items;
  }
}

// const stack = new Stack();

// // Adding element to the stack
// stack.push(10);
// stack.push(20);
// stack.push(30);
  
// // Printing the stack element
// // prints [10, 20, 30]
// console.log(stack.print());
  
// // returns 30
// console.log(stack.peek());
  
// // returns 30 and remove it from stack
// console.log(stack.pop());
  
// // returns [10, 20]
// console.log(stack.print()); 