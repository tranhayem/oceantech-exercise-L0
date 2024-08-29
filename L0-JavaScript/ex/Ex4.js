import { keyLocalStorageItemCart } from "./Ex1.js";

const addButtons = document.querySelectorAll(".button-add");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = parseInt(button.dataset.id, 10);

    addSP(productId);
  });
});

export const addSP = (productId) => {
  if (isNaN(productId) || productId <= 0) {
    console.error("Invalid product ID");
    return;
  }

  try {
    let cartItems =
      JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];

    const existingProduct = cartItems.find((item) => item.idSP === productId);

    if (existingProduct) {
      existingProduct.soLuong += 1;
    } else {
      cartItems.push({ idSP: productId, soLuong: 1 });
    }

    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to update cart in localStorage:", error);
  }
};
