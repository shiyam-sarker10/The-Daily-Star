// const handleCategories = async () => {
//     const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
//     const data = await res.json();
//     const categories = data.data.news_category;
//     console.log(categories);
//     dataLooping(categories)
    
// }
// const dataLooping = (categories) => {
//     const tabContainer = document.getElementById("tab-container");
//     categories.slice(0,3).forEach(category => {
//         const categoryDiv = document.createElement('div')
//         categoryDiv.innerHTML = `
//         <a href="" class="tab tab-bordered">${category.category_name}</a>
//         `;
//         tabContainer.appendChild(categoryDiv)
//     });
// }
// handleCategories();


// URL: https://openapi.programming-hero.com/api/news/categories

// All news in a Category

// URL Format: https://openapi.programming-hero.com/api/news/category/{category_id}

// Example: https://openapi.programming-hero.com/api/news/category/01

// News detail URL:

// URL Format: https://openapi.programming-hero.com/api/news/{news_id}

// Example: https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a


    function updateDate() {
      const currentDateElement = document.getElementById("currentDate");
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = now.toLocaleDateString(undefined, options);

      currentDateElement.textContent = formattedDate;
    }


    // Update the date initially
    updateDate();

    // Update the date every second (1000 milliseconds)
    setInterval(updateDate, 1000);

    const handleCategories =async() => {
        const res= await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data =await res.json();
        const category = data.data
        console.log(category)
        dataLooping(category)
        
    }
    const dataLooping = (categories) => {
        const tabContainer = document.getElementById("tab-container");
        categories.news_category.forEach((category) => {
            const div = document.createElement('div')
            div.innerHTML = `<button onclick="handleNews('${category?.category_id}')" class="btn bg-transparent border-none normal-case">${category?.category_name}</button>`;
            tabContainer.appendChild(div)

        });
    };
    const handleNews = async(category_id) => {
        const res = await fetch(
          `https://openapi.programming-hero.com/api/news/category/${category_id}`
        );
        const data  = await res.json();
        const news = data.data;
        newsLooping(news)
    };
    const newsLooping =(newses) => {
        let cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = "";
   if (newses.length === 0) {
     alert("No Content available ! 💭");
   } 
        newses.forEach(news => {

            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <figure class="rounded-none"><img class="w-[90%]" src="${
                  news?.thumbnail_url
                }" alt="Shoes" /></figure>
                <div class="card-body space-y-4">
                    <h2 class="card-title text-base">
                        ${news?.title.slice(0, 45)}
                        <div class="btn bg-pink-500 text-white hover:bg-pink-700 rounded-[50px]">${
                          news?.rating?.badge
                        }</div>
                    </h2>
                    <p class="text-gray-400 text-sm">${news?.details.slice(
                      0,
                      120
                    )}</p>
                    <div class="flex justify-between">
                        <div class=" flex items-center gap-x-4">
                            <div class="avatar online">
                                <div class="w-16 rounded-full">
                                    <img src="${news?.author?.img}" />
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-600">${
                                  news?.author?.name
                                }</h4>
                                <p class="text-slate-500">${news?.author?.published_date}</p>
                            </div>
                        </div>
                        <div>
                            <button class="btn bg-slate-800 hover:bg-slate-900 text-white">Details</button>
                        </div>
                    </div>
                </div>
            </div>`;
            cardContainer.appendChild(div)
            
        });

    }
    handleCategories();
    handleNews("01")