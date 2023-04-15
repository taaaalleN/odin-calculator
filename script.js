let first;
let second;
let operator;

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

function operate(operator, firstNumber, secondNumber) {
  operator(firstNumber, secondNumber);
}

const numbers = document.querySelectorAll(".buttons .numbers");
const operators = document.querySelectorAll(".buttons .operators");
let displayValue = "";
let display = document.querySelector(".display");

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    displayValue += e.target.innerText;
    display.innerText = "";
    display.innerText = displayValue;
    console.log(displayValue);
    // displayValue += number.innerText;
    // display.innerText = displayValue;
  })
);
