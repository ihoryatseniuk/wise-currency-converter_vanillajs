// Functions======================================================

const attachListeners = (array) => {
  // rates.forEach((element) => {
  //   element.picked = false;
  // });
  const liElements = document.querySelectorAll(".li-element");
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener("click", () => {
      array.forEach((element) => {
        element.picked = false;
      });
      rates.forEach((element) => {
        element.picked = false;
      });
      array[i].picked = true;
      ratesRenderer(array);
    });
  }
};

const ratesRenderer = (array) => {
  console.log(rates);
  listElement.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const arrayObject = array[i];
    const { name, img, rate, picked } = arrayObject;
    listElement.innerHTML += `<li class="li-element">
    <div><img src="${img}"/><span>${name}</span></div>
    <img src="${picked === true ? "img/picked.svg" : ""}" />
  </li>`;
  }
  attachListeners(array);
};

const searchCurrency = (value) => {
  const filteredArray = rates.filter((element) => {
    return element.name.startsWith(`${value}`);
  });
  ratesRenderer(filteredArray);
};

// Functions======================================================

const fromInputCurrencyContainer = document.querySelector(
  ".from-input-currency-container"
);
const fromInput = document.querySelector(".from-input");
const fromSearchInput = document.querySelector(".search-container input");

fromSearchInput.addEventListener("input", () => {
  const fromSearchInputValue = fromSearchInput.value.toUpperCase();
  searchCurrency(fromSearchInputValue);
});

const listElement = document.querySelector(".list");

ratesRenderer(rates);

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
