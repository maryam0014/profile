const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

// REMOVE MOBILE MENU

const navLink = document.querySelectorAll('.nav__link')

function linkAction (){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener("click", linkAction ))


// SHOW SCROLL BAR

function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

// DARK THEME
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


// REDUCE THE SIZE AND PRINT ON A4 SHEET

function scaleCv(){
    document.body.classList.add('scale-cv')
}

// REMOVE THE SIZE WHEN CV IS DOWNLOADED

function reomveScale(){
    document.body.classList.remove('scale-cv')
}

// GENERATE PDF
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

// HTML2PDF OPTIONS
let opt = {
    margin:       0,
    filename:     'myResume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' }
  };

// FUNCTION TO CALL AREACV AND HTML2PDF OPTIONS
function generateResume(){
    html2pdf(areaCv, opt)
}

// WHEN THE BUTTON IS CLICKED, IT EXECUTES THE THREE FUNCTION

resumeButton.addEventListener('click', () => {
    //  1 the classs .scale-cv is added to the body

    scaleCv()

    // 2. THE PDF IS GENERATED 
    generateResume()

    // 3 the .scale-cv is removed after 5 seconds
    setTimeout(reomveScale, 5000)
})