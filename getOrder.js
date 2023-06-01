require('dotenv').config()

const APP_KEY_SEGCOMP = process.env.APP_KEY_SEGCOMP
const APP_SECRET_SEGCOMP = process.env.APP_SECRET_SEGCOMP

const link = "https://app.omie.com.br/api/v1/produtos/pedido/"
const body = (orderNumber) => {
    return {
        "call":"ConsultarPedido",
        "app_key": APP_KEY_SEGCOMP,
        "app_secret":APP_SECRET_SEGCOMP,
        "param":
            [
                {"numero_pedido":orderNumber}
            ]
        }
}
    
const options =  (orderNumber) => {
    return {
        method: "post",
        headers: { 
            "Content-Type": "application/json",
        },
        body: body(orderNumber)    
    }
}

async function getOrder(orderNumber) {
    const response = await fetch(link, options(orderNumber));
    const responseJson = await response.json();

    return responseJson.pedido_venda_produto
}
  
module.exports = {getOrder}