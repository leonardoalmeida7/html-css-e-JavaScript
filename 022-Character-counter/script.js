const iconButton = document.querySelector('.button-icon');
const textArea = document.querySelector('textarea');
const logoAndIcon = document.querySelectorAll('img');
const characters = document.querySelector('#characters');
const words = document.querySelector('#words');
const sentences = document.querySelector('#sentence');


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


textArea.addEventListener('input', () => {

    let letters = textArea.value;
    let word = letters.split(' ');
    let sentence = letters.split('.');
    sentence = sentence.filter((e) => e !== '' && e !== ' ');

    let totalCharacters = letters.length;
    let totalWords = word.length;
    let totalSentences = sentence.length;
    
    characters.textContent = totalCharacters;
    words.textContent = word[0] == '' ? 0 : totalWords;
    let test
    //console.log(sentence.join(''));
    //console.log(sentence);

    sentences.textContent = totalSentences;
})