import {
  keyLocalStorageItemCart,
  keyLocalStorageListSP,
  provincesURL,
} from "./constants.js";
import { addOrder } from "./orderApi.js";
import { Utils } from "./utils.js";

// Cart functionality
const getCartItems = () => {
  return Utils.getFromLocalStorage(keyLocalStorageItemCart);
};

const updateCartSummary = (cartItems) => {
  const totalsMap = Utils.calculateTotals(cartItems);

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
      const product = Utils.getProductById(item.idSP);
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
      const idSP = parseInt(button.dataset.id, 10);
      const confirmed = confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
      );
      if (confirmed) {
        Utils.showToast(
          "Thành công",
          "Sản phẩm đã được xóa thành công!",
          "success"
        );
        clearCartItem(idSP);
        Utils.updateCartBadge();
      }
    });
  });

  updateCartSummary(cartItems);
};

const updateCartItemQuantity = (idSP, delta) => {
  const cartItems = getCartItems();
  const item = cartItems.find((item) => item.idSP === idSP);

  if (item) {
    const product = Utils.getProductById(idSP);
    const newQuantity = item.soLuong + delta;

    if (newQuantity > 0 && newQuantity <= product.quantity) {
      item.soLuong = newQuantity;
    }

    Utils.saveToLocalStorage(keyLocalStorageItemCart, cartItems);
    renderCartItems();
  }
};

const clearCartItem = (idSP) => {
  let cartItems = getCartItems();
  cartItems = cartItems.filter((item) => item.idSP !== idSP);
  Utils.saveToLocalStorage(keyLocalStorageItemCart, cartItems);
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

document.addEventListener("DOMContentLoaded", () => {
  Utils.updateCartBadge();
  renderCartItems();
});

// Provinces functionality
const provinceSelect = document.getElementById("province");
const districtSelect = document.getElementById("district");
const wardSelect = document.getElementById("ward");

const getProvinceData = () => {
  return Utils.fetchData(`${provincesURL}/p`);
};

const getDistrictsByProvinceID = (provinceId) => {
  return Utils.fetchData(`${provincesURL}/p/${provinceId}?depth=2`).then(
    (data) => data?.districts || []
  );
};

const getWardsByDistrictsID = (districtId) => {
  return Utils.fetchData(`${provincesURL}/d/${districtId}?depth=2`).then(
    (data) => data?.wards || []
  );
};

const initProvinces = async () => {
  const provinces = await getProvinceData();
  if (provinces) {
    provinces.forEach((province) => {
      const option = document.createElement("option");
      option.value = province.code;
      option.textContent = province.name;
      provinceSelect.appendChild(option);
    });
  }
};

const loadDistricts = async (provinceId) => {
  const districts = await getDistrictsByProvinceID(provinceId);
  if (Array.isArray(districts)) {
    districtSelect.innerHTML =
      '<option selected disabled value="">--Chọn Huyện/Quận--</option>';
    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district.code;
      option.textContent = district.name;
      districtSelect.appendChild(option);
    });
    districtSelect.disabled = false;
  }
};

const loadWards = async (districtId) => {
  const wards = await getWardsByDistrictsID(districtId);
  if (Array.isArray(wards)) {
    wardSelect.innerHTML =
      '<option selected disabled value="">--Chọn Phường/Xã--</option>';
    wards.forEach((ward) => {
      const option = document.createElement("option");
      option.value = ward.code;
      option.textContent = ward.name;
      wardSelect.appendChild(option);
    });
    wardSelect.disabled = false;
  }
};

provinceSelect.addEventListener("change", (event) => {
  const provinceId = event.target.value;
  loadDistricts(provinceId);
  wardSelect.disabled = true;
});

districtSelect.addEventListener("change", (event) => {
  const districtId = event.target.value;
  loadWards(districtId);
});

initProvinces();

// Submit Order functionality
const form = document.querySelector("#orderForm");
const buyButton = document.querySelector(".confirm-btn");

const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const houseNum = document.getElementById("houseNum");
const province = document.getElementById("province");
const district = document.getElementById("district");
const ward = document.getElementById("ward");
const message = document.getElementById("message");

const lastNameInvalid = document.getElementById("lastName-invalid");
const firstNameInvalid = document.getElementById("firstName-invalid");
const emailInvalid = document.getElementById("email-invalid");
const phoneInvalid = document.getElementById("phone-invalid");
const provinceInvalid = document.getElementById("province-invalid");
const districtInvalid = document.getElementById("district-invalid");
const wardInvalid = document.getElementById("ward-invalid");

const validateName = (name) => /^[A-Za-zÀ-ÿ\s]+$/.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{9,10}$/.test(phone);

const validateField = (field, validator, errorMsgElement, errorMsg) => {
  if (!field.value.trim()) {
    errorMsgElement.innerText = errorMsg.empty;
    return false;
  } else if (!validator(field.value)) {
    errorMsgElement.innerText = errorMsg.invalid;
    return false;
  }
  errorMsgElement.innerText = "";
  return true;
};

const validateInput = () => {
  let isValid = true;

  isValid &= validateField(lastName, validateName, lastNameInvalid, {
    empty: "Vui lòng điền họ.",
    invalid: "Họ chỉ được phép sử dụng chữ cái.",
  });

  isValid &= validateField(firstName, validateName, firstNameInvalid, {
    empty: "Vui lòng điền tên.",
    invalid: "Tên chỉ được phép sử dụng chữ cái.",
  });

  isValid &= validateField(email, validateEmail, emailInvalid, {
    empty: "Vui lòng điền email.",
    invalid:
      "Email không hợp lệ. Vui lòng điền theo định dạng: example@domain.com",
  });

  isValid &= validateField(phone, validatePhone, phoneInvalid, {
    empty: "Vui lòng điền số điện thoại.",
    invalid: "Số điện thoại phải là kiểu số, tối đa 10 chữ số.",
  });

  isValid &= validateField(province, () => !!province.value, provinceInvalid, {
    empty: "Vui lòng chọn tỉnh/thành phố.",
  });

  isValid &= validateField(district, () => !!district.value, districtInvalid, {
    empty: "Vui lòng chọn huyện/quận.",
  });

  isValid &= validateField(ward, () => !!ward.value, wardInvalid, {
    empty: "Vui lòng chọn phường/xã.",
  });

  return isValid;
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const cartItems = Utils.getFromLocalStorage(keyLocalStorageItemCart);
  if (!validateInput()) {
    Utils.showToast("Error", "Vui lòng điền đầy đủ thông tin hợp lệ.", "error");
    return;
  }

  for (const item of cartItems) {
    const product = Utils.getProductById(item.idSP);
    if (product.quantity < item.soLuong) {
      Utils.showToast(
        "Error",
        `Sản phẩm ${product.name} không đủ số lượng.`,
        "error"
      );
      return;
    }
  }

  const order = {
    user: {
      fullName: `${lastName.value} ${firstName.value}`,
      email: email.value,
      phone: phone.value,
      address: `${houseNum.value}, ${ward.options[ward.selectedIndex].text}, ${
        district.options[district.selectedIndex].text
      }, ${province.options[province.selectedIndex].text}`,
      message: message.value,
    },
    cartItems,
    purchaseDate: new Date().toISOString(),
  };

  const newOrder = await addOrder(order);

  if (newOrder) {
    Utils.showToast("Success", "Đặt hàng thành công!", "success");
    localStorage.removeItem(keyLocalStorageItemCart);
    form.reset();

    const products = Utils.getFromLocalStorage(keyLocalStorageListSP);
    cartItems.forEach((item) => {
      const product = products.find((p) => p.id === item.idSP);
      if (product) {
        product.quantity -= item.soLuong;
      }
    });
    Utils.saveToLocalStorage(keyLocalStorageListSP, products);

    window.location.href = "bills.html";
  } else {
    Utils.showToast("Error", "Đã xảy ra lỗi khi đặt hàng.", "error");
  }
};

buyButton.addEventListener("click", handleSubmit);
