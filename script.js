// validate user input
// - calcValues !== ''
// - avoid divide by 0

const calcValues = {
  a: "",
  operator: "",
  b: "",
  result: "",
};

(function calculator() {
  safeClickValue();
  displayValues();
  validateInput(calc);
  clearCalc();
})();

function validateInput(calc) {
  const equalButton = [...document.querySelectorAll(".operators button")].find(
    (btn) => btn.textContent === "="
  );

  const inputContainer = document.querySelector('.enter-display');
  const inputError = document.createElement('div');

  equalButton.addEventListener("click", () => {
    if (
      calcValues.a !== "" &&
      calcValues.operator === "" &&
      calcValues.b === ""
    ) {
      calcValues.result = calcValues.a;
      
      displayResult();
      clearValues();
      assignValue();
    } else if (calcValues.operator === "/" && calcValues.b === "0") {
      inputError.textContent = 'Division by zero is undefined';

      inputContainer.appendChild(inputError);
    } else if (calcValues.operator !== "" && calcValues.b === "") {
      inputError.textContent = 'Malformed expression';

      inputContainer.appendChild(inputError);
    } else {
      calc();
    }
  });
}

function assignValue() {
  const input = document.querySelector("input");

  calcValues.a = calcValues.result;
  input.value = calcValues.a;
}

function clearValues() {
  Object.keys(calcValues)
    .filter((val) => val !== "result")
    .forEach((key) => (calcValues[key] = ""));
}

function clearResult() {
  const displayContainer = document.querySelector(".enter-display");
  const items = [...document.querySelectorAll(".enter-display div")];

  for (let item of items) {
    displayContainer.removeChild(item);
  }
}

function displayResult() {
  const displayContainer = document.querySelector(".result-display");
  const input = document.querySelector("input");

  const containerItem = document.createElement("section");
  const operands = document.createElement("div");
  const equalOperator = document.createElement("div");
  const calcResult = document.createElement("div");

  containerItem.style.cssText =
    "display: flex; justify-content: space-between;";

  operands.textContent = input.value;
  equalOperator.textContent = "=";
  calcResult.textContent = calcValues.result;

  containerItem.appendChild(operands);
  containerItem.appendChild(equalOperator);
  containerItem.appendChild(calcResult);
  displayContainer.appendChild(containerItem);
}

function clearCalc() {
  const clearButton = [...document.querySelectorAll(".operators button")].find(
    (btn) => btn.textContent === "ac"
  );

  const input = document.querySelector("input");

  clearButton.addEventListener("click", () => {
    for (let key in calcValues) {
      calcValues[key] = "";
    }

    input.value = "";
    clearResult();
  });
}

function calc() {
  calcValues.result = operate(
    parseInt(calcValues.a),
    calcValues.operator,
    parseInt(calcValues.b)
  );

  displayResult();
  clearValues();
  assignValue();
}

function displayValues() {
  const buttons = [...document.querySelectorAll("button")].filter(
    (btn) => btn.textContent !== "=" && btn.textContent !== "ac"
  );

  const input = document.querySelector("input");

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      input.value = Object.keys(calcValues)
        .filter((val) => val !== "result")
        .reduce((calc, key) => calc + calcValues[key], "");
    })
  );
}

function safeClickValue() {
  const digitButtons = document.querySelectorAll(".digits button");

  const operateButtons = [
    ...document.querySelectorAll(".operators button"),
  ].filter((btn) => btn.textContent !== "=" && btn.textContent !== "ac");

  digitButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (calcValues.operator === "") {
        calcValues.a = calcValues.a.concat(btn.textContent);
      } else {
        calcValues.b = calcValues.b.concat(btn.textContent);
      }
    })
  );

  operateButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      calcValues.operator = btn.textContent;
    })
  );
}

function operate(a, operator, b) {
  let result;

  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      result = "uuh";
      break;
  }

  return String(result);
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
