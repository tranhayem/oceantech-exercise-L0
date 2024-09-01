import { updateCartBadge } from "./common.js";
import { keyLocalStorageItemCart, keyLocalStorageListSP } from "./Ex1.js";
import { getFromLocalStorage, saveToLocalStorage } from "./Ex12.js";

export const addSP = (productId) => {
  if (isNaN(productId) || productId <= 0) {
    console.error("Invalid product ID");
    return;
  }

  try {
    const products = getFromLocalStorage(keyLocalStorageListSP);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      console.error("Product not found");
      return;
    }

    let cartItems =
      JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];

    const existingProduct = cartItems.find((item) => item.idSP === productId);

    if (existingProduct) {
      existingProduct.soLuong += 1;
    } else {
      cartItems.push({
        idSP: productId,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        soLuong: 1,
      });
    }

    saveToLocalStorage(keyLocalStorageItemCart, cartItems);

    updateCartBadge();
  } catch (error) {
    console.error("Failed to update cart in localStorage:", error);
  }
};
