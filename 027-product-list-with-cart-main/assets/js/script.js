const imgItems = document.querySelectorAll('.img-item');


fetch("data.json")
    .then(response => response.json())
    .then(data => {
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
        window.addEventListener('resize', changeBackground);
        window.addEventListener('load', changeBackground);
        })
    .catch(error => console.error("Erro ao carregar o JSON", error));


