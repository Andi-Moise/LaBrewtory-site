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
    const dataHTML = data.slice(0,5).map((item) =>`
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
                    <div class="viewMoreCard">
                      <div class="images">
                        <div class="main-image">
                          <img src="${item.catalogimg}" alt="American Pale Ale" id="mainImage">
                        </div>
                        <div class="image-gallery">
                        
                         <img onClick="document.getElementById('mainImage').src = this.src" 
                         src="${item.catalogimg}" 
                          alt="" >

                          <img onClick="document.getElementById('mainImage').src = this.src"  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRHDHjmD-Mtr8WvWqMOZf-bTsQ2DrWrypxIMo2eTGuFht53AabF_euIygAdbXLLyGfbvIpuL0vvaYKqsTXID53Wtw" alt="">
                          <img onClick="document.getElementById('mainImage').src = this.src" 
                         src="${item.catalogimg}" 
                          alt="" >
                          <img onClick="document.getElementById('mainImage').src = this.src" 
                         src="${item.catalogimg}" 
                          alt="" >
                        </div>
                      </div>
                      
                      <div class="details">
                          <div class="top">
                              <div>
                                <h1 class="">${item.name.split(" ")[0]}</h1>
                                <h1 class="">${item.name.split(" ").slice(1).join(" ")}</h1>
                              </div>
                            
                              <div class="info">
                                  <div>
                                      <span>ALC</span>
                                      <strong>4.6%</strong>
                                  </div>
                                  <div>
                                      <span>Price (MDL)</span>
                                      <strong>40</strong>
                                  </div>
                                  <div class="right">
                                      <span>Bitterness</span>
                                      <strong>15 IBU</strong>
                                  </div>
                              </div>
                              <p class="description">
                                  ${item.description}
                              </p>
                          </div>
                          
                          <div class="actions">
                              <div class="quantity">
                                  <button><i class="fa-solid fa-minus"></i></button>
                                  <small>1</small>
                                  <button><i class="fa-solid fa-plus"></i></button>
                              </div >
                              <button class="cart"><i class="fa-solid fa-cart-shopping "></i></button>
                          </div>
                      </div>
                    </div>
            </div>
        </div>


       
    `);
    const dataSpecialHTML = data.slice(5,20).map((item) =>`
        <div class="card-container">
          <div class="special">
            <p>Special One</p>
          </div>
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
                    <div class="viewMoreCard">
                      <div class="images">
                        <div class="main-image">
                          <img src="${item.catalogimg}" alt="American Pale Ale" id="mainImage">
                        </div>
                        <div class="image-gallery">
                        
                         <img onClick="document.getElementById('mainImage').src = this.src" 
                         src="${item.catalogimg}" 
                          alt="" >

                          <img onClick="document.getElementById('mainImage').src = this.src"  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRHDHjmD-Mtr8WvWqMOZf-bTsQ2DrWrypxIMo2eTGuFht53AabF_euIygAdbXLLyGfbvIpuL0vvaYKqsTXID53Wtw" alt="">
                          <img onClick="document.getElementById('mainImage').src = this.src" 
                         src="${item.catalogimg}" 
                          alt="" >
                          <img onClick="document.getElementById('mainImage').src = this.src" 
                         src="${item.catalogimg}" 
                          alt="" >
                        </div>
                      </div>
                      
                      <div class="details">
                          <div class="top">
                              <div>
                                <h1 class="">${item.name.split(" ")[0]}</h1>
                                <h1 class="">${item.name.split(" ").slice(1).join(" ")}</h1>
                              </div>
                            
                              <div class="info">
                                  <div>
                                      <span>ALC</span>
                                      <strong>4.6%</strong>
                                  </div>
                                  <div>
                                      <span>Price (MDL)</span>
                                      <strong>40</strong>
                                  </div>
                                  <div class="right">
                                      <span>Bitterness</span>
                                      <strong>15 IBU</strong>
                                  </div>
                              </div>
                              <p class="description">
                                  ${item.description}
                              </p>
                          </div>
                          
                          <div class="actions">
                              <div class="quantity">
                                  <button><i class="fa-solid fa-minus"></i></button>
                                  <small>1</small>
                                  <button><i class="fa-solid fa-plus"></i></button>
                              </div >
                              <button class="cart"><i class="fa-solid fa-cart-shopping "></i></button>
                          </div>
                      </div>
                    </div>
            </div>
        </div>


       
    `)
    catalog.innerHTML = dataSpecialHTML.join("")
    catalog.innerHTML += dataHTML.join("")
  
    console.log(data);
    // const words = item.name.split(" ")
    //   catalogTitle.textContent = words.slice(1).join(" ")
    //   beerTitle.textContent = words[0]
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
