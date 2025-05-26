const btnControlMode = document.querySelector("#control-btn-theme");
const btnControlModeCircle = document.querySelector(".circle");
const elementSubject = document.querySelectorAll(".subject")

let theme = "light";

btnControlMode.addEventListener("click", () => {
    theme = theme === "light" ? 'dark' : "light";
    btnControlModeCircle.style.left = btnControlModeCircle.style.left === "40%" ? "0%" : "40%";
    document.documentElement.setAttribute('mode-light-dark', theme);
    changeWindow();
})

const backgroundUrl = './assets/images/pattern-background';


const changeWindow = () => {
    const windowWidth = window.innerWidth;
    if(windowWidth <= 768){
        document.body.style.backgroundImage = `url(${backgroundUrl}-mobile-${theme}.svg)`;
    }else if(windowWidth <= 1200) {
        document.body.style.backgroundImage = `url(${backgroundUrl}-tablet-${theme}.svg)`;
    }else {
        document.body.style.backgroundImage = `url(${backgroundUrl}-desktop-${theme}.svg)`;
    }
}

window.addEventListener('resize', changeWindow);
changeWindow();


elementSubject.forEach((subject, index) => {
    subject.addEventListener("click", () => {
        window.location.href = `./assets/pages/app.html?id=${index}`
    })
})



