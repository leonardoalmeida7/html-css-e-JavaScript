const textArea = document.querySelector('textarea');
const logoAndIcon = document.querySelectorAll('img');
const characters = document.querySelector('#characters');
const words = document.querySelector('#words');
const sentences = document.querySelector('#sentence');
const excludeSpaces = document.querySelector('#exclude-spaces');
const setCharacterLimit = document.querySelector('#set-character-limit');
const readingTime = document.querySelector('#time');



let checkActiveSpaces = false;


excludeSpaces.addEventListener('click', () => {
    if(checkActiveSpaces){
        checkActiveSpaces = false;
    }else {
        checkActiveSpaces = true;
    }

    document.querySelector('#no-spaces').classList.toggle('hidden');

    analyzeRealTime();
    
})
let checkActiveLimit = false;
let numLimit = document.querySelector('#num-character-limit');

setCharacterLimit.addEventListener('click', () => {
    if(checkActiveLimit === false){
        numLimit.classList.remove('hidden');
        numLimit.addEventListener('input', errorLimit)
        errorLimit();
        checkActiveLimit = true;
    }else {
        textArea.classList.remove('error')
        numLimit.classList.add('hidden');
        document.querySelector('#text-erro').classList.add('hidden');
        checkActiveLimit = false;
    }
  
})
 function errorLimit(){
    if(textArea.value.length > numLimit.value){
        textArea.classList.add('error');
        document.querySelector('#text-erro').classList.remove('hidden');
        document.querySelector('#text-erro').innerHTML = `<img src="images/icon-info.svg"> Limit reached! Your text exceeds ${numLimit.value} characters`
    }else {
        textArea.classList.remove('error');
        document.querySelector('#text-erro').classList.add('hidden');
    }
 }


textArea.addEventListener('input', analyzeRealTime)

function analyzeRealTime(){
    let addLetters = textArea.value;
    let word = addLetters.split(' ');
    let sentence = addLetters.split('.');
    sentence = sentence.filter((e) => e !== '');
    let textNoSpace = word.join('');
    
    let totalCharacters = addLetters.length;
    let totalWords = word.length;
    let totalSentences = sentence.length;

    if(checkActiveSpaces){
        characters.textContent = textNoSpace.length;
        
    }else {
        characters.textContent = totalCharacters;
    }
    
    
    words.textContent = word[0] == ''  ? 0 : totalWords;
    sentences.textContent = sentence[0] == '' ? 0 : totalSentences;
    
    let time = totalCharacters / 300;
    if(time == 0){
        readingTime.textContent = '0'; 
    }else {
        readingTime.textContent = totalCharacters < 300 ? '<1' : time.toFixed();
    }

    
    function contarLetras(texto) {
        let contador = {};
        let totalLetras = 0;
    
        for (let char of texto) {
            if (char.match(/[a-zA-Z]/)) {
                let letra = char.toLowerCase();
                contador[letra] = (contador[letra] || 0) + 1;
                totalLetras++;
            }
        }
    
        return { contador, totalLetras };
    }

    let { contador, totalLetras } = contarLetras(addLetters);
    let container = document.getElementById("letterDensity");
    let toggleButton = document.getElementById("toggleButton");
    

    container.innerHTML = ""; // Limpa antes de atualizar

    let letrasOrdenadas = Object.entries(contador)
        .sort((a, b) => b[1] - a[1]); // Ordena do maior para o menor

    letrasOrdenadas.forEach(([letra, qtd], index) => {
        let percentual = ((qtd / totalLetras) * 100).toFixed(2);

        let hiddenClass = index >= 5 ? "hidden" : ""; // Oculta as barras além das 5 primeiras

        let bar = `
            <div class="letter-bar ${hiddenClass}">
                <span class="letter-label">${letra.toUpperCase()}</span>
                <div class="bar">
                    <div class="letter-progress" style="width: ${percentual}%"></div>
                </div>
                <span class="letter-percentage">${qtd} (${percentual}%)</span>
            </div>
        `;

        container.innerHTML += bar;
    });

    // Só exibe o botão se houver mais de 5 letras diferentes
    toggleButton.style.display = letrasOrdenadas.length > 5 ? "block" : "none";
    if(checkActiveLimit){
        errorLimit();
    }
    
}
    
// Alternar visibilidade ao clicar no botão
document.getElementById("toggleButton").addEventListener("click", function () {
    let hiddenElements = document.querySelectorAll(".letter-bar.hidden");
    let isExpanded = hiddenElements.length === 0;
    let icon = '';

    document.querySelectorAll(".letter-bar").forEach((bar, index) => {
        if (index >= 5) {
            bar.classList.toggle("hidden", isExpanded);
        }
    });
    if(isExpanded){
        icon = `See more <i class="fa-solid fa-chevron-down"></i>`
        this.innerHTML = icon;
    }else {
        icon = `See less <i class="fa-solid fa-chevron-up"></i>`
        this.innerHTML = icon;
    }
});



const iconButton = document.querySelector('.button-icon');
let theme = 'dark';

iconButton.addEventListener('click', () => {
    if(theme == 'dark'){
        document.documentElement.setAttribute('mode-light-dark', 'light');
        theme = 'light';
    }else {
        document.documentElement.setAttribute('mode-light-dark', 'dark');
        theme = 'dark';
    }
    logoAndIcon.forEach(element => {
        element.classList.toggle('hidden');
    })
})
