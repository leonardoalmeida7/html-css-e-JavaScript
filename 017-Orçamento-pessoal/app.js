class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validacao(){
        for (let i in this) {
            let test = this[i]
            if(test == undefined || test == null || test == ''){
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }

    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById("ano")
    let mes = document.getElementById("mes")
    let dia = document.getElementById("dia")
    let tipo = document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor")

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    let modalTitle = document.querySelector(".modal-title")
    let modalBody = document.querySelector(".modal-body")
    let modalButton = document.querySelector("#modal-button")

    if(despesa.validacao()){
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')
        modalTitle.classList = "text-success"
        modalButton.className = "btn btn-success"
        modalBody.innerHTML = "Despesa foi cadastrada com sucesso!"
        modalButton.innerHTML = "Voltar"
    }else {
        $('#modalRegistraDespesa').modal('show')
        modalTitle.classList = "text-danger"
        modalButton.className = "btn btn-danger"
        modalButton.innerHTML = "Voltar e corrigir"
    }
}
