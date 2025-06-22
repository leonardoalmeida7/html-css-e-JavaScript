const inputElement = document.querySelector("#input_value")
const buttons = document.querySelectorAll("button")
const numberPeople = document.querySelector("#input_people")
const buttonCustom = document.querySelector("#custom")

const containerInputValue = document.querySelector(".value")
const containerInputPeople = document.querySelector(".people")

const tipAmountValue = document.querySelector(".tip_amount_value")
const totalPersonValue = document.querySelector(".total_person_value")

const buttonReset = buttons[5]

let buttonValue = 0

numberPeople.addEventListener("keyup", calculate)
inputElement.addEventListener("keyup", calculate)
buttonCustom.addEventListener("click", () => {
    buttons.forEach(button => {
        button.classList.remove("active")
    })
    buttonCustom.style.borderColor = "#26c0ab"
})
buttonCustom.addEventListener("keyup", () => {
    buttonValue = buttonCustom.value
    calculate()
    console.log(buttonValue)
})
console.log(buttonValue)

function activeButton(){
    buttons.forEach(button => {
        button.addEventListener("click", ()=>{
            buttons.forEach(btn => {
                btn.classList.remove("active")
            })
            button.classList.add("active")
            calculate()
            buttonCustom.style.borderColor = "transparent"
            buttonCustom.value = ""
        })
    })
}

activeButton()
function getValueButton(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].className === "active"){
            buttonValue = Number(buttons[i].value)
        }
    }
    return buttonValue
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

function reset(){
    buttonReset.addEventListener("click", () => {
        window.location.reload()
    })
}


