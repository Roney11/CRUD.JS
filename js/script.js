class Produto {

    constructor(){
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
    }

    salvar() {
        let produto = this.lerDados()
        
        if(this.validaCampo(produto)) {
            if(this.editId == null) {
                this.adicionar(produto)
            }else {
                this.atualizar(this.editId, produto)
            }
        }

        this.listaTabela()
        this.cancelar()
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_preco = tr.insertCell()
            let td_acao = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_preco.innerText = this.arrayProdutos[i].preco

            td_id.classList.add('center')

            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/edit.png'
            imgEdit.setAttribute('onclick', 'produto.prepararEdicao('+ JSON.stringify(this.arrayProdutos[i]) +')')

            let imgDelet = document.createElement('img')
            imgDelet.src = 'img/delet.png'
            imgDelet.setAttribute('onclick', 'produto.deletar('+ this.arrayProdutos[i].id +')')

            td_acao.appendChild(imgEdit)
            td_acao.appendChild(imgDelet)
            td_acao.classList.add('center')

        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto)
        this.id++
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }

    prepararEdicao(dados) {
        this.editId = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('preco').value = dados.preco

        document.getElementById("btn1").innerText = 'Atualizar'
    }

    lerDados() {
        var produto = {}

        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value
        produto.preco = document.getElementById('preco').value

        return produto
    }

    validaCampo(produto) {
        let msg = ''

        if(produto.nomeProduto == '') {
            msg += ' - Informe o nome do Produto \n'
        }

        if(produto.preco == '') {
            msg += ' - Informe o valor do Produto \n'
        }

        if(msg != '') {
            alert(msg);
            return false
        }

        return true

    }

    cancelar() {
        document.getElementById('produto').value = ''
        document.getElementById('preco').value = ''

        document.getElementById('btn1').innerText = 'Adicionar'
        this.editId = null
    }

    deletar(id) {

        if(confirm('Deseja realmente deletar o produto ' + id)) {

            let tbody = document.getElementById('tbody')

            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }

            }
        }
    }

}

var produto = new Produto()

