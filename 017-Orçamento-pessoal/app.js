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

    listaDespesa(){
        let despesas = Array()
        let id = localStorage.getItem('id')
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa == null){
                continue
            }

            despesas.push(despesa)
        }
        return despesas
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


function carregaListaDespesas(){
    let tbody = document.getElementById("lista-despesa")
    let despesas = Array()
    despesas = bd.listaDespesa()
    despesas.forEach(d => {
        let linha = tbody.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch(parseInt(d.tipo)){
            case 1:
                d.tipo = 'Alimentação'
                break;
            case 2:
                d.tipo = 'Educação'
                break;
            case 3:
                d.tipo = 'Lazer'
                break;
            case 4:
                d.tipo = 'Saúde'
                break;
            case 5:
                d.tipo = 'Transporte'
                break;
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    });

    
    console.log(despesas)
}