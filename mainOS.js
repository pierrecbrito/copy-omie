const segcomp = require('./getOS')
const clientes = require('./Clientidentify')

async function main() {
    let os = await segcomp.getOS(315)

    console.log(os)
}



main()