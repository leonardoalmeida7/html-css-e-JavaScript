let share = document.getElementsByClassName("share")[0]
let icons = document.querySelectorAll(".icon-share")

icons.forEach(icon => {
    icon.addEventListener("click", function(){
        share.classList.toggle("show")
    })
})
