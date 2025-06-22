const containerColors = document.querySelector(".colors")
const button = document.querySelector("button")

function generateColors(){
    containerColors.innerHTML = ""
    for(let i = 0; i < 5; i++){
        const colors = document.createElement("div")
        const textHexa = document.createElement("p")
        const color = generateColorHexa()
        colors.style.backgroundColor = color
        textHexa.innerHTML = color
        textHexa.style.color = color
        colors.appendChild(textHexa).classList = 'hexa_color'
        containerColors.appendChild(colors).classList = "color"
    }  
}


function generateColorHexa(){
    const hexadecimal = "0123456789ABCDEF"
    let color = "#"
    for(let i = 0; i < 6; i++){
        color += hexadecimal[Math.floor(Math.random() * hexadecimal.length)]
    }
    return color
}   

button.addEventListener("click", generateColors)

