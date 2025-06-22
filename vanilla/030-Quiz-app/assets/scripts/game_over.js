const elementIconSubject = document.querySelectorAll(".img-subject-actual");
const elementIcon = document.createElement("img");
const elementTitle = document.querySelectorAll(".subject-actual");
const btnControlMode = document.querySelector("#control-btn-theme");
const btnControlModeCircle = document.querySelector(".circle");
const elementNumScore = document.querySelector(".score");
const elementBtn = document.querySelector(".btn-play-again");

const urlParametes = window.location.search;

const idAndScore = urlParametes.match(/\d+/g);

const idSubject = idAndScore[0];
const numScore = idAndScore[1];


btnControlMode.addEventListener("click", () => {
    theme = theme === "light" ? 'dark' : "light";
    btnControlModeCircle.style.left = btnControlModeCircle.style.left === "40%" ? "0%" : "40%";
    document.documentElement.setAttribute('mode-light-dark', theme);
    changeWindow();
})

let theme = "light";
const backgroundUrl = '../images/pattern-background'

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


const getInfos = async () => {
    try {
        const fetchApi = await fetch("../data/data.json");

        if (!fetchApi.ok) {
            throw new Error(`Erro HTTP: ${fetchApi.status}`);
        }

        const json = await fetchApi.json();
        const { title, icon, questions } = json.quizzes[idSubject];

        elementTitle.forEach(element => element.textContent = title);
        
        if (!elementIcon.src) {
            elementIcon.setAttribute('src', `${icon}`);
            elementIconSubject.forEach(element => {
                const iconClone = elementIcon.cloneNode()
                element.appendChild(iconClone);
                element.id = `icon-${title.toLowerCase()}`
            })
        }

        elementNumScore.textContent = numScore;

        console.log(icon)

    } catch (error) {
        console.error("Erro ao buscar ou processar os dados", error)
    }
    
}   


getInfos();


elementBtn.addEventListener('click', () => window.location.href = "../../index.html")