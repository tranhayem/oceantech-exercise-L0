import { keyLocalStorageItemCart, keyLocalStorageListSP } from "./Ex1.js";
import { generateRandomID } from "./Ex10.js";
import { getFromLocalStorage, saveToLocalStorage } from "./Ex12.js";
import { addOrder } from "./Ex13.js";
import { getProductById } from "./common.js";
import { showToast } from "./toast.js";

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

  const cartItems = getFromLocalStorage(keyLocalStorageItemCart);
  if (!validateInput()) {
    showToast("Error", "Vui lòng điền đầy đủ thông tin hợp lệ.", "error");
    return;
  }

  for (const item of cartItems) {
    const product = getProductById(item.idSP);
    if (item.soLuong > product.quantity) {
      showToast(
        "Error",
        `Số lượng mua của ${product.name} vượt quá số lượng có sẵn.`,
        "error"
      );
      return;
    }
  }

  const orderInfo = {
    id: generateRandomID(),
    user: {
      fullName: `${lastName.value} ${firstName.value}`,
      email: email.value,
      phone: phone.value,
      address: `${houseNum.value ? `Số nhà ${houseNum.value}` : ""} ${
        ward.options[ward.selectedIndex].text
      }, ${district.options[district.selectedIndex].text}, ${
        province.options[province.selectedIndex].text
      }`,
      message: message.value,
    },
    cartItems: cartItems,
    purchaseDate: new Date().toLocaleDateString(),
  };

  const newOrder = await addOrder(orderInfo);
  if (newOrder) {
    showToast("Success", "Đặt hàng thành công!", "success");
    localStorage.removeItem(keyLocalStorageItemCart);
    form.reset();

    const products = getFromLocalStorage(keyLocalStorageListSP);
    cartItems.forEach((item) => {
      const product = products.find((p) => p.id === item.idSP);
      if (product) {
        product.quantity -= item.soLuong;
      }
    });
    saveToLocalStorage(keyLocalStorageListSP, products);

    window.location.href = "bills.html";
  } else {
    showToast("Error", "Đã xảy ra lỗi khi đặt hàng.", "error");
  }
};

buyButton.addEventListener("click", handleSubmit);
