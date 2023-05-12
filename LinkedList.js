class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(element) {
    // create a new Node
    var node = new Node(element);

    // store the current node
    var current;

    // if list is Empty... add the element and make it the head
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;

      // iterate till end of the list
      while (current.next) {
        current = current.next;
      }

      // add node
      current.next = node;
    }
    this.size++;
  }

  insertAt(element, index) {
    if (index < 0 || index > this.size) {
      return console.log(`Please enter a valid index.`);
    } else {
      // create a new node
      var node = new Node(element);
      var curr, prev;

      curr = this.head;

      // add element to the first index
      if (index == 0) {
        node.next = this.head;
        this.head = node;
      } else {
        curr = this.head;
        var i = 0;

        // loop through list to find index for insertion
        while (i < index) {
          i++;
          prev = curr;
          curr = curr.next;
        }

        // add an element
        node.next = curr;
        prev.next = node;
      }
      this.size++;
    }
  }

  removeFrom(index) {
    if (index < 0 || index >= this.size) {
      return console.log(`Please enter a valid idnex`);
    } else {
      var curr,
        prev,
        it = 0;
      curr = this.head;
      prev = curr;

      // deleting first element
      if (index === 0) {
        this.head = curr.next;
      } else {
        var i = 0;
        // loop thru list to index to remove the element
        while (i < index) {
          i++;
          prev = curr;
          curr = curr.next;
        }

        // remove element
        prev.next = curr.next;
      }
      this.size--;

      // return the removed element
      return curr.element;
    }
  }

  removeElement(element) {
    var current = this.head;
    var prev = null;

    // loop over list
    while (current != null) {
      // compare element with current
      // if element is found, remove it and return true
      if (current.element === element) {
        if (prev == null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current.element;
      }
      prev = current;
      current = current.next;
    }
    return -1;
  }

  /**
   * finds the index of an element
   */
  indexOf(element) {
    var count = 0;
    var current = this.head;

    // loop through the list
    while (current != null) {
      // compare each element of list with given element
      if (current.element === element) {
        return count;
      }
      count++;
      current = current.next;
    }

    // not found
    return -1;
  }

  /**
   * checks if the list is empty
   */
  isEmpty() {
    return `Is the list Empty? ${this.size == 0}`;
  }

  /**
   * gives the size of the list
   */
  getSize() {
    console.log(this.size);
  }

  /**
   * print list items
   */
  print() {
    var curr = this.head;
    var str = "";
    while (curr) {
      str += curr.element + " ";
      curr = curr.next;
    }
    console.log(str);
  }
}

// // creating an object for the
// // Linkedlist class
// var ll = new LinkedList();

// // testing isEmpty on an empty list
// // returns true
// console.log(ll.isEmpty());

// // adding element to the list
// ll.add(10);

// // prints 10
// ll.print();

// // returns 1
// console.log(ll.getSize());

// // adding more elements to the list
// ll.add(20);
// ll.add(30);
// ll.add(40);
// ll.add(50);

// // returns 10 20 30 40 50
// ll.print();

// // prints 50 from the list
// console.log("is element removed ?" + ll.removeElement(50));

// // prints 10 20 30 40
// ll.print();

// // returns 3
// console.log("Index of 40: " + ll.indexOf(40));

// // insert 60 at second position
// // ll contains 10 20 60 30 40
// ll.insertAt(60, 2);

// ll.print();

// // returns false
// ll.isEmpty();

// // remove 3rd element from the list
// console.log(ll.removeFrom(3));

// // prints 10 20 60 40
// ll.print();
