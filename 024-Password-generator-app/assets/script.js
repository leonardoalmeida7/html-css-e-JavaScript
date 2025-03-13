const slider = document.getElementById('slider');
const numLength = document.getElementById('num_length');
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');

let isDragging = false;
let offsetX = 0;
const thumbWidth = 30; // Largura da bolinha
const maxValue = 20;

slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag, { passive: true });

function startDrag(e) {
    isDragging = true;

    const clientX = getClientX(e);
    offsetX = clientX - slider.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', onMouseMove, { passive: true });
    document.addEventListener('touchend', stopDrag);
}

function onMouseMove(e) {
    if (!isDragging) return;

    const clientX = getClientX(e);
    const containerRect = sliderContainer.getBoundingClientRect();
    
    let newLeft = clientX - containerRect.left - offsetX;

    // Garantir que a bolinha não ultrapasse os limites
    if (newLeft < 0) newLeft = 0;
    if (newLeft > containerRect.width - thumbWidth) newLeft = containerRect.width - thumbWidth;

    updateSlider(newLeft);
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', onMouseMove);
    document.removeEventListener('touchend', stopDrag);
}

function getClientX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
}

function updateSlider(left) {
    slider.style.transform = `translateX(${left}px)`;
    sliderTrack.style.width = `${left + thumbWidth / 2}px`;

    const percentage = (left / (sliderContainer.clientWidth - thumbWidth)) * 100;
    numLength.textContent = Math.round((percentage * maxValue) / 100);
}

document.querySelector('button').addEventListener('click', generatePassword);


function generatePassword() {
    const len = parseInt(numLength.textContent);
    const selectedCharacters = getSelectedCharacters();
  
    if (!selectedCharacters) return '';

    const password = createPassword(len, selectedCharacters);
    displayPassword(password);
    updateStrengthIndicator(len, selectedCharacters.length);
}

function getSelectedCharacters() {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    const characterSets = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz",
        "0123456789",
        "!@#$%^&*()_+[]{}<>?"
    ];

    let chars = "";
    
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            chars += characterSets[i];
        }
    }

    return chars;
}

function createPassword(length, characterPool) {
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }

    return password;
}

function displayPassword(password) {
    const passwordElement = document.getElementById('password');
    passwordElement.textContent = password;
    passwordElement.style.color = 'var(--Color3)';
}

function updateStrengthIndicator(length, characterPoolSize) {
    const strengthLevels = ["too weak!", "weak", "medium", "strong"];
    const thresholds = [5, 10, 15];
    let strengthIndex = thresholds.findIndex(threshold => length <= threshold);
    if (strengthIndex === -1) strengthIndex = 3;

    if (strengthIndex === 1 && characterPoolSize >= 52) strengthIndex = 2;
    if (strengthIndex === 2 && characterPoolSize > 26) strengthIndex = 3;

    document.getElementById('strength').textContent = strengthLevels[strengthIndex];
    updateStrengthBars(strengthIndex);
}

function updateStrengthBars(index) {
    const rectangles = document.querySelectorAll('.rectangle');
    const styles = [
        'var(--Color6)', 'var(--Color7)', 'var(--Color8)', 'var(--Color5)'
    ];
  
    rectangles.forEach((rect, i) => {
        rect.style.background = i <= index ? styles[index] : 'transparent';
        rect.style.border = i <= index ? `2px solid ${styles[index]}` : '2px solid var(--Color3)';
    });
}

document.querySelector('.fa-copy').addEventListener('click', () => {
    const password = document.querySelector('#password');
    navigator.clipboard.writeText(password.textContent)
        .then(() => {
            alert('Copied password!');
        })
        .catch(err => console.error("Erro ao copiar", err));
})