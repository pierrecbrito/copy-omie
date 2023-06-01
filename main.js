const segcomp = require('./getOrder')
const clientes = require('./Clientidentify')

async function main() {
    let order = await segcomp.getOrder(15)
    console.log(order)
    
    const clienteECOMP = await clientes.identify(order.cabecalho.codigo_cliente)
  
    order.cabecalho.codigo_cliente = clienteECOMP.codigo_cliente_omie
    order.informacoes_adicionais.codigo_conta_corrente = 6054324846
    order.det[0].inf_adic.codigo_local_estoque = 6029200821
    order.informacoes_adicionais.codVend = 0


    console.log(order)
}

main()