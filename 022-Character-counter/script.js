const iconButton = document.querySelector('.button-icon');
const textArea = document.querySelector('textarea');
const logoAndIcon = document.querySelectorAll('img');
const characters = document.querySelector('#characters');
const words = document.querySelector('#words');
const sentences = document.querySelector('#sentence');
const excludeSpaces = document.querySelector('#exclude-spaces');
const setCharacterLimit = document.querySelector('#set-character-limit');
const readingTime = document.querySelector('#time');





let checkActive = false;


excludeSpaces.addEventListener('click', () => {
    if(checkActive){
        checkActive = false;
    }else {
        checkActive = true;
    }

    document.querySelector('#no-spaces').classList.toggle('hidden');

    analyzeRealTime();
    
})


textArea.addEventListener('input', analyzeRealTime)


function analyzeRealTime(e){
    let addLetters = textArea.value;
    let word = addLetters.split(' ');
    let sentence = addLetters.split('.');
    sentence = sentence.filter((e) => e !== '');
    let textNoSpace = word.join('');
    
    let totalCharacters = addLetters.length;
    let totalWords = word.length;
    let totalSentences = sentence.length;

    if(checkActive){
        characters.textContent = textNoSpace.length;
        
    }else {
        characters.textContent = totalCharacters;
    }
    
    
    words.textContent = word[0] == '' ? 0 : totalWords;
    
    sentences.textContent = sentence[0] == '' ? 0 : totalSentences;
    
    let time = totalCharacters / 300;
    if(time == 0){
        readingTime.textContent = '0'; 
    }else {
        readingTime.textContent = totalCharacters < 300 ? '<1' : time.toFixed();
    }
    

    

    let arrLetters = addLetters.split('');

    let test = arrLetters.join('');

    let test2 = new RegExp(e.data,  'g');
    let test3 = test.match(test2); // quantidade de cada elemento digitado [x, x, x]
    console.log(test3);
    
    
    let guardar = '';
    
    if(e.inputType !== 'deleteContentBackward'){
        guardar = addLetters[addLetters.length - 1];
        createLetterDensity(totalCharacters, e, test3);
        console.log(guardar)
    }else{
        //console.log(guardar)
        removeLetterDensity(test3);
    }

}




function removeLetterDensity(test3){
    const classContainer = document.querySelectorAll(test3);

    classContainer.forEach(element => {
        element.remove();
    })
}

function createLetterDensity(totalCharacters, e, test3){
    const msgNoLetters = document.querySelector('#no-letters');
    const documentMain = document.querySelector('main');

    const containerStatistics = document.createElement("div");
    containerStatistics.setAttribute('id', test3 );
    containerStatistics.classList.add('hidden');

    const letter = document.createElement("div");
    containerStatistics.appendChild(letter);
    letter.textContent = e.data.toLocaleUpperCase();
    
    
    const statisticsLetters = document.createElement("div");
    statisticsLetters.setAttribute('id', 'statistics-letters');
    statisticsLetters.classList = 'my-auto mx-2'
    const bar = document.createElement("div");
    bar.classList = 'bar';
    statisticsLetters.appendChild(bar);
    
    containerStatistics.appendChild(statisticsLetters);
    
    const statisticsLetter = document.createElement('div');
    statisticsLetter.textContent = '40(16.06%)';
    
    containerStatistics.appendChild(statisticsLetter);
    
    
    documentMain.appendChild(containerStatistics);
    
    
    if(totalCharacters !== 0){
        msgNoLetters.classList.add('hidden');
        containerStatistics.classList.add('d-flex');
    }else{
        removeLetterDensity();
        msgNoLetters.classList.remove('hidden');
        containerStatistics.classList.remove('d-flex');
    }  

 
}

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