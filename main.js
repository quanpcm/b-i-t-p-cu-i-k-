function toggleFavorite(bookId, btn) {
  const username = localStorage.getItem("currentUser");
  if (!username) {
    alert("Bạn cần đăng nhập để sử dụng tính năng này!");
    return;
  }

  const userKey = `user_${username}`;
  const userData = JSON.parse(localStorage.getItem(userKey));
  const index = userData.favorites.indexOf(bookId);

  if (index === -1) {
    userData.favorites.push(bookId);
    btn.classList.add("favorited");
    btn.innerHTML = "★";
  } else {
    userData.favorites.splice(index, 1);
    btn.classList.remove("favorited");
    btn.innerHTML = "★";
  }

  localStorage.setItem(userKey, JSON.stringify(userData));
}

function isFavorite(bookId) {
  const username = localStorage.getItem("currentUser");
  if (!username) return false;

  const userData = JSON.parse(localStorage.getItem(`user_${username}`));
  return userData?.favorites?.includes(bookId) || false;
}

async function loadBooks(query = "") {
  const res = await fetch(`https://gutendex.com/books/?search=${query}`);
  const data = await res.json();
  const books = data.results.slice(0, 20); // chọn ít sách để load nhanh
  const container = document.getElementById("bookList");
  container.innerHTML = "";

  books.forEach(book => {
    const id = book.id;
    const title = book.title;
    const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/200x300?text=No+Cover";
    const author = book.authors[0]?.name || "Không rõ";
    const isFav = isFavorite(id);

    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <img src="${cover}" alt="${title}">
      <h3>${title}</h3>
      <p>${author}</p>
      <a href="book.html?id=${id}">Xem chi tiết</a>
      <button class="fav-btn ${isFav ? 'favorited' : ''}" onclick="toggleFavorite(${id}, this)">★</button>
    `;
    container.appendChild(div);
  });
}

function searchBooks() {
  const query = document.getElementById("searchInput").value.trim();
  loadBooks(query);
}

document.querySelector("form[role='search']").addEventListener("submit", function (e) {
  e.preventDefault();
  searchBooks();
});

loadBooks();
