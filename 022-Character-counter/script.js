const iconButton = document.querySelector('.button-icon');
const textArea = document.querySelector('textarea');
const logoAndIcon = document.querySelectorAll('img');

let letters = [];
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
    let lastValue = textArea.value.length - 1;
    letters.push(textArea.value[lastValue]);
    textArea.addEventListener('keydown', (e) => {
        if(e.key === 'Backspace'){
            letters.pop()
        }
    })
    console.log(letters)
})