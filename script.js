const numbers = document.querySelectorAll(".buttons [data-number]");
const operators = document.querySelectorAll(".buttons [data-operator]");
const sumBtn = document.querySelector(".buttons [data-value='sum']");
const previousInput = document.querySelector(".display .input.previous");
const currentInput = document.querySelector(".display .input.current");
// const display = document.querySelector(".display");
// let displayValue = "";
let firstNumber = null;
let secondNumber = null;
let selectedOperator = null;
let selectedOperatorChar = null;
let currentDisplayArray = [];
// let previousInput = "";

const regex = /\+|-|\*|\//g;

const allBtns = document.querySelectorAll(".buttons .btn");

allBtns.forEach((btn) => btn.addEventListener("click", () => variableHelper()));

function variableHelper() {
  console.log("selectedOperator", selectedOperator);
  console.log("firstNumber", firstNumber);
  console.log("secondNumber", secondNumber);
  console.log("currentInput.textContent", currentInput.textContent);
  console.log("previousInput.textContent", previousInput.textContent);
}

function add(a, b) {
  // console.log(a, b);
  // console.log(a + b);
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function clear() {
  currentInput.textContent = "";
  previousInput.textContent = "";
  firstNumber = "";
  secondNumber = "";
  selectedOperator = "";
}

function deleteLatestInput() {
  currentInput.textContent = currentInput.textContent.split("").slice(0, -1);
}

function convertOperation(operatorSymbol) {
  switch (operatorSymbol) {
    case "+":
      return "add";
    case "-":
      return "subtract";
    case "*":
      return "multiply";
    case "/":
      return "divide";
    case "=":
      return "sum";
    default:
      console.log("Something went wrong: ", operatorSymbol);
  }
}

numbers.forEach((number) => number.addEventListener("click", () => handleNumbers(number.textContent)));
operators.forEach((operator) => operator.addEventListener("click", () => setOperator(operator.textContent)));
sumBtn.addEventListener("click", evaluate);

function handleNumbers(number) {
  currentInput.textContent += number;
}

function setOperator(operator) {
  if (firstNumber && selectedOperator == operator) {
    secondNumber = firstNumber;
    evaluate();
  }

  if (operator == "C") {
    clear();
    return;
  }
  // console.log("previousInput before", previousInput.textContent);
  // console.log("currentInput before", currentInput.textContent);

  firstNumber = currentInput.textContent;
  console.log("previousInput", previousInput.textContent);

  if (!firstNumber) {
    console.log("First input cannot be an operator");
    return;
  }
  selectedOperator = convertOperation(operator);
  if (operator == "=") {
  }
  displayNumbers();
  // console.log("selectedOperator", selectedOperator);
  // console.log("firstNumber", firstNumber);
  // console.log("secondNumber", secondNumber);
}

// Display e.g. 1 + 2 on the display (somehow)
function displayNumbers() {
  currentInput.textContent = "";
  // previousInput.textContent = `${firstNumber} ${selectedOperator} ${secondNumber}`;
  previousInput.textContent = `${firstNumber} ${convertToSymbol(selectedOperator)}`;
}

function operate(operator, first, second) {
  first = Number(first);
  second = Number(second);
  switch (operator) {
    case "sum":
      // calculate();
      // Do stuff specific to sum
      // Don't do the "omväg" of going through setOperator
      // evaluate();
      break;
    case "add":
      return add(first, second);
    case "subtract":
      return subtract(first, second);
    case "multiply":
      return multiply(first, second);
    case "divide":
      return divide(first, second);
    case "clear":
      clear();
      break;
    default:
      throw new Error("Invalid operator");
  }
}

function evaluate() {
  console.log("clicked sum");
  secondNumber = currentInput.textContent;
  calculate();
}

function calculate() {
  console.log(selectedOperator);
  const answer = operate(selectedOperator, firstNumber, secondNumber);
  console.log("answer", answer);
  currentInput.textContent = "";
  previousInput.textContent = `${answer}`;
}

function convertToSymbol() {
  switch (selectedOperator) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "*";
    case "divide":
      return "/";
    case "sum":
      return "=";
    default:
      throw new Error("Invalid operator symbol");
  }
}
