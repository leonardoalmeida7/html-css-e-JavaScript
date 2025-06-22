const imgItems = document.querySelectorAll('.img-item');
const buttonsCart = document.querySelectorAll('.addItem');
const controlButtonsCart = document.querySelectorAll('.icons img');
const numItems = document.querySelectorAll('.num-items');
const buttonController = document.querySelectorAll('.quantity-control');
const itemsCart = document.querySelector('.itens-cart');
const countQuantityItems = document.querySelector('.quantity');
const buttonConfirm = document.querySelector('.confirm');
const containerItems = document.querySelectorAll('.img-item');


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
    let infoItem = {name: objItems[num].name, cartegory: objItems[num].category, price: objItems[num].price};
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
                    //numItems[idDecrement].textContent = 0;
                    containerItems[idDecrement].style.border = 'none';
                    removeItemCart(idDecrement);
                    calculateItemsCart();
                    calculateTotalPrice();
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
    
    itemName.textContent = infos.name;
    spanElement.textContent = '1x';
    spanElement2.textContent = '@ $' + infos.price.toFixed(2);
    spanElement3.textContent = '$' + infos.price.toFixed(2);
    divElementChild2.textContent = 'x';
    
    itemsCart.appendChild(divElement);

    divElement.appendChild(divElementChild);
    divElement.appendChild(divElementChild2);
    divElementChild.appendChild(itemName);
    divElementChild.appendChild(spanElement);
    divElementChild.appendChild(spanElement2);
    divElementChild.appendChild(spanElement3);

    
    calculateTotalPrice();
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
    listItemsQndTotal[item].textContent = '$' + (getItemsInfos(id).price * numItems[id].textContent).toFixed(2);

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
        orderTotal.textContent = '$' + Number(test.reduce((v, t) => Number(v) + Number(t))).toFixed(2);
        
    })
    
}

function removeItemCart(id){
    let listItems = document.querySelectorAll('.item-cart');
    containerItems[id].style.border = 'none';

   listItems.forEach((item, index) => {
        if (item.id == id) {
            item.remove();
        }
    })

    
    buttonsCart[id].classList.remove('hidden');
    numItems[id].textContent = 0;
    calculateItemsCart();
    calculateTotalPrice();
}

function getImageThumbnail(num){
    let getImage = localStorage.getItem('items');
    let objItems = JSON.parse(getImage);
    let linkImage = [objItems[num].image.thumbnail];
    return linkImage;
}

function openModal(){
    const modal = document.querySelector('.cart-modal');
    modal.classList.remove('hidden');
    const modalItems = document.querySelector('.itens-cart-modal');
    const itemCart = document.querySelectorAll('.item-cart');
    let listItemsQnd = document.querySelectorAll('.num-item-cart');
    let listItemsQndTotal = document.querySelectorAll('.price-item-total');
    let priceTotal = document.querySelector('.price-total');
    itemCart.forEach((item, index) => {
        const divItem = document.createElement('div');
        divItem.setAttribute('class', 'item-cart-modal row px-3 align-items-center');
        const divContainerImage = document.createElement('div');
        divContainerImage.setAttribute('class', 'container-image-thumbnail col-3');
        const imageThumbnail = document.createElement('img');
        imageThumbnail.setAttribute('src', getImageThumbnail(item.id));
        const divContainerInfos = document.createElement('div');
        divContainerInfos.setAttribute('class', 'col-6')
        const nameElement = document.createElement('p');
        nameElement.setAttribute('class', 'name-item-cart');
        const quantityElement = document.createElement('span');
        quantityElement.setAttribute('class', 'num-item-cart me-3');
        const priceElement = document.createElement('span');
        priceElement.setAttribute('class','price-item-cart me-3');
        const divContainerTotalPrice = document.createElement('div');
        divContainerTotalPrice.setAttribute('class', 'container-price-total col-3');
        const sumTotalPrice = document.createElement('span');
        sumTotalPrice.setAttribute('class', 'price-item-total-modal fs-5 fw-bold');

        nameElement.textContent = getItemsInfos(item.id).name;
        quantityElement.textContent = listItemsQnd[index].textContent;
        priceElement.textContent = '@ $' + (getItemsInfos(item.id).price).toFixed(2);
        sumTotalPrice.textContent = listItemsQndTotal[index].textContent;

        divContainerImage.appendChild(imageThumbnail);
        divContainerInfos.appendChild(nameElement);
        divContainerInfos.appendChild(quantityElement);
        divContainerInfos.appendChild(priceElement);
        divContainerTotalPrice.appendChild(sumTotalPrice);
        divItem.appendChild(divContainerImage);
        divItem.appendChild(divContainerInfos);
        divItem.appendChild(divContainerTotalPrice);
        modalItems.appendChild(divItem);
    })

    document.querySelector('.price-total-modal').textContent = priceTotal.textContent;

    const newOrder = document.querySelector('#new-order');
    newOrder.addEventListener('click', () => {
        window.location.reload();
    })
}
