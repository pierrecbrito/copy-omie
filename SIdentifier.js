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

async function getECOMPServices() {
    let ecomp_services = []
   
    let totalDePaginas = 10000

    for (let index = 1; index <= totalDePaginas; index++) {
    
        const response = await fetch(link, options(APP_KEY_ECOMP, APP_SECRET_ECOMP, index));
        const responseJson = await response.json();

        if(totalDePaginas == 10000) {
            totalDePaginas = responseJson.nTotPaginas
        }

        responseJson.cadastros.forEach(p => ecomp_services.push(p))
    }

    return ecomp_services
}

async function getSEGCOMPServices() {
    let segcomp_services = []
   
    let totalDePaginas = 10000

    for (let index = 1; index <= totalDePaginas; index++) {
    
        const response = await fetch(link, options(APP_KEY_SEGCOMP, APP_SECRET_SEGCOMP, index));
        const responseJson = await response.json();

        if(totalDePaginas == 10000) {
            totalDePaginas = responseJson.nTotPaginas
        }

        responseJson.cadastros.forEach(p => segcomp_services.push(p))
    }

    return segcomp_services
}

async function identify(serviceCode, servicesSEG, servicesECOMP) {
    let service = servicesSEG.filter(s => s.intListar.nCodServ == serviceCode)[0] //Identifica qual cliente é
    let serviceECOMP= servicesECOMP.filter(s => s.cabecalho.cDescricao == service.cabecalho.cDescricao)[0] //Acha no aplicativo ECOMP
   
    return serviceECOMP
}

async function changeCodeOfServices(os) {
    let servicesECOMP = await getECOMPServices()
    let servicesSEG = await getSEGCOMPServices()

    //Mudando código dos produtos
    for (let index = 0; index < os.ServicosPrestados.length; index++) {
        let service = await identify(os.ServicosPrestados[index].nCodServico, servicesSEG, servicesECOMP)
        
        os.ServicosPrestados[index].nCodServico = service.intListar.nCodServ
        delete os.ServicosPrestados[index].nIdItem
    }
}

module.exports = {changeCodeOfServices}
