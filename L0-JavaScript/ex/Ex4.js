import { keyLocalStorageItemCart } from "./Ex1.js";

const addButtons = document.querySelectorAll(".button-add");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = parseInt(button.dataset.id, 10);

    addProductToCart(productId);
  });
});

export const addProductToCart = (productId) => {
  if (isNaN(productId) || productId <= 0) {
    console.error("Invalid product ID");
    return;
  }

  try {
    let cartItems =
      JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];

    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to update cart in localStorage:", error);
  }
};
