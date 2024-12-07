const inputElement = document.querySelector("#input_value")
const buttons = document.querySelectorAll("button")
const numberPeople = document.querySelector("#input_people")


const containerInputValue = document.querySelector(".value")
const containerInputPeople = document.querySelector(".people")

const tipAmountValue = document.querySelector(".tip_amount_value")
const totalPersonValue = document.querySelector(".total_person_value")

const buttonReset = buttons[6]

function reset(){
    buttonReset.addEventListener("click", () => {
        window.location.reload()
    })
}

numberPeople.addEventListener("keyup", calculate)
inputElement.addEventListener("keyup", calculate)

function activeButton(){
    buttons.forEach(button => {
        button.addEventListener("click", ()=>{
            buttons.forEach(btn => {
                btn.classList.remove("active")
            })
            button.classList.add("active")
            calculate()
        })
    })
}
activeButton()

function getValueButton(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].className === "active"){
            return Number(buttons[i].value)
        }
    }
}

function calculate(){
    const inputElementValue = Number(inputElement.value)
    const numberPeopleValue = Number(numberPeople.value)
    const tipAmount = ((inputElementValue / numberPeopleValue) * getValueButton()) / 100
    const totalPerson = (inputElementValue / numberPeopleValue) + tipAmount
    buttonReset.id = "active_reset"
    
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
    reset()

    if(isNaN(tipAmount) === false && tipAmount != Infinity){
        tipAmountValue.textContent = tipAmount.toFixed(2)
    }
    if(isNaN(totalPerson) === false && totalPerson != Infinity){
        totalPersonValue.textContent = totalPerson.toFixed(2)
    }

    console.log(tipAmount.toFixed(2))
}

