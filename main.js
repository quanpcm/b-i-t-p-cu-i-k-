function toggleFavorite(bookId, element) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const index = favorites.indexOf(bookId);
  if (index >= 0) {
    favorites.splice(index, 1);
    element.classList.remove("favorited");
  } else {
    favorites.push(bookId);
    element.classList.add("favorited");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(bookId) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(bookId);
}

async function loadBooks(query = "") {
  const res = await fetch(`https://gutendex.com/books/?search=${query}`);
  const data = await res.json();
  const books = data.results.slice(0, 2424);
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
      <span class="star ${isFav ? 'favorited' : ''}" onclick="toggleFavorite(${id}, this)">&#9733;</span>
    `;
    container.appendChild(div);
  });
}

function searchBooks() {
  const query = document.getElementById("searchInput").value;
  loadBooks(query);
}

document.querySelector("form[role='search']").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = this.querySelector("input[type='search']").value.trim();
  if (query) {
    loadBooks(query); // sử dụng lại hàm đã có từ trước
  }
});

loadBooks();