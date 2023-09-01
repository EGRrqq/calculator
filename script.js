const calcValues = {
  a: "",
  operator: "",
  b: "",
  result: "",
};

(function calculator() {
  safeClickValue();
  backspaceButton();
  displayValues();
  validateInput(calc);
  clearCalc();
})();

function validateInput(calc) {
  const equalButton = [...document.querySelectorAll(".operators button")].find(
    (btn) => btn.textContent === "="
  );

  const inputContainer = document.querySelector(".enter-display");
  const inputError = document.createElement("div");

  equalButton.addEventListener("click", () => {
    if (
      calcValues.a === "." ||
      calcValues.b === "." ||
      (calcValues.a && calcValues.operator && calcValues.b === "") ||
      (calcValues.a[1] === "." && calcValues.a.length === 2) ||
      (calcValues.b[1] === "." && calcValues.b.length === 2)
    ) {
      return;
    } else if (calcValues.b && calcValues.operator && calcValues.a === "") {
      calcValues.a = "0";

      calc();
    } else if (calcValues.a.includes(".") && calcValues.b.includes(".")) {
      let fixedNum;

      calcValues.a.split(".")[1].length > calcValues.b.split(".")[1].length
        ? (fixedNum = calcValues.a.split(".")[1].length)
        : (fixedNum = calcValues.b.split(".")[1].length);

      calcValues.result = parseFloat(countResult())
        .toFixed(fixedNum)
        .toString();

      displayResult();
      clearValues();
      assignValue();
    } else if (
      (calcValues.a[0] === "." && calcValues.a.length === 2) ||
      (calcValues.b[0] === "." && calcValues.b.length === 2)
    ) {
      calc();
    } else if (
      calcValues.a !== "" &&
      calcValues.operator === "" &&
      calcValues.b === ""
    ) {
      calcValues.result = calcValues.a;

      displayResult();
      clearValues();
      assignValue();
    } else if (calcValues.operator === "/" && calcValues.b === "0") {
      inputError.textContent = "Division by zero is undefined";

      inputContainer.appendChild(inputError);
    } else if (calcValues.operator !== "" && calcValues.b === "") {
      inputError.textContent = "Malformed expression";

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

function backspaceButton() {
  const backspaceBtn = document.querySelector('button[data-content="b"]');

  backspaceBtn.addEventListener("click", () => {
    if (calcValues.operator === "") {
      calcValues.a = calcValues.a.slice(0, -1);
    } else if (calcValues.b === "") {
      calcValues.operator = calcValues.operator.slice(0, -1);
    } else {
      calcValues.b = calcValues.b.slice(0, -1);
    }
  });
}

function clearCalc() {
  const clearButton = [...document.querySelectorAll(".operators button")].find(
    (btn) => btn.textContent === "ac"
  );

  const periodBtn = document.querySelector('button[data-content="."]');
  const input = document.querySelector("input");

  clearButton.addEventListener("click", () => {
    for (let key in calcValues) {
      calcValues[key] = "";
    }

    input.value = "";
    clearResult();
    periodBtn.addEventListener("click", concatValues, true);
  });
}

function countResult() {
  return operate(
    parseFloat(calcValues.a),
    calcValues.operator,
    parseFloat(calcValues.b)
  );
}

function calc() {
  calcValues.result = countResult();
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

function concatValues(event) {
  const periodBtn = document.querySelector('button[data-content="."]');

  if (calcValues.operator === "") {
    calcValues.a = calcValues.a.concat(event.target.textContent);
  } else {
    calcValues.b = calcValues.b.concat(event.target.textContent);
  }

  if (calcValues.a.includes(".") && calcValues.b === "") {
    periodBtn.removeEventListener("click", concatValues, true);
  }

  if (calcValues.b.includes(".")) {
    periodBtn.removeEventListener("click", concatValues, true);
  }
}

function safeClickValue() {
  const digitButtons = document.querySelectorAll(".digits button");
  const periodBtn = document.querySelector('button[data-content="."]');

  const operateButtons = [
    ...document.querySelectorAll(".operators button"),
  ].filter(
    (btn) =>
      btn.textContent !== "=" &&
      btn.textContent !== "ac" &&
      btn.textContent !== "b"
  );

  digitButtons.forEach((btn) =>
    btn.addEventListener("click", concatValues, true)
  );

  operateButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      calcValues.operator = btn.textContent;

      if (calcValues.a.includes(".")) {
        periodBtn.addEventListener("click", concatValues, true);
      }
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
