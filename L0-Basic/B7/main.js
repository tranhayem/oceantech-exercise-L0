const loginButton = document.getElementById("login-button");
const loginModal = document.getElementById("login-modal");
const closeModal = document.getElementById("close-modal");
const submitButton = document.getElementById("submit-button");
const forgotPasswordLink = document.getElementById("forgot-password-link");
const forgotPasswordModal = document.getElementById("forgot-password-modal");
const closeForgotPasswordModal = document.getElementById(
  "close-forgot-password-modal"
);
const saveButton = document.getElementById("save-button");
const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");
const oldPasswordError = document.getElementById("old-password-error");
const newPasswordError = document.getElementById("new-password-error");
const passwordSuccessMessage = document.getElementById(
  "password-success-message"
);
const username = document.getElementById("username");
const password = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const user = {
  username: "admin",
  password: "admin",
};

function resetLoginForm() {
  username.value = "";
  password.value = "";
  usernameError.textContent = "";
  passwordError.textContent = "";
}

function resetForgotPasswordForm() {
  oldPassword.value = "";
  newPassword.value = "";
  oldPasswordError.textContent = "";
  newPasswordError.textContent = "";
  passwordSuccessMessage.textContent = "";
}

loginButton.addEventListener("click", function () {
  loginModal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  resetLoginForm();
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
    resetLoginForm();
    loginModal.style.display = "none";
    loginButton.textContent = "Đăng nhập thành công";
  }
});

forgotPasswordLink.addEventListener("click", function () {
  loginModal.style.display = "none";
  forgotPasswordModal.style.display = "flex";
});

closeForgotPasswordModal.addEventListener("click", function () {
  resetForgotPasswordForm();
  forgotPasswordModal.style.display = "none";
  loginModal.style.display = "flex";
});

saveButton.addEventListener("click", function () {
  const oldPasswordInput = oldPassword.value;
  const newPasswordInput = newPassword.value;

  oldPasswordError.textContent = "";
  newPasswordError.textContent = "";
  passwordSuccessMessage.textContent = "";

  if (!oldPasswordInput || !newPasswordInput) {
    oldPasswordError.textContent = !oldPasswordInput ? "Bắt buộc nhập" : "";

    newPasswordError.textContent = !newPasswordInput ? "Bắt buộc nhập" : "";
    return;
  }

  if (oldPasswordInput !== user.password) {
    oldPasswordError.textContent = "Password không đúng";
  } else if (oldPasswordInput === newPasswordInput) {
    newPasswordError.textContent = "Mật khẩu mới không được trùng mật khẩu cũ";
  } else {
    user.password = newPasswordInput;
    resetForgotPasswordForm();
    forgotPasswordModal.style.display = "none";
    loginModal.style.display = "flex";
    passwordSuccessMessage.textContent = "Bạn đã đổi mật khẩu thành công";
  }
});
