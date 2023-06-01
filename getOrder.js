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

async function getOrder() {
    const response = await fetch(ENDPOINT(index), options);
    const responseJson = await response.json();
}
  