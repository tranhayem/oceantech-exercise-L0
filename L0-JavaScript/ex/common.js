import { keyLocalStorageItemCart, keyLocalStorageListSP } from "./Ex1.js";

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

export const getProductById = (idSP) => {
  const products = getDataFromLocalStorage();
  return products.find((product) => product.id === idSP);
};

export const updateCartBadge = () => {
  const cartItems =
    JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];

  const itemCount = cartItems.length;

  const cartBadge = document.getElementById("cart-badge");

  if (cartBadge) {
    cartBadge.textContent = itemCount;

    cartBadge.style.display = itemCount > 0 ? "block" : "none";
  }
};
