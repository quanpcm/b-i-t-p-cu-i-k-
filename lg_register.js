function register() {
  const user = document.getElementById("registerUser").value.trim();
  const pass = document.getElementById("registerPass").value.trim();
  const msg = document.getElementById("registerMsg");

  if (!user || !pass) {
    msg.innerText = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  if (localStorage.getItem(user)) {
    msg.innerText = "Tên người dùng đã tồn tại.";
    return;
  }

  localStorage.setItem(user, pass);
  msg.style.color = "green";
  msg.innerText = "Đăng ký thành công!";
}

function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const msg = document.getElementById("loginMsg");

  const stored = localStorage.getItem(user);
  if (stored && stored === pass) {
    msg.style.color = "green";
    msg.innerText = "Đăng nhập thành công!";
    setTimeout(() => {
      window.location.href = "main.html";
    }, 1000);
  } else {
    msg.innerText = "Sai tài khoản hoặc mật khẩu.";
  }
}