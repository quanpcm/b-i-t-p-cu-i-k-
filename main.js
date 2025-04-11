async function searchBooks() {
    const query = document.getElementById("searchInput").value.trim();
    const resultContainer = document.getElementById("searchResults");
    resultContainer.innerHTML = "";
  
    if (!query) return;
  
    const res = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}`);
    const data = await res.json();
    const books = data.results;
  
    if (books.length === 0) {
      resultContainer.innerHTML = "<p>Không tìm thấy sách phù hợp.</p>";
      return;
    }
  
    books.forEach(book => {
      const title = book.title;
      const author = book.authors[0]?.name || "Không rõ";
      const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/200x300?text=No+Cover";
      const link = book.formats["text/html; charset=utf-8"] || book.formats["application/epub+zip"];
  
      const bookEl = document.createElement("div");
      bookEl.className = "book";
      bookEl.innerHTML = `
        <img src="${cover}" alt="${title}">
        <h3>${title}</h3>
        <p>${author}</p>
        <a href="${link}" target="_blank">Đọc ngay</a>
      `;
      resultContainer.appendChild(bookEl);
    });
  }
  
async function fetchBooks(query, rowId) {
    const res = await fetch(`https://gutendex.com/books/?search=${query}&languages=en`);
    const data = await res.json();
    const books = data.results.slice(0, 15); // Lấy 15 cuốn đầu tiên
  
    const row = document.getElementById(rowId);
  
    books.forEach(book => {
      const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/150x220?text=No+Cover";
      const title = book.title.slice(0, 40);
      const link = book.formats["text/html; charset=utf-8"] || book.formats["application/epub+zip"];
  
      const div = document.createElement("div");
      div.className = "book-card";
      div.innerHTML = `
        <img src="${cover}" alt="cover">
        <div class="info">
          <h3>${title}</h3>
          <a href="${link}" target="_blank">Đọc</a>
        </div>
      `;
      row.appendChild(div);
    });
  }
  
  // Gọi API cho các hàng
  fetchBooks("popular", "popular-row");
  fetchBooks("romance", "romance-row");
  fetchBooks("fantasy", "fantasy-row");
  