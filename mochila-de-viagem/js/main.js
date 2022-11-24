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

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //envia item para ser criado
    criaElemento(itemAtual)
    //adiciona item para a lista de itens
    itens.push(itemAtual)
    //Salva item no LocalStorage
    localStorage.setItem("itens", JSON.stringify(itens))

    

    nome.value=""
    quantidade.value=""
})

function criaElemento(itemAtual){
    /*<li class="item"><strong>7</strong>Camisas</li>*/
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = itemAtual.quantidade

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += itemAtual.nome

    lista.appendChild(novoItem)
}
  
    


    