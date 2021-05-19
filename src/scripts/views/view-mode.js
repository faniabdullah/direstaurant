//list elmHtml to change mode dark or light
let elmCard = document.getElementsByClassName("card-1");
let elmHeader = document.getElementsByClassName("header-apps");
let elmHeaderContent = document.getElementsByClassName("container__header");
let elmNav = document.getElementsByClassName("nav");
let elmNavItem = document.getElementsByClassName("nav__list");
let elmButton = document.getElementsByClassName("btn__detail");
let elmColorPrimary = document.getElementsByClassName("color-primary");
let elmBtnSearch  = document.getElementsByClassName("btn-search");
let elmLogoBackground  = document.getElementsByClassName("logo-background");
let elmBtnFoordward  = document.getElementsByClassName("forward");


//setdark for dark mode
const setDark = () => {

    for (let i = 0; i < elmCard.length; i++) {
        elmCard[i].classList.add('card-dark-mode');
      } 
    for (let i = elmHeader.length - 1; i >= 0; i--) {
        elmHeader[i].classList.add('darkModePrimary');
      } 
    for (let i = elmHeaderContent .length - 1; i >= 0; i--) {
        elmHeaderContent[i].classList.add('navbar-dark-mode');
    } 
    for (let i = elmNav.length - 1; i >= 0; i--) {
        elmNav[i].style.backgroundColor = 'rgb(33, 33, 33)';
    } 
    for (let i = elmNavItem.length - 1; i >= 0; i--) {
        elmNavItem[i].classList.add('nav-dark-mode');
    } 
    for (let i = elmButton.length - 1; i >= 0; i--) {
        elmButton[i].style.backgroundColor = 'rgb(176,96,73)';
    } 
    for (let i = elmColorPrimary.length - 1; i >= 0; i--) {
        elmColorPrimary[i].style.color = 'rgb(176,96,73)';
    } 
    for (let i = elmBtnFoordward.length - 1; i >= 0; i--) {
        elmBtnFoordward[i].style.backgroundColor = 'rgb(176,96,73)';
    } 
    for (let i = elmLogoBackground.length - 1; i >= 0; i--) {
        elmLogoBackground[i].style.backgroundColor = 'rgb(176,96,73)';
    } 
    for (let i = elmBtnSearch.length - 1; i >= 0; i--) {
        elmBtnSearch[i].style.backgroundColor = 'rgb(225, 255, 255,0.12)';
        elmBtnSearch[i].style.color = '#ffffff';
    }
    localStorage.setItem('preferredTheme', 'dark');
    document.body.classList.add("darkModePrimary");
    document.getElementById("setDark").className = "set-mode hide";
    document.getElementById("setLight").className = "set-mode";
}

//setLight for light mode
const setLight = () => {
    for (let i = 0; i < elmCard.length; i++) {
        elmCard[i].classList.remove('card-dark-mode');
      } 
    for (let i = elmHeader.length - 1; i >= 0; i--) {
        elmHeader[i].classList.remove('darkModePrimary');
      } 
    for (let i = elmHeaderContent .length - 1; i >= 0; i--) {
        elmHeaderContent[i].classList.remove('navbar-dark-mode');
    } 
    for (let i = elmNav.length - 1; i >= 0; i--) {
        elmNav[i].style.backgroundColor = '#ffffff';
    } 
    for (let i = elmNavItem.length - 1; i >= 0; i--) {
        elmNavItem[i].classList.remove('nav-dark-mode');
    } 
    for (let i = elmButton.length - 1; i >= 0; i--) {
        elmButton[i].style.backgroundColor = '#aa4a30';
    } 
    for (let i = elmColorPrimary.length - 1; i >= 0; i--) {
        elmColorPrimary[i].style.color = '#aa4a30';
    }
    for (let i = elmBtnSearch.length - 1; i >= 0; i--) {
        elmBtnSearch[i].style.backgroundColor = '#ffffff';
        elmBtnSearch[i].style.color = 'black';
    }
    for (let i = elmBtnFoordward.length - 1; i >= 0; i--) {
        elmBtnFoordward[i].style.backgroundColor = '#aa4a30';
    } 
    for (let i = elmLogoBackground.length - 1; i >= 0; i--) {
        elmLogoBackground[i].style.backgroundColor = '#aa4a30';
    } 

   localStorage.removeItem('preferredTheme');
   document.body.classList.remove("darkModePrimary");
   document.getElementById("setDark").className = "set-mode";
   document.getElementById("setLight").className = "set-mode hide";
}

//for chek mode
const mode = () => {
    if(localStorage.getItem('preferredTheme') === 'dark') {
        setDarkMode(true);
     }else{
         setDarkMode(false);
     }
    }

// for logic to click 
const setDarkMode = (isDark) => {
        if (isDark) {
            setDark();
        }else{
            setLight();
        }
    }

export { setDarkMode, mode };