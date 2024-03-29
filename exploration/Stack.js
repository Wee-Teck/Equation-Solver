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

// Creates a stack
export default class Stack {
  constructor() {
    this.items = [];
  }

  // Adds a new item (or several items) to the top of the stack
  push(item) {
    this.items.push(item);
  }

  // Removes the top item from the stack
  // Returns the removed item
  pop() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items.pop();
  }

  // Returns the top item from the stack
  // The stack is not modified (it does not remove the item; it only returns the element for information purposes)
  peek() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Returns true if the stack does not contain any elements, and false if the size of the stack is bigger than 0
  isEmpty() {
    return this.items.length === 0;
  }

  // Returns the number of elements that the stack contains. It is similar to the length property of an array.
  size() {
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
