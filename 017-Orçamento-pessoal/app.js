class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    
}


function cadastrarDespesa(){
    const ano = document.getElementById("ano")
    const mes = document.getElementById("mes")
    const dia = document.getElementById("dia")
    const tipo = document.getElementById("tipo")
    const descricao = document.getElementById("descricao")
    const valor = document.getElementById("valor")
    
    
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    despesa.test()
}


