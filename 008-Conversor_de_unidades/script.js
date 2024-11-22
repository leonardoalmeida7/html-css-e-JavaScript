const inputElement = document.querySelector("#input_element")
const from = document.querySelector("#from")
const to = document.querySelector("#to")
const button = document.querySelector("#button")
const result = document.querySelector("#result")
const resultText = document.querySelector("#result_text")

function convert(){
    const fromValue = from.value
    const toValue = to.value
    if(inputElement.value.length === 0){
        alert('Por favor, digíte um valor para iniciar!')
    }
    if(fromValue === toValue){
        result.value = inputElement.value
    }

    let meters;
    switch(fromValue){
        case "m": 
            meters = inputElement.value
            break;
        case "cm": 
            meters = inputElement.value / 100
            break;
        case "mm":
            meters = inputElement.value / 1000
            break;
        case "km":
            meters = inputElement.value * 1000
            break;
    }

    switch(toValue){
        case "m":
            result.value = meters
            break;
        case "cm":
            result.value = meters * 100
            break;
        case "mm":
            result.value = meters * 1000
            break;
        case "km":
            result.value = meters / 1000
            break;
    }

    const fromLabel = from.options[from.selectedIndex].text
    const toLabel = to.options[to.selectedIndex].text
    const message = `${inputElement.value} em ${fromLabel} convertido para ${toLabel} é iguala á ${result.value}${toValue}`

    resultText.innerHTML = message
}

button.addEventListener("click", convert)