require('dotenv').config()

const APP_KEY_SEGCOMP = process.env.APP_KEY_SEGCOMP
const APP_SECRET_SEGCOMP = process.env.APP_SECRET_SEGCOMP
const APP_KEY_ECOMP = process.env.APP_KEY_ECOMP
const APP_SECRET_ECOMP = process.env.APP_SECRET_ECOMP

const link = "https://app.omie.com.br/api/v1/geral/clientes/"

const body = (app_key, app_secret, pagina) => {
    return {
        "call":"ListarClientes",
        "app_key":app_key,
        "app_secret":app_secret,
        "param":[{"pagina": pagina,"registros_por_pagina":200,"apenas_importado_api":"N"}]
    }
}
    
const options =  (app_key, app_secret, pagina) => {
    return {
        method: "post",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body(app_key, app_secret, pagina))   
    }
}

/**
 * Localiza o código do cliente correspondente no outro aplicativo (ECOMP)
 * @param {*} clienteCode 
 * @returns 
 */
async function identify(clienteCode) {
    let ecomp_clients = await getECOMPClients()
    let segcomp_clients = await getSEGCOMPClients()

    let cliente = segcomp_clients.filter(c => c.codigo_cliente_omie == clienteCode)[0] //Identifica qual cliente é
    let clienteECOMP = ecomp_clients.filter(c => c.cnpj_cpf == cliente.cnpj_cpf)[0] //Acha no aplicativo ECOMP
   
    return clienteECOMP
}

async function getECOMPClients() {
    let ecomp_clients = []
   
    let totalDePaginas = 10000

    for (let index = 1; index <= totalDePaginas; index++) {
    
        const response = await fetch(link, options(APP_KEY_ECOMP, APP_SECRET_ECOMP, index));
        const responseJson = await response.json();

        if(totalDePaginas == 10000) {
            totalDePaginas = responseJson.total_de_paginas
        }

        responseJson.clientes_cadastro.forEach(c => ecomp_clients.push(c))
    }

    return ecomp_clients
}

async function getSEGCOMPClients() {
    let segcomp_clients = []
   
    let totalDePaginas = 10000

    for (let index = 1; index <= totalDePaginas; index++) {
    
        const response = await fetch(link, options(APP_KEY_SEGCOMP, APP_SECRET_SEGCOMP, index));
        const responseJson = await response.json();

        if(totalDePaginas == 10000) {
            totalDePaginas = responseJson.total_de_paginas
        }

        responseJson.clientes_cadastro.forEach(c => segcomp_clients.push(c))
    }

    return segcomp_clients
}
  
module.exports = {identify}