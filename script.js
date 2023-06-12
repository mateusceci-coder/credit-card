const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const inputMonth = document.querySelector("#month");
const showMonth = document.querySelector("#showmonth");
const inputsNumbers = document.querySelectorAll("input:not(#cardName)");
const errors = document.querySelectorAll(".errorMsg");
const inputNumber = document.querySelector("#cardNumber");
const thanksMsg = document.querySelector(".thanks-msg");

inputs.forEach((input) =>
  input.addEventListener("input", () => {
    const card = document.getElementById(`show${input.id}`);
    card.textContent = input.value;
  })
);

inputNumber.addEventListener("input", () => {
  const card = document.getElementById("showcardNumber");
  let formattedContext = "";
  let value = inputNumber.value;
  for (let i = 0; i < value.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      formattedContext += " ";
    }
    formattedContext += value[i];
  }
  card.textContent = formattedContext;
});

inputMonth.addEventListener("input", () => {
  if (inputMonth.value !== "") {
    showMonth.textContent = inputMonth.value + "/";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeStyles();
  const isNotEmpty = notEmpty();
  const isNumbersOnly = numbersOnly();

  if (isNotEmpty && isNumbersOnly) {
    form.style.display = "none";
    thanksMsg.style.display = "flex";
  }
});

function notEmpty() {
  inputs.forEach((input) => {
    const errorMsg = document.getElementById(`${input.id}Error`);
    if (input.value === "") {
      errorMsg.style.display = "flex";
      errorMsg.textContent = "This field is empty";
      input.style.borderColor = "var(--Red)";
    }
  });

  return [...inputs].every((input) => {
    if (input.value !== "") {
      return true;
    } else {
      return false;
    }
  });
}

function numbersOnly() {
  inputsNumbers.forEach((input) => {
    const errorMsg = document.getElementById(`${input.id}Error`);
    if (isNaN(+input.value)) {
      errorMsg.style.display = "flex";
      errorMsg.textContent = "Wrong format, numbers Only";
      input.style.borderColor = "var(--Red)";
    }
  });

  return [...inputsNumbers].every((input) => {
    if (!isNaN(+input.value)) {
      return true;
    } else {
      return false;
    }
  });
}

function removeStyles() {
  inputs.forEach((input) => {
    input.style.borderColor = "var(--Light-grayish-violet)";
  });

  errors.forEach((error) => {
    error.style.display = "none";
    error.textContent = "";
  });
}
