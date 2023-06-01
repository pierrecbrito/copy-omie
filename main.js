const segcomp = require('./getOrder')
const clientes = require('./Clientidentify')
const produtos = require('./ProductIdentifier')
const ecomp = require('./sendOrder')

async function main() {
    let order = await segcomp.getOrder(77)
    console.log(order)

    const clienteECOMP = await clientes.identify(order.cabecalho.codigo_cliente)

    order.cabecalho.codigo_pedido = 59886623
    order.cabecalho.etapa = "00"
    order.cabecalho.origem_pedido = "API"
    order.cabecalho.codigo_pedido_integracao = "332sd5859s87d"
    order.cabecalho.codigo_cliente = clienteECOMP.codigo_cliente_omie
    order.informacoes_adicionais.codigo_conta_corrente = 6054324846
    
    order.informacoes_adicionais.codVend = 0

    //Mudando código dos produtos
    for (let index = 0; index < order.det.length; index++) {
        let produtoNaECOMP = await produtos.identify(order.det[index].produto.codigo_produto)
        order.det[index].produto.codigo_produto = produtoNaECOMP.codigo_produto
        order.det[index].ide.codigo_item_integracao = Math.random().toString(36).substring(1,7);
        order.det[index].inf_adic.codigo_local_estoque = 6029200821
    }

    console.log(order)

    let result = await ecomp.send(order)
    console.log(result)
}

main()