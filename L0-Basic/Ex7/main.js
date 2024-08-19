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
const oldPasswordInput = document.getElementById("old-password");
const newPasswordInput = document.getElementById("new-password");
const oldPasswordError = document.getElementById("old-password-error");
const newPasswordError = document.getElementById("new-password-error");
const passwordSuccessMessage = document.getElementById(
  "password-success-message"
);
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const user = {
  username: "admin",
  password: "admin",
};

function resetLoginForm() {
  usernameInput.value = "";
  passwordInput.value = "";
  usernameError.textContent = "";
  passwordError.textContent = "";
  passwordSuccessMessage.textContent = "";
}

loginButton.addEventListener("click", function () {
  loginModal.style.display = "flex";
});

submitButton.addEventListener("click", function () {
  if (passwordSuccessMessage.textContent) {
    passwordSuccessMessage.textContent = "";
  }

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
    resetLoginForm();
    loginModal.style.display = "none";
    loginButton.textContent = "Đăng nhập thành công";
  }
});

closeModal.addEventListener("click", function () {
  resetLoginForm();
  loginModal.style.display = "none";
});

function resetForgotPasswordForm() {
  oldPasswordInput.value = "";
  newPasswordInput.value = "";
  oldPasswordError.textContent = "";
  newPasswordError.textContent = "";
}

forgotPasswordLink.addEventListener("click", function () {
  resetLoginForm();
  loginModal.style.display = "none";
  forgotPasswordModal.style.display = "flex";
});

saveButton.addEventListener("click", function () {
  const oldPassword = oldPasswordInput.value;
  const newPassword = newPasswordInput.value;

  oldPasswordError.textContent = "";
  newPasswordError.textContent = "";
  passwordSuccessMessage.textContent = "";

  if (!oldPassword || !newPassword) {
    oldPasswordError.textContent = !oldPassword ? "Bắt buộc nhập" : "";

    newPasswordError.textContent = !newPassword ? "Bắt buộc nhập" : "";
    return;
  }

  if (oldPassword !== user.password) {
    oldPasswordError.textContent = "Password không đúng";
  } else if (oldPassword === newPassword) {
    newPasswordError.textContent = "Mật khẩu mới không được trùng mật khẩu cũ";
  } else {
    user.password = newPassword;
    resetForgotPasswordForm();
    forgotPasswordModal.style.display = "none";
    loginModal.style.display = "flex";
    passwordSuccessMessage.textContent = "Bạn đã đổi mật khẩu thành công";
  }
});

closeForgotPasswordModal.addEventListener("click", function () {
  resetForgotPasswordForm();
  forgotPasswordModal.style.display = "none";
  loginModal.style.display = "flex";
});
