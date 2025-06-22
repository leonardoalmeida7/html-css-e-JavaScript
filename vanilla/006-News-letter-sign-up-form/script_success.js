let button = document.getElementById("button")
let address_email = document.getElementById("address_email")
let email = window.location.search
email = email.replace("?", " ")
address_email.innerHTML = email