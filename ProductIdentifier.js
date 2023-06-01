require('dotenv').config()

const APP_KEY_SEGCOMP = process.env.APP_KEY_SEGCOMP
const APP_SECRET_SEGCOMP = process.env.APP_SECRET_SEGCOMP
const APP_KEY_ECOMP = process.env.APP_KEY_ECOMP
const APP_SECRET_ECOMP = process.env.APP_SECRET_ECOMP

const link = "https://app.omie.com.br/api/v1/geral/produtos/"

const body = (app_key, app_secret, pagina) => {
    return {
        "call":"ListarProdutos",
        "app_key":app_key,
        "app_secret":app_secret,
        "param":[{
            "pagina": pagina,
            "registros_por_pagina": 200,
            "apenas_importado_api":"N",
            "filtrar_apenas_omiepdv": "N"
        }]
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
 * Localiza o código do produto na ecomp
 * @param {*} clienteCode 
 * @returns 
 */
async function identify(productCode) {
    let productsECOMP = await getECOMPProducts()
    let productsSEG = await getSEGCOMPProducts()

    let produto = productsSEG.filter(p => p.codigo_produto == productCode)[0] //Identifica qual cliente é
    let produtoNaECOMP = productsECOMP.filter(p => p.descricao == produto.descricao)[0] //Acha no aplicativo ECOMP
   
    return produtoNaECOMP
}

async function getECOMPProducts() {
    let ecomp_products = []
   
    let totalDePaginas = 10000

    for (let index = 1; index <= totalDePaginas; index++) {
    
        const response = await fetch(link, options(APP_KEY_ECOMP, APP_SECRET_ECOMP, index));
        const responseJson = await response.json();

        if(totalDePaginas == 10000) {
            totalDePaginas = responseJson.total_de_paginas
        }

        responseJson.produto_servico_cadastro.forEach(p => ecomp_products.push(p))
    }

    return ecomp_products
}

async function getSEGCOMPProducts() {
    let segcomp_products = []
   
    let totalDePaginas = 10000

    for (let index = 1; index <= totalDePaginas; index++) {
    
        const response = await fetch(link, options(APP_KEY_SEGCOMP, APP_SECRET_SEGCOMP, index));
        const responseJson = await response.json();

        if(totalDePaginas == 10000) {
            totalDePaginas = responseJson.total_de_paginas
        }

        responseJson.produto_servico_cadastro.forEach(p => segcomp_products.push(p))
    }

    return segcomp_products
}
  
module.exports = {identify}