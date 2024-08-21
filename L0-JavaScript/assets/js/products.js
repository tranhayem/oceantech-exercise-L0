import { listData } from "./constants.js";

const renderProductHTML = (product) => {
  return `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
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
    </div>
  `;
};

const displayProducts = () => {
  const productContainer = document.getElementById("product-list");
  if (listData.length == 0) {
    productContainer.innerHTML = "<p>Hiện tại không có sản phẩm nào</p>";
    return;
  }

  productContainer.innerHTML = listData.map(renderProductHTML).join("");
};

document.addEventListener("DOMContentLoaded", displayProducts);
