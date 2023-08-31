// wrap up input with container
// add div.textContent '='
// add div.textContent = result of operate() function

const calcValues = {
  a: "",
  operator: "",
  b: "",
  result: "",
};

(function calculator() {
  safeClickValue();
  displayValues();
  calc();
  clearCalc();
})();

function clearResult() {
  const displayContainer = document.querySelector(".enter-display");
  const items = [...document.querySelectorAll(".enter-display div")];

  for (let item of items) {
    displayContainer.removeChild(item);
  }
}

function displayResult() {
  const displayContainer = document.querySelector(".enter-display");

  const equalOperator = document.createElement("div");
  const calcResult = document.createElement("div");

  equalOperator.textContent = "=";
  calcResult.textContent = calcValues.result;

  displayContainer.appendChild(equalOperator);
  displayContainer.appendChild(calcResult);
}

function clearCalc() {
  const clearButton = [...document.querySelectorAll(".operators button")].find(
    (btn) => btn.textContent === "ac"
  );

  const input = document.querySelector("input");

  clearButton.addEventListener("click", () => {
    for (let key in calcValues) {
      calcValues[key] = '';
    }

    input.value = "";
    clearResult();
  });
}

function calc() {
  const equalButton = [...document.querySelectorAll(".operators button")].find(
    (btn) => btn.textContent === "="
  );

  equalButton.addEventListener("click", () => {
    calcValues.result = operate(
      parseInt(calcValues.a),
      calcValues.operator,
      parseInt(calcValues.b)
    );

    displayResult();
  });
}

function displayValues() {
  const buttons = [...document.querySelectorAll("button")].filter(
    (btn) => btn.textContent !== "=" && btn.textContent !== "ac"
  );

  const input = document.querySelector("input");

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      input.value = Object.values(calcValues)
        .filter((val) => val !== '')
        .join(" ");
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

  return result;
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
