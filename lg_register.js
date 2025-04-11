const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const messageBox = document.getElementById("message");

loginTab.onclick = () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  messageBox.innerText = '';
};

registerTab.onclick = () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  messageBox.innerText = '';
};

function handleRegister() {
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (!username || !email || !password) {
    showMessage("Please fill out all fields.", "red");
    return;
  }

  // Kiểm tra xem username đã tồn tại chưa
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    showMessage("Username already exists. Please choose another.", "red");
    return;
  }

  // Lưu thông tin người dùng vào localStorage
  users[username] = { email, password };
  localStorage.setItem("users", JSON.stringify(users));

  showMessage(`Registered successfully as ${username}!`, "green");

  // Xoá input
  document.getElementById("register-username").value = "";
  document.getElementById("register-email").value = "";
  document.getElementById("register-password").value = "";
}

function handleLogin() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    showMessage("Please enter both fields.", "red");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const user = users[username];

  if (!user) {
    showMessage("Username not found.", "red");
    return;
  }

  if (user.password !== password) {
    showMessage("Incorrect password.", "red");
    return;
  }

  showMessage(`Welcome back, ${username}!`, "green");

  // Xoá input
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
}

function showMessage(text, color) {
  messageBox.innerText = text;
  messageBox.style.color = color;
}
