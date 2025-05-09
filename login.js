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