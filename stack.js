// export default class Stack {
//   constructor() {
//     this.items = [];
//   }

//   /**
//    * - Add element to top of stack
//    */
//   push(element) {
//     this.items.push(element);
//   }

//   /**
//    * - Return and remove top element in stack
//    * - Return "Underflow" if stack is empty
//    */
//   pop() {
//     if (this.items.length == 0) {
//       return "Underflow";
//     }
//     return this.items.pop();
//   }

//   /**
//    * - Check top element in stack w/o removing it
//    */
//   peek() {
//     return this.items[this.items.length - 1];
//   }

//   // helper methods
//   isEmpty() {
//     return this.items.length == 0;
//   }

//   /**
//    * - Prints out items in stack
//    */
//   print() {
//     var str = "";
//     for (var i = 0; i < this.items.length; i++) {
//       str += this.items[i] + " ";
//     }
//     return str;
//   }

//   /**
//    * - Returns length of stack
//    * - Returns 0 if stack is empty
//    */
//   length() {
//     return this.items.length;
//   }
// }

// export default class Stack {
//   constructor() {
//     this.items = [];
//     this.length = 0;
//   }

//   push(item) {
//     this.items.push(item);
//     this.length++;
//   }

//   pop() {
//     this.length--;
//     return this.items.pop();
//   }

//   peek() {
//     return this.items[this.items.length - 1];
//   }

//   isEmpty() {
//     return this.items.length === 0;
//   }
// }

export default class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  length() {
    return this.items.length;
  }
}


// // creating object for stack class
// var stack = new Stack();

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
