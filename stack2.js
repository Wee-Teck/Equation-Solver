function Stack() {
  let stack = [];
  return {
    push: (newItem) => {
      stack = [...stack, newItem];
    },

    print: () => {
      console.log(`stack value`, stack);
    },
  };
}

const myStack = Stack();

myStack.print();
myStack.push("value1");
myStack.push("value2");
myStack.print();
