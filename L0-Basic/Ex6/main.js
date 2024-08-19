const loginButton = document.getElementById("login-button");
const loginModal = document.getElementById("login-modal");
const closeModal = document.getElementById("close-modal");
const submitButton = document.getElementById("submit-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
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
  var username = usernameInput.value;
  var password = passwordInput.value;

  usernameError.textContent = "";
  passwordError.textContent = "";

  if (!username || !password) {
    usernameError.textContent = !username
      ? "Vui lòng nhập đầy đủ thông tin"
      : "";

    passwordError.textContent = !password
      ? "Vui lòng nhập đầy đủ thông tin"
      : "";
  } else if (username !== user.username || password !== user.password) {
    passwordError.textContent = "Tài khoản hoặc mật khẩu không đúng";
  } else {
    resetForm();
    loginModal.style.display = "none";
    loginButton.textContent = "Đăng nhập thành công";
  }
});

function resetForm() {
  usernameInput.value = "";
  passwordInput.value = "";

  usernameError.textContent = "";
  passwordError.textContent = "";

  loginButton.textContent = "Đăng nhập hệ thống";
}
