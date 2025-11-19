function add(num1, num2) {
  return num1+num2;
}

function subtract(num1, num2) {
  return num1-num2;
}

function divide(num1, num2) {
  if (num2 !== 0)
    return num1/num2;
  return "NaN";
}

function multiply(num1, num2) {
  return num1*num2;
}

function operate(num1, operator, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (typeof num1 === "undefined" || typeof num2 === "undefined") {
    return "ERROR"
  }
  if (isNaN(num1) || isNaN(num2)) {
    return "NaN";
  }
  switch (operator) {
    case "+":
      return add(num1, num2)
    
    case "-":
      return subtract(num1, num2);

    case "×":
      return multiply(num1, num2);

    case "÷":
      return divide(num1, num2);
  }
}

function updateCalcDisplay() {
  calcDisplay.setAttribute("value", currNum || currNum === "0" ? currNum : "");
}

function handleButtonInput(event) {
  equationDisplay.setAttribute("value", "");
  switch (event.target.innerText) {
    case "Clear":
      prevNum = operator = "";
      currNum = "0";
      updateCalcDisplay();
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
      if (displayingResult) {
        if (operator && !prevNum) {
          displayingResult = false;
        } else {
          prevNum = operator = "";
          currNum = "0";
          displayingResult = false;
        }
      }
      if (operator) {
        prevNum = currNum;
        currNum = "";
      }
      currNum = String(currNum !== "0" && currNum ? currNum : "") + event.target.innerText;
      updateCalcDisplay();
      break;

    case "÷":
    case "×":
    case "+":
    case "-":
      if (currNum) {
        if (prevNum) {
          if (!displayingResult) {
            equationDisplay.setAttribute("value", prevNum + " " + operator + " " + currNum + " =");
            currNum = operate(prevNum, operator, currNum);
            prevNum = "";
            displayingResult = true;
          }
        } else {
          if (displayingResult) {
            displayingResult = false;
          }
        }
        operator = event.target.innerText;
        updateCalcDisplay();
      }
      break;
      
    case "=":
      if (!prevNum || !currNum || !operator) {
        break;
      }
      equationDisplay.setAttribute("value", prevNum + " " + operator + " " + currNum + " =");
      currNum = operate(prevNum, operator, currNum);
      prevNum = "";
      displayingResult = true;
      operator = "";
      updateCalcDisplay();
      break;

    case ".":
      if (currNum.indexOf(".") === -1) {
        currNum += ".";
      }
      break;

    case "⌫":
      currNum = currNum.substring(0, currNum.length-1);
      console.log(currNum);
      break;
      
    default:
      console.log(event);
      break;
      
  }
  console.log(currNum);
  console.log(operator);
  console.log(prevNum);
  console.log(displayingResult);
}

const equationDisplay = document.querySelector("#equation-display");
const calcDisplay = document.querySelector("#calc-display");
const calcButtons = document.querySelector("#calculator-buttons");

let prevNum = "";
let currNum = "0";
let operator = "";
let currNumIsFloat = false;
let displayingResult = false;

calcButtons.addEventListener("click", handleButtonInput);

updateCalcDisplay();

