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

// Function which returns the order of precedence of operators
function prec(c) {
  if (c == "^") return 3;
  else if (c == "/" || c == "*") return 2;
  else if (c == "+" || c == "-") return 1;
  else return -1;
}

// The main function to convert infix expression
//to postfix expression
function infixToPostfix(s) {
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
      while (st.items.length != 0 && prec(s[i]) <= prec(st.items[st.items.length - 1])) {
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

