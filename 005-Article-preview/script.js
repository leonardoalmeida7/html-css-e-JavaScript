let share = document.getElementsByClassName("share")[0]
let icons = document.querySelectorAll(".icon-share")
let profile = document.getElementsByClassName("profile")[0]

icons.forEach(icon => {
    icon.addEventListener("click", function(){
        share.classList.toggle("show")
        profile.classList.toggle("hidden")
    })
})
