
const logo = document.getElementById('logo');
const logoNav = document.getElementById('logoNav')
const nav= document.getElementById("nav")
const curt1 =document.getElementById("curt1")
const curt2 =document.getElementById("curt2")

window.addEventListener('scroll', () => {
    logoNav.style.display = 'none'
    const scrollPosition = window.scrollY;
    logoNav.style.display = 'none'
    if (scrollPosition > 10 && scrollPosition < 150 ) {
      
      
      logo.style.transition = '1s'
    //   logoNav.style.transition = '1s'
       nav.style.background = "none"
       
      
      
     
    } else if(scrollPosition > 170 && scrollPosition < 500 ){
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
  