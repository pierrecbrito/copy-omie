const segcomp = require('./getOrder')
const clientes = require('./Clientidentify')
const produtos = require('./ProductIdentifier')

async function main() {
    let order = await segcomp.getOrder(25)
    console.log(order.det)

    const clienteECOMP = await clientes.identify(order.cabecalho.codigo_cliente)
  
    order.cabecalho.codigo_cliente = clienteECOMP.codigo_cliente_omie
    order.informacoes_adicionais.codigo_conta_corrente = 6054324846
    order.det[0].inf_adic.codigo_local_estoque = 6029200821
    order.informacoes_adicionais.codVend = 0

    //Mudando código dos produtos
    for (let index = 0; index < order.det.length; index++) {
        let produtoNaECOMP = await produtos.identify(order.det[index].produto.codigo_produto)
        order.det[index].produto.codigo_produto = produtoNaECOMP.codigo_produto
    }

    console.log(order.det)
}

main()