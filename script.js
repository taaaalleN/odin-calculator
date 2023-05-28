const numbers = document.querySelectorAll(".buttons .numbers .btn");
const operators = document.querySelectorAll(".buttons .operators .btn");
const previousInput = document.querySelector(".display .input.previous");
const currentInput = document.querySelector(".display .input.current");
// const display = document.querySelector(".display");
let displayValue = "";
let firstNumber = 0;
let secondNumber = 0;
let selectedOperator = "";
let currentDisplayArray = [];
// let previousInput = "";

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
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  selectedOperator = "";
}

function operate(operator, first, second) {
  first = Number(first);
  second = Number(second);
  switch (operator) {
    case "sum":
      calculate();
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      return operator(first, second);
    case "clear":
      clear();
      break;
    default:
      throw new Error("Invalid operator");
  }
}

function handleNumbers(number) {
  currentInput.textContent += number;
}

numbers.forEach((number) => number.addEventListener("click", () => handleNumbers(number.textContent)));

function setOperator(operator) {
  // if (selectedOperator == operator) {
  //   calculate();
  // }
  selectedOperator = operator;
  firstNumber = currentInput.textContent;
  currentInput.textContent = "";
  console.log(selectedOperator);
  console.log(firstNumber);
  console.log(secondNumber);
}

// Display e.g. 1 + 2 on the display (somehow)
function displayNumbers() {
  previousInput.textContent = `${firstNumber} ${selectedOperator} ${secondNumber}`;
}

operators.forEach((operator) => operator.addEventListener("click", () => setOperator(operator.textContent)));

function doOtherStuff() {
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
  selectedOperator = "";
}

function calculate() {
  secondNumber = display.textContent;
  console.log("Operator", selectedOperator, "\n First number", firstNumber, "\n Second number", secondNumber);
  const answer = operate(selectedOperator, firstNumber, secondNumber);
  display.innerText = answer;
}
