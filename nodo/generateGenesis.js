const fs = require("fs")
function generateGenesis(NETWORK_CHAINID, CUENTA, BALANCE, CUENTAS_ALLOC, NETWORK_DIR) {
    const timestamp = Math.round(((new Date()).getTime() / 1000)).toString(16)
    // leemos la plantilla del genesis
    let genesis = JSON.parse(fs.readFileSync('genesisbase.json').toString())

    // genesis.timestamp = `0x${timestamp}`
    genesis.config.chainId = NETWORK_CHAINID
    genesis.extraData = `0x${'0'.repeat(64)}${CUENTA}${'0'.repeat(130)}`


    genesis.alloc = CUENTAS_ALLOC.reduce((acc, item) => {
        acc[item] = { balance: BALANCE }
        return acc
    }, {})


    fs.writeFileSync(`${NETWORK_DIR}/genesis.json`, JSON.stringify(genesis))

}
const BALANCE = "0x200000000000000000000000000000000000000000000000000000000000000"
generateGenesis(3333, 
    "d536462d23cda419768337b4fa96ebcf402fa347", BALANCE, 
    ["0x603f42e15F6518aE60246026564a19E9837F3D8e", 
     "0xd536462d23cda419768337b4fa96ebcf402fa347"], ".")