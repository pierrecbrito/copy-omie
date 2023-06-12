const segcompOrder = require('./getOrder')
const clientes = require('./Clientidentify')
const produtos = require('./ProductIdentifier')
const ecompOrder = require('./sendOrder')
const segcompOS = require('./getOS')
const services = require('./SIdentifier')
const ecompOS = require('./sendOS')

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

async function osTreatament(os) {
    const clienteECOMP = await clientes.identify(os.Cabecalho.nCodCli)
    delete os.Cabecalho.nCodOS
    os.Cabecalho.nCodCli = clienteECOMP.codigo_cliente_omie
    os.InformacoesAdicionais.nCodCC = 6054324846

    delete os.Departamentos

    await services.changeCodeOfServices(os)
}

async function sendOrderAndOS(numberOrder, numberOS) {
    await sendOrder(numberOrder)
    await sendOS(numberOS)
}

async function sendOrder(numberOrder)  {
    let order = await segcompOrder.getOrder(numberOrder)
    await orderTreatament(order)   

    let result = await ecompOrder.send(order)
    console.log(result.descricao_status)
}

async function sendOS(numberOS)  {
    let os = await segcompOS.getOS(numberOS)

    await osTreatament(os)

    let result = await ecompOS.send(os)
    console.log(result.cDescStatus)
}

module.exports = {sendOrderAndOS, sendOrder, sendOS}