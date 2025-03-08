const slider = document.getElementById('slider');
const numLength = document.getElementById('num_length');
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');

let isDragging = false;

slider.addEventListener('mousedown', (e) => {
isDragging = true;
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (!isDragging) return;
    const containerRect = sliderContainer.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > containerRect.width) newLeft = containerRect.width;
    
    slider.style.left = `${newLeft}px`;
    sliderTrack.style.width = `${newLeft + 10}px`;
    const percentage = (newLeft / containerRect.width) * 100;
    numLength.textContent = Math.round(percentage / 5); 
    
}

function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}


document.querySelector('button').addEventListener('click', generatePassword);


function generatePassword() {
    let len = numLength.textContent
    const checkBoxs = document.querySelectorAll('input[type="checkbox"');
    let listCharacters = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz","0123456789","!@#$%^&*()_+[]{}<>?"];

    let character = "";

    for(let i = 0; i < checkBoxs.length; i++){
        if(checkBoxs[i].checked) {
            character += listCharacters[i]
        }
    }
    
    if(character == ""){
        return '';
    }

    let password = "";
    
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * character.length);
      password += character[randomIndex];
    }

    document.getElementById('password').innerHTML = password;
    document.getElementById('password').style.color = 'var(--Color3)';

    
    const rectangles = document.querySelectorAll('.rectangle');

    let listStylesRectangle = [
        {
            background: 'var(--Color6)',
            border: '2px solid var(--Color6)'
        },
        {
            background: 'var(--Color7)',
            border: '2px solid var(--Color7)'
        },
        {
            background: 'var(--Color8)',
            border: '2px solid var(--Color8)'
        },
        {
            background: 'var(--Color5)',
            border: '2px solid var(--Color5)'
        },
    ]


    function getStyle(num){
        rectangles.forEach(rectangle => {
            rectangle.style.background = 'transparent';
            rectangle.style.border = '2px solid var(--Color3)';
        })
        for(let i = 0; i <= num; i++){
            rectangles[i].style.background = listStylesRectangle[num].background
            rectangles[i].style.border = listStylesRectangle[num].border
        }
    }
    
    const textStrength = document.getElementById('strength');

    if(len <= 5) {
        textStrength.innerHTML = 'too weak!';
        getStyle(0);
    }else if(len >=6 && len <= 10){
        textStrength.innerHTML = 'weak';
        getStyle(1);
        if(character.length >= 52 && character.length < 63) {
            textStrength.innerHTML = 'medium';
            getStyle(2);
        }
    }else if (len > 10 && len <= 15) {
        textStrength.innerHTML = 'medium';
        getStyle(2);
        if(character.length > 26) {
            textStrength.innerHTML = 'strong';
            getStyle(3);
        }
    }else {
        textStrength.innerHTML = 'strong';
        getStyle(3);
    }


}

document.querySelector('.fa-copy').addEventListener('click', () => {
    const password = document.querySelector('#password');
    navigator.clipboard.writeText(password.textContent)
        .then(() => {
            alert('Copied password!');
        })
        .catch(err => console.error("Erro ao copiar", err));
})