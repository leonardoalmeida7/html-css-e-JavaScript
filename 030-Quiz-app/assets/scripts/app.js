const elementIconSubject = document.querySelector(".img-subject-actual");
const elementIcon = document.createElement("img");
const elementTitle = document.querySelector(".subject-actual");
const elementQuestion = document.querySelector(".question");
const elementNumQuestion = document.querySelector(".num-actual-question");
const elementAlternative = document.querySelectorAll('.alternative');
const elementContainerAlternative = document.querySelectorAll(".container-alternative");
const elementLetterAlternative = document.querySelectorAll(".letter");
const elementProgressBar = document.querySelector(".bar");
const textError = document.querySelector(".text-error");
const btnControlMode = document.querySelector("#control-btn-theme");
const btnControlModeCircle = document.querySelector(".circle");

const btnSubmit = document.querySelector(".btn-submit");

const urlParametes = window.location.search; 
const idSubject = urlParametes.replace("?id=", "");

const iconSuccess = document.createElement('img');
iconSuccess.setAttribute('src', '../images/icon-correct.svg');
iconSuccess.classList = "icons-alternative";

const iconError = document.createElement('img');
iconError.setAttribute('src', '../images/icon-error.svg');
iconError.classList = "icons-alternative";


let theme = 'light';


btnControlMode.addEventListener("click", () => {
    theme = theme === "light" ? 'dark' : "light";
    btnControlModeCircle.style.left = btnControlModeCircle.style.left === "40%" ? "0%" : "40%";
    document.documentElement.setAttribute('mode-light-dark', theme);
    changeWindow();
    console.log(theme)
})

const actualPage = window.location.pathname;
const backgroundUrl = '../images/pattern-background';

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


let numQuestion = 0;
let markedAlternative = false;
let chosenAlternative = "";
let currentAnswer = "";
let correctionIndex = -1;

let score = 0;

// Função principal de carregamento
const getInfos = async () => {
    try {
        const fetchApi = await fetch("../data/data.json");

        if (!fetchApi.ok) {
            throw new Error(`Erro HTTP: ${fetchApi.status}`);
        }

        const json = await fetchApi.json();

        const { title, icon, questions } = json.quizzes[idSubject];
        const { answer, options, question } = questions[numQuestion];

        // Atualiza dados principais
        elementTitle.textContent = title;
        elementQuestion.textContent = question;
        elementNumQuestion.textContent = numQuestion + 1;

        // Atualiza ícone e título
        if (!elementIcon.src) {
            elementIcon.setAttribute('src', `${icon}`);
            elementIconSubject.appendChild(elementIcon);
            elementIconSubject.id = `icon-${title.toLowerCase()}`;
        }

        // Atualiza alternativas
        elementAlternative.forEach((alternative, index) => {
            alternative.textContent = options[index];
        });

        // Armazena resposta e índice da correta
        currentAnswer = answer;
        correctionIndex = options.findIndex(opt => opt === answer);

        // Reset de estado visual
        markedAlternative = false;
        chosenAlternative = "";
        textError.classList.add("hidden");
        btnSubmit.textContent = "Submit Answer";

        elementContainerAlternative.forEach((element, index) => {
            element.removeAttribute("style");
            element.querySelector(".icons-alternative")?.remove(); // remove ícone anterior, se houver
            elementLetterAlternative[index].removeAttribute("id");
        });

    } catch (error) {
        console.error("Erro ao buscar ou processar os dados", error);
    }
};

getInfos();

// Adiciona os eventos de clique nas alternativas uma única vez
elementContainerAlternative.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (markedAlternative) return;

        markedAlternative = true;
        chosenAlternative = element.children[1].textContent;

        textError.classList.add("hidden");
        btnSubmit.textContent = "Next Question";

        if (chosenAlternative === currentAnswer) {
            element.style = "border: 4px solid var(--Green500);";
            element.appendChild(iconSuccess.cloneNode());
            elementLetterAlternative[index].id = "correct-alternative";
            score++;
        } else {
            element.style = "border: 4px solid var(--Red500);";
            element.appendChild(iconError.cloneNode());
            elementLetterAlternative[index].id = "error-alternative";

            // Mostra a correta
            const correctElement = elementContainerAlternative[correctionIndex];
            correctElement.appendChild(iconSuccess.cloneNode());
        }
    });
});

// Clique no botão de submissão
btnSubmit.addEventListener("click", () => {
    if (!chosenAlternative) {
        textError.classList.remove("hidden");
    } else {
        numQuestion++;
        elementProgressBar.style.width = numQuestion * 10 + '%';
        if(numQuestion < 10) return getInfos();
        window.location.href = `./game_over.html?id=${idSubject}&score=${score}`;
    }
});
