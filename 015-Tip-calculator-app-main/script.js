const inputElement = document.querySelector("#input_value")
const buttons = document.querySelectorAll("button")
const numberPeople = document.querySelector("#input_people")


const containerInputValue = document.querySelector(".value")
const containerInputPeople = document.querySelector(".people")

const buttonReset = buttons[6]






numberPeople.addEventListener("keyup", calculate)
inputElement.addEventListener("keyup", calculate)


function calculate(){
    const inputElementValue = Number(inputElement.value)
    const numberPeopleValue = Number(numberPeople.value)

    function activeError(){
        const textError = document.querySelectorAll(".text_error")
    
        containerInputPeople.classList.remove("error")
        containerInputValue.classList.remove("error")
        
        textError.forEach(text => {
            text.classList.add("hidden")
        })
    
        numberPeople.addEventListener("input", function(event){
            event.target.value = event.target.value.replace(",", ".")
        })
        
    
        if(inputElementValue < 1 || numberPeopleValue.length === 0){
            containerInputValue.classList.add("error")
            textError[0].classList.remove("hidden")
        }
        if(numberPeopleValue < 1 || numberPeopleValue.length === 0){
            containerInputPeople.classList.add("error")
            textError[1].classList.remove("hidden")
        }
    }
    activeError()
    
    /* function activeButton(){
        let buttonValue = 0
        buttons.forEach(button => {
            button.addEventListener("click", ()=>{
                buttons.forEach(btn => {
                    btn.classList.remove("active")
                })
                button.classList.add("active")w
                buttonValue = 15
            })
        })
        return buttonValue
    } */

    function activeButton() {
        return new Promise((resolve) => {
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    buttons.forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                    resolve(15); // Retorna o valor após o clique
                });
            });
        });
    }
    
    // Exemplo de uso:
    activeButton().then((value) => {
        console.log("Button Value:", value);
    });
    activeButton()
    
    console.log(inputElementValue / numberPeopleValue - activeButton())

}
