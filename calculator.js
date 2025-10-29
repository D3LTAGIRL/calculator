function add(num1, num2) {
  return num1+num2;
}

function subtract(num1, num2) {
  return num1-num2;
}

function divide(num1, num2) {
  return num1/num2;
}

function multiply(num1, num2) {
  return num1*num2;
}

function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2)
    
    case "-":
      return subtract(num1, num2);

    case "*":
      return multiply(num1, num2);

    case "/":
      return divide(num1, num2);
  }
}

function updateCalcDisplay() {
  calcDisplay.setAttribute("value", currNum ? currNum : 0);
}

function handleButtonInput(event) {
  switch (event.target.innerText) {
    case "Clear":
      prevNum = currNum = operator = null;
      break;

    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      currNum = String(currNum !== "0" && currNum ? currNum : "") + event.target.innerText;
      break;

    case "⌫":
      currNum = currNum.substring(0, currNum.length-1);
      console.log(currNum);
      
    default:
      console.log(event);
      break;
      
  }
  updateCalcDisplay();
}

const calcDisplay = document.querySelector("#calc-display");
const calcButtons = document.querySelector("#calculator-buttons");

let prevNum = "";
let currNum = "";
let operator = "";
let currNumIsFloat = false;

calcButtons.addEventListener("click", handleButtonInput);

updateCalcDisplay();

