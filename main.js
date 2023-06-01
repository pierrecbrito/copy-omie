const segcomp = require('./getOrder')
const clientes = require('./Clientidentify')

async function main() {
    //let order = await segcomp.getOrder(15)
    //console.log(order)

    const clientesECOMP = await clientes.getECOMPClients()
    console.log(clientesECOMP)
}

main()