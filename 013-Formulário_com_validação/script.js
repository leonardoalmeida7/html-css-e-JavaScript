const nameElement = document.querySelector("#name")
const emailElement = document.querySelector("#email")
const assuntoELement = document.querySelector("#assunto")
const messageElement = document.querySelector("#textArea")
const button = document.querySelector(".button")
const textError = document.querySelectorAll(".text_error")



button.addEventListener("click", (value) => {
    value.preventDefault()
    clearError()
    validarInputs()
})

function error(input, errorMessage) {
    const errorMessageElement = input.nextElementSibling
    errorMessageElement.textContent = errorMessage
    input.classList.add("error")
}

function clearError() {
    
    textError.forEach(error => {
        error.textContent = ""
    })
    nameElement.classList.remove("error")
    emailElement.classList.remove("error")
    assuntoELement.classList.remove("error")
}

function validarInputs(){
    const nameElementValue = nameElement.value.trim()
    const emailElementValue = emailElement.value.trim()
    const assuntoELementValue = assuntoELement.value.trim()
    if(nameElementValue === ""){
        error(nameElement, "Digíte um nome valído e tente novamente!")    
    }
    if(emailElementValue === "" || emailElementValue.includes("@") === false || emailElementValue.includes(".com") === false){
        error(emailElement, "Digíte um e-mail valído e tente novamente!")
    }
    if(assuntoELementValue === ""){
        error(assuntoELement, "Essa área não pode ficar em branco.")
    }

}
