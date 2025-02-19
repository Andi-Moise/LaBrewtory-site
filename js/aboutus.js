
const logo = document.getElementById('logo');
const logoNav = document.getElementById('logoNav')
const nav= document.getElementById("nav")
const curt1 =document.getElementById("curt1")
const curt2 =document.getElementById("curt2")

const events = document.getElementById("events")
const apiUrl2 = 'https://679b802733d3168463241458.mockapi.io/events';
const burgerBtn = document.getElementById("burger-btn")
const closeHalfNavbarBtn = document.getElementById("close-half-navbar")
const halfNavbar = document.getElementById("half-navbar")

burgerBtn.addEventListener("click", ()=>{
  halfNavbar.classList.toggle("hidden")
})
closeHalfNavbarBtn.addEventListener("click", ()=>{
  halfNavbar.classList.toggle("hidden")
})


window.addEventListener('scroll', () => {
    logoNav.style.display = 'none'
    const scrollPosition = window.scrollY;
    logoNav.style.display = 'none'
    if (scrollPosition > 10 && scrollPosition < 150 ) {
      
      
      logo.style.transition = '1s'
    //   logoNav.style.transition = '1s'
       nav.style.background = "none"
       
      
      
     
    } else if(scrollPosition > 170 && scrollPosition < 510 ){
      logoNav.style.display = 'flex'
      logoNav.style.zIndex = "2"
      curt1.style.width = "100%"
    curt2.style.width = "100%"
      nav.style.background = "#1b1b1b"
      
    } else if(scrollPosition > 500){
        // curt1.style.transform = "translate-x(20px)"
        curt1.style.width = "50%"
        curt1.style.transition = '1s'
        curt2.style.width = "50%"
        curt2.style.transition = '1s'
        nav.style.background = "#1b1b1b"
        logoNav.style.display = 'flex'
    }
    else {
    //   logoNav.style.display = 'none'
      nav.style.background = "none"
    }
    console.log(scrollPosition)
  });
  

  
  fetch(apiUrl2)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const dataHTML = data.slice(0,4).map((item) =>`
                  <div class="box">
                      <img src="${item.img}" alt="">
                      <p onClick="document.getElementById('more').classList.remove('hidden')" id="vm-events" class="link">View More</p>
                      <div class="back"></div>
                  </div>

<div class="more hidden" id="more">
    
    <div class="view-more">
        
          <div class="headings">
              <div>
                  <h1>7th AnniBEERsary</h1>
                  <p class="description">${item.description}</p>
              </div>
             
          </div>
          
          <div class="tabel">
            <div class="element">
              <small>Where</small>
              <p>sos Muncesti 77, Chisinau, Moldova</p>
            </div>
            <div class="element">
              <small>Where</small>
              <p>Gratuită</p>
            </div>
            <div class="element">
              <small>Where</small>
              <p>Info</p>
            </div>
            <div class="element">
              <small>Where</small>
              <p>Info</p>
            </div>
          </div>
          <i class="fa-solid fa-xmark" onClick="document.getElementById('more').classList.add('hidden')" id="close"></i>
        </div>
        
    
    <div class="blur"></div>
</div>

    `)
    events.innerHTML = dataHTML.join("")
  })
  .catch(error => {
    console.log('Error:')
  })

  function updateVisibility(selectedValue) {
    const elementsEn = document.getElementsByClassName("en")
    const elementsRo = document.getElementsByClassName("ro")
    const elementsRu = document.getElementsByClassName("ru")


    Array.from(elementsEn).forEach(element => element.classList.add("hidden"))
    Array.from(elementsRo).forEach(element => element.classList.add("hidden"))
    Array.from(elementsRu).forEach(element => element.classList.add("hidden"))


    if (selectedValue === "en") {
        Array.from(elementsEn).forEach(element => element.classList.remove("hidden"))
    } else if (selectedValue === "ro") {
        Array.from(elementsRo).forEach(element => element.classList.remove("hidden"))
    } else if (selectedValue === "ru") {
        Array.from(elementsRu).forEach(element => element.classList.remove("hidden"))
    }
}


const selectElement = document.getElementById('langSelector')


selectElement.value = "en"


updateVisibility(selectElement.value)


selectElement.addEventListener('change', function () {
    updateVisibility(this.value)
});
  


