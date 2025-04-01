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
        addToCart(button.id);
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
                calculateItems(idIncrement);
            }else {
                if(numItems[idDecrement].textContent > 1){
                    numItems[idDecrement].textContent = Number(numItems[idDecrement].textContent) - 1;
                    calculateItems(idDecrement);
                }else {
                    buttonController[idDecrement].classList.add('hidden');
                    buttonsCart[idDecrement].classList.remove('hidden');
                    buttonController[idDecrement].classList.remove('hidden');
                    removeItemCart(idDecrement);
                }
            }
        })
    });
}

buttonToggle();

function addToCart(infoItem){
    let infos = getItemsInfos(infoItem);
    const emptyCard = document.querySelector('.empty-card');
    emptyCard.classList.add('hidden');

    const divElement = document.createElement('div');
    const hrElement = document.createElement('hr');
    const divElementChild = document.createElement('div');
    const divElementChild2 = document.createElement('div');
    const itemName = document.createElement('p');
    const spanElement = document.createElement('span');
    const spanElement2 = document.createElement('span');
    const spanElement3 = document.createElement('span');
    
    divElement.setAttribute('class', 'item-cart d-flex justify-content-between align-items-center mx-5 mx-xl-2');
    divElementChild2.setAttribute('class', 'icon-remove');
    itemName.setAttribute('class', 'name-item-cart');
    spanElement.setAttribute('class', 'num-item-cart me-3');
    spanElement2.setAttribute('class', 'price-item-cart me-3');
    spanElement3.setAttribute('class', 'price-item-total');
    
    divElement.id = infoItem;
    
    itemName.textContent = infos[0];
    spanElement.textContent = '1x';
    spanElement2.textContent = '@ $' + infos[2].toFixed(2);
    spanElement3.textContent = '$' + infos[2].toFixed(2);
    divElementChild2.textContent = 'x';
    
    itemsCart.appendChild(divElement);
    itemsCart.appendChild(hrElement);
    divElement.appendChild(divElementChild);
    divElement.appendChild(divElementChild2);
    divElementChild.appendChild(itemName);
    divElementChild.appendChild(spanElement);
    divElementChild.appendChild(spanElement2);
    divElementChild.appendChild(spanElement3);

}

function calculateItems(id){
    let listCart = [];
    let listItems = document.querySelectorAll('.item-cart');
    let listItemsQnd = document.querySelectorAll('.num-item-cart');
    let listItemsQndTotal = document.querySelectorAll('.price-item-total');
    console.log()
    for(let i = 0; i < listItems.length; i++){
        listCart.push(listItems[i].id);
    }
    let item = listCart.indexOf('' + id);
    listItemsQnd[item].textContent = numItems[id].textContent + 'x';
    listItemsQndTotal[item].textContent = '$' + (getItemsInfos(id)[2] * numItems[id].textContent).toFixed(2);
    console.log(listCart);
}

function removeItemCart(id){
    let listCart = [];
    let listItems = document.querySelectorAll('.item-cart');
    console.log(listItems)
    for(let i = 0; i < listItems.length; i++){
        listCart.push(listItems[i].id);
    }
    let item = listCart.indexOf('' + id);
    listItems[item].remove();
    document.querySelectorAll('hr')[item].remove();
}
