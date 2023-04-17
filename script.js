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

function operate(operator, firstNumber, secondNumber) {
  operator(firstNumber, secondNumber);
}

// numbers.forEach((number) =>
//   number.addEventListener("click", (e) => {
//     const currentValue = e.target.getAttribute("data-value");
//     if (currentValue == null) {
//       return;
//     }

//     displayValue += currentValue;
//     console.log("displayValue", displayValue);
//     display.innerText = "";
//     display.innerText = displayValue;
//     console.log(displayValue);
//   })
// );

function handleClick(elements) {
  elements.forEach((element) =>
    element.addEventListener("click", (e) => {
      const currentValue = e.target.getAttribute("data-value");
      if (currentValue == null) {
        return;
      }

      if (elements == numbers) {
        displayValue += currentValue;
        display.innerText = "";
        display.innerText = displayValue;
      } else if (elements == operators) {
        displayValue += currentValue;
        display.innerText = "";
        display.innerText = displayValue;

        const operation = currentValue;
        if (operation == "sum") {
          try {
            const sum = operate(operation, firstNumber, secondNumber);
            display.innerText = sum;
          } catch (e) {
            console.log(e);
          }
        } else {
          // else set firstNunber to the current display value
          // save operator
          // start setting second number
        }
      }
      return;
    })
  );
}

handleClick(numbers);
handleClick(operators);
