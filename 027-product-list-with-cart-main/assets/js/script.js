const imgItems = document.querySelectorAll('.img-item');
const buttonsCart = document.querySelectorAll('.addItem');
const controlButtonsCart = document.querySelectorAll('.icons img');
const numItems = document.querySelectorAll('.num-items');
const buttonController = document.querySelectorAll('.quantity-control');
const itemsCart = document.querySelector('.itens-cart');
const countQuantityItems = document.querySelector('.quantity');
const buttonConfirm = document.querySelector('.confirm');



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
        numItems[button.id].textContent = 1;
        calculateItemsCart();
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
            if(buttonCart.alt == 'increment'){
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
                    numItems[idDecrement].textContent = 0;
                    removeItemCart(idDecrement);
                    calculateItemsCart();
                }
            }
        })
    });
}

buttonToggle();

function addToCart(infoItem){
    buttonConfirm.classList.remove('hidden');
    let infos = getItemsInfos(infoItem);
    const emptyCard = document.querySelector('.empty-card');
    emptyCard.classList.add('hidden');

    const divElement = document.createElement('div');

    const divElementChild = document.createElement('div');
    const divElementChild2 = document.createElement('div');
    const itemName = document.createElement('p');
    const spanElement = document.createElement('span');
    const spanElement2 = document.createElement('span');
    const spanElement3 = document.createElement('span');
    
    divElement.setAttribute('class', 'item-cart d-flex justify-content-between align-items-center mx-5 mx-xl-2 py-3');
    divElementChild2.setAttribute('class', 'icon-remove');
    divElementChild2.setAttribute('onclick', `removeItemCart(${infoItem})`);
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

    divElement.appendChild(divElementChild);
    divElement.appendChild(divElementChild2);
    divElementChild.appendChild(itemName);
    divElementChild.appendChild(spanElement);
    divElementChild.appendChild(spanElement2);
    divElementChild.appendChild(spanElement3);

    
    calculateTotalPrice()
}


function calculateItems(id){
    let listCart = [];
    let listItems = document.querySelectorAll('.item-cart');
    let listItemsQnd = document.querySelectorAll('.num-item-cart');
    let listItemsQndTotal = document.querySelectorAll('.price-item-total');
    
    for(let i = 0; i < listItems.length; i++){
        listCart.push(listItems[i].id);
    }
    let item = listCart.indexOf('' + id);
    listItemsQnd[item].textContent = numItems[id].textContent + 'x';
    listItemsQndTotal[item].textContent = '$' + (getItemsInfos(id)[2] * numItems[id].textContent).toFixed(2);

    calculateTotalPrice();
    calculateItemsCart();
}

function calculateItemsCart(){
    let totalItems = []
    numItems.forEach(numItem => {
        totalItems.push(numItem.textContent);
    })
    countQuantityItems.textContent = totalItems.reduce((v, t) => Number(v) + Number(t));
    if(countQuantityItems.textContent == 0) buttonConfirm.classList.add('hidden');

}

function calculateTotalPrice(){
    const orderTotal = document.querySelector('.price-total');
    const priceItemTotal = document.querySelectorAll('.price-item-total');
    let test = [];
    priceItemTotal.forEach((price) => {
        test.push(price.textContent.substring(1));
        orderTotal.textContent = Number(test.reduce((v, t) => Number(v) + Number(t))).toFixed(2);
        
    })
    
}



function removeItemCart(id){
    let listItems = document.querySelectorAll('.item-cart');
    

   listItems.forEach((item, index) => {
        if (item.id == id) {
            item.remove();

        }
    })

    
    buttonsCart[id].classList.remove('hidden');
    numItems[id].textContent = 0;
    calculateItemsCart();
}

function openModal(){

}