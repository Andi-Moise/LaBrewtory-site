
// 

const logo = document.getElementById('logo');
const logoNav = document.getElementById('logoNav')
const nav= document.getElementById("nav")
  
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
    nav.style.background = "#191919"
    
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
      beerImage.src = data[imageIndex].beerimg;
      bannerImages.src = data[imageIndex].bannerimg ;

      document.querySelectorAll(".indicator").forEach((el, index) => {
        el.classList.toggle("active", index === imageIndex)
      });
    }

    // function nextSlide() {
    //   imageIndex = (imageIndex + 1) % data.length;
    //   updateSlider();
    // }
    
    // let sliderInterval = setInterval(nextSlide, 5000); 
    // function resetTimer() {
    //   clearInterval(sliderInterval);
    //   sliderInterval = setInterval(nextSlide, 5000);
    // }
    
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

    

