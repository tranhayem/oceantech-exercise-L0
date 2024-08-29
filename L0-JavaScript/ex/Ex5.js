import { getProductById } from "./common.js";

export function calculateTotals(cartItems) {
  let totalQuantity = 0;
  let totalPrice = 0.0;

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      totalQuantity += item.soLuong;
      const product = getProductById(item.idSP);
      totalPrice += product.price * item.soLuong;
    });
  }

  const totalsMap = new Map();
  totalsMap.set("totalQuantity", totalQuantity);
  totalsMap.set("totalPrice", totalPrice.toFixed(2));

  return totalsMap;
}
