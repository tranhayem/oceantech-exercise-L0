import { keyLocalStorageItemCart } from "./Ex1.js";
import { getFromLocalStorage } from "./Ex12.js";
import { calculateTotals } from "./Ex5.js";
import { getProductById } from "./common.js";

const getCartItems = () => {
  return getFromLocalStorage(keyLocalStorageItemCart);
};

const updateCartSummary = (cartItems) => {
  const totalsMap = calculateTotals(cartItems);

  const buyQuantityElement = document.querySelector(".buy-quantity");
  const totalMoneyElement = document.querySelector(".total-money");

  buyQuantityElement.textContent = `Total Quantity: ${totalsMap.get(
    "totalQuantity"
  )}`;
  totalMoneyElement.textContent = `Total Price: $${totalsMap.get(
    "totalPrice"
  )}`;
};

const renderCartItems = () => {
  const cartItems = getCartItems();
  const cartItemsContainer = document.querySelector(".cart-items");

  if (!cartItems || !cartItems.length) {
    document.querySelector(".shopping-cart").style.display = "none";

    const container = document.querySelector(".main-content");
    container.innerHTML = `
      <div class="empty-cart text-center mt-5">
        <img src="../assets/images/emptyCart.png" alt="Empty Cart" />
        
        <div class="text-start">
          <a class="text-decoration-none btn-outline-danger btn-back-to-home" href="./home.html">
            <i class="fa-solid fa-arrow-left"></i>
              Back to Shopping
          </a>
        </div>
      </div>
    `;

    return;
  }

  document.querySelector(".shopping-cart").style.display = "block";

  cartItemsContainer.innerHTML = cartItems
    .map((item) => {
      const product = getProductById(item.idSP);
      const productInStock = product.quantity;
      const purchaseQuantity = item.soLuong;
      const isMaxQuantity = purchaseQuantity >= productInStock;
      const subtotal = product.price * item.soLuong;

      return `<tr>
        <td class="align-middle text-start">
          <img src="${product.imageUrl}"
            alt="${product.name}" width="60px"
            class="m-2 bg-body-secondary p-1 object-fit-cover">
          
          <div class="d-inline-block align-middle">
            <div class="fw-bold">${product.name}</div>
            <div>Quantity: ${productInStock}</div>
          </div>
        </td>

        <td>
          <button class="btn quantity-decrease border-0 fs-5
            ${purchaseQuantity === 1 ? "invisible" : ""}"
            data-id="${item.idSP}">
              -
          </button>

          <span class="mx-2">${purchaseQuantity}</span>

          <button class="btn quantity-increase border-0 fs-5
            ${isMaxQuantity ? "invisible" : ""}"
            data-id="${item.idSP}">
              +
          </button>
        </td>

        <td>$${product.price}</td>

        <td>$${subtotal}</td>

        <td>
          <button class="btn btn-outline-danger rounded-circle clear-btn"
            data-id="${item.idSP}">
              <i class="fas fa-times"></i>
          </button>
        </td>
      </tr>`;
    })
    .join("");

  document.querySelectorAll(".quantity-decrease").forEach((button) => {
    button.addEventListener("click", () => {
      updateCartItemQuantity(parseInt(button.dataset.id, 10), -1);
    });
  });

  document.querySelectorAll(".quantity-increase").forEach((button) => {
    button.addEventListener("click", () => {
      updateCartItemQuantity(parseInt(button.dataset.id, 10), 1);
    });
  });

  document.querySelectorAll(".clear-btn").forEach((button) => {
    button.addEventListener("click", () => {
      clearCartItem(parseInt(button.dataset.id, 10));
      updateCartBadge();
    });
  });

  updateCartSummary(cartItems);
};

const updateCartItemQuantity = (idSP, delta) => {
  const cartItems = getCartItems();
  const item = cartItems.find((item) => item.idSP === idSP);

  if (item) {
    const product = getProductById(idSP);
    const newQuantity = item.soLuong + delta;

    if (newQuantity > 0 && newQuantity <= product.quantity) {
      item.soLuong = newQuantity;
    }

    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartItems));
    renderCartItems();
  }
};

const clearCartItem = (idSP) => {
  let cartItems = getCartItems();
  cartItems = cartItems.filter((item) => item.idSP !== idSP);
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(cartItems));
  renderCartItems();
};

document.addEventListener("DOMContentLoaded", () => {
  const buyButton = document.querySelector(".buy-btn");

  if (buyButton) {
    buyButton.addEventListener("click", () => {
      const buyModal = new bootstrap.Modal(document.getElementById("buyModal"));
      buyModal.show();
    });
  }

  const form = document.querySelector("#buyModal form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Form submitted!");
    const buyModal = bootstrap.Modal.getInstance(
      document.getElementById("buyModal")
    );
    buyModal.hide();
  });
});

renderCartItems();
