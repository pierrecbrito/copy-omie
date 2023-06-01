const segcomp = require('./getOrder')

async function main() {
    let order = await segcomp.getOrder(15)
    console.log(order)
}

main()