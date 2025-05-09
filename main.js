const topics = {
  Suggestion: "Literature",
  Science: "Science",
  FairyTales: "Fairy Tales",
  Western: "Western",
  European: "Europe"
};

const rowsContainer = document.getElementById("rowsContainer");
const searchResults = document.getElementById("searchResults");
const searchHeader = document.getElementById("searchHeader");
const searchKeyword = document.getElementById("searchKeyword");
const netflixLayout = document.getElementById("netflixLayout");

function createRow(topicKey, displayName) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  title.textContent = displayName;
  section.appendChild(title);

  const row = document.createElement("div");
  row.className = "scroll-row";
  row.id = `row-${topicKey}`;
  section.appendChild(row);

  rowsContainer.appendChild(section);
}

function renderBooks(topicKey, books) {
  const row = document.getElementById("row-" + topicKey);
  books.forEach(book => {
    const imgUrl = book.formats["image/jpeg"] || "https://via.placeholder.com/180x250";
    const card = document.createElement("div");
    card.className = "card";
    card.style.minWidth = "180px";

    card.innerHTML = `
      <a href="book.html?id=${book.id}" class="book-link">
        <img src="${imgUrl}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <p class="card-text comfortaa-font">${book.title}</p>
        </div>
      </a>
    `;

    row.appendChild(card);
  });
}

async function fetchBooks(keyword, limit = 10) {
  const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(keyword)}`);
  const data = await res.json();
  return data.results.slice(0, limit);
}

Object.entries(topics).forEach(([key, keyword]) => {
  createRow(key, keyword);
  fetchBooks(keyword).then(books => {
    renderBooks(key, books);
  }).catch(err => console.error("Lỗi khi tải sách:", err));
});

// --- Xử lý tìm kiếm ---
function renderSearchTitle(keyword) {
  searchHeader.style.display = "block";
  searchKeyword.textContent = keyword;
}

async function renderSearchResults(keyword) {
  renderSearchTitle(keyword);
  searchResults.innerHTML = "";

  if (!keyword.trim()) {
    searchResults.innerHTML = `<p style="padding: 20px;">Hãy tìm kiếm để hiện lại sách.</p>`;
    return;
  }

  try {
    const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    const books = data.results.slice(0, 20);

    books.forEach(book => {
      const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/200x300";
      const title = book.title || "Không rõ";
      const id = book.id;

      const card = document.createElement("div");
      card.className = "book";
      card.innerHTML = `
        <a href="book.html?id=${id}" class="book-link">
          <img src="${cover}" alt="${title}">
          <h4>${title}</h4>
        </a>
      `;
      searchResults.appendChild(card);
    });

    // Ẩn layout Netflix khi có kết quả
    netflixLayout.style.display = "none";
    searchResults.classList.add("active");

  } catch (err) {
    console.error("Lỗi khi tìm kiếm:", err);
    searchResults.innerHTML = `<p>Đã xảy ra lỗi khi tìm kiếm sách.</p>`;
  }
}

// --- Gắn sự kiện ---
document.getElementById("searchBox").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const keyword = this.value.trim();
    renderSearchResults(keyword);
  }
});

document.getElementById("searchBox").addEventListener("input", function () {
  const keyword = this.value.trim();
  if (keyword === "") {
    renderSearchResults(""); // gọi lại để hiện thông báo "hãy tìm kiếm..."
    netflixLayout.style.display = "block";
    searchResults.classList.remove("active");
  }
});

// --- Hiện tiêu đề tìm kiếm ngay từ đầu ---
document.addEventListener("DOMContentLoaded", () => {
  renderSearchTitle(""); // hiện tiêu đề ngay cả khi chưa tìm kiếm
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (!query) return;

        try {
          const response = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}`);
          const data = await response.json();
          const books = data.results.slice(0, 20); // Lấy tối đa 20 sách

          const mainContainer = document.getElementById("main");
          if (!mainContainer) return;

          mainContainer.innerHTML = `
            <div class="search-info">
              <h2>Kết quả tìm kiếm cho "<strong>${query}</strong>"</h2>
              <p>Nhập từ khóa vào thanh tìm kiếm để tìm sách theo tên hoặc tác giả.</p>
            </div>
            <div class="book-grid" id="searchResults"></div>
          `;

          const searchResults = document.getElementById("searchResults");

          books.forEach(book => {
            const title = book.title;
            const author = book.authors[0]?.name || "Không rõ";
            const image = book.formats["image/jpeg"] || "https://via.placeholder.com/200x300";
            const bookId = book.id;

            const card = document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
              <img src="${image}" alt="${title}">
              <div class="card-info">
                <h3>${title}</h3>
                <p>${author}</p>
                <a href="book.html?id=${bookId}" class="btn">Xem chi tiết</a>
              </div>
            `;
            searchResults.appendChild(card);
          });

        } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
        }
      }
    });
  }
});
