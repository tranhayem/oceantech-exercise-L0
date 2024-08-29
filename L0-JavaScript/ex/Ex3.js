import { keyLocalStorageListSP, keyLocalStorageItemCart } from "./Ex1.js";
import { addSP } from "./Ex4.js";
import { showToast } from "./toast.js";

const updateButtonState = (products, cartItems) => {
  products.forEach((product) => {
    const button = document.querySelector(
      `.button-add[data-id="${product.id}"]`
    );

    if (button) {
      const cartItem = cartItems.find((item) => item.idSP === product.id);
      if (
        product.quantity === 0 ||
        (cartItem && cartItem.soLuong >= product.quantity)
      ) {
        button.classList.add("disabled");
        button.disabled = true;
      }
    }
  });
};

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem(keyLocalStorageListSP);

  if (!data) {
    console.error(
      "No data found in localStorage for key:",
      keyLocalStorageListSP
    );

    return;
  }

  try {
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) {
      console.error("Data from localStorage is not an array");

      return;
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);

    return data;
  }
};

export const renderProducts = () => {
  const products = getDataFromLocalStorage();
  const productListElement = document.getElementById("product-list");

  if (!products) {
    productListElement.innerHTML =
      "<div>There are currently no products in the store.</div>";
    return;
  }

  const cartItems =
    JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];

  const productElements = products
    .filter((product) => product.quantity > 0)
    .map((product) => {
      return `<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                  <div class="card-img">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <button class="button-add " data-id="${product.id}">
                      <i class="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>
                  <div class="card-body">
                    <p class="card-title text-center fs-6 fw-bold">${product.name}</p>
                    <div class="d-flex justify-content-between">
                      <p class="card-text m-0">$${product.price}</p>
                      <p class="card-text m-0">Quantity: ${product.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>`;
    });

  productListElement.innerHTML = productElements.join("");

  document.querySelectorAll(".button-add").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id, 10);
      const product = products.find((p) => p.id === productId);

      if (!product || product.quantity <= 0) return;

      addSP(productId);

      const updatedCartItems =
        JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];
      const cartItem = updatedCartItems.find((item) => item.idSP === productId);

      showToast(
        "Success",
        `You have added ${product.name} to your cart.`,
        "success"
      );

      if (cartItem && cartItem.soLuong >= product.quantity) {
        showToast(
          "Info",
          `The limit of products you can add to your cart has been reached.`,
          "info"
        );

        button.classList.add("disabled");
        button.disabled = true;
      }
    });
  });

  updateButtonState(products, cartItems);
};

renderProducts();
