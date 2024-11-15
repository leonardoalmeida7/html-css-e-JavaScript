let input_email = document.getElementById("email")
let text_erro = document.getElementById("text-erro")
let button = document.getElementById("button")

button.addEventListener("click", function(){
    if(input_email.value.includes("@")){
        input_email.style.backgroundColor = "#8ef87959"
        input_email.style.borderColor = "#8ef879"
        setTimeout(() => {
            window.location.href = "success_page.html?" + input_email.value
        }, 1500)
    }else {
        input_email.style.backgroundColor = "#f87d796b"
        input_email.style.borderColor = "#f87d79"
        text_erro.innerHTML = "Valid email required"
    }
})