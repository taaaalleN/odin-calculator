const numbers = document.querySelectorAll(".buttons .numbers");
const operators = document.querySelectorAll(".buttons .operators");
const display = document.querySelector(".display");
let displayValue = "";
let firstNumber = 0;
let secondNumber = 0;
let selectedOperator;
let currentDisplayArray = [];
let previousInput = "";

const regex = /\+|-|\*|\//g;

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

function calculate() {
  console.log("Operator", selectedOperator, "\n First number", firstNumber, "\n Second number", secondNumber);
  const answer = operate(selectedOperator, firstNumber, secondNumber);
  displayValue = answer;
  display.innerText = displayValue;
  firstNumber = answer;
  secondNumber = "";
}

function handleNumbers() {}

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

        if (!firstNumber) {
          let tempArray = displayValue.split(regex);
          firstNumber = parseInt(tempArray[0]);
        } else if (!secondNumber) {
          console.log("displayValue", displayValue);
          let tempArray = displayValue.split(regex);
          secondNumber = parseInt(tempArray[1]);
        }

        if (!firstNumber && !secondNumber) {
          console.log("An operator can't be the first input");
          return;
        }

        if (previousInput == currentSymbol) {
          console.log("currentSymbol", currentSymbol, "previousInput", previousInput);
          if (!secondNumber) {
            console.log("secondNumber gets assigned same value as firstNumber");
            secondNumber = firstNumber;
          }
        }

        if (currentValue != "sum") {
          selectedOperator = currentValue;
        }

        if (firstNumber && secondNumber) {
          calculate();
        }

        previousInput = currentDisplayArray.pop();

        switch (currentValue) {
          case "sum":
            calculate();
            break;
          case "add":
          case "subtract":
          case "multiply":
          case "divide":
            if (!firstNumber) {
              firstNumber = 0;
            }
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
        handleNumbers();
        displayValue += currentValue;
        display.innerText = displayValue;
        currentDisplayArray.push(currentValue);
      }
      console.log("currentDisplayArray", currentDisplayArray);
      // console.log("firstNumber", firstNumber);
      // console.log("secondNumber", secondNumber);
      // console.log("displayValue", displayValue);
      // console.log("previousInput", previousInput);
    })
  );
  // console.log(displayValue);
  // console.log(currentDisplayArray);
}

handleClick(numbers);
handleClick(operators);
