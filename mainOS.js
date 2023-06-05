const segcomp = require('./getOS')
const clientes = require('./Clientidentify')
const services = require('./SIdentifier')
const ecomp = require('./sendOS')

async function main() {
    let os = await segcomp.getOS(639)

    await osTreatament(os)

    let result = await ecomp.send(os)
    console.log(result)
}


async function osTreatament(os) {
    const clienteECOMP = await clientes.identify(os.Cabecalho.nCodCli)
    delete os.Cabecalho.nCodOS
    os.Cabecalho.nCodCli = clienteECOMP.codigo_cliente_omie
    os.InformacoesAdicionais.nCodCC = 6054324846

    delete os.Departamentos

    await services.changeCodeOfServices(os)
}

main()