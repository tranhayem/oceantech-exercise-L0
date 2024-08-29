import { keyLocalStorageItemCart, keyLocalStorageListSP } from "./Ex1.js";

export const addSP = (productId) => {
  if (isNaN(productId) || productId <= 0) {
    console.error("Invalid product ID");
    return;
  }

  try {
    const products =
      JSON.parse(localStorage.getItem(keyLocalStorageListSP)) || [];

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
      cartItems.push({ idSP: productId, soLuong: 1, price: product.price });
    }

    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to update cart in localStorage:", error);
  }
};
