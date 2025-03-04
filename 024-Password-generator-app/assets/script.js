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


document.querySelector('button').addEventListener('click', gerarSenha);

function gerarSenha() {
    let len = numLength.textContent
    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+[]{}<>?,.";
  
    const caracteres = letrasMaiusculas + letrasMinusculas + numeros + simbolos;
    let senha = "";
  
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      senha += caracteres[randomIndex];
    }
  
    return senha;
}
