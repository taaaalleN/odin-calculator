const numbers = document.querySelectorAll(".buttons .numbers");
const operators = document.querySelectorAll(".buttons .operators");
const display = document.querySelector(".display");
let displayValue = "";
let firstNumber;
let secondNumber;
let selectedOperator;
// let selectedOperators = [];
let currentDisplayArray = [];

function add(firstValue, secondValue) {
  return firstValue + secondValue;
}

function subtract(firstValue, secondValue) {
  return firstValue - secondValue;
}

function multiply(firstValue, secondValue) {
  return firstValue * secondValue;
}

function divide(firstValue, secondValue) {
  return firstValue / secondValue;
}

function clear() {
  display.innerText = "";
  displayValue = "";
  firstNumber = "";
  secondNumber = "";
  selectedOperator = "";
}

let operatorsMap = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

function operate(operator, firstValue, secondValue) {
  const operatorFunction = operatorsMap[operator];
  if (operatorFunction) {
    return operatorFunction(firstValue, secondValue);
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
        currentDisplayArray.push(currentSymbol);

        if (currentValue != "sum") {
          selectedOperator = currentValue;

          if (!firstNumber) {
            firstNumber = 0;
          }
        }

        if (currentValue == "sum") {
        }
        switch (currentValue) {
          case "sum":
            if (!secondNumber) {
              console.log("asd");
              secondNumber = firstNumber;
            }
            const regex = /\+|-|\*|\//g;
            let tempArray = displayValue.split(regex);
            firstNumber = parseInt(tempArray[0]);
            secondNumber = parseInt(tempArray[1]);
            console.log("Operator", selectedOperator, "\n First number", firstNumber, "\n Second number", secondNumber);
            const answer = operate(selectedOperator, firstNumber, secondNumber);
            display.innerText = answer;
            firstNumber = "";
            secondNumber = "";
            break;
          case "add":
          case "subtract":
          case "multiply":
          case "divide":
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
        currentDisplayArray.push(currentValue);
      }
      console.log(currentDisplayArray);
    })
  );
}

handleClick(numbers);
handleClick(operators);
