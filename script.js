// add onClick event listener on each button
// - took textContent of each button
// - safe textContent in obj
// - - clear obj { a: null, operator: null, b: null }
// - and put this object values inside the display

const calcValues = {
  a: null,
  operator: null,
  b: null,
};

(function safeClickValue() {
  const digitButtons = [...document.querySelectorAll(".digits button")];

  const operateButtons = [
    ...document.querySelectorAll(".operators button"),
  ].filter((btn) => btn.textContent !== "=" && btn.textContent !== "ac");

  let clickValue = document.querySelector(".enter-display").textContent;

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
      clickValue = '';
    })
  );
})();

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
