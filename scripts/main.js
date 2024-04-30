// =========================================================================
// =========================== Functions ===================================
// =========================================================================

const openModal = () => {
  fromModalContainerElement.classList.remove("hidden");
  overlayElement.classList.remove("hidden");
  fromSearchInput.value = "";
  ratesRenderer(rates);
};

const closeModal = () => {
  fromModalContainerElement.classList.add("hidden");
  fromSearchInput.value = "";
  ratesRenderer(rates);
};

const attachListeners = (array) => {
  const liElements = document.querySelectorAll(".li-element");
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener("click", () => {
      fromModalContainerElement.classList.add("hidden");
      overlayElement.classList.add("hidden");
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
  listElement.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const arrayObject = array[i];
    const { name, img, rate, picked } = arrayObject;
    listElement.innerHTML += `<li class="li-element">
    <div><img src="${img}"/><span>${name}</span></div>
    <img src="${picked === true ? "img/picked.svg" : ""}" />
  </li>`;
  }
  currencyButtonRenderer();
  attachListeners(array);
};

const searchCurrency = (value) => {
  const filteredArray = rates.filter((element) => {
    return element.name.startsWith(`${value}`);
  });
  ratesRenderer(filteredArray);
};

const currencyButtonRenderer = () => {
  rates.forEach((element) => {
    if (element.picked) {
      fromCurrencyElement.innerHTML = ` <img src="${element.img}"/><span>${element.name}</span
      ><img src="img/arrow.svg" alt="arrow" />`;
    }
  });
};

// =========================================================================
// =========================== Functions ===================================
// =========================================================================

const fromInputCurrencyContainer = document.querySelector(
  ".from-input-currency-container"
);
const fromInput = document.querySelector(".from-input");
const fromSearchInput = document.querySelector(".search-container input");
const fromCurrencyElement = document.querySelector(".from-currency");
const fromModalContainerElement = document.querySelector(
  ".from-modal-container"
);
const overlayElement = document.querySelector(".overlay");
const listElement = document.querySelector(".list");

ratesRenderer(rates);

fromSearchInput.addEventListener("input", () => {
  const fromSearchInputValue = fromSearchInput.value.toUpperCase();
  searchCurrency(fromSearchInputValue);
});

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

fromCurrencyElement.addEventListener("click", () => {
  fromModalContainerElement.classList.contains("hidden")
    ? openModal()
    : closeModal();
});

overlayElement.addEventListener("click", () => {
  overlayElement.classList.add("hidden");
  closeModal();
});
