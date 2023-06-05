require('dotenv').config()

const APP_KEY_ECOMP = process.env.APP_KEY_ECOMP
const APP_SECRET_ECOMP = process.env.APP_SECRET_ECOMP

const link = "https://app.omie.com.br/api/v1/servicos/os/"

const body = (os) => {
    return {
        "call":"IncluirOS",
        "app_key": APP_KEY_ECOMP,
        "app_secret": APP_SECRET_ECOMP,
        "param": [ os ] 
    }
}
    
const options =  (os) => {
    return {
        method: "post",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body(os))   
    }
}

/**
 * Localiza o código do produto na ecomp
 * @param {*} clienteCode 
 * @returns 
 */
async function send(os) {

    const response = await fetch(link, options(os));
    const responseJson = await response.json();
   
    return responseJson
}


  
module.exports = {send}