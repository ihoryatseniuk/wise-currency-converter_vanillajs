const fromInputCurrencyContainer = document.querySelector(
  ".from-input-currency-container"
);

const fromInput = document.querySelector(".from-input");

fromInputCurrencyContainer.addEventListener("mouseover", () => {
  fromInputCurrencyContainer.classList.add("hover");
});

fromInputCurrencyContainer.addEventListener("mouseout", () => {
  fromInputCurrencyContainer.classList.remove("hover");
});

fromInput.addEventListener("focus", () => {
  fromInputCurrencyContainer.classList.add("focus");
});

fromInput.addEventListener("blur", () => {
  fromInputCurrencyContainer.classList.remove("focus");
});
