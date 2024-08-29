// Import calculateTotals from Ex5.js
import { keyLocalStorageItemCart } from "./Ex1.js";
import { calculateTotals } from "./Ex5.js";
import { getProductById } from "./common.js";

const getCartItems = () => {
  return JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];
};

const updateCartSummary = (cartItems) => {
  const totalsMap = calculateTotals(cartItems);

  const buyQuantityElement = document.querySelector(".buy-quantity");
  const totalMoneyElement = document.querySelector(".total-money");

  if (cartItems.length === 0) {
    buyQuantityElement.textContent = `Total Quantity: 0`;
    totalMoneyElement.textContent = `Total Price: $0.00`;
  } else {
    buyQuantityElement.textContent = `Total Quantity: ${totalsMap.get(
      "totalQuantity"
    )}`;
    totalMoneyElement.textContent = `Total Price: $${totalsMap.get(
      "totalPrice"
    )}`;
  }
};

const renderCartItems = () => {
  const cartItems = getCartItems();
  const cartItemsContainer = document.querySelector(".cart-items");

  if (!cartItems.length) {
    cartItemsContainer.innerHTML =
      "<tr><td colspan='5'>Your cart is empty.</td></tr>";
  } else {
    cartItemsContainer.innerHTML = cartItems
      .map((item) => {
        const product = getProductById(item.idSP);
        const productInStock = product.quantity;
        const purchaseQuantity = item.soLuong;
        const isMaxQuantity = purchaseQuantity >= productInStock;
        const subtotal = product.price * item.soLuong;

        return `<tr>
          <td class="text-start">
            <img src="${product.imageUrl}"
              alt="${product.name}" width="80px"
              class="m-2 bg-body-secondary p-1 object-fit-cover">

            <div class="d-inline-block align-middle">
              <div class="fw-bold">${product.name}</div>
              <div>Quantity: ${productInStock}</div>
            </div>
          </td>

          <td class="">
            <button class="btn btn-outline-secondary quantity-decrease" data-id="${
              item.idSP
            }" ${purchaseQuantity === 1 ? "disabled" : ""}>-</button>

            <span class="mx-2">${purchaseQuantity}</span>

            <button class="btn btn-outline-secondary quantity-increase" data-id="${
              item.idSP
            }" ${isMaxQuantity ? "disabled" : ""}>+</button>
          </td>

          <td class="">$${product.price.toFixed(2)}</td>

          <td class="">$${subtotal.toFixed(2)}</td>

          <td class="">
            <button class="btn btn-outline-danger clear-btn rounded-circle" data-id="${
              item.idSP
            }">
              <i class="fas fa-times"></i>
            </button>
          </td>
        </tr>`;
      })
      .join("");
  }

  // Gắn các sự kiện vào các nút sau khi render lại giao diện
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
    });
  });

  // Luôn cập nhật thông tin giỏ hàng
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

renderCartItems();
