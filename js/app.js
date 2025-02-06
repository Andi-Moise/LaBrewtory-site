
// NAV
const logo = document.getElementById('logo');
const logoNav = document.getElementById('logoNav')
const nav= document.getElementById("nav")
const apiUrl = 'https://679b802733d3168463241458.mockapi.io/beers';
// FILTRE + CATALOG
const openCart = document.getElementById("openCart")
const closeCart = document.getElementById("closeCart")
const cartContainer = document.getElementById("cart-container")
const alcoholFilterDiv = document.getElementById("alcohol-filter")
const typeFilterDiv = document.getElementById("type-filter")
const bitternessFilterDiv = document.getElementById("bitterness-filter")
const minPriceInput = document.getElementById("min-price")
const maxPriceInput = document.getElementById("max-price")
const cartMain = document.getElementById("cart-main")
const cartBuyBtn = document.getElementById("cart-buy-btn")
const totalPrice = document.getElementById("total-price")
const dotCart = document.getElementById("dot-cart")
const added = document.getElementById("added")

// const rest = document.querySelectorAll(".rest")

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
  if (scrollPosition > 30 && scrollPosition < 250 ) {
    logo.style.transform = 'translate(-50%, -100%)'
    logo.classList.add("logoHeightAfter")
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
    logo.style.transform = 'translate(-50%, -50%)'
    logo.classList.add("logoHeightInitial")
    logo.classList.remove("logoHeightAfter")
    logoNav.style.display = 'none'
    nav.style.background = "none"
  }
});

function toggleMore(button) {
  const beerCard = button.closest('.beer-card'); // Get the whole beer card
  const moreSection = beerCard.querySelector('.more'); // Find its corresponding .more section

  if (moreSection) {
    moreSection.classList.toggle('hidden');
  }
}
function updateMainImage(imgElement) {
  const mainImage = imgElement.closest('.viewMoreCard').querySelector('#mainImage');
  mainImage.src = imgElement.src;
}

//  SLIDER
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {

    let imageIndex = 0;

    const beerName = document.getElementById("beerName");
    const beerTitle = document.getElementById("beerTitle");
    const alcohol = document.getElementById("alcohol");
    const bitterness = document.getElementById("bitterness");
    const indicators = document.getElementById("indicators");
    const bannerImages = document.getElementById("bannerImages");
    const beerImage = document.getElementById("beerImage")


    data.slice(0,5).forEach((beer, index) => {
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



  


    

// CATALOG
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
    function showCatalog(data){
      const dataHTML = data.slice(0,5).map((item) =>`
          <div class="beer-card">
            <div class="card-container">
              <div class="card-image">
                <img src=${item.catalogimg} alt="Flying Mamaliga" />
                <img src=${item.bannerimg} class="banner" />
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
                <button onclick="toggleMore(this)" class="card-button card-button-primary">View More</button>
                <button class="item-cart-btn card-button card-button-secondary" data-item-id='${item.id}'>Add to Cart</button>
              </div>
            </div>

            <div class="more hidden">
              <div class="main">
                <i onclick="toggleMore(this)" class="fa-solid fa-xmark" id="close"></i>
                <div class="viewMoreCard">
                  <div class="images">
                    <div class="main-image">
                      <img src="${item.viewmore1}" alt="American Pale Ale" id="mainImage">
                    </div>
                    <div class="image-gallery">
                      <img onclick="updateMainImage(this)" src="${item.viewmore1}" alt="" />
                      <img onclick="updateMainImage(this)" src="${item.viewmore2}" />
                      <img onclick="updateMainImage(this)" src="${item.viewmore3}" alt="" />
                      <img onclick="updateMainImage(this)" src="${item.viewmore4}" alt="" />
                    </div>
                  </div>

                  <div class="details">
                    <div class="top">
                      <h1>${item.name}</h1>
                      <div class="info">
                        <div><span>ALC</span><strong>${item.alcohol}%</strong></div>
                        <div><span>Price (MDL)</span><strong>${item.price}</strong></div>
                        <div class="right"><span>Bitterness</span><strong>15 IBU</strong></div>
                      </div>
                      <p class="description">${item.description}</p>
                    </div>

                    <div class="actions">
                      <div class="quantity">
                        <button><i class="fa-solid fa-minus"></i></button>
                        <small>1</small>
                        <button><i class="fa-solid fa-plus"></i></button>
                      </div>
                      <button class="cart item-cart-btn" data-item-id="${item.id}"><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



     
  `);
  const dataSpecialHTML = data.slice(5,20).map((item) =>`
      <div class="beer-card">
            <div class="card-container">
              <div class="special">
                <p>Special One</p>
              </div>
              <div class="card-image">
                <img src=${item.catalogimg} alt="Flying Mamaliga" />
                <img src=${item.bannerimg} class="banner" />
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
                <button onclick="toggleMore(this)" class="card-button card-button-primary">View More</button>
                <button class="item-cart-btn card-button card-button-secondary" data-item-id='${item.id}'>Add to Cart</button>
              </div>
            </div>

            <div class="more hidden">
              <div class="main">
                <i onclick="toggleMore(this)" class="fa-solid fa-xmark" id="close"></i>
                <div class="viewMoreCard">
                  <div class="images">
                    <div class="main-image">
                      <img src="${item.viewmore1}" alt="American Pale Ale" id="mainImage">
                    </div>
                    <div class="image-gallery">
                      <img onclick="updateMainImage(this)" src="${item.viewmore1}" alt="" />
                      <img onclick="updateMainImage(this)" src="${item.viewmore2}" />
                      <img onclick="updateMainImage(this)" src="${item.viewmore3}" alt="" />
                      <img onclick="updateMainImage(this)" src="${item.viewmore4}" alt="" />
                    </div>
                  </div>

                  <div class="details">
                    <div class="top">
                      <h1>${item.name}</h1>
                      <div class="info">
                        <div><span>ALC</span><strong>${item.alcohol}%</strong></div>
                        <div><span>Price (MDL)</span><strong>${item.price}</strong></div>
                        <div class="right"><span>Bitterness</span><strong>15 IBU</strong></div>
                      </div>
                      <p class="description">${item.description}</p>
                    </div>

                    <div class="actions">
                      <div class="quantity">
                        <button><i class="fa-solid fa-minus"></i></button>
                        <small>1</small>
                        <button><i class="fa-solid fa-plus"></i></button>
                      </div>
                      <button class="cart item-cart-btn" data-item-id="${item.id}"><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


     
  `)
    catalog.innerHTML = dataSpecialHTML.join("")
    catalog.innerHTML += dataHTML.join("")
    addToCart()
    
    

    }
    

    
      // function getBeerAlcohols(data){
      //   let alcohols = [...new Set(data.map(beer => beer.alcohol))]
      //   let filter = alcohols.map(alcohol => `  
      //         <div class='filter-item'>
      //               <input type='checkbox' name='alcohol-filter' value='${alcohol}' id='${alcohol}'>
      //               <label for='${alcohol}'>${alcohol}</label>
      //           </div>
      //     `)
      //   alcoholFilterDiv.innerHTML = filter.join("")
      // }
      // getBeerAlcohols(data)
      // function getBeerBitterness(data){
      //   let bitternesses = [...new Set(data.map(beer => beer.bitterness))]
      //   let filter = bitternesses.map(bitterness => `  
      //         <div class='filter-item'>
      //               <input type='checkbox' name='bitterness-filter' value='${bitterness}' id='${bitterness}'>
      //               <label for='${bitterness}'>${bitterness}</label>
      //           </div>
      //     `)
      //   bitternessFilterDiv.innerHTML = filter.join("")
      // }
      // getBeerBitterness(data)
      
      function getBeerTypes(data){
        let types = [...new Set(data.map(beer => beer.type))]
        let filter = types.map(type => `  
              <div class='filter-item'>
                    <input type='checkbox' name='type-filter' value='${type}' id='${type}'>
                    <label for='${type}'>${type}</label>
                </div>
          `)
        typeFilterDiv.innerHTML = filter.join("")
      }
      getBeerTypes(data)

      let filters = {
        alcohols: [],
        types: [],
        bitternesses: [],
        price: {
            minPrice: null,
            maxPrice: null
        },
        // sort: ""
    }
    function getFilters(name, family){
      let filterItems = document.getElementsByName(name)
    
      Array.from(filterItems).forEach(input => {
          input.addEventListener("click", () => {
              if (filters[family].includes(input.value)) {
                  filters[family].splice(filters[family].indexOf(input.value), 1)
              } else {
                  filters[family].push(input.value)
              }
              showCatalog(getFilteredBeers(data, filters))
          })
      })
    
    }
    
    // getFilters("alcohol-filter", "alcohols")
    getFilters("type-filter", "types")
    // getFilters("bitterness-filter", "bitternesses")
    
    
    function getFilteredBeers(data, filters){
      let filteredBeers =  data.filter(beer => {
          if (filters.alcohols.length > 0 && !filters.alcohols.includes(beer.alcohol)){
              return false
          }
          if (filters.types.length > 0 && !filters.types.includes(beer.type)){
              return false
          }
          if (filters.bitternesses.length > 0 && !filters.bitternesses.includes(beer.bitterness)){
              return false
          }
          if(filters.price.maxPrice !==null && beer.price > filters.price.maxPrice){
              return false
          }      
          if(filters.price.minPrice !==null && beer.price < filters.price.minPrice){
              return false
          }    
    
          return beer
      })
    
      return filteredBeers
    }
    function priceChange(){
      minPriceInput.addEventListener("input", ()=>{
          filters.price.minPrice = minPriceInput.value
          showCatalog(getFilteredBeers(data, filters))
      })
  
      maxPriceInput.addEventListener("input", ()=>{
          filters.price.maxPrice = maxPriceInput.value
          showCatalog(getFilteredBeers(data, filters))
      })
    }
  
    priceChange()
    let cart  = []

    function addToCart(){
      const itemCartBtns = document.getElementsByClassName("item-cart-btn")
      Array.from(itemCartBtns).forEach(cartBtn => {
        cartBtn.addEventListener("click", ()=>{
            let itemId = +cartBtn.getAttribute("data-item-id")
            let beer = data.find(beer => beer.id === itemId)

            let cartItem = cart.find(cartItem => cartItem.id === beer.id)
            if(cartItem){
              cart = cart.map(c =>{
                if(c.id === +beer.id){
                  return{
                    ...c,
                    quantity: c.quantity +1
                  }
                }
                return c
              })
            } else{
              cart.push({
                ...beer,
                quantity:1
              })
            }
            // console.log("Beer:", beer);
            dotCart.classList.remove("hidden")
            added.classList.remove("hidden")

            setTimeout(() => {
                added.classList.add("hidden");
            }, 1400);

            displayCart()
            console.log(cart)
        })
      })
    }
    console.log(cart)

    function displayCart(){
      let cartItemHTML = cart.map(cartItem => `
          <div class="box cart-item" data-cart-item-id='${cartItem.id}'>
                    <img src="${cartItem.catalogimg}" alt="">
                    <div class="side">
                        <div class="top">
                            <p>${cartItem.name}</p>
                            <small>${cartItem.quantity} x 330 ml <span>- ${cartItem.quantity * cartItem.price} mdl</span> </small>
                        </div>
                        <div class="bottom">
                            <div class="quantity">
                                    <button class="cart-item-btn cart-btn-minus"><i class="fa-solid fa-minus"></i></button>
                                  <small>${cartItem.quantity}</small>
                                  <button class="cart-item-btn cart-btn-plus"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <button class="remove cart-item-btn cart-btn-delete"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                    
                </div>
        `)
        cartMain.innerHTML = cartItemHTML.join("")
        getAllMinusBtns()
        getAllPlusBtns()
        getDeleteBtns()

        totalPrice.textContent = `Total: ${calculateTotalPrice() +50} MDL`

    }
    function calculateTotalPrice() {
      return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
  }


    function getAllMinusBtns(){
      const minusBtns = cartMain.querySelectorAll(".cart-btn-minus")
  
      minusBtns.forEach(btn =>{
          btn.addEventListener("click", ()=>{
            let id = +btn.closest(".cart-item").getAttribute("data-cart-item-id");
              cart = cart.map(item => {
                  if(+item.id === id){
                      return{
                          ...item,
                          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity 
                      }
                      
                  }
                  return item
              })
              displayCart()
          })
      })
    }
    function getAllPlusBtns(){
      const plusBtns = cartMain.querySelectorAll(".cart-btn-plus")
  
      plusBtns.forEach(btn =>{
        btn.addEventListener("click", ()=>{
          let id = +btn.closest(".cart-item").getAttribute("data-cart-item-id");
           
            
            console.log(id)
            cart = cart.map(item => {
                if(item.id == id){
                    return{
                        ...item,
                        quantity: +item.quantity + 1
                        
                    
                    }
                    
                }
                
                    
                return item
            })
            
            displayCart()
        })
    })
    }
    function getDeleteBtns(){
      const deleteBtns = cartMain.querySelectorAll(".cart-btn-delete")
  
      deleteBtns.forEach(btn =>{
          btn.addEventListener("click", () => {
            let id = +btn.closest(".cart-item").getAttribute("data-cart-item-id")
              cart = cart.filter(item => item.id != id)
              displayCart()
          })
      })
  }
  
  cartBuyBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Order cannot be placed. Reason: cart is empty");
        return;
    }

    alert("Order placed successfully");
    cart = []; 
    dotCart.classList.add("hidden")
    displayCart();
});
  
  
    showCatalog(data)
  
    console.log(data);
    // console.log(cart);
    
  })
  .catch(error => {
    console.error('Error:', error);
  });




  