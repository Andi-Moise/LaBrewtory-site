
const logo = document.getElementById('logo');
const logoNav2 = document.getElementById('logoNav2')
const nav2= document.getElementById("nav2")
const curt1 =document.getElementById("curt1")
const curt2 =document.getElementById("curt2")

const events = document.getElementById("events")
const apiUrl2 = 'https://679b802733d3168463241458.mockapi.io/events';




const burgerBtn = document.getElementById("burger-btn")
const closeHalfNavbarBtn = document.getElementById("close-half-navbar")
const halfNavbar = document.getElementById("half-navbar")


burgerBtn.addEventListener("click", ()=>{
  halfNavbar.classList.toggle("hidden")
  burgerBtn.classList.add("hidden")
})
closeHalfNavbarBtn.addEventListener("click", ()=>{
  halfNavbar.classList.toggle("hidden")
  burgerBtn.classList.remove("hidden")
})

document.addEventListener("DOMContentLoaded", () => {
  const langSelector = document.getElementById("langSelector");

  // Load language from localStorage
  const savedLang = localStorage.getItem("selectedLanguage");
  if (savedLang) {
    langSelector.value = savedLang;
    applyLanguage(savedLang);
  }

  // Event listener for language change
  langSelector.addEventListener("change", (event) => {
    const selectedLang = event.target.value;
    localStorage.setItem("selectedLanguage", selectedLang);
    applyLanguage(selectedLang);
  });

  function applyLanguage(lang) {
    console.log(`Language changed to: ${lang}`);
    // You can add logic here to dynamically update text content if needed
  }})

window.addEventListener('scroll', () => {
    logoNav2.style.display = 'none'
    const scrollPosition = window.scrollY;
    logoNav2.style.display = 'none'
    if (scrollPosition > 10 && scrollPosition < 150 ) {
      
      
      logo.style.transition = '1s'
    //   logoNav.style.transition = '1s'
       nav2.style.background = "none"
       
      
      
     
    } else if(scrollPosition > 170 && scrollPosition < 510 ){
      logoNav2.style.display = 'flex'
      logoNav2.style.zIndex = "2"
      curt1.style.width = "100%"
    curt2.style.width = "100%"
      nav2.style.background = "#1b1b1b"
      
    } else if(scrollPosition > 500){
        // curt1.style.transform = "translate-x(20px)"
        curt1.style.width = "50%"
        curt1.style.transition = '1s'
        curt2.style.width = "50%"
        curt2.style.transition = '1s'
        nav2.style.background = "#1b1b1b"
        logoNav2.style.display = 'flex'
    }
    else {
    //   logoNav.style.display = 'none'
      nav2.style.background = "none"
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


window.addEventListener('scroll', () => {
  logoNav2.style.display = 'none'
  const scrollPosition = window.scrollY;
  logoNav2.style.display = 'none'
  if (scrollPosition > 10 && scrollPosition < 150 ) {
    
    
    logo.style.transition = '1s'
  //   logoNav.style.transition = '1s'
     nav2.style.background = "none"
     
    
    
   
  } else if(scrollPosition > 170 && scrollPosition < 510 ){
    logoNav2.style.display = 'flex'
    logoNav2.style.zIndex = "2"
    curt1.style.width = "100%"
  curt2.style.width = "100%"
    nav2.style.background = "#1b1b1b"
    
  } else if(scrollPosition > 500){
      // curt1.style.transform = "translate-x(20px)"
      curt1.style.width = "50%"
      curt1.style.transition = '1s'
      curt2.style.width = "50%"
      curt2.style.transition = '1s'
      nav2.style.background = "#1b1b1b"
      logoNav2.style.display = 'flex'
  }
  else {
  //   logoNav.style.display = 'none'
    nav2.style.background = "none"
  }
  console.log(scrollPosition)
});