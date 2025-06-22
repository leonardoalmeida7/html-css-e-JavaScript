var altura = 0
var largura = 0
var vidas = 1
var tempo = 60
function alterarTamanhoTela(){
    largura = window.innerWidth
    altura = window.innerHeight
    console.log(altura, largura)
}

alterarTamanhoTela() // sempre chamar a função para que apareça no dbug

var criaMosquito = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')
if(nivel === 'facil'){
    criaMosquito = 1500
}else if (nivel === 'normal'){
    criaMosquito = 1000
}else if (nivel === 'dificil'){
    criaMosquito = 750
}


// Cronômetro
var cronometro = setInterval(function(){
    
    tempo -= 1
    if (tempo < 0){
        clearInterval(cronometro)
        clearInterval(jogo)
        window.location.href = 'vitoria.html'
    }else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)



var jogo = setInterval(function imagemRandomica(){
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        
        if (vidas <= 3){
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
            vidas++
        }else {
            window.location.href = 'fim_de_jogo.html'
        }

    }

    var eixoX = Math.floor(Math.random() * largura - 90)
    var eixoY = Math.floor(Math.random() * altura - 90)
    /* if(eixoX < 0){
        eixoX = 0
        
    }if(eixoY < 0){
        eixoY = 0
    } */
    eixoX = eixoX < 0 ? 0 : eixoX
    eixoY = eixoY < 0 ? 0 : eixoY


    console.log(eixoX, eixoY)
    
    var imagem = document.createElement('img')
    imagem.src = 'imagens/mosca.png'
    imagem.className = tamanhoMosquito()  + ' ' + inversaoAleatoria()
    imagem.style.left = eixoX + 'px'
    imagem.style.top = eixoY + 'px'
    imagem.style.position = 'absolute'
    imagem.id = 'mosquito'

    imagem.onclick = function(){
        this.remove()
    }

    
    document.body.appendChild(imagem)

}, criaMosquito)  



function tamanhoMosquito(){
    var clasesMosquito = Math.floor(Math.random() * 3)
    switch(clasesMosquito){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function inversaoAleatoria(){
    var inverteMosquito = Math.floor(Math.random() * 2)
    switch(inverteMosquito){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

