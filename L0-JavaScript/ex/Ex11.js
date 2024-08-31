import { keyLocalStorageItemCart } from "./Ex1.js";
import { generateRandomID } from "./Ex10.js";
import { showToast } from "./toast.js";

const form = document.querySelector(".modal-content");
const buyButton = document.querySelector(".confirm-btn");

const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const houseNum = document.getElementById("houseNum");
const province = document.getElementById("province");
const district = document.getElementById("district");
const ward = document.getElementById("ward");

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

const validateInput = () => {
  let isValid = true;

  if (!lastName.value.trim()) {
    lastNameInvalid.innerText = "Vui lòng điền họ.";
    isValid = false;
  } else if (!validateName(lastName.value)) {
    lastNameInvalid.innerText = "Họ chỉ được phép sử dụng chữ cái.";
    isValid = false;
  } else {
    lastNameInvalid.innerText = "";
  }

  if (!firstName.value.trim()) {
    firstNameInvalid.innerText = "Vui lòng điền tên.";
    isValid = false;
  } else if (!validateName(firstName.value)) {
    firstNameInvalid.innerText = "Tên chỉ được phép sử dụng chữ cái.";
    isValid = false;
  } else {
    firstNameInvalid.innerText = "";
  }

  if (!email.value.trim()) {
    emailInvalid.innerText = "Vui lòng điền email.";
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailInvalid.innerText =
      "Email không hợp lệ. Vui lòng điền theo định dạng: example@domain.com";
    isValid = false;
  } else {
    emailInvalid.innerText = "";
  }

  if (!phone.value.trim()) {
    phoneInvalid.innerText = "Vui lòng điền số điện thoại.";
    isValid = false;
  } else if (!validatePhone(phone.value)) {
    phoneInvalid.innerText = "Số điện thoại phải là kiểu số, tối đa 10 chữ số.";
    isValid = false;
  } else {
    phoneInvalid.innerText = "";
  }

  if (!province.value) {
    provinceInvalid.innerText = "Vui lòng chọn tỉnh/thành phố.";
    isValid = false;
  } else {
    provinceInvalid.innerText = "";
  }

  if (!district.value) {
    districtInvalid.innerText = "Vui lòng chọn huyện/quận.";
    isValid = false;
  } else {
    districtInvalid.innerText = "";
  }

  if (!ward.value) {
    wardInvalid.innerText = "Vui lòng chọn phường/xã.";
    isValid = false;
  } else {
    wardInvalid.innerText = "";
  }

  return isValid;
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (!validateInput()) {
    showToast("Error", "Vui lòng điền đầy đủ thông tin hợp lệ.", "error");
    return;
  }

  const orderInfo = {
    id: generateRandomID(),
    purchaseDate: new Date().toLocaleDateString(),
    user: {
      fullName: `${lastName.value} ${firstName.value}`,
      email: email.value,
      phone: phone.value,
      address: `${houseNum.value}, ${ward.options[ward.selectedIndex].text}, ${
        district.options[district.selectedIndex].text
      }, ${province.options[province.selectedIndex].text}`,
    },
  };

  showToast("Success", "Đơn hàng đã được xác nhận!", "success");
  form.reset();
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
  window.location.href = "bills.html";
};

buyButton.addEventListener("click", handleSubmit);
