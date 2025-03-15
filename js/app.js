
// NAV
const logo = document.getElementById('logo');
const logoNav = document.getElementById('logoNav')
const nav= document.getElementById("nav")
const apiUrl = 'https://679b802733d3168463241458.mockapi.io/beers';
// FILTRE + CATALOG
const openCart = document.getElementById("openCart")
const openCart2 = document.getElementById("openCart2")
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
const totalPrice2 = document.getElementById("total-price2")
const dotCart = document.getElementById("dot-cart")
const added = document.getElementById("added")
// SELECT
const selectElement = document.getElementById('langSelector')
// FAQ
const faqs =document.querySelectorAll(".faq")
const answer =document.querySelectorAll(".answer")
// EVENTS
const events = document.getElementById("events")
const apiUrl2 = 'https://679b802733d3168463241458.mockapi.io/events';
const burgerBtn = document.getElementById("burger-btn")
const closeHalfNavbarBtn = document.getElementById("close-half-navbar")
const halfNavbar = document.getElementById("half-navbar")
const filterDisappear = document.getElementById("filter-disappear")
const disappear = document.getElementById("disappear")
// CHECKOUT
const cartItemsCheckout = document.getElementById("cartItemsCheckout")
const checkout = document.getElementById("checkout")
const placeOrder =document.getElementById("placeOrder")
const checkoutBack =document.getElementById("checkoutBack")
const nameForm = document.getElementById('name');
const surname = document.getElementById('surname');
const address = document.getElementById('address');
const email = document.getElementById('email');
const number = document.getElementById('number');
const form = document.getElementById('form');
const error = document.getElementById('error');
// filterDisappear.addEventListener("click", ()=>{
//   disappear.classList.toggle("hidden")
// })

// checkout.classList.add("hidden")

// form.addEventListener("submit", (e) => {
//   let messages = []
//   if(nameForm.value ==='' || nameForm.value == null){
//     messages.push('Name is required')
//   }
//   if(messages.length > 0){
//     e.preventDefault()
//     error.innerText = messages.join(' ')
//   }
// })
  
  // const errorMessage = document.getElementById('errorMessage');

  

document.addEventListener("DOMContentLoaded", () => {
  const checkout = document.getElementById("checkout");
  if (checkout) {
      checkout.classList.add("hidden");
  }
});



burgerBtn.addEventListener("click", ()=>{
  halfNavbar.classList.toggle("hidden")
})



faqs.forEach(faq =>{
  faq.addEventListener("click", () =>{
    faq.classList.toggle("active")
  })
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

    let imageIndex = 0

    const beerName = document.getElementById("beerName");
    const beerTitle = document.getElementById("beerTitle");
    const alcohol = document.getElementById("alcohol");
    const bitterness = document.getElementById("bitterness");
    const indicators = document.getElementById("indicators");
    const bannerImages = document.getElementById("bannerImages");
    const beerImage = document.getElementById("beerImage")


    data.forEach((beer, index) => {
      const button = document.createElement("button")
      button.className = "indicator"

      button.addEventListener("click", () => {
        imageIndex = index
        updateSlider()
        // resetTimer()
      });

      // indicators.appendChild(button);
    });

    function updateSlider() {
      const words = data[imageIndex].name.split(" ")
      beerName.textContent = words.slice(1).join(" ")
      beerTitle.textContent = words[0]
      alcohol.textContent = data[imageIndex].alcohol + " %"
      bitterness.textContent = data[imageIndex].bitterness + " IBU"
      beerImage.src = data[imageIndex].catalogimg
      bannerImages.src = data[imageIndex].bannerimg

      document.querySelectorAll(".indicator").forEach((el, index) => {
        el.classList.toggle("active", index === imageIndex)
      })
    }

    function nextSlide() {
      imageIndex = (index + 1) % Math.min(data.length, 5)
      updateSlider()
     
    }

    let sliderInterval = setInterval(nextSlide, 4000)

    function resetTimer() {
      clearInterval(sliderInterval)
      sliderInterval = setInterval(nextSlide, 4000)
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
          <div class="catalog-box">
            <div class="images">
                <img src=${item.catalogimg} alt="Flying Mamaliga" class="beer"/>
                <img src="images/banner.png" class="banner" />
            </div>
            <div class="info">
                <div class="title">
                    <div class="column">
                      <h2 class="card-title">${item.name.split(" ")[0]}</h2>
                      <h2 class="card-title">${item.name.split(" ").slice(1).join(" ")}</h2>
                    </div>
                </div>
                <div class="details">
                    <div class="column">
                        <small>Type</small>
                        <p>Bruna</p>
                    </div>
                    
                    <div class="column">
                        <small>ALC</small>
                        <p>${item.alcohol}%</p>
                    </div>
                    
                    <div class="column">
                        <small>Bitterness</small>
                        <p>${item.bitterness} IBU</p>
                    </div>
                </div>
                <p class="description">
                  Soaring with Flavor. Brewed with golden corn, this crisp, smooth ale blends tradition with a bold, refreshing twist. Light, malty, and ready for takeoff!
                </p>
                <div class="buttons">
                    <p class="price">${item.price} Lei</p>
                    <p  class="item-cart-btn add-to-cart" data-item-id='${item.id}' >ADD TO CART</p>
                </div>
            </div>
            
        </div>

     
  `);
  const dataSpecialHTML = data.slice(5,20).map((item) =>`
      <div class="catalog-box">
            <div class="images">
                <img src=${item.catalogimg} alt="Flying Mamaliga" class="beer"/>
                <img src="images/banner.png" class="banner" />
                
            </div>
            <div class="info">
                <div class="title">
                    <div class="column">
                      <h2 class="card-title">${item.name.split(" ")[0]}</h2>
                      <h2 class="card-title">${item.name.split(" ").slice(1).join(" ")}</h2>
                    </div>
                    <p class="special-one">SPECIAL ONE</p>
                    
                </div>
                <div class="details">
                    <div class="column">
                        <small>Type</small>
                        <p>Bruna</p>
                    </div>
                    
                    <div class="column">
                        <small>ALC</small>
                        <p>${item.alcohol}%</p>
                    </div>
                    
                    <div class="column">
                        <small>Bitterness</small>
                        <p>${item.bitterness} IBU</p>
                    </div>
                </div>
                <p class="description">
                  Soaring with Flavor. Brewed with golden corn, this crisp, smooth ale blends tradition with a bold, refreshing twist. Light, malty, and ready for takeoff!
                </p>
                <div class="buttons">
                    <p class="price">${item.price} Lei</p>
                    <p  class="item-cart-btn add-to-cart" data-item-id='${item.id}' >ADD TO CART</p>
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
                    <input type='checkbox' name='type-filter' class="checkmark" value='${type}' id='${type}'>
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
            displayCheckoutCart()
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
  function displayCheckoutCart() {
    let cartItemCheckoutHTML = cart.map(cartItem => ` 
      <div class="text cart-item" data-cart-item-id='${cartItem.id}'>
          <p>${cartItem.name}</p>
          <p>${cartItem.quantity} x ${cartItem.price} mdl</p>
      </div>
    `).join(""); // Join the array into a string
  
    cartItemsCheckout.innerHTML = cartItemCheckoutHTML;
    totalPrice2.textContent = `Total: ${calculateTotalPrice() +50} MDL`
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
              displayCheckoutCart()
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
            // displayCheckoutCart()
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
              // displayCheckoutCart()
          })
      })
  }

  cartBuyBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Order cannot be placed. Reason: cart is empty");
      return;
  }
  // cart = []
  dotCart.classList.add("hidden");
  displayCart();
  checkout.classList.remove("hidden")
  displayCheckoutCart();
  

});
placeOrder.addEventListener("click", (event) => {
  event.preventDefault()
  const name = document.getElementById("name").value.trim()
  const surname = document.getElementById("surname").value.trim()
  const address = document.getElementById("address").value.trim()
  const email = document.getElementById("email").value.trim()
  const number = document.getElementById("number").value.trim()


  if (name && surname && address && email && number) {
    alert("Order is placed")
    checkout.classList.add("hidden")
    cart = []
    displayCart()
    cartContainer.classList.toggle("hidden")
  } else {
    alert("Please fill out all fields before placing the order.")
  }
});
  
  
    showCatalog(data)
  
    console.log(data);
    // console.log(cart);
    
  })
  .catch(error => {
    console.error('Error:', error);
  });




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



  


    
  fetch(apiUrl2)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const dataHTML = data.slice(-4).reverse().map((item, index) => {
      const uniqueId = `more-${index}`; // Create a unique ID for each event modal
      return `
        <div class="box">
            <img src="${item.img}" alt="">
            <p onClick="document.getElementById('${uniqueId}').classList.remove('hidden')" class="link en hidden">View More</p>
            <p onClick="document.getElementById('${uniqueId}').classList.remove('hidden')" class="link ro">Vezi mai mult</p>
            <p onClick="document.getElementById('${uniqueId}').classList.remove('hidden')" class="link ru hidden">Посмотреть Больше</p>
            <div class="back"></div>
        </div>
    
        <div class="more hidden" id="${uniqueId}">
            <div class="view-more">
                <div class="headings">
                    <div>
                        <h1>${item.name}</h1>
                        <p class="description">${item.description}</p>
                    </div>
                </div>
    
                <div class="tabel">
                    <div class="element">
                        <small>Where</small>
                        <p>${item.place}</p>
                    </div>
                    <div class="element">
                        <small>When</small>
                        <p>${item.date}</p>
                    </div>
                    <div class="element">
                        <small>Entry</small>
                        <p>${item.entry}</p>
                    </div>
                    <div class="element">
                        <small>Start-End</small>
                        <p>${item.startEnd}</p>
                    </div>
                </div>
    
                <i class="fa-solid fa-xmark closeEvent" onClick="document.getElementById('${uniqueId}').classList.add('hidden')"></i>
            </div>
            <div class="blur"></div>
        </div>
      `;
    })
    events.innerHTML = dataHTML.join("")
  })
  .catch(error => {
    console.log('Error:')
  });

//   function changeLanguage(languageCode) {
//     Array.from(document.getElementsByClassName('lang')).forEach(function (elem) {
//         if (elem.classList.contains('lang-' + languageCode)) {
//              elem.style.display = 'initial';
//         }
//         else {
//              elem.style.display = 'none';
//         }
//     });
// }

document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.getElementById("langSelector");

  // Get the saved language from localStorage, default to "en"
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  selectElement.value = savedLang; // Set the dropdown to the saved value
  updateVisibility(savedLang); // Update UI based on saved language

  // Event listener to update selection and save to localStorage
  selectElement.addEventListener("change", (event) => {
    const selectedLang = event.target.value;
    localStorage.setItem("selectedLanguage", selectedLang); // Save selected language
    updateVisibility(selectedLang); // Update UI
  });
});

function updateVisibility(selectedValue) {
  const elementsEn = document.getElementsByClassName("en");
  const elementsRo = document.getElementsByClassName("ro");
  const elementsRu = document.getElementsByClassName("ru");

  // Hide all language elements
  Array.from(elementsEn).forEach(element => element.classList.add("hidden"));
  Array.from(elementsRo).forEach(element => element.classList.add("hidden"));
  Array.from(elementsRu).forEach(element => element.classList.add("hidden"));

  // Show only the selected language elements
  if (selectedValue === "en") {
    Array.from(elementsEn).forEach(element => element.classList.remove("hidden"));
  } else if (selectedValue === "ro") {
    Array.from(elementsRo).forEach(element => element.classList.remove("hidden"));
  } else if (selectedValue === "ru") {
    Array.from(elementsRu).forEach(element => element.classList.remove("hidden"));
  }
}
function updateButtonSelection(selectedValue) {
  // Remove the 'selected' class from all buttons

  document.getElementById("btn-en").classList.remove("selected");
  document.getElementById("btn-ro").classList.remove("selected");
  document.getElementById("btn-ru").classList.remove("selected");

  // Add the 'selected' class to the button corresponding to the selected language
  if (selectedValue === "en") {
    document.getElementById("btn-en").classList.add("selected");
  } else if (selectedValue === "ro") {
    document.getElementById("btn-ro").classList.add("selected");
  } else if (selectedValue === "ru") {
    document.getElementById("btn-ru").classList.add("selected");
  }
}
closeHalfNavbarBtn.addEventListener("click", ()=>{
  halfNavbar.classList.toggle("hidden")
})

function selectLanguage(languageCode) {
  // Save the selected language in localStorage
  localStorage.setItem("selectedLanguage", languageCode);

  // Update the UI based on the selected language
  updateVisibility(languageCode);
  updateButtonSelection(languageCode);
}



checkoutBack.addEventListener("click", ()=>{
  checkout.classList.toggle("hidden");
})
  
// const selectElement = document.getElementById('langSelector')


// selectElement.value = "en"


// updateVisibility(selectElement.value)


// selectElement.addEventListener('change', function () {
//     updateVisibility(this.value)
// });
openCart.addEventListener("click", ()=>{
  cartContainer.classList.toggle("hidden")
})
openCart2.addEventListener("click", ()=>{
  cartContainer.classList.toggle("hidden")
})

closeCart.addEventListener("click", ()=>{
  cartContainer.classList.toggle("hidden")
})

