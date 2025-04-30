const anoInput = document.querySelector('#ano');
const  mesInput = document.querySelector('#mes');
const  diaInput = document.querySelector('#dia');
const  tipoInput = document.querySelector('#tipo');
const  descricaoInput = document.querySelector('#descricao');
const  valorInput = document.querySelector('#valor');
const  buttonAddDespesa = document.querySelector('#button-add');

const containerDespesa = document.querySelector('tbody');


class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
}

const addDespesa = () => {
    let despesa = new Despesa(anoInput.value, mesInput.value, diaInput.value, tipoInput.value, descricaoInput.value, valorInput.value);
    let id = localStorage.length;
    localStorage.setItem(id, JSON.stringify(despesa));

    window.location.reload();
}

const criaElementoDocumento = (despesa) => {
    const iconEdit = document.createElement('i');
    iconEdit.classList = 'fa-solid fa-pencil';
    let listElemento = [
            `${despesa.ano}/${despesa.mes}/${despesa.dia}`,
            despesa.tipo,
            despesa.descricao,
            despesa.valor,
    ]
    
    let trTable = document.createElement('tr');
    const thTable = document.querySelectorAll('th');

    for(let i = 0; i < thTable.length; i++){
        let tdTable = document.createElement('td');
        tdTable.textContent = listElemento[i];
        trTable.appendChild(tdTable);
        if(i == thTable.length - 1){
            tdTable.appendChild(iconEdit);
        }
    }
    containerDespesa.appendChild(trTable);
}

const consultarDespesas = () => {
   
    if(localStorage.length > 0){
        for(let i = 0; i < localStorage.length; i++){
            const getDespesa = localStorage.getItem(i);
            const objDespesa = JSON.parse(getDespesa);
            console.log(objDespesa);
            criaElementoDocumento(objDespesa);
        }
    }


}



if(window.location.pathname == '/index.html'){
    buttonAddDespesa.addEventListener('click', addDespesa);
}else {
    consultarDespesas();
}



