const numbers = document.querySelectorAll(".buttons .numbers");
const operators = document.querySelectorAll(".buttons .operators");
const display = document.querySelector(".display");
let displayValue = "";
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

function clear() {
  display.innerText = "";
  first = "";
  second = "";
  operator = "";
}

function operate(operator, firstNumber, secondNumber) {
  operator(firstNumber, secondNumber);
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
            break;
          case "add":
            break;
          case "subtract":
            break;
          case "multiply":
            break;
          case "divide":
            break;
          case "clear":
            clear();
            break;
          default:
            break;
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
