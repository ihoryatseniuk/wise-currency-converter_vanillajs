const fromRatesArray = [
  { name: "CAD", img: "img/cad.svg", rate: 1.36, picked: false },
  { name: "CNY", img: "img/cny.svg", rate: 7.24, picked: false },
  { name: "CZK", img: "img/czk.svg", rate: 23.53, picked: false },
  { name: "EUR", img: "img/eur.svg", rate: 0.93, picked: false },
  { name: "GBP", img: "img/gbp.svg", rate: 0.8, picked: false },
  { name: "JPY", img: "img/jpy.svg", rate: 154.77, picked: false },
  { name: "PLN", img: "img/pln.svg", rate: 4.024, picked: false },
  { name: "RUB", img: "img/rub.svg", rate: 93.22, picked: false },
  { name: "UAH", img: "img/uah.svg", rate: 40.0, picked: false },
  { name: "USD", img: "img/usd.svg", rate: 1, picked: true },
];

const toRatesArray = [
  { name: "CAD", img: "img/cad.svg", rate: 1.36, picked: false },
  { name: "CNY", img: "img/cny.svg", rate: 7.24, picked: false },
  { name: "CZK", img: "img/czk.svg", rate: 23.53, picked: false },
  { name: "EUR", img: "img/eur.svg", rate: 0.93, picked: false },
  { name: "GBP", img: "img/gbp.svg", rate: 0.8, picked: false },
  { name: "JPY", img: "img/jpy.svg", rate: 154.77, picked: false },
  { name: "PLN", img: "img/pln.svg", rate: 4.024, picked: false },
  { name: "RUB", img: "img/rub.svg", rate: 93.22, picked: false },
  { name: "UAH", img: "img/uah.svg", rate: 40.0, picked: true },
  { name: "USD", img: "img/usd.svg", rate: 1, picked: false },
];

// Functions Start ====>

const openModal = (modalContainerElement, overlayElement) => {
  modalContainerElement.classList.remove("hidden");
  overlayElement.classList.remove("hidden");
  if (modalContainerElement === fromModalContainerElement) {
    fromSearchContainerInput.focus();
  } else if (modalContainerElement === toModalContainerElement) {
    toSearchContainerInput.focus();
  }
};

const closeModal = (modalContainerElement, overlayElement) => {
  modalContainerElement.classList.add("hidden");
  overlayElement.classList.add("hidden");
  if (modalContainerElement === fromModalContainerElement) {
    fromSearchContainerInput.value = "";
    renderer(fromListElement, fromRatesArray);
  } else if (modalContainerElement === toModalContainerElement) {
    toSearchContainerInput.value = "";
    renderer(toListElement, toRatesArray);
  }
};

const renderer = (listElement, array) => {
  // toInputCurrencyContainerInputElement.value = "";
  rateRenderer();
  if (listElement === fromListElement) {
    listElement.innerHTML = "";
    array.forEach((element) => {
      if (element.picked) {
        fromCurrencyElementImage.src = `${element.img}`;
        fromCurrencyElementText.innerHTML = `${element.name}`;
        currency1Element.innerHTML = `${element.name}`;
      }
      listElement.innerHTML += `<li class="from-li-element">
    <div><img src="${element.img}" /><span>${element.name}</span></div>
    <img src="${element.picked ? "img/picked.svg" : ""}" />
  </li>`;
    });

    // Render of li elements end====>

    // Attach event listeners to li elements start====>

    const liElements = document.querySelectorAll(".from-li-element");
    liElements.forEach((element1, index) => {
      element1.addEventListener("click", () => {
        array.forEach((element2) => {
          element2.picked = false;
        });

        array[index].picked = true;

        for (let i = 0; i < fromRatesArray.length; i++) {
          fromRatesArray[i].picked = false;
        }

        for (let i = 0; i < fromRatesArray.length; i++) {
          if (fromRatesArray[i].name === array[index].name) {
            fromRatesArray[i].picked = true;
          }
        }
        renderer(listElement, array);
        closeModal(fromModalContainerElement, fromOverlayElement);
        calculateResult();
      });
    });

    // Attach event listeners to li elements end====>
  } else if (listElement === toListElement) {
    listElement.innerHTML = "";
    array.forEach((element) => {
      if (element.picked) {
        toCurrencyElementImage.src = `${element.img}`;
        toCurrencyElementText.innerHTML = `${element.name}`;
        currency2Element.innerHTML = `${element.name}`;
      }
      listElement.innerHTML += `<li class="to-li-element">
    <div><img src="${element.img}" /><span>${element.name}</span></div>
    <img src="${element.picked ? "img/picked.svg" : ""}" />
  </li>`;
    });

    // Render of li elements end====>

    // Attach event listeners to li elements start====>

    const liElements = document.querySelectorAll(".to-li-element");
    liElements.forEach((element1, index) => {
      element1.addEventListener("click", () => {
        array.forEach((element2) => {
          element2.picked = false;
        });

        array[index].picked = true;

        for (let i = 0; i < toRatesArray.length; i++) {
          toRatesArray[i].picked = false;
        }

        for (let i = 0; i < toRatesArray.length; i++) {
          if (toRatesArray[i].name === array[index].name) {
            toRatesArray[i].picked = true;
          }
        }

        renderer(listElement, array);
        closeModal(toModalContainerElement, toOverlayElement);
        calculateResult();
      });
    });

    // Attach event listeners to li elements end====>
  }
};

const search = (listElement, array, value) => {
  const filteredArray = array.filter((element) => {
    return element.name.startsWith(`${value}`);
  });
  renderer(listElement, filteredArray);
};

const rateRenderer = () => {
  let fromCurrency;
  let toCurrency;
  let toCurrencyRate;
  let fromCurrencyRate;

  fromRatesArray.forEach((element) => {
    if (element.picked) {
      fromCurrency = element.name;
      fromCurrencyRate = element.rate;
    }
  });

  toRatesArray.forEach((element) => {
    if (element.picked) {
      toCurrency = element.name;
      toCurrencyRate = element.rate;
    }
  });

  const result = 1000 * (toCurrencyRate / fromCurrencyRate);

  fromRateElement.innerHTML = `<p>1000 ${fromCurrency} = <span style="color: #008026">${result.toFixed(
    2
  )}</span> ${toCurrency}</p>
  <p>Mid-market exchange rate at 10:04</p>`;
};

const calculateResult = () => {
  let fromCurrencyRate;
  let toCurrencyRate;

  fromCurrencyRate = fromRatesArray.find((element) => element.picked === true);
  toCurrencyRate = toRatesArray.find((element) => element.picked === true);

  const result =
    fromInputCurrencyContainerInputElement.value *
    (toCurrencyRate.rate / fromCurrencyRate.rate);
  toInputCurrencyContainerInputElement.value = result.toFixed(2);
};

const calculateInputsValueOnChange = (identificator) => {
  let fromCurrencyRate;
  let toCurrencyRate;

  fromCurrencyRate = fromRatesArray.find((element) => element.picked === true);
  toCurrencyRate = toRatesArray.find((element) => element.picked === true);

  if (identificator === "from") {
    const result =
      fromInputCurrencyContainerInputElement.value *
      (toCurrencyRate.rate / fromCurrencyRate.rate);
    toInputCurrencyContainerInputElement.value = result.toFixed(2);
  } else if (identificator === "to") {
    const result =
      toInputCurrencyContainerInputElement.value *
      (fromCurrencyRate.rate / toCurrencyRate.rate);
    fromInputCurrencyContainerInputElement.value = result.toFixed(2);
  }
};

const revertCurrencies = () => {
  const fromCurrency = fromRatesArray.find(
    (element) => element.picked === true
  );
  const toCurrency = toRatesArray.find((element) => element.picked === true);

  for (let i = 0; i < fromRatesArray.length; i++) {
    fromRatesArray[i].picked = false;
    toRatesArray[i].picked = false;
  }

  for (let i = 0; i < toRatesArray.length; i++) {
    if (toRatesArray[i].name === fromCurrency.name) {
      toRatesArray[i].picked = true;
    }
  }

  for (let i = 0; i < fromRatesArray.length; i++) {
    if (fromRatesArray[i].name === toCurrency.name) {
      fromRatesArray[i].picked = true;
    }
  }

  renderer(fromListElement, fromRatesArray);
  renderer(toListElement, toRatesArray);
  calculateInputsValueOnChange("from");
};

//Functions End ====>

//Variables Start ====>

const fromRateElement = document.querySelector(".from-rate");

const currency1Element = document.querySelector(".currency1");
const currency2Element = document.querySelector(".currency2");

const fromCurrencyElement = document.querySelector(".from-currency");
const fromCurrencyElementImage = document.querySelector(".from-currency img");
const fromCurrencyElementText = document.querySelector(".from-currency span");

const fromInputCurrencyContainerElement = document.querySelector(
  ".from-input-currency-container"
);
const toInputCurrencyContainerElement = document.querySelector(
  ".to-input-currency-container"
);

const fromInputCurrencyContainerInputElement = document.querySelector(
  ".from-input-currency-container input"
);
const toInputCurrencyContainerInputElement = document.querySelector(
  ".to-input-currency-container input"
);

const toCurrencyElement = document.querySelector(".to-currency");
const toCurrencyElementImage = document.querySelector(".to-currency img");
const toCurrencyElementText = document.querySelector(".to-currency span");

const fromModalContainerElement = document.querySelector(
  ".from-modal-container"
);

const toModalContainerElement = document.querySelector(".to-modal-container");

const fromListElement = document.querySelector(".from-list");

const toListElement = document.querySelector(".to-list");

const fromOverlayElement = document.querySelector(".from-overlay");

const toOverlayElement = document.querySelector(".to-overlay");

const fromSearchContainerInput = document.querySelector(
  ".from-search-container input"
);

const toSearchContainerInput = document.querySelector(
  ".to-search-container input"
);

const getExchangeRateButtonElement = document.querySelector(
  ".get-exchange-rate-button"
);

const revertImageElement = document.querySelector(".revert-image");

//Variables End ====>

// Event Listeners Start ====>

fromCurrencyElement.addEventListener("click", () => {
  fromModalContainerElement.classList.contains("hidden")
    ? openModal(fromModalContainerElement, fromOverlayElement)
    : closeModal(fromModalContainerElement, fromOverlayElement);
});

toCurrencyElement.addEventListener("click", () => {
  toModalContainerElement.classList.contains("hidden")
    ? openModal(toModalContainerElement, toOverlayElement)
    : closeModal(toModalContainerElement, toOverlayElement);
});

fromOverlayElement.addEventListener("click", () => {
  closeModal(fromModalContainerElement, fromOverlayElement);
});

toOverlayElement.addEventListener("click", () => {
  closeModal(toModalContainerElement, toOverlayElement);
});

fromSearchContainerInput.addEventListener("input", () => {
  const fromSearchInputValue = fromSearchContainerInput.value.toUpperCase();
  search(fromListElement, fromRatesArray, fromSearchInputValue);
});

toSearchContainerInput.addEventListener("input", () => {
  const toSearchInputValue = toSearchContainerInput.value.toUpperCase();
  search(toListElement, toRatesArray, toSearchInputValue);
});

fromInputCurrencyContainerElement.addEventListener("mouseover", () => {
  fromInputCurrencyContainerElement.classList.add("hover");
});

fromInputCurrencyContainerElement.addEventListener("mouseout", () => {
  fromInputCurrencyContainerElement.classList.remove("hover");
});

fromInputCurrencyContainerInputElement.addEventListener("focus", () => {
  fromInputCurrencyContainerElement.classList.add("focus");
});

fromInputCurrencyContainerInputElement.addEventListener("blur", () => {
  fromInputCurrencyContainerElement.classList.remove("hover", "focus");
});

toInputCurrencyContainerElement.addEventListener("mouseover", () => {
  toInputCurrencyContainerElement.classList.add("hover");
});

toInputCurrencyContainerElement.addEventListener("mouseout", () => {
  toInputCurrencyContainerElement.classList.remove("hover");
});

toInputCurrencyContainerInputElement.addEventListener("focus", () => {
  toInputCurrencyContainerElement.classList.add("focus");
});

toInputCurrencyContainerInputElement.addEventListener("blur", () => {
  toInputCurrencyContainerElement.classList.remove("hover", "focus");
});

toInputCurrencyContainerInputElement.addEventListener("input", () => {
  calculateInputsValueOnChange("to");
});

fromInputCurrencyContainerInputElement.addEventListener("input", () => {
  calculateInputsValueOnChange("from");
});

getExchangeRateButtonElement.addEventListener("click", () => {
  calculateResult();
});

revertImageElement.addEventListener("click", () => {
  revertCurrencies();
});

// Event Listeners End ====>

renderer(fromListElement, fromRatesArray);
renderer(toListElement, toRatesArray);
rateRenderer();
toInputCurrencyContainerInputElement.value = 40000;
