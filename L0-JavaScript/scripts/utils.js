import { keyLocalStorageItemCart, keyLocalStorageListSP } from "./constants.js";

export const Utils = (() => {
  const saveToLocalStorage = (key, value = []) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  };

  const getFromLocalStorage = (key, defaultValue = []) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error("Failed to get data from localStorage:", error);
      return defaultValue;
    }
  };

  const fetchData = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("Error fetching data:", err);
      showToast(
        "Lỗi",
        "Không thể kết nối đến server. Vui lòng thử lại sau.",
        "error"
      );
      return null;
    }
  };

  const calculateTotals = (cartItems) => {
    let totalQuantity = 0;
    let totalPrice = 0;

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
  };

  const updateCartBadge = () => {
    const cartItems = getFromLocalStorage(keyLocalStorageItemCart, []);
    const itemCount = cartItems.length;
    const cartBadge = document.getElementById("cart-badge");

    if (cartBadge) {
      cartBadge.textContent = itemCount;
      cartBadge.style.display = itemCount > 0 ? "block" : "none";
    }
  };

  const getListSPFromLocalStorage = () => {
    const listSP = getFromLocalStorage(keyLocalStorageListSP);

    if (!listSP) {
      console.error(
        "No listSP found in localStorage for key:",
        keyLocalStorageListSP
      );
      return;
    }

    if (!Array.isArray(listSP)) {
      console.error("listSP from localStorage is not an array");
      return;
    }

    return listSP;
  };

  const getProductById = (idSP) => {
    const products = getListSPFromLocalStorage();
    return products.find((product) => product.id === idSP);
  };

  function showToast(title, message, type, duration = 3000) {
    const toastContainer = document.getElementById("toast-container");

    if (toastContainer) {
      const toast = document.createElement("div");

      const autoRemoveId = setTimeout(function () {
        toastContainer.removeChild(toast);
      }, duration + 1000);

      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          toastContainer.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };

      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle",
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);

      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

      toast.innerHTML = `
        <div class="toast__icon">
          <i class="${icon}"></i>
        </div>
        <div class="toast__body">
          <h3 class="toast__title">${title}</h3>
          <p class="toast__msg">${message}</p>
        </div>
        <div class="toast__close">
          <i class="fas fa-times"></i>
        </div>
      `;

      toastContainer.appendChild(toast);
    }
  }

  return {
    saveToLocalStorage,
    getFromLocalStorage,
    fetchData,
    calculateTotals,
    updateCartBadge,
    getListSPFromLocalStorage,
    getProductById,
    showToast,
  };
})();
