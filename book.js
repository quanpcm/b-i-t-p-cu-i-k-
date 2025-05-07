async function loadBookDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");
  if (!bookId) {
    document.getElementById("bookDetail").innerText = "Không tìm thấy sách.";
    return;
  }

  try {
    const res = await fetch(`https://gutendex.com/books/${bookId}`);
    const book = await res.json();

    const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/200x300?text=No+Cover";
    const title = book.title || "Không tiêu đề";
    const authors = book.authors?.map(a => a.name).join(", ") || "Không rõ";
    const languages = book.languages?.join(", ") || "Không rõ";
    const subjects = book.subjects?.slice(0, 5).join(", ") || "Không có";
    const readFormats = book.formats;
    const readLink =
      readFormats["text/html; charset=utf-8"] ||
      readFormats["text/plain; charset=utf-8"] ||
      readFormats["text/html"] ||
      readFormats["text/plain"] ||
      null;

    document.getElementById("bookDetail").innerHTML = `
      <div class="book">
        <img src="${cover}" alt="${title}">
        <h3>${title}</h3>
        <p><strong>Tác giả:</strong> ${authors}</p>
        <p><strong>Ngôn ngữ:</strong> ${languages}</p>
        <p><strong>Chủ đề:</strong> ${subjects}</p>
        ${
          readLink
            ? `<a href="https://www.gutenberg.org/ebooks/${bookId}" target="_blank" class="btn btn-primary">Đọc sách</a>`
            : `<p>❌ Không có định dạng đọc trực tiếp.</p>`
        }
      </div>
    `;

    loadSuggestions(book.languages?.[0] || "en"); // Gợi ý cùng ngôn ngữ

  } catch (error) {
    document.getElementById("bookDetail").innerText = "Lỗi khi tải thông tin sách.";
    console.error("Lỗi:", error);
  }
}

async function loadSuggestions(lang = "en") {
  try {
    const res = await fetch(`https://gutendex.com/books/?languages=${lang}`);
    const data = await res.json();
    const container = document.getElementById("suggestionList");
    if (!container) return;

    container.innerHTML = "";

    const currentUser = localStorage.getItem("currentUser");
    let userFavorites = [];

    if (currentUser) {
      const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`));
      userFavorites = userData?.favorites || [];
    }

    data.results.slice(0, 10).forEach(book => {
      const id = book.id;
      const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/180x280?text=No+Cover";
      const title = book.title || "Không rõ";
      const isFav = userFavorites.includes(id);

      const div = document.createElement("div");
      div.className = "book";
      div.innerHTML = `
        <img src="${cover}" alt="${title}">
        <h4>${title}</h4>
        <a href="book.html?id=${id}">Chi tiết</a>
        <span class="star ${isFav ? 'favorited' : ''}" onclick="toggleFavorite(${id}, this)">&#9733;</span>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Lỗi khi tải sách gợi ý:", error);
  }
}

function toggleFavorite(bookId, btn) {
  const username = localStorage.getItem("currentUser");
  if (!username) {
    alert("Bạn cần đăng nhập để sử dụng tính năng này!");
    return;
  }

  const userKey = `user_${username}`;
  const userData = JSON.parse(localStorage.getItem(userKey)) || { favorites: [] };
  const index = userData.favorites.indexOf(bookId);

  if (index === -1) {
    userData.favorites.push(bookId);
  } else {
    userData.favorites.splice(index, 1);
  }

  localStorage.setItem(userKey, JSON.stringify(userData));
  btn.classList.toggle("favorited");
}

loadBookDetail();
loadSuggestions();