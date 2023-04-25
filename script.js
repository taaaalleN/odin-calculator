const numbers = document.querySelectorAll(".buttons .numbers");
const operators = document.querySelectorAll(".buttons .operators");
const display = document.querySelector(".display");
let displayValue = "";
let first;
let second;
let selectedOperator;

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function clear() {
  display.innerText = "";
  first = "";
  second = "";
  selectedOperator = "";
}

let operatorsMap = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

function operate(operator, firstNumber, secondNumber) {
  const operatorFunction = operatorsMap[operator];
  if (operatorFunction) {
    return operatorFunction(firstNumber, secondNumber);
  } else {
    throw new Error("Invalid operator");
  }
}

function handleClick(elements) {
  elements.forEach((element) =>
    element.addEventListener("click", (e) => {
      const currentValue = e.target.getAttribute("data-value");
      if (currentValue == null) {
        return;
      }

      if (elements == operators) {
        switch (currentValue) {
          case "sum":
            // console.log("Operator", selectedOperator, "\n First number", first, "\n Second number", second);
            operate(selectedOperator, first, second);
            break;
          case "add":
            // console.log("Add");
            selectedOperator = "add";
            // console.log(selectedOperator);
            displayValue += "+";
            display.innerText = displayValue;
            break;
          case "subtract":
            selectedOperator = "subtract";
            break;
          case "multiply":
            selectedOperator = "multiply";
            break;
          case "divide":
            selectedOperator = "divide";
            displayValue += "/";
            break;
          case "clear":
            clear();
            break;
          default:
            throw new Error("Invalid operator");
        }
      } else {
        displayValue += currentValue;
        display.innerText = displayValue;
      }
    })
  );
}

handleClick(numbers);
handleClick(operators);
