const segcomp = require('./getOrder')
const clientes = require('./Clientidentify')
const produtos = require('./ProductIdentifier')
const ecomp = require('./sendOrder')

async function main() {
    let order = await segcomp.getOrder(148)
    await orderTreatament(order)   

    let result = await ecomp.send(order)
    console.log(result)
}

async function orderTreatament(order) {
    const clienteECOMP = await clientes.identify(order.cabecalho.codigo_cliente)

    order.cabecalho.codigo_pedido = 59886623
    order.cabecalho.etapa = "00"
    order.cabecalho.origem_pedido = "API"
    order.cabecalho.codigo_pedido_integracao = Math.random().toString(36).substring(1,7)
    order.cabecalho.codigo_cliente = clienteECOMP.codigo_cliente_omie
    order.informacoes_adicionais.codigo_conta_corrente = 6054324846
    order.informacoes_adicionais.codVend = 0
    delete order.departamentos

    await produtos.changeCodeOfProducts(order)
}

main()