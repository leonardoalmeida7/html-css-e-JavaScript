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
   checkActiveSpaces = !
   checkActiveSpaces;

    document.querySelector('#no-spaces').classList.toggle('hidden');

    analyzeRealTime();
    
})
let checkActiveLimit = false;
let numLimit = document.querySelector('#num-character-limit');

setCharacterLimit.addEventListener('click', () => {
    checkActiveLimit = !
    checkActiveLimit;
    numLimit.classList.toggle('hidden', !checkActiveLimit);
    textArea.classList.remove('error')
    document.querySelector('#text-erro').classList.add('hidden');
    if(checkActiveLimit){
        numLimit.addEventListener('input', errorLimit)
        errorLimit();
        
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
    const text = addLetters.trim();
    const sentence = text.match(/[^.!?]+[.!?]/g);
    let word = text.match(/\b[\wÀ-ÿ'-]+\b/g);
    
    let totalCharacters = addLetters.length;
    let textNoSpace = word ? word.join('').length : 0;
    
    if(checkActiveSpaces){
        characters.textContent = textNoSpace;
        
    }else {
        characters.textContent = totalCharacters;
    }
    
    
    words.textContent = word ? word.length : 0;
    sentences.textContent = sentence ? sentence.length : 0;
    
    let time = totalCharacters / 300;
    if(time == 0){
        readingTime.textContent = '0'; 
    }else {
        readingTime.textContent = totalCharacters < 300 ? '<1' : time.toFixed();
    }

    
    function countLetters(text) {
        let count = {};
        let totalLetters = 0;
    
        for (let char of text) {
            if (char.match(/[a-zA-Z]/)) {
                let letter = char.toLowerCase();
                count[letter] = (count[letter] || 0) + 1;
                totalLetters++;
            }
        }
    
        return { count, totalLetters };
    }

    let { count, totalLetters } = countLetters(addLetters);
    let container = document.getElementById("letterDensity");
    let toggleButton = document.getElementById("toggleButton");
    

    container.replaceChildren();

    let lettersOrder = Object.entries(count)
        .sort((a, b) => b[1] - a[1]);

    lettersOrder.forEach(([letter, qtd], index) => {
        let percentual = ((qtd / totalLetters) * 100).toFixed(2);

        let hiddenClass = index >= 5 ? "hidden" : ""; 
        let bar = `
            <div class="letter-bar ${hiddenClass}">
                <span class="letter-label">${letter.toUpperCase()}</span>
                <div class="bar">
                    <div class="letter-progress" style="width: ${percentual}%"></div>
                </div>
                <span class="letter-percentage">${qtd} (${percentual}%)</span>
            </div>
        `;

        container.innerHTML += bar;
    });

    toggleButton.style.display = lettersOrder.length > 5 ? "block" : "none";
    if(checkActiveLimit){
        errorLimit();
    }
    
}
    
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
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('mode-light-dark', theme);
    logoAndIcon.forEach(element => element.classList.toggle('hidden'))
})
