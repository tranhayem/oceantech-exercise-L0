import { keyLocalStorageListSP } from "./Ex1.js";

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem(keyLocalStorageListSP);

  if (!data) {
    console.error(
      "No data found in localStorage for key:",
      keyLocalStorageListSP
    );
    return null;
  }

  try {
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)) {
      console.error("Data from localStorage is not an array");
      return null;
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
    return null;
  }
};

export const renderProducts = () => {
  const products = getDataFromLocalStorage();

  if (!products) return;

  const productListElement = document.getElementById("product-list");
  productListElement.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
    productElement.innerHTML = `
      <div class="card">
        <div class="card-img">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          
          <button class="button-add" data-id=${product.id}>
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
    `;

    productListElement.appendChild(productElement);
  });
};

window.onload = renderProducts;
