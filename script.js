// DOM elements
const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");
const bookmarkContainer = document.getElementById("bookmarkContainer");
let bookmarks = [];

// Load categories
const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      showCategory(data.categories);
    })
    .catch((err) => console.log(err));
};

// Show categories
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">
        ${cat.title}
      </li>
    `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = categoryContainer.querySelectorAll("li");
    allLi.forEach((li) => li.classList.remove("border-b-4"));
    if (e.target.localName === "li") {
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

// Load news by category
const loadNewsByCategory = (categoryId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => showNewsByCategory(data.articles))
    .catch((err) => console.log(err));
};

// Show news
const showNewsByCategory = (articles) => {
  newsContainer.innerHTML = ""; // clear previous news

  articles.forEach((article) => {
    newsContainer.innerHTML += `
      <div class="border rounded-lg p-3 mb-3">
        <div>
          <img src="${article.image?.srcset?.[5]?.url || ""}" 
               alt="news image" 
               class="w-full h-48 object-cover mb-2" />
        </div>
        <div id="${article.id}" class="p-2">
          <h1 class="text-lg font-extrabold">${article.title}</h1>
          <p class="text-sm">${article.time || ""}</p>
          
          <button class="btn text-sm mt-5">Bookmark</button>
        </div>
      </div>
    `;
  });
};

// Handle bookmark click
newsContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Bookmark") {
    handleBookmarks(e);
  }
});

const handleBookmarks = (e) => {
  const parent = e.target.parentNode;
  const title = parent.querySelector("h1").innerText;
  const id = parent.id;

  bookmarks.push({ title, id });
  showBookmarks(bookmarks);
};

// Show bookmarks
const showBookmarks = (bookmarks) => {
  const bookmarkList = document.getElementById("bookmarkList"); // separate container
  bookmarkList.innerHTML = ""; // clear old bookmarks

  bookmarks.forEach((bookmark) => {
    bookmarkList.innerHTML += `
      <div class="p-2 border-b">
        <h1 class="text-sm font-medium">${bookmark.title}</h1>
        <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
      </div>
    `;
  });
};

const handleDeleteBookmark = (bookmarkId) => {
  // Remove the bookmark from the array
  bookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);

  // Re-render the bookmark list
  showBookmarks(bookmarks);
};


// Initial load
loadCategory();
loadNewsByCategory("main");
