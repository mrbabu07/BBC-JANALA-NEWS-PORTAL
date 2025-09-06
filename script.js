// promise > pending, resolve(success), rejected(error)

const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories") //promise
    .then((res) => res.json()) //res
    .then((data) => {
      console.log(data.categories);
      const categories = data.categories;
      showCategory(categories);
    })

    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `<li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${cat.title}</li>`;
  });
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });
    if (e.target.localName === "li") {
      //   console.log(e.target.id);
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.articles);
      showNewsByCategory(data.articles);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (articles) => {
  // clear previous news
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    newsContainer.innerHTML += `
      <div class="border p-3 mb-3">
        <img src="${article.image?.srcset?.[5]?.url || ''}" alt="news image" class="w-full h-48 object-cover mb-2" />
        <h1 class="text-lg font-semibold">${article.title}</h1>
        <p>${article.time}</p>
      </div>
    `;
  });
};


loadCategory();
