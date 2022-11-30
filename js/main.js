const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []



//Cria os elementos apos refresh, mantendo-os
itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe){
        // caso item exista, manter o id
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{

        //verifica se array existe para incrementar id apos remocao, para nao gerar id iguais, sempre tamanho do array + 1
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0
        
        //envia item para ser criado
        criaElemento(itemAtual)
        //adiciona item para a lista de itens
        itens.push(itemAtual)
    
    }
    
    //Salva item no LocalStorage
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value=""
    quantidade.value=""
})



function criaElemento(item){
    /*<li class="item"><strong>7</strong>Camisas</li>*/
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.dataset.id = item.id
    numeroItem.innerHTML = item.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
    
function botaoDeleta(id){
    const deletaBotao = document.createElement('button')
    deletaBotao.innerText = "X"

    deletaBotao.addEventListener('click', function (){
        deletaElemento(this.parentNode, id)
        
    })

    return deletaBotao
}

function deletaElemento(tag, id){
    tag.remove()

    //Remove o item do array Itens
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)


    //Atualiza o o localStorage enviando novo array com item excluido
    localStorage.setItem("itens", JSON.stringify(itens))
    
}


    