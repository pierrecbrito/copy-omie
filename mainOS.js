const segcomp = require('./getOS')
const clientes = require('./Clientidentify')
const services = require('./SIdentifier')

async function main() {
    let os = await segcomp.getOS(315)

    await osTreatament(os)

    console.log(os)
}


async function osTreatament(os) {
    const clienteECOMP = await clientes.identify(os.Cabecalho.nCodCli)
    delete os.Cabecalho.nCodOS
    os.Cabecalho.nCodCli = clienteECOMP.codigo_cliente_omie
    os.InformacoesAdicionais.nCodCC = 6054324846

    delete os.departamentos

    await services.changeCodeOfServices(os)
}

main()