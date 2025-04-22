async function loadBookDetail() {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");
  if (!bookId) return;

  try {
    const res = await fetch(`https://gutendex.com/books/${bookId}`);
    const book = await res.json();

    const title = book.title;
    const authors = book.authors.map(a => a.name).join(", ") || "Không rõ";
    const cover = book.formats["image/jpeg"] || "https://via.placeholder.com/200x300?text=No+Cover";
    const downloadLink =
      book.formats["text/html; charset=utf-8"] ||
      book.formats["text/plain"] ||
      book.formats["application/pdf"] ||
      null;
    const languages = book.languages.join(", ");
    const subjects = book.subjects.slice(0, 5).join(", ");
    const description = book.bookshelves.join(", ") || "Không có";

    document.getElementById("bookDetail").innerHTML = `
      <div class="book book-full">
        <img src="${cover}" alt="${title}">
        <div class="info">
          <h2>${title}</h2>
          <p><strong>Tác giả:</strong> ${authors}</p>
          <p><strong>Ngôn ngữ:</strong> ${languages}</p>
          <p><strong>Chủ đề:</strong> ${subjects}</p>
          <p><strong>Danh mục:</strong> ${description}</p>
          ${
            downloadLink
              ? `<a href="${downloadLink}" class="btn-read" target="_blank">📘 Đọc ngay</a>`
              : `<p class="no-download">❌ Không có định dạng đọc trực tiếp.</p>`
          }
        </div>
      </div>
    `;
  } catch (error) {
    document.getElementById("bookDetail").innerHTML = `<p class="error">Lỗi tải dữ liệu sách.</p>`;
    console.error("Lỗi khi tải sách:", error);
  }
}

loadBookDetail();
