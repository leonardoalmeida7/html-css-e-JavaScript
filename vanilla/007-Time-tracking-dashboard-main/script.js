let daily = document.getElementsByTagName('li')[0]
let weekly = document.getElementsByTagName('li')[1]
let monthly = document.getElementsByTagName('li')[2]
let daily_info = document.querySelectorAll('.daily')
let weekly_info = document.querySelectorAll('.weekly')
let monthly_info = document.querySelectorAll('.monthly')



daily.classList = "active"
weekly_info.forEach(info => {
    info.classList = "hidden"
})
monthly_info.forEach(info => {
    info.classList = "hidden"
})

function initial(){
    daily.classList = "active"
    weekly_info.forEach(info => {
        info.classList = "hidden"
    })
    monthly_info.forEach(info => {
        info.classList = "hidden"
    })
    weekly.classList.remove("active")
    monthly.classList.remove("active")
    daily_info.forEach(info => {
        info.classList.remove("hidden")
    })
}
initial()

daily.addEventListener("click", initial)

weekly.addEventListener("click", function(){
    weekly.classList = "active"
    monthly.classList.remove("active")
    daily.classList.remove("active")
    
    weekly_info.forEach(info => {
        info.classList.remove('hidden')
    })
    daily_info.forEach(info => {
        info.classList = "hidden"
    })
    monthly_info.forEach(info => {
        info.classList = "hidden"
    })
})

monthly.addEventListener("click", function(){
    monthly.classList = "active"
    daily.classList.remove("active")
    weekly.classList.remove("active")

    monthly_info.forEach(info => {
        info.classList.remove('hidden')
    })

    daily_info.forEach(info => {
        info.classList = "hidden"
    })
    weekly_info.forEach(info => {
        info.classList = "hidden"
    })
})


