function updateClock(){
    const hrs = document.querySelector("#hrs")
    const min = document.querySelector("#min")
    const sec = document.querySelector("#sec")

    const date = new Date()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")

    hrs.textContent = hours
    min.textContent = minutes
    sec.textContent = seconds
}

setInterval(updateClock, 1000)