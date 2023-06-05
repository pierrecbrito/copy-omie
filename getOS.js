require('dotenv').config()

const APP_KEY_SEGCOMP = process.env.APP_KEY_SEGCOMP
const APP_SECRET_SEGCOMP = process.env.APP_SECRET_SEGCOMP

const link = "https://app.omie.com.br/api/v1/servicos/os/"

const body = (OSNumber) => {
    return {
        "call":"ConsultarOS",
        "app_key": APP_KEY_SEGCOMP,
        "app_secret": APP_SECRET_SEGCOMP,
        "param":[{"cCodIntOS":"","nCodOS":0,"cNumOS": OSNumber}]
        }
}
    
const options =  (OSNumber) => {
    return {
        method: "post",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body(OSNumber))   
    }
}

async function getOS(OSNumber) {
    const response = await fetch(link, options(OSNumber));
    const responseJson = await response.json();
   
    return responseJson
}
  
module.exports = {getOS}