const numbers = document.querySelectorAll(".buttons .numbers");
const operators = document.querySelectorAll(".buttons .operators");
const display = document.querySelector(".display");
let displayValue = "";
let first;
let second;
let selectedOperator;
// let selectedOperators = [];

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
  displayValue = "";
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
    console.error(operator + " is an invalid operator");
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
        const currentSymbol = e.target.innerText;
        if (currentValue != "sum") {
          selectedOperator = currentValue;
        }
        // console.log(selectedOperator);

        switch (currentValue) {
          case "sum":
            const regex = /\+|-|\*|\//g;
            let tempArray = displayValue.split(regex);
            first = parseInt(tempArray[0]);
            second = parseInt(tempArray[1]);
            console.log("Operator", selectedOperator, "\n First number", first, "\n Second number", second);
            const answer = operate(selectedOperator, first, second);
            display.innerText = answer;
            first = "";
            second = "";
            break;
          case "add":
          case "subtract":
          case "multiply":
          case "divide":
            selectedOperator = currentValue;
            firstNumber = displayValue;
            displayValue += currentSymbol;
            display.innerText = displayValue;
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
