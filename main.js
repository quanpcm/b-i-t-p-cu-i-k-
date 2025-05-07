const topics = {
  Suggestion: "Literature",         // Gợi ý
  Science: "Science",
  FairyTales: "Fairy Tales",
  Western: "Western",
  European: "Europe"
};

const rowsContainer = document.getElementById("rowsContainer");

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
    const imgUrl = book.formats["image/jpeg"] || book.formats["image/png"] || "https://via.placeholder.com/180x250";
    const card = document.createElement("div");
    card.className = "card";
    card.style.minWidth = "180px";

    card.innerHTML = `
      <a href="book.html?id=${book.id}" style="text-decoration: none; color: inherit;">
        <img src="${imgUrl}" class="card-img-top" alt="${book.title}">
        <div class="card-body">
          <p class="card-text comfortaa-font">${book.title}</p>
        </div>
      </a>
    `;

    row.appendChild(card);
  });
}

Object.entries(topics).forEach(([key, keyword]) => {
  createRow(key, keyword);

  fetch(`https://gutendex.com/books?search=${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(data => {
      if (data.results?.length > 0) {
        renderBooks(key, data.results.slice(0, 12));
      }
    })
    .catch(err => console.error("Lỗi khi tải sách:", err));
});
