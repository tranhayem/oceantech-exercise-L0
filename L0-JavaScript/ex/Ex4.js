import { keyLocalStorageItemCart } from "./Ex1";

export const addSP = (productId, quantity = 1) => {
  const cart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];
  const productIndex = cart.findIndex((item) => item.idSP === productId);

  if (productIndex > -1) {
    cart[productIndex].soLuong += quantity;
  } else {
    cart.push({ idSP: productId, soLuong: quantity });
  }

  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cart));
};
