const numbers = document.querySelectorAll(".buttons [data-number]");
const operators = document.querySelectorAll(".buttons [data-operator]");
const sumBtn = document.querySelector(".buttons [data-value='sum']");
const previousInput = document.querySelector(".display .input.previous");
const currentInput = document.querySelector(".display .input.current");
let firstNumber = null;
let secondNumber = null;
let selectedOperator = null;
let savedFirstNumber = null;

const regex = /\+|-|\*|\//g;

const allBtns = document.querySelectorAll(".buttons .btn");
allBtns.forEach((btn) => btn.addEventListener("click", () => variableHelper()));
window.addEventListener("keydown", () => variableHelper());

function variableHelper() {
  console.log("selectedOperator", selectedOperator);
  console.log("firstNumber", firstNumber);
  console.log("secondNumber", secondNumber);
  console.log("currentInput.textContent", currentInput.textContent);
  console.log("previousInput.textContent", previousInput.textContent);
}

function add(a, b) {
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
  currentInput.textContent = currentInput.textContent.split("").slice(0, -1).join("");
  // if (currentInput.textContent != "") {
  //   currentInput.textContent = currentInput.textContent.split("").slice(0, -1).join("");
  // } else {
  //   previousInput.textContent = previousInput.textContent.split("").slice(0, -1).join("");
  //   console.log(previousInput.textContent);
  // }
}

numbers.forEach((number) => number.addEventListener("click", () => handleNumbers(number.textContent)));
operators.forEach((operator) => operator.addEventListener("click", () => setOperator(operator.textContent)));
sumBtn.addEventListener("click", evaluate);

function handleNumbers(number) {
  if (currentInput.textContent == "0") {
    currentInput.textContent = number;
  } else {
    currentInput.textContent += number;
  }
}

function setOperator(operator) {
  if (firstNumber && selectedOperator == operator) {
    secondNumber = firstNumber;
    // currentInput.textContent.split("").slice(0, -1).join("");
    evaluate();
    return;
  }

  if (selectedOperator && operator != "C") {
    firstNumber = previousInput.textContent.split("").slice(0, -1).join("");
    selectedOperator = operator;
    previousInput.textContent = `${firstNumber} ${selectedOperator}`;
    return;
  }

  if (operator == "C") {
    clear();
    return;
  }

  firstNumber = currentInput.textContent;

  if (!firstNumber && previousInput.textContent == "") {
    alert("First input cannot be an operator");
    return;
  }
  selectedOperator = operator;
  displayNumbers();
}

function displayNumbers() {
  currentInput.textContent = "";
  previousInput.textContent = `${firstNumber} ${selectedOperator}`;
}

function operate(operator, first, second) {
  first = Number(first);
  second = Number(second);
  switch (operator) {
    case "+":
      return add(first, second);
    case "-":
      return subtract(first, second);
    case "*":
      return multiply(first, second);
    case "/":
      return divide(first, second);
    case "C":
      clear();
      break;
    default:
      throw new Error("Invalid operator");
  }
}

function evaluate() {
  if (!firstNumber && !currentInput.textContent) return;
  secondNumber = currentInput.textContent;
  if (currentInput.textContent == "") {
    secondNumber = firstNumber;
  }
  calculate();
}

function calculate() {
  const answer = operate(selectedOperator, firstNumber, secondNumber);
  currentInput.textContent = `${answer}`;
  previousInput.textContent = "";
  firstNumber = "";
  secondNumber = "";
  selectedOperator = "";
}

window.addEventListener("keydown", handleKeyboard);

function handleKeyboard(e) {
  const validKeyRegex = /\+|-|\/|\*/gi;

  if (e.key.match(validKeyRegex)) {
    setOperator(e.key);
  }
  if (e.key >= 0 && e.key <= 9) {
    handleNumbers(e.key);
  }
  if (e.key == "=" || e.key == "Enter") {
    evaluate();
  }
  if (e.key == "C" || e.key == "c") {
    clear();
  }
  if (e.key == "Backspace") {
    deleteLatestInput();
  }

  animateButtonPress(e);
}

function animateButtonPress(e) {
  const allBtns = document.querySelectorAll("#calculator .btn");
  allBtns.forEach((btn) => {
    if (e.key == btn.textContent.toLowerCase() || e.key == btn.textContent) {
      btn.classList.add("pressed");
    }

    btn.addEventListener("animationend", () => {
      btn.classList.remove("pressed");
    });
  });
}
