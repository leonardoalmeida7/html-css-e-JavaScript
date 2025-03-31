const imgItems = document.querySelectorAll('.img-item');
const buttonsCart = document.querySelectorAll('.addItem');
const controlButtonsCart = document.querySelectorAll('.icons img');
const numItems = document.querySelectorAll('.num-items');
const buttonController = document.querySelectorAll('.quantity-control');
const itemsCart = document.querySelector('.itens-cart');

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('items', JSON.stringify(data));
        function changeBackground(){
            if(window.innerWidth <= 768){
                let count = 0;
                imgItems.forEach(imgItem => {
                    imgItem.style.background = `url(${data[count].image.mobile}) no-repeat center`;
                    imgItem.style.backgroundSize = 'cover';
                    count++
                });
            }else if(window.innerWidth >= 769 && window.innerWidth < 1200){
                let count = 0;
                imgItems.forEach(imgItem => {
                    imgItem.style.background = `url(${data[count].image.tablet}) no-repeat center`;
                    imgItem.style.backgroundSize = 'cover';
                    count++
                });
            }else if(window.innerWidth >= 1200){
                let count = 0;
                imgItems.forEach(imgItem => {
                    imgItem.style.background = `url(${data[count].image.desktop}) no-repeat center`;
                    imgItem.style.backgroundSize = 'cover';
                    count++
                });
            }
        }
        changeBackground();
        window.addEventListener('resize', changeBackground);
        })
    .catch(error => console.error("Erro ao carregar o JSON", error));



function getItemsInfos(num){
    let getItems = localStorage.getItem('items');
    let objItems = JSON.parse(getItems);
    let infoItem = [objItems[num].name, objItems[num].category, objItems[num].price];
    return infoItem;
}

let idButton = 0;
buttonsCart.forEach(button => {
    button.id = idButton;
    if(idButton < buttonsCart.length - 1) idButton++;
    button.addEventListener('click', () => {
        button.classList.add('hidden');
        getItemsInfos(button.id);
    })
});

function buttonToggle(){
    let idElement = 0;
    controlButtonsCart.forEach(buttonCart => {
        buttonCart.id = idElement;
        if(idElement < controlButtonsCart.length - 1) idElement++;
        buttonCart.addEventListener('click', () => {
            let idIncrement = (buttonCart.id / 2) - 0.5;
            let idDecrement = (buttonCart.id / 2);
            if(buttonCart.alt == 'icon_increment'){
                numItems[idIncrement].textContent = Number(numItems[idIncrement].textContent) + 1;
            }else {
                if(numItems[idDecrement].textContent > 1){
                    numItems[idDecrement].textContent = Number(numItems[idDecrement].textContent) - 1;
                }else {
                    buttonController[idDecrement].classList.add('hidden');
                    buttonsCart[idDecrement].classList.remove('hidden');
                    buttonController[idDecrement].classList.remove('hidden');
                }
            }
        })
    });
}

buttonToggle();


const divElement = document.createElement('div');
divElement.setAttribute('class', 'item-cart');
itemsCart.appendChild(divElement);
console.log(itemsCart)
