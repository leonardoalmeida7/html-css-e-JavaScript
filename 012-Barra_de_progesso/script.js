const buttonNext = document.querySelector(".button_next")
const buttonBack = document.querySelector(".button_back")
const progress_bar = document.querySelector(".progress")

let progress = 0

function progressBar(){
    buttonNext.addEventListener("click", () => {
        if(progress >= 100) {
            progress = 100
        }else {
            progress += 10
        }
        progress_bar.style.width = progress + "%"
    })
    buttonBack.addEventListener("click", () => {
        if(progress <= 0){
            progress = 0
        }else {
            progress -= 10
        }
        progress_bar.style.width = progress + "%"
    })

}

progressBar()
