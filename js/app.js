const logo = document.getElementById('logo');
const logoNav = document.getElementById('logoNav')
const nav= document.getElementById("nav")
const openCart = document.getElementById("openCart")
const closeCart = document.getElementById("closeCart")
const cartContainer = document.getElementById("cart-container")

openCart.addEventListener("click", ()=>{
  cartContainer.classList.toggle("hidden")
})

closeCart.addEventListener("click", ()=>{
  cartContainer.classList.toggle("hidden")
})
  
window.addEventListener('scroll', () => {
  logoNav.style.display = 'none'
  const scrollPosition = window.scrollY;
  logoNav.style.display = 'none'
  // console.log(scrollPosition)
  if (scrollPosition > 30 && scrollPosition < 250 ) {
    logo.style.transform = 'translate(-50%, -100%)'
    logo.style.height = '100px'; 
    logo.style.transition = '1s'
    logoNav.style.transition = '1s'
     nav.style.background = "none"
     logo.style.display = 'flex'
    
    
   
  } else if(scrollPosition > 250 ){
    logoNav.style.display = 'flex'
    logoNav.style.zIndex = "2"
    logo.style.display = 'none'
    nav.style.background = "#1b1b1b"
    
  } 
  else {
    logo.style.display = 'flex'
    logo.style.transform = 'translate(-50%, -50%)'; // Reset to hidden
    logo.style.height = '200px'; 
    logo.style.transition = '1s'
    logoNav.style.display = 'none'
    nav.style.background = "none"
  }
});



const apiUrl = 'https://679b802733d3168463241458.mockapi.io/beers';
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // const dataHTML = data.map((item) =>`
    //     <div class="card-container">
    //       <div class="left">
    //         <img src=${item.catalogimg} alt="" class="card-image">
    //       </div>
         
    //       <div class="right">
    //         <div>
    //           <h2 class="card-title">${item.name}</h2>
    //         </div>
    //         <div class="card-info">
    //           <div class="box type2">
    //             <p>Price</p>
    //             <small>${item.price} MDL</small>
    //           </div>
    //           <div class="box">
    //             <p>Alcohol</p>
    //             <small>${item.alcohol} %</small>
    //           </div>
    //           <div class="box">
    //             <p>Alcohol</p>
    //             <small>${item.alcohol} %</small>
    //           </div>
    //         </div>
    //         <div class="card-links">
    //           <button class="card-button primary">View More</button>
    //           <button class="card-button">Add to Cart</button>
    //         </div>
    //       </div>            
    //     </div>
    // `)
    
    // catalog.innerHTML = dataHTML.join("")
    // console.log(data);


    let imageIndex = 0;

    const beerName = document.getElementById("beerName");
    const beerTitle = document.getElementById("beerTitle");
    const alcohol = document.getElementById("alcohol");
    const bitterness = document.getElementById("bitterness");
    const indicators = document.getElementById("indicators");
    const bannerImages = document.getElementById("bannerImages");
    const beerImage = document.getElementById("beerImage")


    data.slice(0,5).forEach((beer, index) => {
     
      // const img = document.createElement("img");
      // img.src = beer.bannerimg;
      // img.style.width = "100%";
      // img.style.height = "100vh";
      // img.style.objectFit = "cover";
      // bannerImages.appendChild(img);

      
      const button = document.createElement("button")
      button.className = "indicator"
      
      button.addEventListener("click", () => {
        imageIndex = index
        updateSlider()
      });
      indicators.appendChild(button)
    });
    function updateSlider() {
      const words = data[imageIndex].name.split(" ")
      beerName.textContent = words.slice(1).join(" ")
      beerTitle.textContent = words[0]
      alcohol.textContent = data[imageIndex].alcohol + " %"
      bitterness.textContent = data[imageIndex].bitterness + " IBU"
      beerImage.src = data[imageIndex].catalogimg;
      bannerImages.src = data[imageIndex].bannerimg ;

      document.querySelectorAll(".indicator").forEach((el, index) => {
        el.classList.toggle("active", index === imageIndex)
      });
    }

    function nextSlide() {
      imageIndex = (imageIndex + 1) % Math.min(data.length, 5);
      updateSlider();
    }
    
    let sliderInterval = setInterval(nextSlide, 4000); 
    function resetTimer() {
      clearInterval(sliderInterval);
      sliderInterval = setInterval(nextSlide, 4000);
    }
    
    updateSlider()

  })
  .catch(error => {
    console.log('Error:')
  });



  

    // function updateSlider() {
    //   beerName.textContent = beers[imageIndex].name;
    //   alcohol.textContent = beers[imageIndex].alcohol + " %";
    //   bitterness.textContent = beers[imageIndex].bitterness + " IBU";
    //   beerImage.src = beers[imageIndex].beerimg;
    //   bannerImages.style.transform = `translateX(-${100 * imageIndex}%)`;

    //   document.querySelectorAll(".indicator").forEach((el, index) => {
    //     el.classList.toggle("active", index === imageIndex);
    //   });
    // }

    

// CATALOG
// const apiUrl = 'https://679b802733d3168463241458.mockapi.io/beers';
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
    
  })
  .catch(error => {
    console.error('Error:', error);
  });
