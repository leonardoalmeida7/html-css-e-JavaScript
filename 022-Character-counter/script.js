const iconButton = document.querySelector('.button-icon');
const textArea = document.querySelector('textarea');
const logoAndIcon = document.querySelectorAll('img');
const characters = document.querySelector('#characters');
const words = document.querySelector('#words');
const sentences = document.querySelector('#sentence');
const inputsCheckbox = document.querySelectorAll('input[type="checkbox"');


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

inputsCheckbox.forEach((check) => {
    check.addEventListener('change' , () => {
        if(this.checked) {
            alert('deu');
        }
    })
})

textArea.addEventListener('input', () => {

    let letters = textArea.value;
    let word = letters.split(' ');
    let sentence = letters.split('.');
    sentence = sentence.filter((e) => e !== '');
    console.log(sentence);
    let totalCharacters = letters.length;
    let totalWords = word.length;
    let totalSentences = sentence.length;
    
    characters.textContent = totalCharacters;
    words.textContent = word[0] == '' ? 0 : totalWords;
    
    

    sentences.textContent = sentence[0] == '' ? 0 : totalSentences;
})