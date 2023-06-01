require('dotenv').config()

const APP_KEY_ECOMP = process.env.APP_KEY_ECOMP
const APP_SECRET_ECOMP = process.env.APP_SECRET_ECOMP

const link = "https://app.omie.com.br/api/v1/produtos/pedido/"

const body = (order) => {
    return {
        "call":"IncluirPedido",
        "app_key": APP_KEY_ECOMP,
        "app_secret": APP_SECRET_ECOMP,
        "param": [ order ] 
    }
}
    
const options =  (order) => {
    return {
        method: "post",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body(order))   
    }
}

/**
 * Localiza o código do produto na ecomp
 * @param {*} clienteCode 
 * @returns 
 */
async function send(order) {

    const response = await fetch(link, options(order));
    const responseJson = await response.json();
   
    return responseJson
}


  
module.exports = {send}