const loginButton = document.getElementById("login-button");
const loginModal = document.getElementById("login-modal");
const closeModal = document.getElementById("close-modal");
const submitButton = document.getElementById("submit-button");
const username = document.getElementById("username");
const password = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const user = {
  username: "admin",
  password: "admin",
};

loginButton.addEventListener("click", function () {
  loginModal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  resetForm();

  loginModal.style.display = "none";
});

submitButton.addEventListener("click", function () {
  var usernameInput = username.value;
  var passwordInput = password.value;

  usernameError.textContent = "";
  passwordError.textContent = "";

  if (!usernameInput || !passwordInput) {
    usernameError.textContent = !usernameInput
      ? "Vui lòng nhập đầy đủ thông tin"
      : "";

    passwordError.textContent = !passwordInput
      ? "Vui lòng nhập đầy đủ thông tin"
      : "";
  } else if (
    usernameInput !== user.username ||
    passwordInput !== user.password
  ) {
    passwordError.textContent = "Tài khoản hoặc mật khẩu không đúng";
  } else {
    resetForm();
    loginModal.style.display = "none";
    loginButton.textContent = "Đăng nhập thành công";
  }
});

function resetForm() {
  username.value = "";
  password.value = "";

  usernameError.textContent = "";
  passwordError.textContent = "";

  loginButton.textContent = "Đăng nhập hệ thống";
}
