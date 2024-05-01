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
};

const closeModal = (modalContainerElement, overlayElement) => {
  modalContainerElement.classList.add("hidden");
  overlayElement.classList.add("hidden");
};

const renderer = (listElement, array) => {
  if (listElement === fromListElement) {
    listElement.innerHTML = "";
    array.forEach((element) => {
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
      });
    });

    // Attach event listeners to li elements end====>
  } else if (listElement === toListElement) {
    listElement.innerHTML = "";
    array.forEach((element) => {
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

//Functions End ====>

//Variables Start ====>

const fromCurrencyElement = document.querySelector(".from-currency");

const toCurrencyElement = document.querySelector(".to-currency");

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

// Event Listeners End ====>

renderer(fromListElement, fromRatesArray);
renderer(toListElement, toRatesArray);
