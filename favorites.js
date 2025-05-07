async function loadFavorites() {
    const username = localStorage.getItem("currentUser");
    if (!username) {
      document.getElementById("favoriteBooks").innerHTML = "<p>Bạn chưa đăng nhập.</p>";
      return;
    }

    const userData = JSON.parse(localStorage.getItem(`user_${username}`));
    const favorites = userData?.favorites || [];

    const container = document.getElementById("favoriteBooks");
    container.innerHTML = "";

    if (favorites.length === 0) {
      container.innerHTML = "<p>Bạn chưa có sách yêu thích nào.</p>";
      return;
    }

    for (const id of favorites) {
      const res = await fetch(`https://gutendex.com/books/${id}`);
      const book = await res.json();
      const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/200x300";
      const title = book.title;
      const author = book.authors[0]?.name || "Không rõ";

      const div = document.createElement("div");
      div.className = "book";
      div.innerHTML = `
        <img src="${cover}" alt="${title}">
        <h3>${title}</h3>
        <p>${author}</p>
        <a href="book.html?id=${id}">Xem chi tiết</a>
      `;
      container.appendChild(div);
    }
  }

loadFavorites();