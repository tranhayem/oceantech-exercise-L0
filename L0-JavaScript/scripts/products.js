import {
  keyLocalStorageItemCart,
  keyLocalStorageListSP,
  listData,
  ordersUrl,
} from "./constants.js";
import { Utils } from "./utils.js";

const updateButtonState = (products, cartItems) => {
  products.forEach((product) => {
    const button = document.querySelector(
      `.button-add[data-id="${product.id}"]`
    );

    if (button) {
      const cartItem = cartItems.find((item) => item.idSP === product.id);
      if (
        product.quantity === 0 ||
        (cartItem && cartItem.soLuong >= product.quantity)
      ) {
        button.classList.add("disabled");
        button.disabled = true;
      }
    }
  });
};

const updateProductQuantities = async (products) => {
  const orders = await Utils.fetchData(ordersUrl);
  orders.forEach((order) => {
    order.cartItems.forEach((item) => {
      const product = products.find((p) => p.id === item.idSP);
      if (product) {
        product.quantity -= item.soLuong;
      }
    });
  });
  Utils.saveToLocalStorage(keyLocalStorageListSP, products);
};

const addSP = (productId) => {
  if (isNaN(productId) || productId <= 0) {
    Utils.showToast("Thông báo", "ID sản phẩm không hợp lệ.", "error");
    return;
  }

  try {
    const products = Utils.getFromLocalStorage(keyLocalStorageListSP);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      Utils.showToast("Thông báo", "Không tìm thấy sản phẩm.", "error");
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

    Utils.saveToLocalStorage(keyLocalStorageItemCart, cartItems);

    Utils.updateCartBadge();
  } catch (error) {
    Utils.showToast(
      "Thông báo",
      "Lỗi khi cập nhật giỏ hàng trong localStorage:",
      "error"
    );
  }
};

const renderProducts = async () => {
  let products = Utils.getFromLocalStorage(keyLocalStorageListSP);
  const productListElement = document.getElementById("product-list");

  if (!products) {
    productListElement.innerHTML =
      "<div>Không có sản phẩm nào trong cửa hàng.</div>";
    return;
  }

  await updateProductQuantities(products);

  const cartItems =
    JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];

  const productElements = products
    .filter((product) => product.quantity > 0)
    .map((product) => {
      return `<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                  <div class="card-img">
                    <img src="${product.imageUrl}" class="card-img-top"
                      alt="${product.name}">

                    <button class="button-add " data-id="${product.id}">
                      <i class="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>

                  <div class="card-body">
                    <p class="card-title text-center fs-6 fw-bold">
                      ${product.name}
                    </p>

                    <div class="d-flex justify-content-between">
                      <p class="card-text m-0">$${product.price.toFixed(2)}</p>
                      <p class="card-text m-0">Quantity: ${product.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>`;
    });

  productListElement.innerHTML = productElements.join("");

  document.querySelectorAll(".button-add").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id, 10);
      const product = products.find((p) => p.id === productId);

      if (!product || product.quantity <= 0) return;

      addSP(productId);

      const updatedCartItems =
        JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];
      const cartItem = updatedCartItems.find((item) => item.idSP === productId);

      Utils.showToast(
        "Thành công",
        `Bạn đã thêm ${product.name} vào giỏ hàng.`,
        "success"
      );

      if (cartItem && cartItem.soLuong >= product.quantity) {
        Utils.showToast(
          "Thông báo",
          `Số lượng sản phẩm bạn có thể thêm vào giỏ hàng đã đạt giới hạn.`,
          "info"
        );

        button.classList.add("disabled");
        button.disabled = true;
      }
    });
  });

  updateButtonState(products, cartItems);
};

document.addEventListener("DOMContentLoaded", () => {
  Utils.saveToLocalStorage(keyLocalStorageListSP, listData);
  Utils.updateCartBadge();
  renderProducts();
});
