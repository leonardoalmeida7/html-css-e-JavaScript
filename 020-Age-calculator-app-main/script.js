const inputDay = document.getElementById("input_day")
const inputMonth = document.getElementById("input_month")
const inputYear = document.getElementById("input_year")
const inputs = document.querySelectorAll("input[type='number'")
const labels = document.querySelectorAll("label")
const textError = document.querySelectorAll(".text-error")

const messageError = "Must be a valid date"
const months31 = ["1", "3", '5', "7", "8", "10", "12"]

const date = new Date()
const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()
console.log(day, month, year)


inputs.forEach(input => {
    input.addEventListener("keyup", calculate)
})


function calculate(){

    if(inputMonth.value > 12 || inputMonth.value < 1){
        checkError(1, true)
    }else {
        checkError(1, false)
    }
    validaData()
    validaDia()
}

function validaDia(){
    if(months31.includes(inputMonth.value)){
        if(inputDay.value > 31 || errorDay()){
            checkError(0, true)
        }else {
            checkError(0, false)
        }
    }else {
        if(inputDay.value > 30 || errorDay()){
            checkError(0, true)
        }else {
            checkError(0, false)
        }
    }
}


function validaData(){

    if(inputYear.value.length === 4){
        checkError(2, false)
        /* Ano bissexto */
        if(Number(inputYear.value.slice(2, 4)) % 4 === 0 ){
            /* verificando o mês  */
            if(inputMonth.value < 1 || inputMonth.value > 12 ){
                checkError(1, true)
            }else {
                checkError(1, false)
                if(inputMonth.value == 2) {
                    if(inputDay.value > 29 || errorDay()){
                        checkError(0, true)
                    }else (
                        checkError(1, false)
                    )
                }else {
                    validaDia()
                }
            }
        }else {
            if(inputMonth.value < 1 || inputMonth.value > 12 ){
                checkError(1, true)
            }else {
                checkError(1, false)
                if(inputMonth.value == 2) {
                    if(inputDay.value > 28 || errorDay()){
                        checkError(0, true)
                    }else {
                        checkError(0, false)
                    }
                }else {
                    validaDia()
                }
            }
        }
    }else {
        checkError(2, true)
    }

}

const errorDay = function(){
    if(inputDay.value == 0 || inputDay.value.length === 0 || inputDay.value == ""){
        return true
    }
    return false
}



function checkError(x, error){
    if(error){
        textError[x].innerHTML = messageError
        labels[x].classList = "error-label"
        inputs[x].classList = "error"

    }else {
        textError[x].innerHTML = ""
        labels[x].classList = "style-label"
        inputs[x].classList  = "ok"
    }
}

