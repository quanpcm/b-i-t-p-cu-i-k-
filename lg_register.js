function register() {
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const msg = document.getElementById('register-msg');

  if (!username || !password || !confirmPassword) {
    msg.textContent = 'Vui lòng điền đầy đủ thông tin!';
    msg.style.color = 'red';
    return;
  }

  if (password !== confirmPassword) {
    msg.textContent = 'Mật khẩu không khớp!';
    msg.style.color = 'red';
    return;
  }

  if (localStorage.getItem(`user_${username}`)) {
    msg.textContent = 'Tên đăng nhập đã tồn tại!';
    msg.style.color = 'red';
    return;
  }

  const userData = {
    username,
    password,
    favorites: []
  };

  localStorage.setItem(`user_${username}`, JSON.stringify(userData));
  msg.style.color = 'green';
  msg.textContent = 'Đăng ký thành công! Bạn có thể đăng nhập.';

  registerForm.onsubmit = e => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerConfirm").value;
  
    if (password !== confirm) {
      message.textContent = "Mật khẩu xác nhận không đúng.";
      return;
    }
  
    const userData = {
      password: password,
      favorites: []
    };
  
    localStorage.setItem(`user_${username}`, JSON.stringify(userData));
    message.textContent = "Đăng ký thành công! Hãy đăng nhập.";
    showLogin();
  };  
}

// Đăng nhập
function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const msg = document.getElementById('login-msg');

  const storedData = localStorage.getItem(`user_${username}`);
  if (!storedData) {
    msg.textContent = 'Tài khoản không tồn tại!';
    msg.style.color = 'red';
    return;
  }

  const user = JSON.parse(storedData);
  if (user.password !== password) {
    msg.textContent = 'Mật khẩu không đúng!';
    msg.style.color = 'red';
    return;
  }

  // Thành công
  localStorage.setItem("currentUser", username);
  msg.style.color = 'green';
  msg.textContent = 'Đăng nhập thành công! Đang chuyển...';
  setTimeout(() => {
    window.location.href = "./main.html";
  }, 1000);

  loginForm.onsubmit = e => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const userData = JSON.parse(localStorage.getItem(`user_${username}`));
  
    if (userData && userData.password === password) {
      localStorage.setItem("currentUser", username);
      message.textContent = "Đăng nhập thành công!";
      window.location.href = "index.html";
    } else {
      message.textContent = "Sai tên đăng nhập hoặc mật khẩu.";
    }
  };
  
}

