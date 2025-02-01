const apiUrl = 'https://679b802733d3168463241458.mockapi.io/beers';
const catalog = document.getElementById("catalog")
const catalogTitle =document.getElementById("catalogTitle")

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const dataHTML = data.map((item) =>`
        <div class="card-container">
          <div class="card-image">
            <img
            src=${item.catalogimg}
              alt="Flying Mamaliga"
            
              />
            <img src=${item.bannerimg}  class="banner"/>
          </div>
  
          <div>
            <h2 class="card-title">${item.name.split(" ")[0]}</h2>
            <h2 class="card-title">${item.name.split(" ").slice(1).join(" ")}</h2>
          </div>

          <div class="info">
            <div class="box type2">
              <p>Price</p>
              <small>${item.price} MDL</small>
            </div>
            <div class="box">
              <p>Alcohol</p>
              <small>${item.alcohol} %</small>
            </div>
          </div>

          <div class="grid">
    
            <button onclick="document.querySelector('.more').classList.toggle('hidden')" class="card-button card-button-primary">View More</button>
   
    
            <button class="item-cart-btn card-button card-button-secondary">Add to Cart</button>
    
          </div>
        </div>

        <div class="more hidden">
            
            <div class="main">
                    <i onclick="document.querySelector('.more').classList.toggle('hidden')" class="fa-solid fa-xmark" id="close"></i>
                    <div class="product-card">
                      <div class="images">
                        <div class="main-image">
                          <img src=${item.catalogimg} alt="American Pale Ale">
                        </div>
                        <div class="image-gallery">
                          <img src=${item.catalogimg} alt="" class="active">
                          <img src=${item.catalogimg} alt="">
                          <img src=${item.catalogimg} alt="">
                          <img src=${item.catalogimg} alt="">
                        </div>
                      </div>
                      
                      <div class="details">
                          <h1 class="">${item.name.split(" ")[0]}</h1>
                          <h1 class="">${item.name.split(" ").slice(1).join(" ")}</h1>
                          <div class="info">
                              <div>
                                  <span>ALC</span>
                                  <strong>4.6%</strong>
                              </div>
                              <div>
                                  <span>Price (MDL)</span>
                                  <strong>40</strong>
                              </div>
                              <div>
                                  <span>Bitterness</span>
                                  <strong>15 IBU</strong>
                              </div>
                          </div>
                          <p class="description">
                              A smooth and refreshing craft beer with a crisp malt backbone and a mild hop character. 
                              With 4.6% ABV and 15 IBU, it delivers a balanced, easy-drinking experience perfect for any occasion. 
                              Enjoy its subtle citrus notes and light bitterness at just 40 MDL per bottle. Cheers!
                          </p>
                          <div class="actions">
                              <div class="quantity">
                                  <button>-</button>
                                  <span>1</span>
                                  <button>+</button>
                              </div>
                              <button>Add to Cart</button>
                          </div>
                      </div>
                    </div>
            </div>
        </div>


       
    `)
    catalog.innerHTML = dataHTML.join("")
    console.log(data);
    // const words = item.name.split(" ")
    //   catalogTitle.textContent = words.slice(1).join(" ")
    //   beerTitle.textContent = words[0]
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
