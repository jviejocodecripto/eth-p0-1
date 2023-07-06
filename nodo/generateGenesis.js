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
    "6f4094b7455e9df89022a2add93d979b56be1104", BALANCE, 
    ["6f4094b7455e9df89022a2add93d979b56be1104",
     "0x603f42e15F6518aE60246026564a19E9837F3D8e", 
     "0x33922D431E9289Bb6fD07EA1e40CD2D1AB14130a",
     "0x23075ae29DD791D8a28af28e2BC978F61c9D6773"], ".")