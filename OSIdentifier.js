require('dotenv').config()

const APP_KEY_SEGCOMP = process.env.APP_KEY_SEGCOMP
const APP_SECRET_SEGCOMP = process.env.APP_SECRET_SEGCOMP
const APP_KEY_ECOMP = process.env.APP_KEY_ECOMP
const APP_SECRET_ECOMP = process.env.APP_SECRET_ECOMP

const link = "https://app.omie.com.br/api/v1/servicos/servico/"

const body = (app_key, app_secret, pagina) => {
    return {
        "call":"ListarCadastroServico",
        "app_key":app_key,
        "app_secret":app_secret,
        "param":[
            {"nPagina":1,"nRegPorPagina":150}
        ]
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
