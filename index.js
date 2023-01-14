import Stack from "./Stack.js";

// Evaluation of Postfix Expression

/**
 * This method helps to evaluate the value of a postfix expresssion
 * - Takes in an expression
 * - Returns the value of the expression
 * - Time Complexity: 0(n)
 * - Linear Time Complexity
 */
function evaluatePostFix(exp) {
  // create a new stack
  var stack = new Stack();

  // Scan through all the characters one by one in the expression
  for (var i = 0; i < exp.length; i++) {
    // variable c here denotes each individual character
    var c = exp[i];

    // if the character is an operand (i.e. number)
    // it is pushed to the stack
    if (!isNaN(c)) stack.push(c - "0");
    // otherwise, if the character is an operator, we will pop two
    // elements from the stack to apply the operator
    else {
      var val1 = stack.pop();
      var val2 = stack.pop();
      if (val1 == "Underflow" || val2 == "Underflow")
        return "Can't perform postfix evaluation";
      switch (c) {
        case "+":
          stack.push(val2 + val1);
          break;

        case "-":
          stack.push(val2 - val1);
          break;

        case "/":
          stack.push(val2 / val1);
          break;

        case "*":
          stack.push(val2 * val1);
          break;
      }
    }
  }
  return stack.pop();
}

// calling the above method
// returns 9
// console.log(evaluatePostFix("235*+8-"));

// returns postfix evaluation can't be performed
// console.log(evaluatePostFix("23*+"));

// returns incorrect evaluation of expression due to limitations of current prorgam
// - only single-digit operands are allowed
// console.log(evaluatePostFix("100 200 + 2 / 5 * 7 +100 200 + 2 / 5 * 7 +"));

//---------------------------------------------- Evaluation of Infix Expression to PostFix ------------------------------------------
// Not working
// Function which returns the order of precedence of operators
function prec(c) {
  if (c == "^") return 3;
  else if (c == "/" || c == "*") return 2;
  else if (c == "+" || c == "-") return 1;
  else return -1;
}

// The main function to convert infix expression
//to postfix expression
function infixToPostFix(s) {
  let st = new Stack();
  let result = "";

  for (let i = 0; i < s.length; i++) {
    let c = s[i];

    // If the scanned character is
    // an operand, add it to output string.
    if (
      (c >= "a" && c <= "z") ||
      (c >= "A" && c <= "Z") ||
      (c >= "0" && c <= "9")
    )
      result += c;
    // If the scanned character is an
    // ‘(‘, push it to the stack.
    else if (c == "(") st.push("(");
    // If the scanned character is an ‘)’,
    // pop and to output string from the stack
    // until an ‘(‘ is encountered.
    else if (c == ")") {
      while (st.items[st.items.length - 1] != "(") {
        result += st.items[st.items.length - 1];
        st.pop();
      }
      st.pop();
    }

    //If an operator is scanned
    else {
      while (
        st.items.length != 0 &&
        prec(s[i]) <= prec(st.items[st.items.length - 1])
      ) {
        result += st.items[st.items.length - 1];
        st.pop();
      }
      st.push(c);
    }
  }

  // Pop all the remaining elements from the stack
  while (st.items.length != 0) {
    result += st.items[st.items.length - 1];
    st.pop();
  }

  console.log(result + "\n");
}

// let exp = "a+b*(c^d-e)^(f+g*h)-i";
// infixToPostfix(exp);
// let exp = "1 + 2 * (20 / 5 )";
// infixToPostfix(exp);

// --------------------------------------------------  Detect a loop in a linked list -----------------------------------------
import LinkedList from "./linkedList.js";

/**
 * - Returns true if there is a loop in the linked list
 * - Otherwise returns false
 */
function detectLoop(x) {
  var s = new Set();
  while (x != null) {
    // if this node is alrdy in the hashmap, it means there is a cycle
    if (s.has(x)) {
      return true;
    }

    // if this is the 1st time the node is in the hashmap, insert it in the hash
    s.add(x);

    x = x.next;
  }

  return false;
}

// var list = new LinkedList();
// list.add(20);
// list.add(4);
// list.add(15);
// list.add(10);

// Intentionally create a loop for testing
// list.head.next.next.next.next = null;

// if(detectLoop(list.head))
// console.log(`Loop Found`);
// else
// console.log(`No Loop`);

// -----------------------------------------------  UPDATED -----------------------------------------
// ---------------------------------------------- Evaluation of Infix Expression to PostFix ------------------------------------------
// -------------------------- Implementation of Shunting Yard ALgorithm for converting infix expression to postfix expression ----------------------------
// ------------------- Process of converting infix expression to postfix expression -------------------
// 1. Scan the infix expression from left to right.
// 2. If scanned character is a operand or decimal point, add it to currentOperand variable.
//    ELSE
// 3. - If the current character is an open parenthesis, it is pushed onto the stack.
//    - If the current character is a close parenthesis, the function pops operators off the stack and adds them to postfix until an open parenthesis is encountered.
//    - If the stack is empty and no open parenthesis is found, it throws an error for mismatched parenthesis.
//    - If the current character is an operator, it compares its precedence with the operator on the top of the stack.
//    - If the operator on the top of the stack has higher or equal precedence, the function pops it off the stack and adds it to postfix, then it pushes the operator onto the stack.
/**
 * - Takes in infix expression
 * - Returns postfix expression
 */
// function infixToPostfix(expression) {
//   if (typeof expression !== "string") {
//     throw new Error(`Invalid Expression : ${expression}`);
//   }
//   const stack = new Stack();
//   let postfix = "";
//   let currentOperand = "";
//   const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };

//   for (const char of expression) {
//     if (!isNaN(char) || char === ".") {
//       currentOperand += char;
//     } else if (char === "(") {
//       stack.push(char);
//     } else if (char === ")") {
//       while (stack.peek() !== "(") {
//         postfix += " " + stack.pop();
//       }
//       if (stack.isEmpty()) {
//         throw new Error(`Mismatched Parenthesis : ${expression}`);
//       }
//       stack.pop();
//     } else {
//       if (currentOperand.length > 0) {
//         postfix += " " + currentOperand;
//         currentOperand = "";
//       }
//       while (!stack.isEmpty() && precedence[char] <= precedence[stack.peek()]) {
//         postfix += " " + stack.pop();
//       }
//       if (precedence[char] === undefined) {
//         throw new Error(`Invalid operator ${char} in ${expression}`);
//       }
//       stack.push(char);
//     }
//   }
//   if (currentOperand.length > 0) {
//     postfix += " " + currentOperand;
//   }
//   while (!stack.isEmpty()) {
//     if (stack.peek() === "(") {
//       throw new Error(`Mismatched Parenthesis : ${expression}`);
//     }
//     postfix += " " + stack.pop();
//   }
//   if (postfix.length === 0)
//     throw new Error(`Invalid Expression : ${expression}`);
//   return postfix;
// }

// function infixToPostfix(expression) {
//   // check if the input is a string
//   if (typeof expression !== "string") {
//     throw new Error(`Invalid Expression : ${expression}`);
//   }
//   let elements = expression.split("");
//   console.log(elements);
//   elements = elements.filter((element) => element !== " ");
//   console.log(elements);
//   // create a new stack
//   const stack = new Stack();
//   // initialize an empty string to store the final output
//   let postfix = "";
//   // initialize a variable to store the current operand
//   let currentOperand = "";
//   // define the precedence of operators
//   const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 3 };

//   // iterate through the input expression one character at a time
//   for (const char of expression) {
//     // if the current character is a number or decimal point
//     if (!isNaN(char) || char === ".") {
//       // add it to the current operand
//       currentOperand += char;
//     } else if (char === "(") {
//       // if the current character is an open parenthesis, push it onto the stack
//       stack.push(char);
//     } else if (char === ")") {
//       // if the current character is a close parenthesis
//       // pop operators off the stack and add them to postfix until an open parenthesis is encountered
//       while (stack.peek() !== "(") {
//         postfix += " " + stack.pop();
//       }
//       // if the stack is empty and no open parenthesis is found, throw an error for mismatched parenthesis
//       if (stack.isEmpty()) {
//         throw new Error(`Mismatched Parenthesis : ${expression}`);
//       }
//       // pop the open parenthesis off the stack
//       stack.pop();
//     } else {
//       // if the current character is an operator
//       // if the current operand is not empty, add it to the postfix
//       if (currentOperand.length > 0) {
//         postfix += " " + currentOperand;
//         currentOperand = "";
//       }
//       // while the stack is not empty and the current operator has lower precedence
//       // than the operator on the top of the stack, pop operators off the stack and add them to postfix
//       while (!stack.isEmpty() && precedence[char] <= precedence[stack.peek()]) {
//         postfix += " " + stack.pop();
//       }
//       // if the current operator is not in the precedence object throw an error
//       if (precedence[char] === undefined) {
//         throw new Error(`Invalid operator ${char} in ${expression}`);
//       }
//       // push the current operator onto the stack
//       stack.push(char);
//     }
//   }
//   // if the current operand is not empty, add it to the postfix
//   if (currentOperand.length > 0) {
//     postfix += " " + currentOperand;
//   }
//   // while the stack is not empty
//   while (!stack.isEmpty()) {
//     // if the operator on the top of the stack is an open parenthesis, throw an error for mismatched parenthesis
//     if (stack.peek() === "(") {
//       throw new Error(`Mismatched Parenthesis : ${expression}`);
//     }
//     // pop operators off the stack and add them to postfix
//     postfix += " " + stack.pop();
//   }
//   // if the postfix is empty, throw an error for an invalid expression
//   if (postfix.length === 0)
//     throw new Error(`Invalid Expression : ${expression}`);
//   // return the postfix expression
//   return postfix;
// }

// function infixToPostfix(infix) {
//   const precedence = { "*": 3, "/": 3, "+": 2, "-": 2, "(": 1 };
//   const stack = new Stack();
//   let postfix = "";

//   for (let i = 0; i < infix.length; i++) {
//     let char = infix[i];

//     if (!isNaN(char)) {
//       postfix += char;
//     } else if (char in precedence) {
//       while (
//         stack.length &&
//         precedence[char] <= precedence[stack[stack.length - 1]]
//       ) {
//         postfix += stack.pop();
//       }
//       stack.push(char);
//     } else if (char === "(") {
//       stack.push(char);
//     } else if (char === ")") {
//       while (stack.length && stack[stack.length - 1] !== "(") {
//         postfix += stack.pop();
//       }
//       stack.pop();
//     } else if (char === " ") {
//       continue;
//     }
//   }

//   while (stack.length) {
//     postfix += stack.pop();
//   }

//   return postfix;
// }

// function infixToPostfix(infix) {
//   const precedence = { "*": 3, "/": 3, "+": 2, "-": 2, "(": 1 };
//   const stack = new Stack();
//   let postfix = "";

//   for (let i = 0; i < infix.length; i++) {
//     let char = infix[i];
//     if (!isNaN(char)) {
//       postfix += char;
//       console.log(postfix);
//     } else if (char in precedence) {
//       while (!stack.isEmpty() && precedence[char] <= precedence[stack.peek()]) {
//         postfix += stack.pop();
//       }
//       stack.push(char);
//     } else if (char === "(") {
//       stack.push(char);
//     } else if (char === ")") {
//       while (!stack.isEmpty() && stack.peek() !== "(") {
//         console.log(postfix);
//         postfix += " " + stack.pop();
//       }
//       stack.pop();
//     } else if (char === " ") {
//       continue;
//     }
//   }

//   while (!stack.isEmpty()) {
//     postfix += " " + stack.pop();
//   }

//   return postfix;
// }

// function infixToPostfix(infix) {
//   infix = infix.replace(/\s/g, "");
//   const precedence = { "*": 3, "/": 3, "+": 2, "-": 2 };
//   const stack = new Stack();
//   let postfix = "";
//   let prev = "";
//   for (let i = 0; i < infix.length; i++) {
//     let char = infix[i];
//     if (!isNaN(char)) {
//       postfix += char;
//       if (!isNaN(prev)) postfix += " ";
//       prev = char;
//     } else if (char in precedence) {
//       while (!stack.isEmpty() && precedence[char] <= precedence[stack.peek()]) {
//         postfix += " " + stack.pop();
//       }
//       postfix += " ";
//       stack.push(char);
//       prev = char;
//     } else if (char === "(") {
//       stack.push(char);
//       prev = char;
//     } else if (char === ")") {
//       while (!stack.isEmpty() && stack.peek() !== "(") {
//         postfix += " " + stack.pop();
//       }
//       stack.pop();
//       prev = char;
//     }
//   }

//   while (!stack.isEmpty()) {
//     postfix += " " + stack.pop();
//   }

//   return postfix;
// }

// Completed with comments
/**
 * This function converts an infix notation to postfix notation
 * @param {string} infix - the infix notation to convert
 * @return {string} postfix - the postfix notation
 */
function infixToPostfix(infix) {
  // remove whitespaces from the infix notation
  infix = infix.replace(/\s/g, "");
  // define the precedence of operators
  const precedence = { "*": 3, "/": 3, "+": 2, "-": 2, "^": 4 };
  // create a stack to hold operators
  const stack = new Stack();
  // initialize the postfix notation as an empty string
  let postfix = "";
  let prev = "";
  // initialize a variable to keep track of the number of open parenthesis
  let openParenthesis = 0;
  // iterate through the infix notation
  for (let i = 0; i < infix.length; i++) {
    let char = infix[i];
    // if the character is a number, add it to the postfix notation
    if (!isNaN(char)) {
      postfix += char;
      if (!isNaN(prev)) postfix;
      prev = char;
      // if the character is an operator
    } else if (char in precedence) {
      // while the stack is not empty and the current operator has lower or equal precedence to the operator at the top of the stack
      while (!stack.isEmpty() && precedence[char] <= precedence[stack.peek()]) {
        // pop the operator at the top of the stack and add it to the postfix notation
        postfix += " " + stack.pop();
      }
      // add a space after the operator
      postfix += " ";
      // push the current operator onto the stack
      stack.push(char);
      prev = char;
      // if the character is an open parenthesis
    } else if (char === "(") {
      // increment the openParenthesis counter
      openParenthesis++;
      // push the parenthesis onto the stack
      stack.push(char);
      prev = char;
      // if the character is a close parenthesis
    } else if (char === ")") {
      // decrement the openParenthesis counter
      openParenthesis--;
      // if the openParenthesis counter is less than 0, throw an error
      if (openParenthesis < 0) {
        throw new Error(`Mismatched Parentheses in infix expression`);
      }
      // while the stack is not empty and the top of the stack is not an open parenthesis
      while (!stack.isEmpty() && stack.peek() !== "(") {
        // pop the operator at the top of the stack and add it to the postfix notation
        postfix += " " + stack.pop();
      }
      //pop the open parenthesis
      stack.pop();
      prev = char;
      // if the character is not a number, operator or parenthesis
    } else {
      // throw an error with the invalid character
      throw new Error(`Invalid character ${char} in infix expression`);
    }
  }
  // if the openParenthesis counter is not 0, throw an error
  if (openParenthesis !== 0) {
    throw new Error(`Mismatched Parentheses in infix expression`);
  }
  // while the stack is not empty
  while (!stack.isEmpty()) {
    // pop the operator at the top of the stack and add it to the postfix notation
    postfix += " " + stack.pop();
  }
  // return the postfix notation
  return postfix;
}

// console.log(infixToPostfix("(1 + 2) * 3")); // Output: 1 2 + 3 *
// console.log(infixToPostfix("2^3 + 4"))  // Output: 2 3 ^ 4 +

// Debugging and testing of Infix to Postfix conversion
try {
  // const infixExpression1 = "11 + 2 * 3";
  // const postfixNotation1 = infixToPostfix(infixExpression1);
  // console.log(`Infix1: ${infixExpression1} => Postfix1: ${postfixNotation1}`);
  // const infixExpression2 = "(1 + 2) * 3";
  // const postfixNotation2 = infixToPostfix(infixExpression2);
  // console.log(`Infix2: ${infixExpression2} => Postfix2: ${postfixNotation2}`);
  // const infixExpression3 = "1 * (2 + 3)";
  // const postfixNotation3 = infixToPostfix(infixExpression3);
  // console.log(`Infix3: ${infixExpression3} => Postfix3: ${postfixNotation3}`);
  // const infixExpression4 = "3 ^ (4 - 2) + 1";
  // const postfixNotation4 = infixToPostfix(infixExpression4);
  // console.log(`Infix4: ${infixExpression4} => Postfix4: ${postfixNotation4}`);
  // const infixExpression5 = "1+2*";
  // const postfixNotation5 = infixToPostfix(infixExpression5);
  // console.log(`Infix5: ${infixExpression5} => Postfix5: ${postfixNotation5}`);
  // const infixExpression6 = "1+2*3)";
  // const postfixNotation6 = infixToPostfix(infixExpression6);
  // console.log(`Infix6: ${infixExpression6} => Postfix6: ${postfixNotation6}`);
  // const infixExpression7 = "(2.5 + 3.14) * (4.7 - 1.23)";
  // const postfixNotation7 = infixToPostfix(infixExpression7);
  // console.log(`Infix7: ${infixExpression7} => Postfix7: ${postfixNotation7}`);
  // const infixExpression8 = "1+2#3";
  // const postfixNotation8 = infixToPostfix(infixExpression8);
  // console.log(`Infix8: ${infixExpression8} => Postfix8: ${postfixNotation8}`);
} catch (e) {
  console.log(e);
}

// -----------------------------------------------  UPDATED -----------------------------------------
// ---------------------------------------------- Evaluation of Postfix Expression ------------------------------------------
/**
 * - takes a postfix expression as a string
 * - the function now includes several checks for error conditions:
 * - If there are less than two operands on the stack when an operator is encountered, it throws an error indicating that the expression is invalid.
 * - If division by zero is encountered, it throws an error indicating that the expression is invalid.
 * - If unexpected characters are encountered, it throws an error indicating that the expression is invalid.
 * - After evaluating the expression if the length of stack is not equal to 1, it throws an error indicating that the expression is invalid.
 */
// function evaluatePostfix(expression) {
//   const stack = new Stack();
//   let operand = "";

//   for (const char of expression) {
//     if (!isNaN(char) || char === ".") {
//       operand += char;
//     } else if (char === " ") {
//       if (operand) stack.push(parseFloat(operand));
//       operand = "";
//     } else {
//       if (operand) stack.push(parseFloat(operand));
//       operand = "";
//       console.log("stack length", stack.length);
//       if (stack.length < 2)
//         throw new Error(`Invalid expression : ${expression}`);
//       const b = stack.pop();
//       const a = stack.pop();
//       let result;
//       switch (char) {
//         case "+":
//           result = a + b;
//           break;
//         case "-":
//           result = a - b;
//           break;
//         case "*":
//           result = a * b;
//           break;
//         case "/":
//           if (b === 0) throw new Error(`Division by zero: ${expression}`);
//           result = a / b;
//           break;
//         case "^":
//           result = Math.pow(a, b);
//           break;
//         default:
//           throw new Error(
//             `Unexpected character ${char} in the expression : ${expression}`
//           );
//       }
//       stack.push(result);
//     }
//   }
//   if (operand) stack.push(parseFloat(operand));

//   if (stack.length !== 1)
//     throw new Error(`Invalid expression : ${expression}`);
//   return stack.pop();
// }

// function evaluatePostfix(expression) {
//   // check if the input is a string
//   if (typeof expression !== "string") {
//     throw new Error(`Invalid Expression : ${expression}`);
//   }
//   // create a new stack
//   const stack = new Stack();
//   // split the input string into an array of elements
//   const elements = expression.split(" ");
//   // iterate through the elements
//   for (const element of elements) {
//     // check if the element is a number or an operator
//     if (!isNaN(element)) {
//       // if the current element is a valid operand, push it onto the stack
//       stack.push(Number(element));
//     } else if (["+", "-", "*", "/", "^"].includes(element)) {
//       // if the current element is an operator
//       // pop the last two operands off the stack
//       const operand2 = stack.pop();
//       const operand1 = stack.pop();
//       // evaluate the result using the operator and the two operands
//       let result;
//       switch (element) {
//         case "+":
//           result = operand1 + operand2;
//           break;
//         case "-":
//           result = operand1 - operand2;
//           break;
//         case "*":
//           result = operand1 * operand2;
//           break;
//         case "/":
//           result = operand1 / operand2;
//           break;
//         case "^":
//           result = Math.pow(operand1, operand2);
//           break;
//       }
//       // push the result onto the stack
//       stack.push(result);
//     } else {
//       throw new Error(`Invalid character ${element} in expression`);
//     }
//   }
//   // if the stack has more than one element, throw an error for invalid expression
//   if (stack.length !== 1) {
//     throw new Error(`Invalid Expression : ${expression}`);
//   }
//   // return the final result
//   return stack.pop();
// }

// function evaluatePostfix(expression) {
//   // create a new stack
//   const stack = new Stack();
//   // split the input string into an array of elements
//   const elements = expression.split(" ");
//   // iterate through the elements
//   for (const element of elements) {
//     // check if the element is a number or an operator
//     if (!isNaN(element)) {
//       // if the current element is a valid operand, push it onto the stack
//       stack.push(Number(element));
//     } else if (["+", "-", "*", "/", "^"].includes(element)) {
//       // if the current element is an operator
//       // pop the last two operands off the stack
//       const operand2 = stack.pop();
//       const operand1 = stack.pop();
//       // evaluate the result using the operator and the two operands
//       let result;
//       switch (element) {
//         case "+":
//           result = operand1 + operand2;
//           break;
//         case "-":
//           result = operand1 - operand2;
//           break;
//         case "*":
//           result = operand1 * operand2;
//           break;
//         case "/":
//           result = operand1 / operand2;
//           break;
//         case "^":
//           result = Math.pow(operand1, operand2);
//           break;
//       }
//       // push the result onto the stack
//       stack.push(result);
//     } else {
//       throw new Error(`Invalid character ${element} in expression`);
//     }
//   }

//   console.log(stack);
//   // if the stack has more than one element, throw an error for invalid expression
//   if (stack.length !== 1) {
//     throw new Error(`Invalid Expression : ${expression}`);
//   }
//   // return the final result
//   return stack.pop();
// }

// function evaluatePostfix(expression) {
//   // create a new stack
//   const stack = new Stack();
//   // split the input string into an array of elements
//   let elements = expression.split(" ");
//   // remove empty strings
//   elements = elements.filter((element) => element !== "");
//   // console.log(elements);
//   // iterate through the elements
//   for (let i = 0; i < elements.length; i++) {
//     let element = elements[i];
//     // check if the element is a number or an operator
//     if (!isNaN(element)) {
//       // if the current element is a valid operand, push it onto the stack
//       stack.push(Number(element));
//     } else if (["+", "-", "*", "/", "^"].includes(element)) {
//       // if the current element is an operator
//       // pop the last two operands off the stack
//       if (stack.length < 1) continue;
//       let operand2 = stack.pop();
//       if (stack.length < 1) continue;
//       let operand1 = stack.pop();
//       // evaluate the result using the operator and the two operands
//       let result;
//       switch (element) {
//         case "+":
//           result = operand1 + operand2;
//           break;
//         case "-":
//           result = operand1 - operand2;
//           break;
//         case "*":
//           result = operand1 * operand2;
//           break;
//         case "/":
//           result = operand1 / operand2;
//           break;
//         case "^":
//           result = Math.pow(operand1, operand2);
//           break;
//         default:
//           throw new Error(`Invalid operator ${element}`);
//       }
//       // push the result onto the stack
//       stack.push(result);
//     } else {
//       throw new Error(`Invalid character ${element} in expression`);
//     }
//   }

//   // if the stack has more than one element, throw an error for invalid expression
//   if (stack.length !== 1) {
//     throw new Error(`Invalid Expression : ${expression}`);
//   }
//   // return the final result
//   return stack.items[0];
// }

// Working function with comments
/**
 * This function evaluates the postfix notation and returns the result
 * @param {string} postfix - the postfix notation to evaluate
 * @return {number} result - the evaluated result
 */
function evaluatePostfix(postfix) {
  // split the postfix notation into an array of strings
  postfix = postfix.split(" ");
  // create a stack to hold operands
  const stack = new Stack();

  // iterate through the postfix array
  for (let i = 0; i < postfix.length; i++) {
    let char = postfix[i];
    // if the character is a number, push it onto the stack
    if (!isNaN(char)) {
      stack.push(char);
    } else {
      // if the character is an operator, pop the last two operands from the stack
      let operand1 = stack.pop();
      let operand2 = stack.pop();
      // parse the operands as floats
      operand1 = parseFloat(operand1);
      operand2 = parseFloat(operand2);
      // perform the operation based on the operator
      switch (char) {
        case "+":
          stack.push(operand2 + operand1);
          break;
        case "-":
          stack.push(operand2 - operand1);
          break;
        case "*":
          stack.push(operand2 * operand1);
          break;
        case "/":
          stack.push(operand2 / operand1);
          break;
        case "^":
          stack.push(Math.pow(operand2, operand1));
          break;
      }
    }
  }
  // return the result which is the last element of the stack
  return stack.pop();
}

// console.log(evaluatePostfix("1 2 + 3 *")); // Output: 9
// console.log(evaluatePostfix("2 3 ^")); // Output: 8
// console.log(evaluatePostfix("2 3 ^ 4 +")); // Output: 12

// Debugging and testing of Postfix evaluation
// try {
// const postfixExpression1 = "2  +  3   4 *";
// const evaluatedExpression1 = evaluatePostfix(postfixExpression1);
// console.log(
//   `Postfix1: ${postfixExpression1} => Evaluated1: ${evaluatedExpression1}`
// );

// const postfixExpression2 = "5 10 15 - 3 / +";
// const evaluatedExpression2 = evaluatePostfix(postfixExpression2);
// console.log(
//   `Postfix2: ${postfixExpression2} => Evaluated2: ${evaluatedExpression2}`
// );

//   const postfixExpression3 = "2 3 ^ 4 5 * 6 + +";
//   const evaluatedExpression3 = evaluatePostfix(postfixExpression3);
//   console.log(
//     `Postfix3: ${postfixExpression3} => Evaluated3: ${evaluatedExpression3}`
//   );
// } catch (e) {
//   console.log(e.message);
// }

try {
  // Test Case 1
  const infixExpression1 = "(1 + 2) * 3"; // Output: 9
  const postfixNotation1 = infixToPostfix(infixExpression1);
  console.log(`Infix1: ${infixExpression1} => Postfix1: ${postfixNotation1}`);
  const evaluatedExpression1 = evaluatePostfix(postfixNotation1);
  console.log(`Evaluted : ${evaluatedExpression1}`);
  // Test Case 2
  const infixExpression2 = "2 + 3"; // Output: 5
  const postfixNotation2 = infixToPostfix(infixExpression2);
  console.log(`\nInfix2: ${infixExpression2} => Postfix2: ${postfixNotation2}`);
  const evaluatedExpression2 = evaluatePostfix(postfixNotation2);
  console.log(`Evaluted : ${evaluatedExpression2}`);
  // Test Case 3
  const infixExpression3 = "2 * 3 + 4"; // Output: 10
  const postfixNotation3 = infixToPostfix(infixExpression3);
  console.log(`\nInfix3: ${infixExpression3} => Postfix3: ${postfixNotation3}`);
  const evaluatedExpression3 = evaluatePostfix(postfixNotation3);
  console.log(`Evaluted : ${evaluatedExpression3}`);
  // Test Case 4
  const infixExpression4 = "( 2 + 3 ) * 4"; // Output: 20
  const postfixNotation4 = infixToPostfix(infixExpression4);
  console.log(`\nInfix4: ${infixExpression3} => Postfix4: ${postfixNotation4}`);
  const evaluatedExpression4 = evaluatePostfix(postfixNotation4);
  console.log(`Evaluted : ${evaluatedExpression4}`);
  // Test Case 5
  const infixExpression5 = "3 * ( 2 + 4 ) / 2"; // Output: 9
  const postfixNotation5 = infixToPostfix(infixExpression5);
  console.log(`\nInfix5: ${infixExpression5} => Postfix5: ${postfixNotation5}`);
  const evaluatedExpression5 = evaluatePostfix(postfixNotation5);
  console.log(`Evaluted : ${evaluatedExpression5}`);
} catch (e) {
  console.log(e.message);
}
