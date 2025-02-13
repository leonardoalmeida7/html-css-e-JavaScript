const iconButton = document.querySelector('.button-icon');
const iconButtonSun = document.querySelector('#icon-sun');
const iconButtonMoon = document.querySelector('#icon-moon');
const textArea = document.querySelector('textarea');

const logoAndIcon = document.querySelectorAll('img');



let theme = 'light'; 

iconButton.addEventListener('click', ()=>{
    if(theme == 'light'){
        themeLight();
        theme = 'dark';
    }else {
        themeDark();
        theme = 'light';
    }
    logoAndIcon.forEach(element => {
        element.classList.toggle('hidden');
    })


    
})

function themeLight(){
    document.body.style.background = `url(images/bg-${theme}-theme.png)`;
    iconButton.style.backgroundColor = 'var(--Neutral100)';
    textArea.style.backgroundColor = 'var(--Neutral100)';
    textArea.style.borderColor = 'var(--Neutral200)';
    document.body.style.color = "#12131A";
}

function themeDark(){
    document.body.style.background = `url(images/bg-${theme}-theme.png)`;
    iconButton.style.backgroundColor = '#2A2B37';
    textArea.style.backgroundColor = '#2A2B37';
    textArea.style.borderColor = 'var(--Neutral600)';
    document.body.style.color = "white";
}
