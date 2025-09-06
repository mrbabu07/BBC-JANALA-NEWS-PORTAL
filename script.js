// promise > pending, resolve(success), rejected(error)

const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");
const bookmarkContainer = document.getElementById("bookmarkContainer")
let bookmarks = []

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

  articles.forEach((article, index) => {
    newsContainer.innerHTML += `
      <div class="border rounded-lg p-3 mb-3">
        <div>
          <img src="${article.image?.srcset?.[5]?.url || ''}" 
               alt="news image" 
               class="w-full h-48 object-cover mb-2" />
        </div>
        <div id="${article.id}" class="p-2">
          <h1 class="text-lg font-extrabold">${article.title}</h1>
          <p class="text-sm">${article.time}</p>
          
          <button class="btn text-sm mt-5">Bookmark</button>
        </div>
      </div>
    `;
  });
};

newsContainer.addEventListener("click", (e) =>{
  // console.log(e.target)
  //  console.log(e.target.innerText)
  if(e.target.innerText === 'Bookmark'){
    handleBookmarks(e)
  }
    
})

const handleBookmarks = (e) => {
  const title = e.target.parentNode.children[0].innerText
    const id = e.target.parentNode.id
    
    bookmarks.push({
      title: title,
      id: id
    })
    console.log(bookmarks)
  }


loadCategory();
loadNewsByCategory("main")
