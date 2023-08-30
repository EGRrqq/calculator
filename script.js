// add an onClick event listener for the 'ac' button
// - iterate over the calcValues obj, set all values to null
// - clear input.value

// wrap up input with container
// add div.textContent '='
// add div.textContent = result of operate() function

const calcValues = {
  a: null,
  operator: null,
  b: null,
};

(function calculator() {
  safeClickValue();
  displayValues();
  calc();
  clearCalc();
})();

function clearCalc() {
  const clearButton = [
    ...document.querySelectorAll(".operators button"),
  ].find((btn) => btn.textContent === "ac");

  const input = document.querySelector(".enter-display");

  clearButton.addEventListener("click", () => {
    for (let key in calcValues) {
      calcValues[key] = null;
    }

    input.value = '';
  });
}

function calc() {
  const equalButton = [
    ...document.querySelectorAll(".operators button"),
  ].find((btn) => btn.textContent === "=");

  equalButton.addEventListener("click", () => {
    console.log(operate(calcValues.a, calcValues.operator, calcValues.b));
  });
}

function displayValues() {
  const buttons = [...document.querySelectorAll("button")].filter(
    (btn) => btn.textContent !== "=" && btn.textContent !== "ac"
  );

  const input = document.querySelector(".enter-display");

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      input.value = input.value.concat(btn.textContent);
    })
  );
}

function safeClickValue() {
  const digitButtons = document.querySelectorAll(".digits button");

  const operateButtons = [
    ...document.querySelectorAll(".operators button"),
  ].filter((btn) => btn.textContent !== "=" && btn.textContent !== "ac");

  let clickValue = "";

  digitButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      clickValue = clickValue.concat(btn.textContent);

      if (calcValues.operator === null) {
        calcValues.a = parseInt(clickValue);
      } else {
        calcValues.b = parseInt(clickValue);
      }
    })
  );

  operateButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      calcValues.operator = btn.textContent;
      clickValue = "";
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
